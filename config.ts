export const config = {
  brandName: "fitted",

  hero: {
    title: "archive access.",
    subtitle: "rent designer archive pieces from private collectors.",
    cta: "apply",
    placeholder: "email",
  },

  success: {
    title: "noted.",
    body: "check your inbox.",
  },

  waitlist: {
    discountPercent: 20,
    codePrefix: "EARLY",
  },

  email: {
    subject: "you're on the list — here's your code",
  },
} as const;

export type AppConfig = typeof config;
