// eslint-disable-next-line node/no-unpublished-import
import {publicKey} from '..';
import {CycleMarker} from './CycleCreatorTypes';
import {SignedObject} from './P2PTypes';

export interface InvestigateArchiverTx {
  type: 'investigate';
  target: publicKey;
  investigator: publicKey;
  sender: publicKey;
  cycle: CycleMarker;
}

export interface ArchiverDownTx {
  type: 'down';
  investigateTx: InvestigateArchiverTx;
  cycle: CycleMarker;
}

export interface ArchiverUpTx {
  type: 'up';
  downTx: ArchiverDownTx;
  cycle: CycleMarker;
}

export type SignedInvestigateArchiverTx = InvestigateArchiverTx & SignedObject;
export type SignedArchiverDownTx = ArchiverDownTx & SignedObject;
export type SignedArchiverUpTx = ArchiverUpTx & SignedObject;

export interface Txs {
  lostArchivers: SignedArchiverDownTx[];
  refutedArchivers: SignedArchiverUpTx[];
}

export interface Record {
  lostArchivers: publicKey[];
  refutedArchivers: publicKey[];
  removedArchivers: publicKey[];
}
