import { CycleMarker, StateData, Receipt, Summary } from '../../../src/state-manager/StateMetaDataTypes'
import { ReceiptMapResult, SummaryBlob } from '../../../src/state-manager/StateManagerTypes'

describe('StateMetaDataTypes', () => {
  describe('CycleMarker', () => {
    it('should handle string cycle markers', () => {
      const marker1: CycleMarker = 'cycle-123'
      const marker2: CycleMarker = ''
      const marker3: CycleMarker = 'a'.repeat(100)

      expect(marker1).toBe('cycle-123')
      expect(marker2).toBe('')
      expect(marker3).toHaveLength(100)
    })

    it('should handle special characters in cycle markers', () => {
      const marker: CycleMarker = 'cycle-!@#$%^&*()_+-=[]{}|;\':",./<>?'
      expect(marker).toContain('!@#$')
    })
  })

  describe('StateData', () => {
    it('should create empty StateData', () => {
      const stateData: StateData = {}
      expect(stateData.parentCycle).toBeUndefined()
      expect(stateData.networkHash).toBeUndefined()
      expect(stateData.partitionHashes).toBeUndefined()
    })

    it('should create StateData with all fields', () => {
      const stateData: StateData = {
        parentCycle: 'cycle-100',
        networkHash: '0x1234567890abcdef',
        partitionHashes: ['hash1', 'hash2', 'hash3'],
      }

      expect(stateData.parentCycle).toBe('cycle-100')
      expect(stateData.networkHash).toBe('0x1234567890abcdef')
      expect(stateData.partitionHashes).toEqual(['hash1', 'hash2', 'hash3'])
    })

    it('should handle partial StateData', () => {
      const stateData1: StateData = {
        parentCycle: 'cycle-50',
      }

      const stateData2: StateData = {
        networkHash: 'nethash123',
        partitionHashes: [],
      }

      expect(stateData1.parentCycle).toBe('cycle-50')
      expect(stateData1.networkHash).toBeUndefined()

      expect(stateData2.parentCycle).toBeUndefined()
      expect(stateData2.partitionHashes).toEqual([])
    })

    it('should handle empty partition hashes array', () => {
      const stateData: StateData = {
        partitionHashes: [],
      }
      expect(stateData.partitionHashes).toEqual([])
      expect(stateData.partitionHashes).toHaveLength(0)
    })

    it('should handle large partition hashes array', () => {
      const hashes = Array.from({ length: 1000 }, (_, i) => `hash-${i}`)
      const stateData: StateData = {
        partitionHashes: hashes,
      }
      expect(stateData.partitionHashes).toHaveLength(1000)
      expect(stateData.partitionHashes?.[999]).toBe('hash-999')
    })
  })

  describe('Receipt', () => {
    it('should create empty Receipt', () => {
      const receipt: Receipt = {}
      expect(receipt.parentCycle).toBeUndefined()
      expect(receipt.networkHash).toBeUndefined()
      expect(receipt.partitionHashes).toBeUndefined()
      expect(receipt.partitionMaps).toBeUndefined()
      expect(receipt.partitionTxs).toBeUndefined()
    })

    it('should create Receipt with basic fields', () => {
      const receipt: Receipt = {
        parentCycle: 'parent-200',
        networkHash: 'net-hash-abc',
        partitionHashes: ['p1', 'p2'],
      }

      expect(receipt.parentCycle).toBe('parent-200')
      expect(receipt.networkHash).toBe('net-hash-abc')
      expect(receipt.partitionHashes).toEqual(['p1', 'p2'])
    })

    it('should handle Receipt with partitionMaps', () => {
      const mapResult1: ReceiptMapResult = {
        cycle: 10,
        partition: 0,
        receiptMap: { tx1: ['r1'] },
        txCount: 1,
        txsMap: {},
        txsMapEVMReceipt: {},
      }

      const mapResult2: ReceiptMapResult = {
        cycle: 10,
        partition: 1,
        receiptMap: { tx2: ['r2', 'r3'] },
        txCount: 2,
        txsMap: { id1: [{ data: 'test' }] },
        txsMapEVMReceipt: { evm1: { gas: 21000 } },
      }

      const receipt: Receipt = {
        partitionMaps: {
          0: mapResult1,
          1: mapResult2,
        },
      }

      expect(receipt.partitionMaps?.[0]).toEqual(mapResult1)
      expect(receipt.partitionMaps?.[1]).toEqual(mapResult2)
      expect(Object.keys(receipt.partitionMaps || {})).toHaveLength(2)
    })

    it('should handle Receipt with partitionTxs', () => {
      const receipt: Receipt = {
        partitionTxs: {
          0: { transactions: ['tx1', 'tx2'] },
          5: { transactions: [] },
          10: null,
          99: { complex: { nested: { data: [1, 2, 3] } } },
        },
      }

      expect(receipt.partitionTxs?.[0]).toEqual({ transactions: ['tx1', 'tx2'] })
      expect(receipt.partitionTxs?.[5]).toEqual({ transactions: [] })
      expect(receipt.partitionTxs?.[10]).toBeNull()
      expect(receipt.partitionTxs?.[99]).toHaveProperty('complex.nested.data')
    })

    it('should handle Receipt with all fields populated', () => {
      const fullReceipt: Receipt = {
        parentCycle: 'full-cycle',
        networkHash: 'full-hash',
        partitionHashes: ['hash1', 'hash2', 'hash3'],
        partitionMaps: {
          0: {
            cycle: 1,
            partition: 0,
            receiptMap: {},
            txCount: 0,
            txsMap: {},
            txsMapEVMReceipt: {},
          },
        },
        partitionTxs: {
          0: { data: 'test' },
        },
      }

      expect(fullReceipt.parentCycle).toBe('full-cycle')
      expect(fullReceipt.networkHash).toBe('full-hash')
      expect(fullReceipt.partitionHashes).toHaveLength(3)
      expect(fullReceipt.partitionMaps).toBeDefined()
      expect(fullReceipt.partitionTxs).toBeDefined()
    })

    it('should handle large partition numbers', () => {
      const receipt: Receipt = {
        partitionMaps: {
          9999: {
            cycle: 100,
            partition: 9999,
            receiptMap: {},
            txCount: 0,
            txsMap: {},
            txsMapEVMReceipt: {},
          },
        },
        partitionTxs: {
          10000: { largePartition: true },
        },
      }

      expect(receipt.partitionMaps?.[9999].partition).toBe(9999)
      expect(receipt.partitionTxs?.[10000]).toEqual({ largePartition: true })
    })
  })

  describe('Summary', () => {
    it('should create empty Summary', () => {
      const summary: Summary = {}
      expect(summary.parentCycle).toBeUndefined()
      expect(summary.networkHash).toBeUndefined()
      expect(summary.partitionHashes).toBeUndefined()
      expect(summary.partitionBlobs).toBeUndefined()
    })

    it('should create Summary with basic fields', () => {
      const summary: Summary = {
        parentCycle: 'summary-cycle-1',
        networkHash: 'summary-hash-xyz',
        partitionHashes: ['s1', 's2', 's3', 's4'],
      }

      expect(summary.parentCycle).toBe('summary-cycle-1')
      expect(summary.networkHash).toBe('summary-hash-xyz')
      expect(summary.partitionHashes).toHaveLength(4)
    })

    it('should handle Summary with partitionBlobs', () => {
      const blob1: SummaryBlob = {
        latestCycle: 50,
        counter: 10,
        errorNull: 0,
        partition: 0,
        opaqueBlob: { summary: 'data1' },
      }

      const blob2: SummaryBlob = {
        latestCycle: 50,
        counter: 20,
        errorNull: 1,
        partition: 1,
        opaqueBlob: { summary: 'data2', extra: [1, 2, 3] },
      }

      const summary: Summary = {
        partitionBlobs: {
          0: blob1,
          1: blob2,
        },
      }

      expect(summary.partitionBlobs?.[0]).toEqual(blob1)
      expect(summary.partitionBlobs?.[1]).toEqual(blob2)
      expect(Object.keys(summary.partitionBlobs || {})).toHaveLength(2)
    })

    it('should handle Summary with sparse partition numbers', () => {
      const blob: SummaryBlob = {
        latestCycle: 100,
        counter: 1,
        errorNull: 0,
        partition: 50,
        opaqueBlob: null,
      }

      const summary: Summary = {
        partitionBlobs: {
          0: { ...blob, partition: 0 },
          50: blob,
          100: { ...blob, partition: 100 },
          999: { ...blob, partition: 999 },
        },
      }

      expect(summary.partitionBlobs?.[0]).toBeDefined()
      expect(summary.partitionBlobs?.[50]).toBeDefined()
      expect(summary.partitionBlobs?.[100]).toBeDefined()
      expect(summary.partitionBlobs?.[999]).toBeDefined()
      expect(summary.partitionBlobs?.[1]).toBeUndefined()
    })

    it('should handle Summary with all fields populated', () => {
      const fullSummary: Summary = {
        parentCycle: 'complete-cycle',
        networkHash: '0xabcdef123456',
        partitionHashes: Array.from({ length: 10 }, (_, i) => `hash-${i}`),
        partitionBlobs: {
          0: {
            latestCycle: 200,
            counter: 42,
            errorNull: 0,
            partition: 0,
            opaqueBlob: {
              accounts: 1000,
              transactions: 5000,
              metadata: { version: '1.0' },
            },
          },
        },
      }

      expect(fullSummary.parentCycle).toBe('complete-cycle')
      expect(fullSummary.networkHash).toBe('0xabcdef123456')
      expect(fullSummary.partitionHashes).toHaveLength(10)
      expect(fullSummary.partitionBlobs?.[0].opaqueBlob).toHaveProperty('accounts', 1000)
    })

    it('should handle edge cases', () => {
      const summary1: Summary = {
        parentCycle: '',
        networkHash: '',
        partitionHashes: [],
        partitionBlobs: {},
      }

      expect(summary1.parentCycle).toBe('')
      expect(summary1.networkHash).toBe('')
      expect(summary1.partitionHashes).toEqual([])
      expect(Object.keys(summary1.partitionBlobs || {})).toHaveLength(0)

      const summary2: Summary = {
        partitionHashes: Array.from({ length: 1000 }, () => 'x'.repeat(64)),
      }

      expect(summary2.partitionHashes).toHaveLength(1000)
      expect(summary2.partitionHashes?.[0]).toHaveLength(64)
    })
  })
})
