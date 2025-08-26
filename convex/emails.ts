
import { action } from "./_generated/server";
import { v } from "convex/values";
import { resend } from "../lib/resend";
import SigningRequest from "./emails/SigningRequest";
import SigningConfirmation from "./emails/SigningConfirmation";
import DocumentComplete from "./emails/DocumentComplete";
import SignerCopy from "./emails/SignerCopy";
import TrialReminder3Days from "./emails/TrialReminder3Days";
import TrialReminder1Day from "./emails/TrialReminder1Day";
import { Welcome } from "./emails/Welcome";

const domain = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const sendWelcomeEmail = action({
    args: {
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.email],
            subject: "Welcome to Docisign!",
            react: Welcome({ userName: args.name, dashboardUrl: `${domain}/dashboard` }),
        });
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
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.to],
            subject: `${args.senderName} has sent you a document to sign: ${args.documentTitle}`,
            react: SigningRequest(args),
        });
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
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.to],
            subject: `${args.signerName} signed your document: ${args.documentTitle}`,
            react: SigningConfirmation(args),
        });
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
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.to],
            subject: `Your document "${args.documentTitle}" is fully executed and ready!`,
            react: DocumentComplete(args),
        });
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
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.to],
            subject: `Your signed copy of "${args.documentTitle}" is ready for download`,
            react: SignerCopy(args),
        });
    },
});

export const sendTrialReminder3DaysEmail = action({
    args: {
        email: v.string(),
        name: v.string(),
        upgradeUrl: v.string(),
    },
    handler: async (ctx, args) => {
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.email],
            subject: "3 days left in your Docisign trial",
            react: TrialReminder3Days({ userName: args.name, upgradeUrl: args.upgradeUrl }),
        });
    },
});

export const sendTrialReminder1DayEmail = action({
    args: {
        email: v.string(),
        name: v.string(),
        upgradeUrl: v.string(),
    },
    handler: async (ctx, args) => {
        await resend.emails.send({
            from: 'Docisign <noreply@mail.heysheet.in>',
            to: [args.email],
            subject: "Your Docisign trial expires tomorrow",
            react: TrialReminder1Day({ userName: args.name, upgradeUrl: args.upgradeUrl }),
        });
    },
});
