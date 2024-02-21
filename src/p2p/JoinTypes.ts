import { hexstring } from '..'
import * as CycleCreator from './CycleCreatorTypes'
import * as Types from './P2PTypes'

/**
 * [TODO] [AS] Remove nodes that are taking too long to sync after they've joined.
 * To do this, we probably need to keep track of when they first joined.
 */
/** TYPES */

export interface SelectedConsensor extends Types.P2PNode {
  cycleJoined: CycleCreator.CycleMarker
  counterSelected: CycleCreator.CycleRecord['counter']
  id: string
}

export interface JoinRequest {
  nodeInfo: Types.P2PNode
  selectionNum: string
  cycleMarker: CycleCreator.CycleMarker
  proofOfWork: string
  version: string
  sign: Types.Signature
  appJoinData?: any //Required for golden ticket feature
}

export interface SyncStarted {
  nodeId: string //pub key of the standby node
  cycleNumber: number //a recent cycle
  sign?: Types.Signature //sig of standby node
}

export interface FinishedSyncingRequest {
  nodeId: string //id of the synced node
  cycleNumber: number //a recent cycle
  sign?: Types.Signature //sig of synced node
}

export interface KeepInStandby {
  publicKey: string //pub key of the standby node
  cycleNumber: number //a recent cycle
  sign?: Types.Signature //sig of standby node
}

export interface Txs {
  join: JoinRequest[]
}

export interface Record {
  syncing: number
  selectedConsensors: SelectedConsensor[]

  /** New nodes that others will add to their standby node lists once received. Optional for now until Join Protocol v2 is stabilized. */
  standbyAdd?: JoinRequest[]

  /** Public keys of nodes that others will remove from their standby node lists once received. Optional for now until Join Protocol v2 is stabilized. */
  standbyRemove?: hexstring[]

  startedSyncing?: hexstring[]

  lostAfterSelection?: hexstring[]

  /** Public keys of nodes that others will add to their ready nodes lists once received. */
  finishedSyncing?: hexstring[]
  /** Public keys of standby nodes that have refreshed their keep alive timer.  where do we put the keep aliver timer? */
  standbyRefresh?: hexstring[]
}
