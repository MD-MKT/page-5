import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const CHECKOUT_LEAD_PATH = "/api/checkout-lead";
const INTRO_LEADS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyc2bL1UTLcZ8dnkSghNSM19Ea25QQmsLjH5DETLAwrQGy89EfZFyCbfTC4L0J_6tLkcA/exec";
const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

let serverEntryPromise: Promise<ServerEntry> | undefined;

const jsonResponse = (payload: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });

const isValidTimestamp = (value: unknown) =>
  typeof value === "string" && value.length <= 40 && !Number.isNaN(Date.parse(value));

const isValidRequiredString = (value: unknown, maxLength: number) =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

const protectSheetValue = (value: string) => (/^[=+\-@]/.test(value) ? `'${value}` : value);

async function captureCheckoutLead(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && new URL(requestOrigin).host !== new URL(request.url).host) {
    return jsonResponse({ ok: false, error: "Origin not allowed" }, 403);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  const isValidPayload =
    isValidTimestamp(payload.timestamp) &&
    isValidRequiredString(payload.name, 200) &&
    isValidRequiredString(payload.email, 320) &&
    typeof payload.phone === "string" &&
    E164_PHONE_PATTERN.test(payload.phone) &&
    payload.page === "page-5" &&
    payload.source === "page-5" &&
    isValidRequiredString(payload.submission_id, 100) &&
    typeof payload.sms_opt_in === "boolean" &&
    (payload.sms_opt_in
      ? isValidTimestamp(payload.sms_opt_in_timestamp)
      : payload.sms_opt_in_timestamp === null);

  if (!isValidPayload) {
    return jsonResponse({ ok: false, error: "Invalid lead payload" }, 400);
  }

  const sheetPayload = {
    ...payload,
    name: protectSheetValue(String(payload.name).trim()),
    email: protectSheetValue(String(payload.email).trim()),
    phone: protectSheetValue(String(payload.phone)),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20_000);
    const response = await fetch(INTRO_LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(sheetPayload),
      redirect: "manual",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
    const isSuccessfulRedirect = response.status >= 300 && response.status < 400;
    const responseBody = isSuccessfulRedirect ? "" : await response.text();
    let parsedResponse: { ok?: boolean } = {};

    if (responseBody) {
      try {
        parsedResponse = JSON.parse(responseBody) as { ok?: boolean };
      } catch {
        parsedResponse = {};
      }
    }

    if (!isSuccessfulRedirect && (!response.ok || parsedResponse.ok !== true)) {
      console.error("Intro Offer Leads webhook rejected the lead", {
        status: response.status,
        responseBody,
      });
      return jsonResponse({ ok: false, error: "Lead capture unavailable" }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    console.error("Intro Offer Leads webhook request failed", error);
    return jsonResponse({ ok: false, error: "Lead capture unavailable" }, 502);
  }
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (new URL(request.url).pathname === CHECKOUT_LEAD_PATH) {
        return await captureCheckoutLead(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
