import {
  ReceiptMap,
  ReceiptMapResult,
  OpaqueBlob,
  SummaryBlob,
  SummaryBlobCollection,
  StatsClump,
} from '../../../src/state-manager/StateManagerTypes'

describe('StateManagerTypes', () => {
  describe('ReceiptMap', () => {
    it('should handle empty receipt map', () => {
      const receiptMap: ReceiptMap = {}
      expect(receiptMap).toEqual({})
    })

    it('should handle receipt map with single transaction', () => {
      const receiptMap: ReceiptMap = {
        tx123: ['receipt1', 'receipt2'],
      }
      expect(receiptMap.tx123).toEqual(['receipt1', 'receipt2'])
    })

    it('should handle receipt map with multiple transactions', () => {
      const receiptMap: ReceiptMap = {
        tx123: ['receipt1'],
        tx456: ['receipt2', 'receipt3'],
        tx789: [],
      }
      expect(Object.keys(receiptMap)).toHaveLength(3)
      expect(receiptMap.tx789).toEqual([])
    })
  })

  describe('ReceiptMapResult', () => {
    it('should create valid ReceiptMapResult with minimal data', () => {
      const result: ReceiptMapResult = {
        cycle: 1,
        partition: 0,
        receiptMap: {},
        txCount: 0,
        txsMap: {},
        txsMapEVMReceipt: {},
      }
      expect(result.cycle).toBe(1)
      expect(result.partition).toBe(0)
      expect(result.txCount).toBe(0)
    })

    it('should handle ReceiptMapResult with data', () => {
      const result: ReceiptMapResult = {
        cycle: 100,
        partition: 5,
        receiptMap: {
          tx1: ['r1', 'r2'],
          tx2: ['r3'],
        },
        txCount: 2,
        txsMap: {
          id1: [{ data: 'test1' }],
          id2: [{ data: 'test2' }, { data: 'test3' }],
        },
        txsMapEVMReceipt: {
          evmTx1: { status: 'success', gasUsed: 21000 },
        },
      }
      expect(result.cycle).toBe(100)
      expect(result.partition).toBe(5)
      expect(result.txCount).toBe(2)
      expect(Object.keys(result.receiptMap)).toHaveLength(2)
    })

    it('should handle edge cases for numeric values', () => {
      const result: ReceiptMapResult = {
        cycle: Number.MAX_SAFE_INTEGER,
        partition: 0,
        receiptMap: {},
        txCount: Number.MAX_SAFE_INTEGER,
        txsMap: {},
        txsMapEVMReceipt: {},
      }
      expect(result.cycle).toBe(Number.MAX_SAFE_INTEGER)
      expect(result.txCount).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('OpaqueBlob', () => {
    it('should accept any type as OpaqueBlob', () => {
      const blob1: OpaqueBlob = { custom: 'data' }
      const blob2: OpaqueBlob = ['array', 'data']
      const blob3: OpaqueBlob = 'string data'
      const blob4: OpaqueBlob = 12345
      const blob5: OpaqueBlob = null
      const blob6: OpaqueBlob = undefined

      expect(blob1).toEqual({ custom: 'data' })
      expect(blob2).toEqual(['array', 'data'])
      expect(blob3).toBe('string data')
      expect(blob4).toBe(12345)
      expect(blob5).toBeNull()
      expect(blob6).toBeUndefined()
    })
  })

  describe('SummaryBlob', () => {
    it('should create valid SummaryBlob with minimal data', () => {
      const blob: SummaryBlob = {
        latestCycle: 1,
        counter: 0,
        errorNull: 0,
        partition: 0,
        opaqueBlob: null,
      }
      expect(blob.latestCycle).toBe(1)
      expect(blob.counter).toBe(0)
      expect(blob.errorNull).toBe(0)
      expect(blob.partition).toBe(0)
      expect(blob.opaqueBlob).toBeNull()
    })

    it('should handle SummaryBlob with complex opaqueBlob', () => {
      const complexData = {
        accounts: ['acc1', 'acc2'],
        transactions: { count: 100, processed: 95 },
        metadata: { timestamp: Date.now() },
      }

      const blob: SummaryBlob = {
        latestCycle: 500,
        counter: 42,
        errorNull: 3,
        partition: 7,
        opaqueBlob: complexData,
      }

      expect(blob.latestCycle).toBe(500)
      expect(blob.counter).toBe(42)
      expect(blob.errorNull).toBe(3)
      expect(blob.partition).toBe(7)
      expect(blob.opaqueBlob).toEqual(complexData)
    })

    it('should handle negative values', () => {
      const blob: SummaryBlob = {
        latestCycle: -1,
        counter: -100,
        errorNull: -5,
        partition: -3,
        opaqueBlob: 'negative test',
      }
      expect(blob.latestCycle).toBe(-1)
      expect(blob.counter).toBe(-100)
      expect(blob.errorNull).toBe(-5)
      expect(blob.partition).toBe(-3)
    })
  })

  describe('SummaryBlobCollection', () => {
    it('should create empty SummaryBlobCollection', () => {
      const collection: SummaryBlobCollection = {
        cycle: 1,
        blobsByPartition: new Map(),
      }
      expect(collection.cycle).toBe(1)
      expect(collection.blobsByPartition.size).toBe(0)
    })

    it('should handle SummaryBlobCollection with multiple blobs', () => {
      const blob1: SummaryBlob = {
        latestCycle: 10,
        counter: 1,
        errorNull: 0,
        partition: 0,
        opaqueBlob: { data: 'partition0' },
      }

      const blob2: SummaryBlob = {
        latestCycle: 10,
        counter: 2,
        errorNull: 0,
        partition: 1,
        opaqueBlob: { data: 'partition1' },
      }

      const collection: SummaryBlobCollection = {
        cycle: 10,
        blobsByPartition: new Map([
          [0, blob1],
          [1, blob2],
        ]),
      }

      expect(collection.cycle).toBe(10)
      expect(collection.blobsByPartition.size).toBe(2)
      expect(collection.blobsByPartition.get(0)).toEqual(blob1)
      expect(collection.blobsByPartition.get(1)).toEqual(blob2)
    })

    it('should handle large partition numbers', () => {
      const blob: SummaryBlob = {
        latestCycle: 1000,
        counter: 1,
        errorNull: 0,
        partition: 9999,
        opaqueBlob: {},
      }

      const collection: SummaryBlobCollection = {
        cycle: 1000,
        blobsByPartition: new Map([[9999, blob]]),
      }

      expect(collection.blobsByPartition.get(9999)).toEqual(blob)
    })
  })

  describe('StatsClump', () => {
    it('should create valid StatsClump with error state', () => {
      const stats: StatsClump = {
        error: true,
        cycle: 1,
        dataStats: [],
        txStats: [],
        covered: [],
        coveredParititionCount: 0,
        skippedParitionCount: 0,
      }
      expect(stats.error).toBe(true)
      expect(stats.dataStats).toEqual([])
      expect(stats.txStats).toEqual([])
    })

    it('should handle StatsClump with full data', () => {
      const dataBlob: SummaryBlob = {
        latestCycle: 50,
        counter: 100,
        errorNull: 0,
        partition: 1,
        opaqueBlob: { type: 'data' },
      }

      const txBlob: SummaryBlob = {
        latestCycle: 50,
        counter: 200,
        errorNull: 1,
        partition: 2,
        opaqueBlob: { type: 'tx' },
      }

      const stats: StatsClump = {
        error: false,
        cycle: 50,
        dataStats: [dataBlob],
        txStats: [txBlob],
        covered: [0, 1, 2, 3],
        coveredParititionCount: 4,
        skippedParitionCount: 2,
      }

      expect(stats.error).toBe(false)
      expect(stats.cycle).toBe(50)
      expect(stats.dataStats).toHaveLength(1)
      expect(stats.txStats).toHaveLength(1)
      expect(stats.covered).toEqual([0, 1, 2, 3])
      expect(stats.coveredParititionCount).toBe(4)
      expect(stats.skippedParitionCount).toBe(2)
    })

    it('should handle empty arrays and zero counts', () => {
      const stats: StatsClump = {
        error: false,
        cycle: 0,
        dataStats: [],
        txStats: [],
        covered: [],
        coveredParititionCount: 0,
        skippedParitionCount: 0,
      }

      expect(stats.cycle).toBe(0)
      expect(stats.dataStats).toEqual([])
      expect(stats.txStats).toEqual([])
      expect(stats.covered).toEqual([])
      expect(stats.coveredParititionCount).toBe(0)
      expect(stats.skippedParitionCount).toBe(0)
    })

    it('should handle multiple stats blobs', () => {
      const dataBlobs: SummaryBlob[] = Array.from({ length: 5 }, (_, i) => ({
        latestCycle: 100,
        counter: i,
        errorNull: 0,
        partition: i,
        opaqueBlob: { index: i },
      }))

      const txBlobs: SummaryBlob[] = Array.from({ length: 3 }, (_, i) => ({
        latestCycle: 100,
        counter: i * 10,
        errorNull: i % 2,
        partition: i + 10,
        opaqueBlob: { txIndex: i },
      }))

      const stats: StatsClump = {
        error: false,
        cycle: 100,
        dataStats: dataBlobs,
        txStats: txBlobs,
        covered: Array.from({ length: 8 }, (_, i) => i),
        coveredParititionCount: 8,
        skippedParitionCount: 1,
      }

      expect(stats.dataStats).toHaveLength(5)
      expect(stats.txStats).toHaveLength(3)
      expect(stats.covered).toHaveLength(8)
    })
  })
})
