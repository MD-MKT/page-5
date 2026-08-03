const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

export const normalizePhoneToE164 = (value: string) => {
  const trimmedValue = value.trim().replace(/^["']+|["']+$/g, "");
  const digits = trimmedValue.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  const internationalPhone = `+${digits}`;
  if (trimmedValue.startsWith("+") && E164_PHONE_PATTERN.test(internationalPhone)) {
    return internationalPhone;
  }

  return null;
};

export const createSmsConsentFields = (smsOptIn: boolean, submittedAt: string) => ({
  sms_opt_in: smsOptIn,
  sms_opt_in_timestamp: smsOptIn ? submittedAt : null,
});

export const createWebhookBody = (payload: Record<string, string | boolean | null>) => {
  const body = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    body.set(key, value === null ? "" : String(value));
  });

  return body;
};
