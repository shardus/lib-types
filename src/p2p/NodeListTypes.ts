import { JoinedConsensor } from './JoinTypes'
import { NodeStatus } from './P2PTypes'

/** TYPES */
type Diff<T, U> = T extends U ? never : T
type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>
type RequiredExceptFor<T, TOptional extends keyof T> = Pick<T, Diff<keyof T, TOptional>> & Partial<T>

export interface Node extends JoinedConsensor {
  curvePublicKey: string
  status: NodeStatus
  refuteCycles?: number[]
}

export type Update = OptionalExceptFor<Node, 'id'>
