import * as LibTypes from '../../src/index'
import { NodeStatus } from '../../src/p2p/P2PTypes'

describe('index.ts exports', () => {
  describe('Type aliases', () => {
    it('should export hexstring type', () => {
      const hex: LibTypes.hexstring = 'abc123def456'
      expect(typeof hex).toBe('string')
    })

    it('should export publicKey type', () => {
      const pubKey: LibTypes.publicKey = '0'.repeat(64)
      expect(typeof pubKey).toBe('string')
      expect(pubKey).toHaveLength(64)
    })

    it('should export secretKey type', () => {
      const secKey: LibTypes.secretKey = 'f'.repeat(128)
      expect(typeof secKey).toBe('string')
      expect(secKey).toHaveLength(128)
    })

    it('should export curvePublicKey type', () => {
      const curvePubKey: LibTypes.curvePublicKey = 'a'.repeat(64)
      expect(typeof curvePubKey).toBe('string')
    })

    it('should export curveSecretKey type', () => {
      const curveSecKey: LibTypes.curveSecretKey = 'b'.repeat(64)
      expect(typeof curveSecKey).toBe('string')
    })

    it('should export sharedKey type', () => {
      const shared: LibTypes.sharedKey = 'c'.repeat(64)
      expect(typeof shared).toBe('string')
    })
  })

  describe('P2P namespace', () => {
    it('should export P2P namespace', () => {
      expect(LibTypes.P2P).toBeDefined()
    })

    it('should export ActiveTypes in P2P namespace', () => {
      expect(LibTypes.P2P.ActiveTypes).toBeDefined()
      // Test that we can access a type from ActiveTypes
      const activeRequest: LibTypes.P2P.ActiveTypes.ActiveRequest = {
        nodeId: 'test',
        status: 'active',
        timestamp: Date.now(),
      }
      expect(activeRequest).toBeDefined()
    })

    it('should export ApoptosisTypes in P2P namespace', () => {
      expect(LibTypes.P2P.ApoptosisTypes).toBeDefined()
    })

    it('should export ArchiversTypes in P2P namespace', () => {
      expect(LibTypes.P2P.ArchiversTypes).toBeDefined()
    })

    it('should export CycleAutoScaleTypes in P2P namespace', () => {
      expect(LibTypes.P2P.CycleAutoScaleTypes).toBeDefined()
    })

    it('should export CycleChainTypes in P2P namespace', () => {
      expect(LibTypes.P2P.CycleChainTypes).toBeDefined()
    })

    it('should export CycleCreatorTypes in P2P namespace', () => {
      expect(LibTypes.P2P.CycleCreatorTypes).toBeDefined()
    })

    it('should export CycleParserTypes in P2P namespace', () => {
      expect(LibTypes.P2P.CycleParserTypes).toBeDefined()
    })

    it('should export GlobalAccountsTypes in P2P namespace', () => {
      expect(LibTypes.P2P.GlobalAccountsTypes).toBeDefined()
    })

    it('should export JoinTypes in P2P namespace', () => {
      expect(LibTypes.P2P.JoinTypes).toBeDefined()
    })

    it('should export LostTypes in P2P namespace', () => {
      expect(LibTypes.P2P.LostTypes).toBeDefined()
    })

    it('should export LostArchiverTypes in P2P namespace', () => {
      expect(LibTypes.P2P.LostArchiverTypes).toBeDefined()
    })

    it('should export NodeListTypes in P2P namespace', () => {
      expect(LibTypes.P2P.NodeListTypes).toBeDefined()
      // Test that we can access a type from NodeListTypes
      const node: LibTypes.P2P.NodeListTypes.Node = {
        publicKey: 'pubKey123',
        externalIp: '192.168.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 8081,
        address: 'address123',
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567900,
        syncingTimestamp: 1234567895,
        readyTimestamp: 1234567905,
        refreshedCounter: 0,
        activeCycle: 1,
        cycleJoined: 'Q1-2023',
        counterRefreshed: 1,
        id: 'nodeId123',
        curvePublicKey: 'curvePubKey123',
        status: NodeStatus.ACTIVE,
      }
      expect(node.publicKey).toBe('pubKey123')
    })

    it('should export P2PTypes in P2P namespace', () => {
      expect(LibTypes.P2P.P2PTypes).toBeDefined()
    })

    it('should export RefreshTypes in P2P namespace', () => {
      expect(LibTypes.P2P.RefreshTypes).toBeDefined()
    })

    it('should export RotationTypes in P2P namespace', () => {
      expect(LibTypes.P2P.RotationTypes).toBeDefined()
    })

    it('should export SafetyModeTypes in P2P namespace', () => {
      expect(LibTypes.P2P.SafetyModeTypes).toBeDefined()
    })

    it('should export SnapshotTypes in P2P namespace', () => {
      expect(LibTypes.P2P.SnapshotTypes).toBeDefined()
    })

    it('should export SyncTypes in P2P namespace', () => {
      expect(LibTypes.P2P.SyncTypes).toBeDefined()
    })

    it('should export TemplateTypes in P2P namespace', () => {
      expect(LibTypes.P2P.TemplateTypes).toBeDefined()
    })

    it('should export ModesTypes in P2P namespace', () => {
      expect(LibTypes.P2P.ModesTypes).toBeDefined()
    })

    it('should export ServiceQueueTypes in P2P namespace', () => {
      expect(LibTypes.P2P.ServiceQueueTypes).toBeDefined()
    })
  })

  describe('StateManager namespace', () => {
    it('should export StateManager namespace', () => {
      expect(LibTypes.StateManager).toBeDefined()
    })

    it('should export shardFunctionTypes in StateManager namespace', () => {
      expect(LibTypes.StateManager.shardFunctionTypes).toBeDefined()
      // Test that we can access a type from shardFunctionTypes
      const shardGlobals: LibTypes.StateManager.shardFunctionTypes.ShardGlobals = {
        numActiveNodes: 100,
        nodesPerConsenusGroup: 10,
        numPartitions: 16,
        numVisiblePartitions: 8,
        consensusRadius: 4,
        nodesPerEdge: 2,
        nodeLookRange: 1000,
        endAddr: 4294967295,
      }
      expect(shardGlobals.numActiveNodes).toBe(100)
    })

    it('should export StateManagerTypes in StateManager namespace', () => {
      expect(LibTypes.StateManager.StateManagerTypes).toBeDefined()
    })

    it('should export StateMetaDataTypes in StateManager namespace', () => {
      expect(LibTypes.StateManager.StateMetaDataTypes).toBeDefined()
    })
  })

  describe('Utils namespace', () => {
    it('should export Utils namespace', () => {
      expect(LibTypes.Utils).toBeDefined()
    })

    it('should export safeStringify function', () => {
      expect(LibTypes.Utils.safeStringify).toBeDefined()
      expect(typeof LibTypes.Utils.safeStringify).toBe('function')
      
      // Test the function works
      const obj = { test: 'value', number: 123 }
      const result = LibTypes.Utils.safeStringify(obj)
      const parsed = JSON.parse(result)
      expect(parsed).toEqual(obj)
    })

    it('should export safeJsonParse function', () => {
      expect(LibTypes.Utils.safeJsonParse).toBeDefined()
      expect(typeof LibTypes.Utils.safeJsonParse).toBe('function')
      
      // Test the function works
      const json = '{"test":"value","number":123}'
      const result = LibTypes.Utils.safeJsonParse(json)
      expect(result).toEqual({ test: 'value', number: 123 })
    })

    it('should export typeReviver function', () => {
      expect(LibTypes.Utils.typeReviver).toBeDefined()
      expect(typeof LibTypes.Utils.typeReviver).toBe('function')
    })

    it('should export stringifyOptions type', () => {
      // Test that we can use the type
      const options: LibTypes.Utils.stringifyOptions = {
        bufferEncoding: 'base64'
      }
      expect(options.bufferEncoding).toBe('base64')
    })
  })

  describe('Integration tests', () => {
    it('should handle cross-namespace type usage', () => {
      // Test using types from different namespaces together
      const node: LibTypes.P2P.NodeListTypes.Node = {
        publicKey: 'testPubKey' as LibTypes.publicKey,
        externalIp: '192.168.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 8081,
        address: 'testAddress' as LibTypes.hexstring,
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567900,
        syncingTimestamp: 1234567895,
        readyTimestamp: 1234567905,
        refreshedCounter: 0,
        activeCycle: 1,
        cycleJoined: 'Q1-2023',
        counterRefreshed: 1,
        id: 'testNodeId',
        curvePublicKey: 'testCurvePubKey',
        status: NodeStatus.ACTIVE,
      }

      const shardInfo: LibTypes.StateManager.shardFunctionTypes.ShardInfo = {
        address: 'a'.repeat(64) as LibTypes.hexstring,
        homeNodes: [],
        addressPrefix: 42,
        addressPrefixHex: '2a',
        homePartition: 5,
        homeRange: {
          partition: 5,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: 'f'.repeat(64),
        },
        coveredBy: {
          [node.address]: node,
        },
        storedBy: {},
      }

      expect(shardInfo.coveredBy[node.address]).toBe(node)
    })

    it('should handle stringify and parse round-trip with library types', () => {
      const complexObject = {
        publicKey: 'abc123' as LibTypes.publicKey,
        bigNumber: BigInt(123456789),
        buffer: Buffer.from('test data'),
        nested: {
          secretKey: 'def456' as LibTypes.secretKey,
          array: [1, 2, 3],
        },
      }

      const stringified = LibTypes.Utils.safeStringify(complexObject)
      const parsed = LibTypes.Utils.safeJsonParse(stringified)

      expect(parsed.publicKey).toBe(complexObject.publicKey)
      expect(parsed.bigNumber).toEqual(complexObject.bigNumber)
      expect(parsed.buffer).toEqual(complexObject.buffer)
      expect(parsed.nested.secretKey).toBe(complexObject.nested.secretKey)
      expect(parsed.nested.array).toEqual(complexObject.nested.array)
    })
  })

  describe('Export verification', () => {
    it('should not have undefined exports', () => {
      // Check that all namespace exports are defined
      const p2pExports = [
        'ActiveTypes', 'ApoptosisTypes', 'ArchiversTypes', 'CycleAutoScaleTypes',
        'CycleChainTypes', 'CycleCreatorTypes', 'CycleParserTypes', 'GlobalAccountsTypes',
        'JoinTypes', 'LostTypes', 'LostArchiverTypes', 'NodeListTypes', 'P2PTypes',
        'RefreshTypes', 'RotationTypes', 'SafetyModeTypes', 'SnapshotTypes',
        'SyncTypes', 'TemplateTypes', 'ModesTypes', 'ServiceQueueTypes'
      ]

      p2pExports.forEach(exportName => {
        expect(LibTypes.P2P[exportName]).toBeDefined()
      })

      const stateManagerExports = ['shardFunctionTypes', 'StateManagerTypes', 'StateMetaDataTypes']
      stateManagerExports.forEach(exportName => {
        expect(LibTypes.StateManager[exportName]).toBeDefined()
      })

      const utilsExports = ['safeStringify', 'safeJsonParse', 'typeReviver']
      utilsExports.forEach(exportName => {
        expect(LibTypes.Utils[exportName]).toBeDefined()
      })
    })
  })
})