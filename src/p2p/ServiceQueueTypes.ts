import { SignedObject } from "./P2PTypes"

export interface Txs {
  txadd: AddNetworkTx[]
  txremove: RemoveNetworkTx[]
}

export interface AddNetworkTx<T = any> {
  hash: string
  type: string
  txData: T
  cycle: number // cycle the tx was added
  subQueueKey?: string
}

export interface RemoveNetworkTx {
  txHash: string
  cycle: number // cycle the tx was added
}

export type SignedAddNetworkTx = AddNetworkTx & SignedObject;
export type SignedRemoveNetworkTx = RemoveNetworkTx & SignedObject;

export interface NetworkTxEntry {
  hash: string
  tx: AddNetworkTx
}

export interface Record {
  txadd: AddNetworkTx[]
  txremove: RemoveNetworkTx[]
  txlisthash: string
}
