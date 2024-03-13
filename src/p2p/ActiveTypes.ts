import * as Types from './P2PTypes';

/** TYPES */

export interface ActiveRequest {
  nodeId: string;
  status: string;
  timestamp: number;
}

export type SignedActiveRequest = ActiveRequest & Types.SignedObject;

export interface Txs {
  active: SignedActiveRequest[];
  finishedSyncing: SignedFinishedSyncingRequest[];
}

export interface Record {
  active: number;
  standby: number;
  activated: string[];
  activatedPublicKeys: string[];
  maxSyncTime: number;
}

export interface FinishedSyncingRequest extends ActiveRequest {}

export type SignedFinishedSyncingRequest = FinishedSyncingRequest & Types.SignedObject;
