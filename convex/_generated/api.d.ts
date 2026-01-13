/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions from "../actions.js";
import type * as activities from "../activities.js";
import type * as brevo from "../brevo.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as documents from "../documents.js";
import type * as dodo from "../dodo.js";
import type * as emails_layout from "../emails/layout.js";
import type * as emails_templates_document_complete from "../emails/templates/document_complete.js";
import type * as emails_templates_index from "../emails/templates/index.js";
import type * as emails_templates_new_year_gift from "../emails/templates/new_year_gift.js";
import type * as emails_templates_otp from "../emails/templates/otp.js";
import type * as emails_templates_signer_copy from "../emails/templates/signer_copy.js";
import type * as emails_templates_signing_confirmation from "../emails/templates/signing_confirmation.js";
import type * as emails_templates_signing_request from "../emails/templates/signing_request.js";
import type * as emails_templates_trial_reminder_1day from "../emails/templates/trial_reminder_1day.js";
import type * as emails_templates_trial_reminder_3days from "../emails/templates/trial_reminder_3days.js";
import type * as emails_templates_welcome from "../emails/templates/welcome.js";
import type * as emails from "../emails.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as otp from "../otp.js";
import type * as payments from "../payments.js";
import type * as signatureFields from "../signatureFields.js";
import type * as signers from "../signers.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  activities: typeof activities;
  brevo: typeof brevo;
  crons: typeof crons;
  dashboard: typeof dashboard;
  documents: typeof documents;
  dodo: typeof dodo;
  "emails/layout": typeof emails_layout;
  "emails/templates/document_complete": typeof emails_templates_document_complete;
  "emails/templates/index": typeof emails_templates_index;
  "emails/templates/new_year_gift": typeof emails_templates_new_year_gift;
  "emails/templates/otp": typeof emails_templates_otp;
  "emails/templates/signer_copy": typeof emails_templates_signer_copy;
  "emails/templates/signing_confirmation": typeof emails_templates_signing_confirmation;
  "emails/templates/signing_request": typeof emails_templates_signing_request;
  "emails/templates/trial_reminder_1day": typeof emails_templates_trial_reminder_1day;
  "emails/templates/trial_reminder_3days": typeof emails_templates_trial_reminder_3days;
  "emails/templates/welcome": typeof emails_templates_welcome;
  emails: typeof emails;
  files: typeof files;
  http: typeof http;
  notifications: typeof notifications;
  otp: typeof otp;
  payments: typeof payments;
  signatureFields: typeof signatureFields;
  signers: typeof signers;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: {
    lib: {
      cancelEmail: FunctionReference<
        "mutation",
        "internal",
        { emailId: string },
        null
      >;
      cleanupAbandonedEmails: FunctionReference<
        "mutation",
        "internal",
        { olderThan?: number },
        null
      >;
      cleanupOldEmails: FunctionReference<
        "mutation",
        "internal",
        { olderThan?: number },
        null
      >;
      createManualEmail: FunctionReference<
        "mutation",
        "internal",
        {
          from: string;
          headers?: Array<{ name: string; value: string }>;
          replyTo?: Array<string>;
          subject: string;
          to: string;
        },
        string
      >;
      get: FunctionReference<
        "query",
        "internal",
        { emailId: string },
        {
          complained: boolean;
          createdAt: number;
          errorMessage?: string;
          finalizedAt: number;
          from: string;
          headers?: Array<{ name: string; value: string }>;
          html?: string;
          opened: boolean;
          replyTo: Array<string>;
          resendId?: string;
          segment: number;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced"
            | "failed";
          subject: string;
          text?: string;
          to: string;
        } | null
      >;
      getStatus: FunctionReference<
        "query",
        "internal",
        { emailId: string },
        {
          complained: boolean;
          errorMessage: string | null;
          opened: boolean;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced"
            | "failed";
        } | null
      >;
      handleEmailEvent: FunctionReference<
        "mutation",
        "internal",
        { event: any },
        null
      >;
      sendEmail: FunctionReference<
        "mutation",
        "internal",
        {
          from: string;
          headers?: Array<{ name: string; value: string }>;
          html?: string;
          options: {
            apiKey: string;
            initialBackoffMs: number;
            onEmailEvent?: { fnHandle: string };
            retryAttempts: number;
            testMode: boolean;
          };
          replyTo?: Array<string>;
          subject: string;
          text?: string;
          to: string;
        },
        string
      >;
      updateManualEmail: FunctionReference<
        "mutation",
        "internal",
        {
          emailId: string;
          errorMessage?: string;
          resendId?: string;
          status:
            | "waiting"
            | "queued"
            | "cancelled"
            | "sent"
            | "delivered"
            | "delivery_delayed"
            | "bounced"
            | "failed";
        },
        null
      >;
    };
  };
  dodopayments: {
    lib: {
      checkout: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          environment: "test_mode" | "live_mode";
          payload: {
            allowed_payment_method_types?: Array<string>;
            billing_address?: {
              city?: string;
              country: string;
              state?: string;
              street?: string;
              zipcode?: string;
            };
            billing_currency?: string;
            confirm?: boolean;
            customer?:
              | { email: string; name?: string; phone_number?: string }
              | { customer_id: string };
            customization?: {
              force_language?: string;
              show_on_demand_tag?: boolean;
              show_order_details?: boolean;
              theme?: string;
            };
            discount_code?: string;
            feature_flags?: {
              allow_currency_selection?: boolean;
              allow_discount_code?: boolean;
              allow_phone_number_collection?: boolean;
              allow_tax_id?: boolean;
              always_create_new_customer?: boolean;
            };
            force_3ds?: boolean;
            metadata?: Record<string, string>;
            product_cart: Array<{
              addons?: Array<{ addon_id: string; quantity: number }>;
              amount?: number;
              product_id: string;
              quantity: number;
            }>;
            return_url?: string;
            show_saved_payment_methods?: boolean;
            subscription_data?: {
              on_demand?: {
                adaptive_currency_fees_inclusive?: boolean;
                mandate_only: boolean;
                product_currency?: string;
                product_description?: string;
                product_price?: number;
              };
              trial_period_days?: number;
            };
          };
        },
        { checkout_url: string }
      >;
      customerPortal: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          dodoCustomerId: string;
          environment: "test_mode" | "live_mode";
          send_email?: boolean;
        },
        { portal_url: string }
      >;
    };
  };
};
