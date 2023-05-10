import {ReceiptMap, SummaryBlob} from './StateManagerTypes';

export type CycleMarker = string;

export type StateData = {
  parentCycle?: CycleMarker;
  networkHash?: string;
  partitionHashes?: string[];
};

export type Receipt = {
  parentCycle?: CycleMarker;
  networkHash?: string;
  partitionHashes?: string[];
  partitionMaps?: {[partition: number]: ReceiptMap};
  partitionTxs?: {[partition: number]: any};
};

export type Summary = {
  parentCycle?: CycleMarker;
  networkHash?: string;
  partitionHashes?: string[];
  partitionBlobs?: {[partition: number]: SummaryBlob};
};
