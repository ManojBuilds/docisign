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
