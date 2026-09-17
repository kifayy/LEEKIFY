import { MANAGE_BILLING_URL } from "@/lib/constants";

export type ContactFaqItem = {
  question: string;
  answer: string;
};

export type ContactFaqSection = {
  title?: string;
  items: readonly ContactFaqItem[];
};

/** FAQ copy for the contact page. */
export const CONTACT_FAQ_SECTIONS: readonly ContactFaqSection[] = [
  {
    items: [
      {
        question: "How fast does support usually respond?",
        answer:
          "We aim to reply within one business day. Email support@leekify.com with your account email and a short description of the issue so we can help faster.",
      },
      {
        question: "How do I cancel or change my subscription?",
        answer: `Use Manage Your Subscription below or visit ${MANAGE_BILLING_URL} to update billing, switch plans, or cancel. You can also email support@leekify.com if you need help with your account.`,
      },
      {
        question: "Who should I email for partnerships?",
        answer:
          "For partnerships or media inquiries, email support@leekify.com. Include your organization, audience, and what you are proposing.",
      },
      {
        question: "Is my data private?",
        answer:
          "We use encryption in transit, follow standard security practices, and do not sell your personal information. Read our Privacy Policy at leekify.com/privacy for full details.",
      },
    ],
  },
  {
    title: "🏦 Subscription Management",
    items: [
      {
        question: "Cancelling your subscription",
        answer: `You can cancel anytime through your account settings at ${MANAGE_BILLING_URL} or by emailing support@leekify.com. Your subscription stays active until the end of your current billing cycle—no further charges after that. Cancel before your trial ends if you do not want to convert to a paid plan.`,
      },
      {
        question: "Does my subscription automatically renew?",
        answer:
          "Yes. Subscriptions renew automatically at the end of each billing cycle unless you cancel beforehand. We charge the payment method on file on your renewal date. You can turn off auto-renew anytime from the subscription management portal.",
      },
      {
        question: "Updating email address",
        answer:
          "Email support@leekify.com from your current account email with the address you want to use. Include your full name so we can verify your account. If you no longer have access to your old email, tell us what you can verify (recent charge date, last four digits of your card, etc.) and we will help from there.",
      },
    ],
  },
  {
    title: "🧡 Billing & Payments",
    items: [
      {
        question: "Where is my refund?",
        answer:
          "Approved refunds are issued to your original payment method within 3–5 business days. We review refund requests within 5 business days. If it has been longer, email support@leekify.com with your account email, transaction date, and amount. See our Refund Policy at leekify.com/terms#refund-policy for eligibility details.",
      },
      {
        question: "I didn't authorize a subscription or recurring charge",
        answer:
          "Contact support@leekify.com right away with your account email, the charge date, and the amount. Flag any charge you believe is unauthorized so we can investigate billing errors, duplicate charges, or account access issues. Do not share full card numbers in email.",
      },
      {
        question: "I was unaware of the charges",
        answer:
          "After a promotional trial, your account converts to the paid plan you selected at signup unless you cancel before the trial ends. Pricing is shown before you are charged. If you missed the renewal window or did not realize the trial had ended, email support@leekify.com—we will review your account and explain your options under our Refund Policy.",
      },
    ],
  },
] as const;

/** Flat list for consumers that only need questions (e.g. structured data). */
export const CONTACT_FAQ_ITEMS = CONTACT_FAQ_SECTIONS.flatMap((section) => [...section.items]);
