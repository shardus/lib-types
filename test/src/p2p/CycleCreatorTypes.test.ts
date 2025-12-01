import {
  CycleMarker,
  CycleCert,
  BaseRecord,
  CycleTxs,
  CycleRecord,
  CycleData,
} from '../../../src/p2p/CycleCreatorTypes'

describe('CycleCreatorTypes', () => {
  describe('CycleMarker', () => {
    it('should be a string type', () => {
      const marker: CycleMarker = '2023-cycle-001'
      expect(typeof marker).toBe('string')
    })

    it('should handle empty string', () => {
      const marker: CycleMarker = ''
      expect(marker).toBe('')
    })
  })

  describe('CycleCert', () => {
    it('should have required properties', () => {
      const cert: CycleCert = {
        marker: 'cycle-marker-123',
        score: 100,
        sign: {
          sig: 'signature-hash',
          owner: 'owner-public-key',
        },
      }

      expect(cert.marker).toBeDefined()
      expect(cert.sign).toBeDefined()
      expect(cert.sign.sig).toBeDefined()
      expect(cert.sign.owner).toBeDefined()
    })

    it('should work without optional score', () => {
      const cert: CycleCert = {
        marker: 'cycle-marker-123',
        sign: {
          sig: 'signature-hash',
          owner: 'owner-public-key',
        },
      }

      expect(cert.score).toBeUndefined()
    })

    it('should handle score as zero', () => {
      const cert: CycleCert = {
        marker: 'cycle-marker-123',
        score: 0,
        sign: {
          sig: 'signature-hash',
          owner: 'owner-public-key',
        },
      }

      expect(cert.score).toBe(0)
    })
  })

  describe('BaseRecord', () => {
    it('should have all required properties', () => {
      const baseRecord: BaseRecord = {
        networkId: 'shardus-betanet-1.x',
        counter: 42,
        previous: 'previous-cycle-hash',
        start: 1234567890,
        duration: 30,
        networkConfigHash: 'config-hash-123',
      }

      expect(baseRecord.networkId).toBe('shardus-betanet-1.x')
      expect(baseRecord.counter).toBe(42)
      expect(baseRecord.previous).toBe('previous-cycle-hash')
      expect(baseRecord.start).toBe(1234567890)
      expect(baseRecord.duration).toBe(30)
      expect(baseRecord.networkConfigHash).toBe('config-hash-123')
    })

    it('should handle counter as zero', () => {
      const baseRecord: BaseRecord = {
        networkId: 'test-network',
        counter: 0,
        previous: '',
        start: 0,
        duration: 30,
        networkConfigHash: 'hash',
      }

      expect(baseRecord.counter).toBe(0)
      expect(baseRecord.start).toBe(0)
    })

    it('should handle large numbers', () => {
      const baseRecord: BaseRecord = {
        networkId: 'test-network',
        counter: Number.MAX_SAFE_INTEGER,
        previous: 'prev',
        start: Date.now(),
        duration: 999999,
        networkConfigHash: 'hash',
      }

      expect(baseRecord.counter).toBe(Number.MAX_SAFE_INTEGER)
      expect(baseRecord.duration).toBe(999999)
    })
  })

  describe('CycleTxs', () => {
    it('should allow empty transaction arrays', () => {
      const txs: CycleTxs = {
        // Modes.Txs
        mode: [],
        // SafetyMode.Txs
        safetyMode: [],
        safetyNum: [],
        networkStateHash: [],
        // Archivers.Txs
        archivers: [],
        // Join.Txs
        standbyAdd: [],
        startedSyncing: [],
        finishedSyncing: [],
        standbyRefresh: [],
        standbyRemove: [],
        // Active.Txs
        active: [],
        // Apoptosis.Txs
        apoptosis: [],
        // Lost.Txs
        lost: [],
        refuted: [],
        removedByApp: [],
        // CycleAutoScale.Txs
        autoscaling: [],
        // LostArchivers.Txs
        lostArchivers: [],
        refutedArchivers: [],
        // ServiceQueue.Txs
        txadd: [],
        txremove: [],
      }

      expect(txs.mode).toEqual([])
      expect(txs.standbyAdd).toEqual([])
      expect(txs.lostArchivers).toEqual([])
    })

    it('should handle populated transaction arrays', () => {
      const txs: Partial<CycleTxs> = {
        mode: [],
        active: [
          {
            nodeId: 'node-id-1',
            status: 'active',
            timestamp: Date.now(),
            sign: { sig: 'sig2', owner: 'owner2' },
          },
        ],
        lost: [
          {
            report: {
              target: 'node1',
              checker: 'checker-node',
              reporter: 'reporter-node',
              cycle: 100,
              sign: { sig: 'report-sig', owner: 'report-owner' },
            },
            status: 'down',
            cycle: 100,
            sign: { sig: 'sig3', owner: 'owner3' },
          },
        ],
      }

      expect(txs.mode).toHaveLength(0)
      expect(txs.active).toHaveLength(1)
      expect(txs.lost).toHaveLength(1)
    })
  })

  describe('CycleRecord', () => {
    it('should have all composite properties', () => {
      // Create a minimal valid CycleRecord
      const record: Partial<CycleRecord> = {
        // BaseRecord
        networkId: 'network-1',
        counter: 1,
        previous: 'prev-hash',
        start: 1000,
        duration: 30,
        networkConfigHash: 'config-hash',
        // Additional CycleRecord properties
        joined: ['node1', 'node2'],
        returned: ['node3'],
        lost: [],
        refuted: ['node4'],
        appRemoved: [],
        apoptosized: ['node5'],
        nodeListHash: '0xabc123',
        archiverListHash: '0xdef456',
        standbyNodeListHash: '0x789ghi',
        random: 0.123456,
        // Some module properties
        mode: 'forming',
        active: 10,
        standby: 5,
      }

      expect(record.networkId).toBe('network-1')
      expect(record.joined).toEqual(['node1', 'node2'])
      expect(record.nodeListHash).toBe('0xabc123')
      expect(record.random).toBe(0.123456)
    })

    it('should handle empty arrays', () => {
      const record: Partial<CycleRecord> = {
        joined: [],
        returned: [],
        lost: [],
        refuted: [],
        appRemoved: [],
        apoptosized: [],
      }

      expect(record.joined).toEqual([])
      expect(record.lost).toEqual([])
    })

    it('should handle random number edge cases', () => {
      const record1: Partial<CycleRecord> = { random: 0 }
      const record2: Partial<CycleRecord> = { random: 1 }
      const record3: Partial<CycleRecord> = { random: 0.5 }

      expect(record1.random).toBe(0)
      expect(record2.random).toBe(1)
      expect(record3.random).toBe(0.5)
    })
  })

  describe('CycleData', () => {
    it('should combine CycleRecord with marker and certificate', () => {
      // Create a minimal valid CycleData
      const cycleData: Partial<CycleData> = {
        // BaseRecord
        networkId: 'test-net',
        counter: 100,
        previous: 'prev',
        start: Date.now(),
        duration: 30,
        networkConfigHash: 'hash',
        // CycleData specific
        marker: 'cycle-100',
        certificate: {
          marker: 'cycle-100',
          score: 95,
          sign: {
            sig: 'cert-signature',
            owner: 'cert-owner',
          },
        },
        // Some required properties
        joined: [],
        returned: [],
        lost: [],
        refuted: [],
        appRemoved: [],
        apoptosized: [],
        nodeListHash: '0x111',
        archiverListHash: '0x222',
        standbyNodeListHash: '0x333',
        random: 0.777,
      }

      expect(cycleData.marker).toBe('cycle-100')
      expect(cycleData.certificate?.marker).toBe(cycleData.marker)
      expect(cycleData.certificate?.score).toBe(95)
    })

    it('should work with certificate without score', () => {
      const cycleData: Partial<CycleData> = {
        marker: 'test-marker',
        certificate: {
          marker: 'test-marker',
          sign: {
            sig: 'signature',
            owner: 'owner-key',
          },
        },
      }

      expect(cycleData.certificate?.score).toBeUndefined()
    })
  })
})
