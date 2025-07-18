import {
  ShardGlobals,
  ShardInfo,
  WrappableParitionRange,
  NodeShardData,
  AddressRange,
  HomeNodeSummary,
  ParititionShardDataMap,
  NodeShardDataMap,
  MergeResults,
  BasicAddressRange,
  CycleShardData,
} from '../../../src/state-manager/shardFunctionTypes'
import { Node } from '../../../src/p2p/NodeListTypes'
import { NodeStatus } from '../../../src/p2p/P2PTypes'

// Helper function to create a mock Node
function createMockNode(overrides: Partial<Node> = {}): Node {
  return {
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
    ...overrides,
  }
}

describe('shardFunctionTypes', () => {
  describe('Type exports', () => {
    it('should handle ShardGlobals structure', () => {
      const shardGlobals: ShardGlobals = {
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
      expect(shardGlobals.nodesPerConsenusGroup).toBe(10)
      expect(shardGlobals.numPartitions).toBe(16)
      expect(shardGlobals.numVisiblePartitions).toBe(8)
      expect(shardGlobals.consensusRadius).toBe(4)
      expect(shardGlobals.nodesPerEdge).toBe(2)
      expect(shardGlobals.nodeLookRange).toBe(1000)
      expect(shardGlobals.endAddr).toBe(4294967295)
    })

    it('should handle ShardInfo structure', () => {
      const mockNode = createMockNode()

      const shardInfo: ShardInfo = {
        address: 'a'.repeat(64),
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
          address123: mockNode,
        },
        storedBy: {
          address456: mockNode,
        },
      }
      expect(shardInfo.address).toHaveLength(64)
      expect(shardInfo.addressPrefix).toBe(42)
      expect(shardInfo.addressPrefixHex).toBe('2a')
      expect(shardInfo.homePartition).toBe(5)
      expect(shardInfo.homeRange.partition).toBe(5)
      expect(shardInfo.coveredBy['address123']).toBe(mockNode)
      expect(shardInfo.storedBy['address456']).toBe(mockNode)
    })

    it('should handle WrappableParitionRange structure', () => {
      const wrappableRange: WrappableParitionRange = {
        homeRange: {
          partition: 3,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: 'f'.repeat(64),
        },
        rangeIsSplit: false,
        partitionStart: 0,
        partitionEnd: 15,
        partitionStart1: 0,
        partitionEnd1: 7,
        partitionStart2: 8,
        partitionEnd2: 15,
        partitionRangeVector: {
          start: 0,
          dist: 15,
          end: 15,
        },
        x: 10,
        n: 3,
        partitionRange: {
          partition: 3,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: 'f'.repeat(64),
        },
        partitionRange2: {
          partition: 4,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 268435456,
          endAddr: 536870911,
          low: '1' + '0'.repeat(63),
          high: '1' + 'f'.repeat(63),
        },
        partitionsCovered: 16,
      }
      expect(wrappableRange.rangeIsSplit).toBe(false)
      expect(wrappableRange.partitionStart).toBe(0)
      expect(wrappableRange.partitionEnd).toBe(15)
      expect(wrappableRange.partitionRangeVector.start).toBe(0)
      expect(wrappableRange.partitionRangeVector.dist).toBe(15)
      expect(wrappableRange.partitionRangeVector.end).toBe(15)
      expect(wrappableRange.partitionsCovered).toBe(16)
    })

    it('should handle NodeShardData structure', () => {
      const mockNode = createMockNode({
        publicKey: 'pubKey789',
        externalIp: '192.168.1.2',
        externalPort: 8082,
        internalIp: '10.0.0.2',
        internalPort: 8083,
        address: 'address789',
        id: 'nodeId789',
      })

      const nodeShardData: NodeShardData = {
        node: mockNode,
        nodeAddressNum: 123456,
        homePartition: 7,
        centeredAddress: 654321,
        ourNodeIndex: 42,
        consensusStartPartition: 0,
        consensusEndPartition: 15,
        extendedData: true,
        needsUpdateToFullConsensusGroup: false,
        storedPartitions: {
          homeRange: {
            partition: 7,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 0,
            endAddr: 268435455,
            low: '0'.repeat(64),
            high: 'f'.repeat(64),
          },
          rangeIsSplit: false,
          partitionStart: 0,
          partitionEnd: 15,
          partitionStart1: 0,
          partitionEnd1: 7,
          partitionStart2: 8,
          partitionEnd2: 15,
          partitionRangeVector: {
            start: 0,
            dist: 15,
            end: 15,
          },
          partitionRange: {
            partition: 7,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 0,
            endAddr: 268435455,
            low: '0'.repeat(64),
            high: 'f'.repeat(64),
          },
          partitionRange2: {
            partition: 8,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 268435456,
            endAddr: 536870911,
            low: '1' + '0'.repeat(63),
            high: '1' + 'f'.repeat(63),
          },
        },
        consensusPartitions: {
          homeRange: {
            partition: 7,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 0,
            endAddr: 268435455,
            low: '0'.repeat(64),
            high: 'f'.repeat(64),
          },
          rangeIsSplit: false,
          partitionStart: 0,
          partitionEnd: 15,
          partitionStart1: 0,
          partitionEnd1: 7,
          partitionStart2: 8,
          partitionEnd2: 15,
          partitionRangeVector: {
            start: 0,
            dist: 15,
            end: 15,
          },
          partitionRange: {
            partition: 7,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 0,
            endAddr: 268435455,
            low: '0'.repeat(64),
            high: 'f'.repeat(64),
          },
          partitionRange2: {
            partition: 8,
            p_low: 0,
            p_high: 15,
            partitionEnd: 15,
            startAddr: 268435456,
            endAddr: 536870911,
            low: '1' + '0'.repeat(63),
            high: '1' + 'f'.repeat(63),
          },
        },
        nodeThatStoreOurParition: [mockNode],
        nodeThatStoreOurParitionFull: [mockNode],
        consensusNodeForOurNode: [mockNode],
        consensusNodeForOurNodeFull: [mockNode],
        edgeNodes: [mockNode],
        c2NodeForOurNode: [mockNode],
        outOfDefaultRangeNodes: [mockNode],
        patchedOnNodes: [mockNode],
      }
      expect(nodeShardData.node).toBe(mockNode)
      expect(nodeShardData.nodeAddressNum).toBe(123456)
      expect(nodeShardData.homePartition).toBe(7)
      expect(nodeShardData.centeredAddress).toBe(654321)
      expect(nodeShardData.ourNodeIndex).toBe(42)
      expect(nodeShardData.extendedData).toBe(true)
      expect(nodeShardData.needsUpdateToFullConsensusGroup).toBe(false)
      expect(nodeShardData.nodeThatStoreOurParition).toHaveLength(1)
      expect(nodeShardData.nodeThatStoreOurParition[0]).toBe(mockNode)
    })

    it('should handle AddressRange structure', () => {
      const addressRange: AddressRange = {
        partition: 10,
        p_low: 0,
        p_high: 15,
        partitionEnd: 15,
        startAddr: 2684354560,
        endAddr: 2952790015,
        low: 'a' + '0'.repeat(63),
        high: 'a' + 'f'.repeat(63),
      }
      expect(addressRange.partition).toBe(10)
      expect(addressRange.p_low).toBe(0)
      expect(addressRange.p_high).toBe(15)
      expect(addressRange.partitionEnd).toBe(15)
      expect(addressRange.startAddr).toBe(2684354560)
      expect(addressRange.endAddr).toBe(2952790015)
      expect(addressRange.low).toHaveLength(64)
      expect(addressRange.high).toHaveLength(64)
    })

    it('should handle BasicAddressRange structure', () => {
      const basicRange: BasicAddressRange = {
        startAddr: 0,
        endAddr: 4294967295,
        low: '0'.repeat(64),
        high: 'f'.repeat(64),
      }
      expect(basicRange.startAddr).toBe(0)
      expect(basicRange.endAddr).toBe(4294967295)
      expect(basicRange.low).toHaveLength(64)
      expect(basicRange.high).toHaveLength(64)
    })

    it('should handle HomeNodeSummary structure', () => {
      const homeNodeSummary: HomeNodeSummary = {
        edge: ['edge1', 'edge2'],
        consensus: ['consensus1', 'consensus2', 'consensus3'],
        storedFull: ['stored1', 'stored2', 'stored3', 'stored4'],
        noExtendedData: false,
      }
      expect(homeNodeSummary.edge).toHaveLength(2)
      expect(homeNodeSummary.consensus).toHaveLength(3)
      expect(homeNodeSummary.storedFull).toHaveLength(4)
      expect(homeNodeSummary.noExtendedData).toBe(false)
    })

    it('should handle MergeResults structure', () => {
      const mergeResults: MergeResults = {
        s1: 0,
        e1: 7,
        s2: 8,
        e2: 15,
        split: true,
        changed: true,
      }
      expect(mergeResults.s1).toBe(0)
      expect(mergeResults.e1).toBe(7)
      expect(mergeResults.s2).toBe(8)
      expect(mergeResults.e2).toBe(15)
      expect(mergeResults.split).toBe(true)
      expect(mergeResults.changed).toBe(true)
    })

    it('should handle ParititionShardDataMap type', () => {
      const mockShardInfo: ShardInfo = {
        address: 'b'.repeat(64),
        homeNodes: [],
        addressPrefix: 11,
        addressPrefixHex: 'b',
        homePartition: 11,
        homeRange: {
          partition: 11,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 2952790016,
          endAddr: 3221225471,
          low: 'b' + '0'.repeat(63),
          high: 'b' + 'f'.repeat(63),
        },
        coveredBy: {},
        storedBy: {},
      }

      const partitionMap: ParititionShardDataMap = new Map()
      partitionMap.set(11, mockShardInfo)
      expect(partitionMap.get(11)).toBe(mockShardInfo)
      expect(partitionMap.size).toBe(1)
    })

    it('should handle NodeShardDataMap type', () => {
      const mockNode = createMockNode({
        publicKey: 'pubKeyABC',
        externalIp: '192.168.1.3',
        externalPort: 8084,
        internalIp: '10.0.0.3',
        internalPort: 8085,
        address: 'addressABC',
        id: 'nodeIdABC',
      })

      const mockNodeShardData: NodeShardData = {
        node: mockNode,
        nodeAddressNum: 789012,
        homePartition: 12,
        centeredAddress: 210987,
        ourNodeIndex: 84,
        consensusStartPartition: 8,
        consensusEndPartition: 15,
        extendedData: false,
        needsUpdateToFullConsensusGroup: true,
        storedPartitions: {} as WrappableParitionRange,
        consensusPartitions: {} as WrappableParitionRange,
        nodeThatStoreOurParition: [],
        nodeThatStoreOurParitionFull: [],
        consensusNodeForOurNode: [],
        consensusNodeForOurNodeFull: [],
        edgeNodes: [],
        c2NodeForOurNode: [],
        outOfDefaultRangeNodes: [],
        patchedOnNodes: [],
      }

      const nodeShardMap: NodeShardDataMap = new Map()
      nodeShardMap.set('addressABC', mockNodeShardData)
      expect(nodeShardMap.get('addressABC')).toBe(mockNodeShardData)
      expect(nodeShardMap.size).toBe(1)
    })

    it('should handle CycleShardData structure', () => {
      const mockNode = createMockNode({
        publicKey: 'cycleNodePubKey',
        externalIp: '192.168.1.4',
        externalPort: 8086,
        internalIp: '10.0.0.4',
        internalPort: 8087,
        address: 'cycleNodeAddress',
        activeCycle: 100,
        id: 'cycleNodeId',
      })

      const cycleShardData: CycleShardData = {
        shardGlobals: {
          numActiveNodes: 100,
          nodesPerConsenusGroup: 10,
          numPartitions: 16,
          numVisiblePartitions: 8,
          consensusRadius: 4,
          nodesPerEdge: 2,
          nodeLookRange: 1000,
          endAddr: 4294967295,
        },
        cycleNumber: 100,
        ourNode: mockNode,
        nodeShardData: {
          node: mockNode,
          nodeAddressNum: 123456,
          homePartition: 7,
          centeredAddress: 654321,
          ourNodeIndex: 42,
          consensusStartPartition: 0,
          consensusEndPartition: 15,
          extendedData: true,
          needsUpdateToFullConsensusGroup: false,
          storedPartitions: {} as WrappableParitionRange,
          consensusPartitions: {} as WrappableParitionRange,
          nodeThatStoreOurParition: [],
          nodeThatStoreOurParitionFull: [],
          consensusNodeForOurNode: [],
          consensusNodeForOurNodeFull: [],
          edgeNodes: [],
          c2NodeForOurNode: [],
          outOfDefaultRangeNodes: [],
          patchedOnNodes: [],
        },
        nodeShardDataMap: new Map(),
        parititionShardDataMap: new Map(),
        nodes: [mockNode],
        syncingNeighbors: [],
        syncingNeighborsTxGroup: [],
        hasSyncingNeighbors: false,
        partitionsToSkip: new Map(),
        timestamp: 1234567890,
        timestampEndCycle: 1234567900,
        hasCompleteData: true,
        voters: [0, 1, 2, 3, 4],
        ourConsensusPartitions: [0, 1, 2, 3],
        ourStoredPartitions: [0, 1, 2, 3, 4, 5, 6, 7],
        calculationTime: 50,
      }

      expect(cycleShardData.cycleNumber).toBe(100)
      expect(cycleShardData.ourNode).toBe(mockNode)
      expect(cycleShardData.shardGlobals.numActiveNodes).toBe(100)
      expect(cycleShardData.nodes).toHaveLength(1)
      expect(cycleShardData.hasSyncingNeighbors).toBe(false)
      expect(cycleShardData.hasCompleteData).toBe(true)
      expect(cycleShardData.voters).toHaveLength(5)
      expect(cycleShardData.ourConsensusPartitions).toHaveLength(4)
      expect(cycleShardData.ourStoredPartitions).toHaveLength(8)
      expect(cycleShardData.calculationTime).toBe(50)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty arrays and maps in ShardInfo', () => {
      const shardInfo: ShardInfo = {
        address: '0'.repeat(64),
        homeNodes: [],
        addressPrefix: 0,
        addressPrefixHex: '0',
        homePartition: 0,
        homeRange: {
          partition: 0,
          p_low: 0,
          p_high: 0,
          partitionEnd: 0,
          startAddr: 0,
          endAddr: 0,
          low: '0'.repeat(64),
          high: '0'.repeat(64),
        },
        coveredBy: {},
        storedBy: {},
      }
      expect(shardInfo.homeNodes).toHaveLength(0)
      expect(Object.keys(shardInfo.coveredBy)).toHaveLength(0)
      expect(Object.keys(shardInfo.storedBy)).toHaveLength(0)
    })

    it('should handle maximum values in ShardGlobals', () => {
      const shardGlobals: ShardGlobals = {
        numActiveNodes: Number.MAX_SAFE_INTEGER,
        nodesPerConsenusGroup: Number.MAX_SAFE_INTEGER,
        numPartitions: Number.MAX_SAFE_INTEGER,
        numVisiblePartitions: Number.MAX_SAFE_INTEGER,
        consensusRadius: Number.MAX_SAFE_INTEGER,
        nodesPerEdge: Number.MAX_SAFE_INTEGER,
        nodeLookRange: Number.MAX_SAFE_INTEGER,
        endAddr: 4294967295, // Max 32-bit unsigned integer
      }
      expect(shardGlobals.numActiveNodes).toBe(Number.MAX_SAFE_INTEGER)
      expect(shardGlobals.endAddr).toBe(4294967295)
    })

    it('should handle optional fields in WrappableParitionRange', () => {
      const minimalRange: WrappableParitionRange = {
        homeRange: {
          partition: 0,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: 'f'.repeat(64),
        },
        rangeIsSplit: false,
        partitionStart: 0,
        partitionEnd: 15,
        partitionStart1: 0,
        partitionEnd1: 7,
        partitionStart2: 8,
        partitionEnd2: 15,
        partitionRangeVector: {
          start: 0,
          dist: 15,
          end: 15,
        },
        partitionRange: {
          partition: 0,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: 'f'.repeat(64),
        },
        partitionRange2: {
          partition: 1,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 268435456,
          endAddr: 536870911,
          low: '1' + '0'.repeat(63),
          high: '1' + 'f'.repeat(63),
        },
      }
      expect(minimalRange.x).toBeUndefined()
      expect(minimalRange.n).toBeUndefined()
      expect(minimalRange.partitionsCovered).toBeUndefined()
    })

    it('should handle split ranges in WrappableParitionRange', () => {
      const splitRange: WrappableParitionRange = {
        homeRange: {
          partition: 15,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 4026531840,
          endAddr: 4294967295,
          low: 'f' + '0'.repeat(63),
          high: 'f'.repeat(64),
        },
        rangeIsSplit: true,
        partitionStart: 14,
        partitionEnd: 1,
        partitionStart1: 14,
        partitionEnd1: 15,
        partitionStart2: 0,
        partitionEnd2: 1,
        partitionRangeVector: {
          start: 14,
          dist: 4,
          end: 1,
        },
        partitionRange: {
          partition: 15,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 4026531840,
          endAddr: 4294967295,
          low: 'f' + '0'.repeat(63),
          high: 'f'.repeat(64),
        },
        partitionRange2: {
          partition: 0,
          p_low: 0,
          p_high: 15,
          partitionEnd: 15,
          startAddr: 0,
          endAddr: 268435455,
          low: '0'.repeat(64),
          high: '0' + 'f'.repeat(63),
        },
      }
      expect(splitRange.rangeIsSplit).toBe(true)
      expect(splitRange.partitionStart1).toBe(14)
      expect(splitRange.partitionEnd1).toBe(15)
      expect(splitRange.partitionStart2).toBe(0)
      expect(splitRange.partitionEnd2).toBe(1)
    })

    it('should handle empty CycleShardData', () => {
      const mockNode = createMockNode({
        publicKey: 'emptyNodePubKey',
        externalIp: '0.0.0.0',
        externalPort: 0,
        internalIp: '0.0.0.0',
        internalPort: 0,
        address: 'emptyNodeAddress',
        joinRequestTimestamp: 0,
        activeTimestamp: 0,
        syncingTimestamp: 0,
        readyTimestamp: 0,
        refreshedCounter: 0,
        activeCycle: 0,
        id: 'emptyNodeId',
      })

      const emptyCycleData: CycleShardData = {
        shardGlobals: {
          numActiveNodes: 0,
          nodesPerConsenusGroup: 0,
          numPartitions: 0,
          numVisiblePartitions: 0,
          consensusRadius: 0,
          nodesPerEdge: 0,
          nodeLookRange: 0,
          endAddr: 0,
        },
        cycleNumber: 0,
        ourNode: mockNode,
        nodeShardData: {
          node: mockNode,
          nodeAddressNum: 0,
          homePartition: 0,
          centeredAddress: 0,
          ourNodeIndex: 0,
          consensusStartPartition: 0,
          consensusEndPartition: 0,
          extendedData: false,
          needsUpdateToFullConsensusGroup: false,
          storedPartitions: {} as WrappableParitionRange,
          consensusPartitions: {} as WrappableParitionRange,
          nodeThatStoreOurParition: [],
          nodeThatStoreOurParitionFull: [],
          consensusNodeForOurNode: [],
          consensusNodeForOurNodeFull: [],
          edgeNodes: [],
          c2NodeForOurNode: [],
          outOfDefaultRangeNodes: [],
          patchedOnNodes: [],
        },
        nodeShardDataMap: new Map(),
        parititionShardDataMap: new Map(),
        nodes: [],
        syncingNeighbors: [],
        syncingNeighborsTxGroup: [],
        hasSyncingNeighbors: false,
        partitionsToSkip: new Map(),
        timestamp: 0,
        timestampEndCycle: 0,
        hasCompleteData: false,
        voters: [],
        calculationTime: 0,
      }

      expect(emptyCycleData.nodes).toHaveLength(0)
      expect(emptyCycleData.voters).toHaveLength(0)
      expect(emptyCycleData.hasCompleteData).toBe(false)
      expect(emptyCycleData.ourConsensusPartitions).toBeUndefined()
      expect(emptyCycleData.ourStoredPartitions).toBeUndefined()
    })

    it('should handle large node arrays in NodeShardData', () => {
      const largeNodeArray = Array(1000)
        .fill(null)
        .map((_, index) =>
          createMockNode({
            publicKey: `pubKey${index}`,
            externalIp: `192.168.1.${index % 256}`,
            externalPort: 8000 + index,
            internalIp: `10.0.0.${index % 256}`,
            internalPort: 9000 + index,
            address: `address${index}`,
            joinRequestTimestamp: 1234567890 + index,
            activeTimestamp: 1234567900 + index,
            syncingTimestamp: 1234567895 + index,
            readyTimestamp: 1234567905 + index,
            refreshedCounter: index,
            activeCycle: index,
            id: `nodeId${index}`,
          })
        )

      const nodeShardData: NodeShardData = {
        node: largeNodeArray[0],
        nodeAddressNum: 123456,
        homePartition: 7,
        centeredAddress: 654321,
        ourNodeIndex: 42,
        consensusStartPartition: 0,
        consensusEndPartition: 15,
        extendedData: true,
        needsUpdateToFullConsensusGroup: false,
        storedPartitions: {} as WrappableParitionRange,
        consensusPartitions: {} as WrappableParitionRange,
        nodeThatStoreOurParition: largeNodeArray,
        nodeThatStoreOurParitionFull: largeNodeArray,
        consensusNodeForOurNode: largeNodeArray,
        consensusNodeForOurNodeFull: largeNodeArray,
        edgeNodes: largeNodeArray.slice(0, 10),
        c2NodeForOurNode: largeNodeArray.slice(0, 20),
        outOfDefaultRangeNodes: largeNodeArray.slice(0, 5),
        patchedOnNodes: largeNodeArray.slice(0, 3),
      }

      expect(nodeShardData.nodeThatStoreOurParition).toHaveLength(1000)
      expect(nodeShardData.edgeNodes).toHaveLength(10)
      expect(nodeShardData.c2NodeForOurNode).toHaveLength(20)
      expect(nodeShardData.outOfDefaultRangeNodes).toHaveLength(5)
      expect(nodeShardData.patchedOnNodes).toHaveLength(3)
    })
  })

  describe('Type compatibility', () => {
    it('should handle HomeNodeSummary without optional field', () => {
      const summary1: HomeNodeSummary = {
        edge: ['edge1'],
        consensus: ['consensus1'],
        storedFull: ['stored1'],
      }
      expect(summary1.noExtendedData).toBeUndefined()

      const summary2: HomeNodeSummary = {
        edge: [],
        consensus: [],
        storedFull: [],
        noExtendedData: true,
      }
      expect(summary2.noExtendedData).toBe(true)
    })

    it('should handle MergeResults false values', () => {
      const noMerge: MergeResults = {
        s1: 0,
        e1: 15,
        s2: 0,
        e2: 0,
        split: false,
        changed: false,
      }
      expect(noMerge.split).toBe(false)
      expect(noMerge.changed).toBe(false)
    })

    it('should ensure AddressRange and BasicAddressRange compatibility', () => {
      const basicRange: BasicAddressRange = {
        startAddr: 1000,
        endAddr: 2000,
        low: '1'.repeat(64),
        high: '2'.repeat(64),
      }

      // BasicAddressRange fields should be a subset of AddressRange
      const addressRange: AddressRange = {
        partition: 5,
        p_low: 0,
        p_high: 15,
        partitionEnd: 15,
        startAddr: basicRange.startAddr,
        endAddr: basicRange.endAddr,
        low: basicRange.low,
        high: basicRange.high,
      }

      expect(addressRange.startAddr).toBe(basicRange.startAddr)
      expect(addressRange.endAddr).toBe(basicRange.endAddr)
      expect(addressRange.low).toBe(basicRange.low)
      expect(addressRange.high).toBe(basicRange.high)
    })

    it('should handle different Map types correctly', () => {
      const partitionMap: ParititionShardDataMap = new Map()
      const nodeMap: NodeShardDataMap = new Map()

      // Verify they are distinct types
      expect(partitionMap).toBeInstanceOf(Map)
      expect(nodeMap).toBeInstanceOf(Map)

      // Test adding multiple entries
      for (let i = 0; i < 16; i++) {
        partitionMap.set(i, {
          address: i.toString(16).padStart(64, '0'),
          homeNodes: [],
          addressPrefix: i,
          addressPrefixHex: i.toString(16),
          homePartition: i,
          homeRange: {} as AddressRange,
          coveredBy: {},
          storedBy: {},
        })
      }

      expect(partitionMap.size).toBe(16)
    })
  })
})
