import {Signature, SignedObject} from './P2PTypes';

/** TYPES */
export interface LostReport {
  target: string;
  checker: string;
  reporter: string;
  cycle: number;
  killother?: boolean;
}
interface DownGossipMessage {
  report: SignedLostReport;
  status: string;
  cycle: number;
}
interface UpGossipMessage {
  target: string;
  status: string;
  cycle: number;
}
interface RemoveByAppMessage {
  target: string
  certificate: RemoveCertificate
}
export type RemoveCertificate = {
  nodePublicKey: string;
  certExp: number;
  cycle: number;
  signs?: Signature[];
  sign?: Signature;
}
export type SignedLostReport = LostReport & SignedObject;
export type SignedDownGossipMessage = DownGossipMessage & SignedObject;
export type SignedUpGossipMessage = UpGossipMessage & SignedObject;
export type SignedRemoveByAppMessage = RemoveByAppMessage & SignedObject;
export interface LostRecord {
  target: string;
  cycle: number;
  status: string; // reported, checking, down, up
  checker: string
  reporter: string

  //  message?: SignedLostReport & SignedDownGossipMessage & SignedUpGossipMessage
  message?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  gossiped?: boolean;
}

export interface RemoveByAppRecord {
  target: string;
  certificate: RemoveCertificate;
  gossiped?: boolean;
}

export interface Txs {
  lost: SignedDownGossipMessage[];
  refuted: SignedUpGossipMessage[];
  removedByApp: SignedRemoveByAppMessage[];
}

export interface Record {
  lost: string[];
  lostSyncing: string[];
  refuted: string[];
  appRemoved: string[];
}
