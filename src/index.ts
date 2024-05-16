import * as ActiveTypes_ from './p2p/ActiveTypes'
import * as ApoptosisTypes_ from './p2p/ApoptosisTypes'
import * as ArchiversTypes_ from './p2p/ArchiversTypes'
import * as CycleAutoScaleTypes_ from './p2p/CycleAutoScaleTypes'
import * as CycleChainTypes_ from './p2p/CycleChainTypes'
import * as CycleCreatorTypes_ from './p2p/CycleCreatorTypes'
import * as CycleParserTypes_ from './p2p/CycleParserTypes'
import * as GlobalAccountsTypes_ from './p2p/GlobalAccountsTypes'
import * as JoinTypes_ from './p2p/JoinTypes'
import * as LostTypes_ from './p2p/LostTypes'
import * as LostArchiverTypes_ from './p2p/LostArchiverTypes'
import * as NodeListTypes_ from './p2p/NodeListTypes'
import * as P2PTypes_ from './p2p/P2PTypes'
import * as RefreshTypes_ from './p2p/RefreshTypes'
import * as RotationTypes_ from './p2p/RotationTypes'
import * as SafetyModeTypes_ from './p2p/SafetyModeTypes'
import * as SnapshotTypes_ from './p2p/SnapshotTypes'
import * as SyncTypes_ from './p2p/SyncTypes'
import * as TemplateTypes_ from './p2p/TemplateTypes'
import * as shardFunctionTypes_ from './state-manager/shardFunctionTypes'
import * as StateManagerTypes_ from './state-manager/StateManagerTypes'
import * as StateMetaDataTypes_ from './state-manager/StateMetaDataTypes'
import * as ModesTypes_ from './p2p/ModesTypes'
import * as Utils_ from './utils/functions/stringify';

export type hexstring = string;
export type publicKey = hexstring;
export type secretKey = hexstring;
export type curvePublicKey = hexstring;
export type curveSecretKey = hexstring;
export type sharedKey = hexstring;

export namespace P2P {
  export import ActiveTypes = ActiveTypes_
  export import ApoptosisTypes = ApoptosisTypes_
  export import ArchiversTypes = ArchiversTypes_
  export import CycleAutoScaleTypes = CycleAutoScaleTypes_
  export import CycleChainTypes = CycleChainTypes_
  export import CycleCreatorTypes = CycleCreatorTypes_
  export import CycleParserTypes = CycleParserTypes_
  export import GlobalAccountsTypes = GlobalAccountsTypes_
  export import JoinTypes = JoinTypes_
  export import LostTypes = LostTypes_
  export import LostArchiverTypes = LostArchiverTypes_
  export import NodeListTypes = NodeListTypes_
  export import P2PTypes = P2PTypes_
  export import RefreshTypes = RefreshTypes_
  export import RotationTypes = RotationTypes_
  export import SafetyModeTypes = SafetyModeTypes_
  export import SnapshotTypes = SnapshotTypes_
  export import SyncTypes = SyncTypes_
  export import TemplateTypes = TemplateTypes_
  export import ModesTypes = ModesTypes_
}

export namespace StateManager {
  export import shardFunctionTypes = shardFunctionTypes_
  export import StateManagerTypes = StateManagerTypes_
  export import StateMetaDataTypes = StateMetaDataTypes_
}

export namespace Utils {
  export import safeStringify = Utils_.safeStringify;
  export import safeJsonParse = Utils_.safeJsonParse
  export import stringifyOptions = Utils_.stringifyOptions;
}
