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
  TemplateDownloadEmail1,
  TemplateDownloadEmail2,
  TemplateDownloadEmail3,
} from "./emails/templates";
import { internal } from "./_generated/api";
import { ALL_TEMPLATES } from "./seo/all_templates";

const domain = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const COUPON_CODE = process.env.SPECIAL_COUPON_CODE ?? "TEMPLATE20";

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
      console.log(`Welcome email sent to ${args.email}`, res);
    } catch (error) {
      console.error("Welcome email failed:", error);
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
      console.log(`New Year gift email sent to ${args.email}`, res);
    } catch (error) {
      console.error("New Year gift email failed:", error);
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
    brandLogoUrl: v.optional(v.string()),
    brandName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const res = await resend.sendEmail(ctx, {
        from: `${args.brandName || "Boopsign"} <alerts@mailer.boopsign.com>`,
        to: args.to,
        subject: `${args.brandName || args.senderName} has sent you a document to sign: ${args.documentTitle}`,
        html: await render(SigningRequest(args)),
      });
      console.log(`Signing request sent to ${args.to}`, res);
    } catch (error) {
      console.error("Signing request email failed:", error);
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
      console.log(`Signing confirmation sent to ${args.to}`, res);
    } catch (error) {
      console.error("Signing confirmation email failed:", error);
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
      console.log(`Document complete email sent to ${args.to}`, res);
    } catch (error) {
      console.error("Document complete email failed:", error);
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
      console.log(`Signer copy sent to ${args.to}`, res);
    } catch (error) {
      console.error("Signer copy email failed:", error);
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
      console.log(`Trial reminder (3 days) sent to ${args.email}`, res);
    } catch (error) {
      console.error("Trial reminder (3 days) email failed:", error);
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
      console.log(`Trial reminder (1 day) sent to ${args.email}`, res);
    } catch (error) {
      console.error("Trial reminder (1 day) email failed:", error);
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
      console.log(`OTP (${args.purpose}) sent to ${args.email}`, res);
    } catch (error) {
      console.error("OTP email failed:", error);
      throw new Error("Failed to send verification email");
    }
  },
});

export const sendSequenceEmail = action({
  args: {
    email: v.string(),
    step: v.number(),
    source: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const template = ALL_TEMPLATES.find(t => t.slug === args.source);

      // Use actual name if template found, otherwise format slug
      const templateName = template?.name || args.source
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      let subject = "";
      let html = "";
      const dashboardUrl = `${domain}/dashboard`;

      if (args.step === 1) {
        subject = `Your ${templateName} Download`;
        const docUrl = template?.docUrl;
        const pdfUrl = template?.pdfUrl;

        // Use /api/download endpoint for both formats
        const docDownloadUrl = docUrl
          ? `${domain}/api/download?url=${encodeURIComponent(docUrl)}&filename=${args.source}.docx`
          : undefined;

        const pdfDownloadUrl = pdfUrl
          ? `${domain}/api/download?url=${encodeURIComponent(pdfUrl)}&filename=${args.source}.pdf`
          : undefined;


        html = await render(
          TemplateDownloadEmail1({
            userName: args.name,
            templateName,
            docDownloadUrl,
            pdfDownloadUrl,
            dashboardUrl,
          })
        );
      } else if (args.step === 2) {
        subject = `The fastest way to get your ${templateName} signed ✍️`;
        html = await render(
          TemplateDownloadEmail2({
            userName: args.name,
            templateName,
            dashboardUrl,
          })
        );
      } else if (args.step === 3) {
        subject = "🎁 Exclusive offer: 20% off Boopsign Pro";
        html = await render(
          TemplateDownloadEmail3({
            userName: args.name,
            dashboardUrl: `${domain}/pricing`,
            couponCode: COUPON_CODE
          })
        );
      } else {
        console.warn(`Invalid sequence step ${args.step} for email ${args.email}`);
        return;
      }

      const res = await resend.sendEmail(ctx, {
        from: "Boopsign <alerts@mailer.boopsign.com>",
        to: args.email,
        subject,
        html,
      });
      console.log(`Step ${args.step} sent: ${args.email} [${templateName}]`, res);

      // Advance sequence logic
      await ctx.runMutation(internal.leads.advanceSequence, {
        email: args.email,
        completedStep: args.step,
        source: args.source,
        name: args.name,
      });

    } catch (error) {
      console.error(`Sequence Error [Step ${args.step}] for ${args.email}:`, error);
    }
  },
});
