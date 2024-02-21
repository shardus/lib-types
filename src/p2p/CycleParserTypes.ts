import { SelectedConsensor } from './JoinTypes'
import { Node, Update } from './NodeListTypes'

export interface Change {
  added: SelectedConsensor[] // order joinRequestTimestamp [OLD, ..., NEW]
  removed: Array<Node['id']> // order doesn't matter
  updated: Update[] // order doesn't matter
}
