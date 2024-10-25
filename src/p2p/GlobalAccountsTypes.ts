import { NodeInfo, Signature, SignedObject } from './P2PTypes'

/** TYPES */

export interface SetGlobalTx {
  address: string
  addressHash: string // the current state hash of the address
  value: unknown
  when: number
  source: string
}

export interface Receipt {
  signs: Signature[]
  tx: SetGlobalTx
  consensusGroup: Set<NodeInfo['id']>
}

export interface Tracker {
  seen: Set<NodeInfo['publicKey']>
  timestamp: number
  gossiped: boolean
}

export type TxHash = string

export type SignedSetGlobalTx = SetGlobalTx & SignedObject

export type GlobalTxReceipt = Omit<Receipt, 'consensusGroup'>