export const INTRO_CTA_LABEL = "BOOK YOUR $10 INTRO";

export type IntroCtaLocation = "hero" | "social_proof" | "value" | "sticky_mobile" | "final";

type AnalyticsWindow = Window & {
  clarity?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

const getDeviceContext = () =>
  window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";

export function trackIntroEvent(
  eventName: string,
  properties: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  const payload = {
    ...properties,
    page_path: window.location.pathname,
    device_context: getDeviceContext(),
  };

  if (analyticsWindow.clarity) {
    Object.entries(payload).forEach(([key, value]) => {
      analyticsWindow.clarity?.("set", key, String(value));
    });
    analyticsWindow.clarity("event", eventName);
  }

  analyticsWindow.dataLayer?.push({ event: eventName, ...payload });
  analyticsWindow.gtag?.("event", eventName, payload);
}

export function trackIntroCtaClick(location: IntroCtaLocation) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  const properties = {
    cta_location: location,
    cta_label: INTRO_CTA_LABEL,
  };

  trackIntroEvent("intro_cta_click", properties);
  analyticsWindow.fbq?.("trackCustom", "IntroCtaClick", properties);

  const viewContentKey = "smashIntroViewContentTracked";
  if (!window.sessionStorage.getItem(viewContentKey) && analyticsWindow.fbq) {
    analyticsWindow.fbq("track", "ViewContent", {
      content_name: "$10 Intro to Padel",
      content_type: "product",
      value: 10,
      currency: "USD",
    });
    window.sessionStorage.setItem(viewContentKey, "1");
  }
}

export function trackMetaInitiateCheckout() {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  const initiateCheckoutKey = "smashIntroInitiateCheckoutTracked";
  if (window.sessionStorage.getItem(initiateCheckoutKey) || !analyticsWindow.fbq) return;

  analyticsWindow.fbq("track", "InitiateCheckout", {
    content_name: "$10 Intro to Padel",
    value: 10,
    currency: "USD",
  });
  window.sessionStorage.setItem(initiateCheckoutKey, "1");
}
