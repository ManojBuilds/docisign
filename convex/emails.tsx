"use node";
import { Resend } from "@convex-dev/resend";
import { render } from "@react-email/render";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { action } from "./_generated/server";
import {
  DocumentComplete,
  NewYearGift,
  Otp,
  SignerCopy,
  SigningConfirmation,
  SigningRequest,
  TrialReminder1Day,
  TrialReminder3Days,
  Welcome,
} from "./emails/templates";

const domain = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const resend: Resend = new Resend(components.resend, {
  testMode: domain.includes("localhost"),
});

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        subject: "Welcome to Boopsign!",
        to: args.email,
        html: await render(
          Welcome({
            userName: args.name,
            dashboardUrl: `${domain}/dashboard`,
          }),
        ),
      });
      console.log("Welcome email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }
  },
});

export const sendNewYearGiftEmail = action({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.email,
        subject: "A New Year gift from Boopsign!",
        html: await render(
          NewYearGift({
            userName: args.name,
            dashboardUrl: `${domain}/dashboard`,
          }),
        ),
      });
      console.log("New Year gift email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send New Year gift email:", error);
    }
  },
});

export const sendSigningRequestEmail = action({
  args: {
    signerName: v.string(),
    senderName: v.string(),
    documentTitle: v.string(),
    signingUrl: v.string(),
    customMessage: v.optional(v.string()),
    to: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      console.log("args", args);
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.to,
        subject: `${args.senderName} has sent you a document to sign: ${args.documentTitle}`,
        html: await render(SigningRequest(args)),
      });
      console.log("Signing request email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send signing request email:", error);
    }
  },
});

export const sendSigningConfirmationEmail = action({
  args: {
    ownerName: v.string(),
    signerName: v.string(),
    documentTitle: v.string(),
    dashboardUrl: v.string(),
    signedAt: v.string(),
    remainingSigners: v.number(),
    to: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.to,
        subject: `${args.signerName} signed your document: ${args.documentTitle}`,
        html: await render(SigningConfirmation(args)),
      });
      console.log("Signing confirmation email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send signing confirmation email:", error);
    }
  },
});

export const sendDocumentCompleteEmail = action({
  args: {
    ownerName: v.string(),
    documentTitle: v.string(),
    dashboardUrl: v.string(),
    downloadUrl: v.string(),
    completedAt: v.string(),
    totalSigners: v.number(),
    to: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.to,
        subject: `Your document "${args.documentTitle}" is fully executed and ready!`,
        html: await render(DocumentComplete(args)),
      });
      console.log("Document complete email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send document complete email:", error);
    }
  },
});

export const sendSignerCopyEmail = action({
  args: {
    signerName: v.string(),
    documentTitle: v.string(),
    downloadUrl: v.string(),
    signedAt: v.string(),
    senderName: v.string(),
    to: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.to,
        subject: `Your signed copy of "${args.documentTitle}" is ready for download`,
        html: await render(SignerCopy(args)),
      });
      console.log("Signer copy email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send signer copy email:", error);
    }
  },
});

export const sendTrialReminder3DaysEmail = action({
  args: {
    email: v.string(),
    name: v.string(),
    upgradeUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.email,
        subject: "3 days left in your Boopsign trial",
        html: await render(
          TrialReminder3Days({
            userName: args.name,
            upgradeUrl: args.upgradeUrl,
          }),
        ),
      });
      console.log("Trial reminder (3 days) email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send trial reminder (3 days) email:", error);
    }
  },
});

export const sendTrialReminder1DayEmail = action({
  args: {
    email: v.string(),
    name: v.string(),
    upgradeUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.email,
        subject: "Your Boopsign trial expires tomorrow",
        html: await render(
          TrialReminder1Day({
            userName: args.name,
            upgradeUrl: args.upgradeUrl,
          }),
        ),
      });
      console.log("Trial reminder (1 day) email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send trial reminder (1 day) email:", error);
    }
  },
});

export const sendOtpEmail = action({
  args: {
    email: v.string(),
    otp: v.string(),
    purpose: v.union(v.literal("signer_verification"), v.literal("email_verification")),
  },
  handler: async (ctx, args) => {
    let subject = args.purpose === "signer_verification"
      ? "Your Document Signing Verification Code"
      : "Your Verification Code";

    try {
      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.email,
        subject,
        html: await render(
          Otp({
            otp: args.otp,
            purpose: args.purpose,
          }),
        ),
      });
      console.log("OTP email sent successfully!", res);
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      throw new Error("Failed to send verification email");
    }
  },
});
