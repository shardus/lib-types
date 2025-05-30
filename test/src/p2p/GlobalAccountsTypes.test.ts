import {
  SetGlobalTx,
  Receipt,
  Tracker,
  TxHash,
  SignedSetGlobalTx,
  GlobalTxReceipt,
} from '../../../src/p2p/GlobalAccountsTypes'

describe('GlobalAccountsTypes', () => {
  describe('SetGlobalTx', () => {
    it('should have all required properties', () => {
      const tx: SetGlobalTx = {
        address: '0x1234567890abcdef',
        addressHash: 'hash-of-address',
        value: { balance: 1000, nonce: 5 },
        when: Date.now(),
        source: 'validator-node-1',
        txId: 'tx-unique-id-123',
        afterStateHash: 'state-hash-after-tx',
      }

      expect(tx.address).toBe('0x1234567890abcdef')
      expect(tx.addressHash).toBe('hash-of-address')
      expect(tx.value).toEqual({ balance: 1000, nonce: 5 })
      expect(tx.when).toBeGreaterThan(0)
      expect(tx.source).toBe('validator-node-1')
      expect(tx.txId).toBe('tx-unique-id-123')
      expect(tx.afterStateHash).toBe('state-hash-after-tx')
    })

    it('should handle different value types', () => {
      const txWithString: SetGlobalTx = {
        address: 'addr1',
        addressHash: 'hash1',
        value: 'simple string value',
        when: 1234567890,
        source: 'node1',
        txId: 'tx1',
        afterStateHash: 'hash1',
      }

      const txWithNull: SetGlobalTx = {
        address: 'addr2',
        addressHash: 'hash2',
        value: null,
        when: 1234567891,
        source: 'node2',
        txId: 'tx2',
        afterStateHash: 'hash2',
      }

      const txWithArray: SetGlobalTx = {
        address: 'addr3',
        addressHash: 'hash3',
        value: [1, 2, 3, 'four'],
        when: 1234567892,
        source: 'node3',
        txId: 'tx3',
        afterStateHash: 'hash3',
      }

      expect(txWithString.value).toBe('simple string value')
      expect(txWithNull.value).toBeNull()
      expect(txWithArray.value).toEqual([1, 2, 3, 'four'])
    })

    it('should handle edge cases for when timestamp', () => {
      const txWithZeroTime: SetGlobalTx = {
        address: 'addr',
        addressHash: 'hash',
        value: {},
        when: 0,
        source: 'source',
        txId: 'tx',
        afterStateHash: 'after',
      }

      const txWithMaxTime: SetGlobalTx = {
        address: 'addr',
        addressHash: 'hash',
        value: {},
        when: Number.MAX_SAFE_INTEGER,
        source: 'source',
        txId: 'tx',
        afterStateHash: 'after',
      }

      expect(txWithZeroTime.when).toBe(0)
      expect(txWithMaxTime.when).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('Receipt', () => {
    it('should have all required properties', () => {
      const receipt: Receipt = {
        signs: [
          { sig: 'signature1', owner: 'owner1' },
          { sig: 'signature2', owner: 'owner2' },
        ],
        tx: {
          address: 'global-address',
          addressHash: 'addr-hash',
          value: { config: 'value' },
          when: Date.now(),
          source: 'source-node',
          txId: 'transaction-id',
          afterStateHash: 'after-state',
        },
        consensusGroup: new Set(['node1', 'node2', 'node3']),
      }

      expect(receipt.signs).toHaveLength(2)
      expect(receipt.tx).toBeDefined()
      expect(receipt.consensusGroup.size).toBe(3)
    })

    it('should handle empty signatures array', () => {
      const receipt: Receipt = {
        signs: [],
        tx: {
          address: 'addr',
          addressHash: 'hash',
          value: 'val',
          when: 123,
          source: 'src',
          txId: 'id',
          afterStateHash: 'after',
        },
        consensusGroup: new Set(),
      }

      expect(receipt.signs).toEqual([])
      expect(receipt.consensusGroup.size).toBe(0)
    })

    it('should properly work with Set operations', () => {
      const consensusGroup = new Set(['node1', 'node2'])
      const receipt: Receipt = {
        signs: [{ sig: 'sig', owner: 'owner' }],
        tx: {
          address: 'addr',
          addressHash: 'hash',
          value: {},
          when: 1,
          source: 'src',
          txId: 'id',
          afterStateHash: 'after',
        },
        consensusGroup,
      }

      // Add and check
      receipt.consensusGroup.add('node3')
      expect(receipt.consensusGroup.has('node3')).toBe(true)
      expect(receipt.consensusGroup.size).toBe(3)

      // Delete and check
      receipt.consensusGroup.delete('node1')
      expect(receipt.consensusGroup.has('node1')).toBe(false)
      expect(receipt.consensusGroup.size).toBe(2)
    })
  })

  describe('Tracker', () => {
    it('should have all required properties', () => {
      const tracker: Tracker = {
        seen: new Set(['pubkey1', 'pubkey2', 'pubkey3']),
        timestamp: Date.now(),
        gossiped: false,
      }

      expect(tracker.seen.size).toBe(3)
      expect(tracker.timestamp).toBeGreaterThan(0)
      expect(tracker.gossiped).toBe(false)
    })

    it('should handle gossiped states', () => {
      const notGossiped: Tracker = {
        seen: new Set(),
        timestamp: 1000,
        gossiped: false,
      }

      const gossiped: Tracker = {
        seen: new Set(['key1']),
        timestamp: 2000,
        gossiped: true,
      }

      expect(notGossiped.gossiped).toBe(false)
      expect(gossiped.gossiped).toBe(true)
    })

    it('should properly track seen public keys', () => {
      const tracker: Tracker = {
        seen: new Set(),
        timestamp: Date.now(),
        gossiped: false,
      }

      // Add keys
      tracker.seen.add('pubkey1')
      tracker.seen.add('pubkey2')
      tracker.seen.add('pubkey1') // Duplicate, should not increase size

      expect(tracker.seen.size).toBe(2)
      expect(tracker.seen.has('pubkey1')).toBe(true)
      expect(tracker.seen.has('pubkey2')).toBe(true)
      expect(tracker.seen.has('pubkey3')).toBe(false)
    })
  })

  describe('TxHash', () => {
    it('should be a string type', () => {
      const hash: TxHash = 'transaction-hash-12345'
      expect(typeof hash).toBe('string')
    })

    it('should handle different hash formats', () => {
      const hash1: TxHash = '0xabcdef123456'
      const hash2: TxHash = 'simple-hash'
      const hash3: TxHash = ''

      expect(hash1).toBe('0xabcdef123456')
      expect(hash2).toBe('simple-hash')
      expect(hash3).toBe('')
    })
  })

  describe('SignedSetGlobalTx', () => {
    it('should extend SetGlobalTx with SignedObject properties', () => {
      const signedTx: SignedSetGlobalTx = {
        // SetGlobalTx properties
        address: 'global-addr',
        addressHash: 'addr-hash',
        value: { data: 'test' },
        when: 999999,
        source: 'source-node',
        txId: 'tx-123',
        afterStateHash: 'after-hash',
        // SignedObject properties
        sign: {
          sig: 'transaction-signature',
          owner: 'owner-public-key',
        },
      }

      expect(signedTx.address).toBe('global-addr')
      expect(signedTx.sign.sig).toBe('transaction-signature')
      expect(signedTx.sign.owner).toBe('owner-public-key')
    })
  })

  describe('GlobalTxReceipt', () => {
    it('should omit consensusGroup from Receipt', () => {
      const globalReceipt: GlobalTxReceipt = {
        signs: [
          { sig: 'sig1', owner: 'owner1' },
          { sig: 'sig2', owner: 'owner2' },
          { sig: 'sig3', owner: 'owner3' },
        ],
        tx: {
          address: 'global-account',
          addressHash: 'hash',
          value: { global: true, data: [1, 2, 3] },
          when: Date.now(),
          source: 'validator',
          txId: 'global-tx-id',
          afterStateHash: 'final-state-hash',
        },
      }

      expect(globalReceipt.signs).toHaveLength(3)
      expect(globalReceipt.tx).toBeDefined()
      // @ts-expect-error - Checking that consensusGroup is not present
      expect(globalReceipt.consensusGroup).toBeUndefined()
    })

    it('should handle empty signs array', () => {
      const globalReceipt: GlobalTxReceipt = {
        signs: [],
        tx: {
          address: 'addr',
          addressHash: 'hash',
          value: null,
          when: 0,
          source: 'src',
          txId: 'id',
          afterStateHash: 'after',
        },
      }

      expect(globalReceipt.signs).toEqual([])
    })
  })
})
