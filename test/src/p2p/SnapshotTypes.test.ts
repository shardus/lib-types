import {
  TypeNames,
  offerResponse,
  StateMetaData,
  ValidTypes,
  NamesToTypes,
  TypeName,
  TypeIndex,
  NetworkHash,
  StateHashes,
  ReceiptHashes,
  SummaryHashes,
  Record,
  PartitionRanges,
  PartitionHashes,
  ReceiptMapHashes,
  NetworkStateHash,
  NetworkReceiptHash,
  NetworkSummarytHash,
  PartitionNum,
} from '../../../src/p2p/SnapshotTypes'
import { CycleRecord } from '../../../src/p2p/CycleCreatorTypes'

describe('SnapshotTypes', () => {
  describe('TypeNames enum', () => {
    it('should have correct values for all type names', () => {
      expect(TypeNames.CYCLE).toBe('CYCLE')
      expect(TypeNames.STATE_METADATA).toBe('STATE_METADATA')
    })

    it('should have all expected type name keys', () => {
      const expectedKeys = ['CYCLE', 'STATE_METADATA']
      const actualKeys = Object.keys(TypeNames)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('should have all expected type name values', () => {
      const expectedValues = ['CYCLE', 'STATE_METADATA']
      const actualValues = Object.values(TypeNames)
      expect(actualValues).toEqual(expectedValues)
    })
  })

  describe('offerResponse enum', () => {
    it('should have correct values for all offer responses', () => {
      expect(offerResponse.needed).toBe('needed')
      expect(offerResponse.notNeeded).toBe('not_needed')
      expect(offerResponse.tryLater).toBe('try_later')
      expect(offerResponse.sendTo).toBe('send_to')
    })

    it('should have all expected offer response keys', () => {
      const expectedKeys = ['needed', 'notNeeded', 'tryLater', 'sendTo']
      const actualKeys = Object.keys(offerResponse)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('should have all expected offer response values', () => {
      const expectedValues = ['needed', 'not_needed', 'try_later', 'send_to']
      const actualValues = Object.values(offerResponse)
      expect(actualValues).toEqual(expectedValues)
    })
  })

  describe('Type exports', () => {
    it('should handle StateMetaData structure', () => {
      const metadata: StateMetaData = {
        counter: 1,
        stateHashes: [],
        receiptHashes: [],
        summaryHashes: [],
      }
      expect(metadata.counter).toBe(1)
      expect(Array.isArray(metadata.stateHashes)).toBe(true)
      expect(Array.isArray(metadata.receiptHashes)).toBe(true)
      expect(Array.isArray(metadata.summaryHashes)).toBe(true)
    })

    it('should handle NetworkHash structure', () => {
      const networkHash: NetworkHash = {
        cycle: 10,
        hash: 'hash123abc',
      }
      expect(networkHash.cycle).toBe(10)
      expect(networkHash.hash).toBe('hash123abc')
    })

    it('should handle StateHashes structure', () => {
      const stateHashes: StateHashes = {
        counter: 1,
        partitionHashes: { partition1: 'hash1', partition2: 'hash2' },
        networkHash: 'networkHash123',
      }
      expect(stateHashes.counter).toBe(1)
      expect(stateHashes.partitionHashes).toEqual({ partition1: 'hash1', partition2: 'hash2' })
      expect(stateHashes.networkHash).toBe('networkHash123')
    })

    it('should handle ReceiptHashes structure', () => {
      const receiptHashes: ReceiptHashes = {
        counter: 2,
        receiptMapHashes: { receipt1: 'hash1', receipt2: 'hash2' },
        networkReceiptHash: 'networkReceiptHash456',
      }
      expect(receiptHashes.counter).toBe(2)
      expect(receiptHashes.receiptMapHashes).toEqual({ receipt1: 'hash1', receipt2: 'hash2' })
      expect(receiptHashes.networkReceiptHash).toBe('networkReceiptHash456')
    })

    it('should handle SummaryHashes structure', () => {
      const summaryHashes: SummaryHashes = {
        counter: 3,
        summaryHashes: { summary1: 'hash1', summary2: 'hash2' },
        networkSummaryHash: 'networkSummaryHash789',
      }
      expect(summaryHashes.counter).toBe(3)
      expect(summaryHashes.summaryHashes).toEqual({ summary1: 'hash1', summary2: 'hash2' })
      expect(summaryHashes.networkSummaryHash).toBe('networkSummaryHash789')
    })

    it('should handle Record structure', () => {
      const record: Record = {
        networkDataHash: [{ cycle: 1, hash: 'dataHash1' }],
        networkReceiptHash: [{ cycle: 2, hash: 'receiptHash1' }],
        networkSummaryHash: [{ cycle: 3, hash: 'summaryHash1' }],
      }
      expect(record.networkDataHash).toHaveLength(1)
      expect(record.networkReceiptHash).toHaveLength(1)
      expect(record.networkSummaryHash).toHaveLength(1)
      expect(record.networkDataHash[0].cycle).toBe(1)
      expect(record.networkReceiptHash[0].cycle).toBe(2)
      expect(record.networkSummaryHash[0].cycle).toBe(3)
    })
  })

  describe('Type aliases', () => {
    it('should handle NetworkStateHash as string', () => {
      const hash: NetworkStateHash = 'stateHash123'
      expect(typeof hash).toBe('string')
      expect(hash).toBe('stateHash123')
    })

    it('should handle NetworkReceiptHash as string', () => {
      const hash: NetworkReceiptHash = 'receiptHash456'
      expect(typeof hash).toBe('string')
      expect(hash).toBe('receiptHash456')
    })

    it('should handle NetworkSummarytHash as string', () => {
      const hash: NetworkSummarytHash = 'summaryHash789'
      expect(typeof hash).toBe('string')
      expect(hash).toBe('summaryHash789')
    })

    it('should handle PartitionNum as number', () => {
      const partitionNum: PartitionNum = 42
      expect(typeof partitionNum).toBe('number')
      expect(partitionNum).toBe(42)
    })
  })

  describe('Map types', () => {
    it('should handle PartitionHashes as Map', () => {
      const partitionHashes: PartitionHashes = new Map()
      partitionHashes.set(1, 'hash1')
      partitionHashes.set(2, 'hash2')
      expect(partitionHashes.get(1)).toBe('hash1')
      expect(partitionHashes.get(2)).toBe('hash2')
      expect(partitionHashes.size).toBe(2)
    })

    it('should handle ReceiptMapHashes as Map', () => {
      const receiptMapHashes: ReceiptMapHashes = new Map()
      receiptMapHashes.set(10, 'receiptHash10')
      receiptMapHashes.set(20, 'receiptHash20')
      expect(receiptMapHashes.get(10)).toBe('receiptHash10')
      expect(receiptMapHashes.get(20)).toBe('receiptHash20')
      expect(receiptMapHashes.size).toBe(2)
    })
  })

  describe('Union types', () => {
    it('should handle ValidTypes union with CycleRecord', () => {
      const cycleRecord: ValidTypes = {
        counter: 1,
        mode: 'processing',
        active: 0,
        apoptosized: [],
        appRemoved: [],
        activated: [],
        activatedPublicKeys: [],
        desired: 10,
        joined: [],
        joinedArchivers: [],
        joinedConsensors: [],
        lost: [],
        lostArchivers: [],
        lostSyncing: [],
        previous: '',
        refreshedArchivers: [],
        refreshedConsensors: [],
        refuted: [],
        removed: [],
        returned: [],
        networkConfigHash: '',
        networkId: '',
        start: 1000,
        duration: 60,
        safetyMode: false,
        safetyNum: 0,
        networkStateHash: '',
        nodeListHash: '',
        archiverListHash: '',
        standbyNodeListHash: '',
        random: 0,
        leavingArchivers: [],
        archiversAtShutdown: [],
        maxSyncTime: 0,
        syncing: 0,
        standby: 0,
      } as CycleRecord
      expect(cycleRecord.counter).toBe(1)
    })

    it('should handle ValidTypes union with StateMetaData', () => {
      const stateMetaData: ValidTypes = {
        counter: 2,
        stateHashes: [],
        receiptHashes: [],
        summaryHashes: [],
      } as StateMetaData
      expect(stateMetaData.counter).toBe(2)
    })
  })
})
