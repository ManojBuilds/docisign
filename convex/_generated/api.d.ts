/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions from "../actions.js";
import type * as activities from "../activities.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as documents from "../documents.js";
import type * as emails_DocumentComplete from "../emails/DocumentComplete.js";
import type * as emails_SignerCopy from "../emails/SignerCopy.js";
import type * as emails_SigningConfirmation from "../emails/SigningConfirmation.js";
import type * as emails_SigningRequest from "../emails/SigningRequest.js";
import type * as emails_TrialReminder1Day from "../emails/TrialReminder1Day.js";
import type * as emails_TrialReminder3Days from "../emails/TrialReminder3Days.js";
import type * as emails_Welcome from "../emails/Welcome.js";
import type * as emails_components_EmailFooter from "../emails/components/EmailFooter.js";
import type * as emails_components_EmailHeader from "../emails/components/EmailHeader.js";
import type * as emails_components_EmailLayout from "../emails/components/EmailLayout.js";
import type * as emails_components_Logo from "../emails/components/Logo.js";
import type * as emails from "../emails.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as signatureFields from "../signatureFields.js";
import type * as signers from "../signers.js";
import type * as users from "../users.js";

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
  crons: typeof crons;
  dashboard: typeof dashboard;
  documents: typeof documents;
  "emails/DocumentComplete": typeof emails_DocumentComplete;
  "emails/SignerCopy": typeof emails_SignerCopy;
  "emails/SigningConfirmation": typeof emails_SigningConfirmation;
  "emails/SigningRequest": typeof emails_SigningRequest;
  "emails/TrialReminder1Day": typeof emails_TrialReminder1Day;
  "emails/TrialReminder3Days": typeof emails_TrialReminder3Days;
  "emails/Welcome": typeof emails_Welcome;
  "emails/components/EmailFooter": typeof emails_components_EmailFooter;
  "emails/components/EmailHeader": typeof emails_components_EmailHeader;
  "emails/components/EmailLayout": typeof emails_components_EmailLayout;
  "emails/components/Logo": typeof emails_components_Logo;
  emails: typeof emails;
  files: typeof files;
  http: typeof http;
  notifications: typeof notifications;
  signatureFields: typeof signatureFields;
  signers: typeof signers;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
