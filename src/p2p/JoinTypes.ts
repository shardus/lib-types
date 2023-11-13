import { hexstring } from '..'
import * as CycleCreator from './CycleCreatorTypes'
import * as Types from './P2PTypes'

/**
 * [TODO] [AS] Remove nodes that are taking too long to sync after they've joined.
 * To do this, we probably need to keep track of when they first joined.
 */
/** TYPES */

export interface JoinedConsensor extends Types.P2PNode {
  cycleJoined: CycleCreator.CycleMarker
  counterRefreshed: CycleCreator.CycleRecord['counter']
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

export interface Txs {
  join: JoinRequest[]
}

export interface Record {
  syncing: number
  joinedConsensors: JoinedConsensor[]

  /** New nodes that others will add to their standby node lists once received. Optional for now until Join Protocol v2 is stabilized. */
  standbyAdd?: JoinRequest[]

  /** Public keys of nodes that others will remove from their standby node lists once received. Optional for now until Join Protocol v2 is stabilized. */
  standbyRemove?: hexstring[]
}
