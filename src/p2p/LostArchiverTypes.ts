// eslint-disable-next-line node/no-unpublished-import
import {publicKey} from '..';
import {CycleMarker} from './CycleCreatorTypes';
import {SignedObject} from './P2PTypes';

export interface InvestigateArchiverMsg {
  type: 'investigate';
  target: publicKey;
  investigator: publicKey;
  sender: publicKey;
  cycle: CycleMarker;
}

export interface ArchiverDownMsg {
  type: 'down';
  investigateMsg: InvestigateArchiverMsg;
  cycle: CycleMarker;
}

export interface ArchiverUpMsg {
  type: 'up';
  downMsg: ArchiverDownMsg;
  refuteMsg: SignedObject<ArchiverRefutesLostMsg>;
  cycle: CycleMarker;
}

export interface ArchiverRefutesLostMsg {
  archiver: publicKey;
  cycle: CycleMarker;
}

export interface Txs {
  lostArchivers: SignedObject<ArchiverDownMsg>[];
  refutedArchivers: SignedObject<ArchiverUpMsg>[];
}

export interface Record {
  lostArchivers: publicKey[];
  refutedArchivers: publicKey[];
  removedArchivers: publicKey[];
}
