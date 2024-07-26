export type LooseObject = Record<string, unknown>

export interface Signature {
  owner: string
  sig: string
}

/** A `T` signed with a signature `sign`. */
export type SignedObject<T = LooseObject> = T & { sign: Signature }

export enum NodeStatus {
  INITIALIZING = 'initializing',
  STANDBY = 'standby',
  SELECTED = 'selected',
  SYNCING = 'syncing',
  READY = 'ready',
  ACTIVE = 'active',
}

export interface P2PNode {
  publicKey: string
  externalIp: string
  externalPort: number
  internalIp: string
  internalPort: number
  address: string
  joinRequestTimestamp: number
  activeTimestamp: number
  activeCycle: number
  syncingTimestamp: number
  readyTimestamp: number
  refreshedCounter?: number
}

export interface Node {
  ip: string
  port: number
  publicKey: string
}

export interface NodeInfo {
  curvePublicKey: string
  externalIp: string
  externalPort: number
  id: string
  internalIp: string
  internalPort: number
  publicKey: string
  status: NodeStatus
}

export interface Route<T> {
  method?: string
  name: string
  handler: T
}

export type InternalHandler<
  Payload = unknown,
  Response = unknown,
  Sender = unknown
> = (
  payload: Payload,
  respond: (response?: Response) => void,
  sender: Sender,
  tracker: string,
  msgSize: number,
) => void

export type GossipHandler<Payload = unknown, Sender = unknown> = (
  payload: Payload,
  sender: Sender,
  tracker: string,
  msgSize: number,
) => void
