import { Context } from "../../../..";
import { PermissionsConfig } from "../../../interfaces";
import Endpoint from "./endpoint";

/**
 * Interface for VeridaDatabaseConfig
 */
export interface VeridaDatabaseConfig {
  databaseName: string;
  did: string;
  storageContext: string;

  permissions?: PermissionsConfig;

  signData?: boolean;
  signContext: Context;

  readOnly?: boolean;
  isOwner?: boolean;
  encryptionKey?: Buffer;

  saveDatabase: boolean;

  endpoint: Endpoint;
}