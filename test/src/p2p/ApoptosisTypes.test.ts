import { SignedApoptosisProposal, Txs, Record } from '../../../src/p2p/ApoptosisTypes'

describe('ApoptosisTypes', () => {
  describe('Type exports', () => {
    it('should handle SignedApoptosisProposal structure', () => {
      const proposal: SignedApoptosisProposal = {
        id: 'proposal123',
        when: 1234567890,
        sign: {
          owner: 'owner123',
          sig: 'signature123',
        },
      }
      expect(proposal.id).toBe('proposal123')
      expect(proposal.when).toBe(1234567890)
      expect(proposal.sign.owner).toBe('owner123')
      expect(proposal.sign.sig).toBe('signature123')
    })

    it('should handle Txs structure', () => {
      const txs: Txs = {
        apoptosis: [
          {
            id: 'txProposal1',
            when: 1111111111,
            sign: {
              owner: 'txOwner1',
              sig: 'txSig1',
            },
          },
          {
            id: 'txProposal2',
            when: 2222222222,
            sign: {
              owner: 'txOwner2',
              sig: 'txSig2',
            },
          },
        ],
      }
      expect(txs.apoptosis).toHaveLength(2)
      expect(txs.apoptosis[0].id).toBe('txProposal1')
      expect(txs.apoptosis[1].id).toBe('txProposal2')
      expect(txs.apoptosis[0].when).toBe(1111111111)
      expect(txs.apoptosis[1].when).toBe(2222222222)
    })

    it('should handle Record structure', () => {
      const record: Record = {
        apoptosized: ['node1', 'node2', 'node3', 'node4', 'node5'],
      }
      expect(record.apoptosized).toHaveLength(5)
      expect(record.apoptosized[0]).toBe('node1')
      expect(record.apoptosized[4]).toBe('node5')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty apoptosis array in Txs', () => {
      const txs: Txs = {
        apoptosis: [],
      }
      expect(txs.apoptosis).toHaveLength(0)
      expect(Array.isArray(txs.apoptosis)).toBe(true)
    })

    it('should handle empty apoptosized array in Record', () => {
      const record: Record = {
        apoptosized: [],
      }
      expect(record.apoptosized).toHaveLength(0)
      expect(Array.isArray(record.apoptosized)).toBe(true)
    })

    it('should handle SignedApoptosisProposal with current timestamp', () => {
      const now = Date.now()
      const proposal: SignedApoptosisProposal = {
        id: 'currentProposal',
        when: now,
        sign: {
          owner: 'currentOwner',
          sig: 'currentSig',
        },
      }
      expect(proposal.when).toBe(now)
      expect(proposal.when).toBeGreaterThan(0)
    })

    it('should handle SignedApoptosisProposal with future timestamp', () => {
      const futureTime = Date.now() + 86400000 // 24 hours from now
      const proposal: SignedApoptosisProposal = {
        id: 'futureProposal',
        when: futureTime,
        sign: {
          owner: 'futureOwner',
          sig: 'futureSig',
        },
      }
      expect(proposal.when).toBe(futureTime)
      expect(proposal.when).toBeGreaterThan(Date.now())
    })

    it('should handle large apoptosized array in Record', () => {
      const largeArray = Array(1000)
        .fill(null)
        .map((_, i) => `node${i}`)
      const record: Record = {
        apoptosized: largeArray,
      }
      expect(record.apoptosized).toHaveLength(1000)
      expect(record.apoptosized[0]).toBe('node0')
      expect(record.apoptosized[999]).toBe('node999')
    })
  })

  describe('Type structure validation', () => {
    it('should handle various ID formats in SignedApoptosisProposal', () => {
      const idFormats = [
        'simple-id',
        'complex_id_123',
        '00000000-0000-0000-0000-000000000000',
        'node:proposal:123',
        'UPPERCASE_ID',
      ]

      idFormats.forEach((id) => {
        const proposal: SignedApoptosisProposal = {
          id: id,
          when: 1234567890,
          sign: {
            owner: 'owner',
            sig: 'sig',
          },
        }
        expect(proposal.id).toBe(id)
      })
    })

    it('should handle multiple proposals with same timestamp', () => {
      const sameTime = 1234567890
      const txs: Txs = {
        apoptosis: [
          {
            id: 'proposal1',
            when: sameTime,
            sign: { owner: 'owner1', sig: 'sig1' },
          },
          {
            id: 'proposal2',
            when: sameTime,
            sign: { owner: 'owner2', sig: 'sig2' },
          },
          {
            id: 'proposal3',
            when: sameTime,
            sign: { owner: 'owner3', sig: 'sig3' },
          },
        ],
      }
      expect(txs.apoptosis).toHaveLength(3)
      expect(txs.apoptosis.every((p) => p.when === sameTime)).toBe(true)
    })

    it('should handle duplicate node IDs in apoptosized array', () => {
      const record: Record = {
        apoptosized: ['node1', 'node2', 'node1', 'node3', 'node2'],
      }
      expect(record.apoptosized).toHaveLength(5)
      expect(record.apoptosized[0]).toBe('node1')
      expect(record.apoptosized[2]).toBe('node1')
      expect(record.apoptosized[1]).toBe('node2')
      expect(record.apoptosized[4]).toBe('node2')
    })
  })
})
