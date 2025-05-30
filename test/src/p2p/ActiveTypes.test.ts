import { ActiveRequest, SignedActiveRequest, Txs, Record } from '../../../src/p2p/ActiveTypes'

describe('ActiveTypes', () => {
  describe('Type exports', () => {
    it('should handle ActiveRequest structure', () => {
      const activeRequest: ActiveRequest = {
        nodeId: 'node123',
        status: 'active',
        timestamp: 1234567890,
      }
      expect(activeRequest.nodeId).toBe('node123')
      expect(activeRequest.status).toBe('active')
      expect(activeRequest.timestamp).toBe(1234567890)
    })

    it('should handle SignedActiveRequest structure', () => {
      const signedRequest: SignedActiveRequest = {
        nodeId: 'signedNode456',
        status: 'pending',
        timestamp: 9876543210,
        sign: {
          owner: 'owner123',
          sig: 'signature123',
        },
      }
      expect(signedRequest.nodeId).toBe('signedNode456')
      expect(signedRequest.status).toBe('pending')
      expect(signedRequest.timestamp).toBe(9876543210)
      expect(signedRequest.sign.owner).toBe('owner123')
      expect(signedRequest.sign.sig).toBe('signature123')
    })

    it('should handle Txs structure', () => {
      const txs: Txs = {
        active: [
          {
            nodeId: 'txNode1',
            status: 'active',
            timestamp: 1111111111,
            sign: {
              owner: 'txOwner1',
              sig: 'txSig1',
            },
          },
          {
            nodeId: 'txNode2',
            status: 'inactive',
            timestamp: 2222222222,
            sign: {
              owner: 'txOwner2',
              sig: 'txSig2',
            },
          },
        ],
      }
      expect(txs.active).toHaveLength(2)
      expect(txs.active[0].nodeId).toBe('txNode1')
      expect(txs.active[1].nodeId).toBe('txNode2')
      expect(txs.active[0].status).toBe('active')
      expect(txs.active[1].status).toBe('inactive')
    })

    it('should handle Record structure', () => {
      const record: Record = {
        active: 10,
        standby: 5,
        activated: ['node1', 'node2', 'node3'],
        activatedPublicKeys: ['pubKey1', 'pubKey2', 'pubKey3'],
        maxSyncTime: 30000,
      }
      expect(record.active).toBe(10)
      expect(record.standby).toBe(5)
      expect(record.activated).toHaveLength(3)
      expect(record.activatedPublicKeys).toHaveLength(3)
      expect(record.activated[0]).toBe('node1')
      expect(record.activatedPublicKeys[0]).toBe('pubKey1')
      expect(record.maxSyncTime).toBe(30000)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty arrays in Txs', () => {
      const txs: Txs = {
        active: [],
      }
      expect(txs.active).toHaveLength(0)
      expect(Array.isArray(txs.active)).toBe(true)
    })

    it('should handle empty arrays in Record', () => {
      const record: Record = {
        active: 0,
        standby: 0,
        activated: [],
        activatedPublicKeys: [],
        maxSyncTime: 0,
      }
      expect(record.active).toBe(0)
      expect(record.standby).toBe(0)
      expect(record.activated).toHaveLength(0)
      expect(record.activatedPublicKeys).toHaveLength(0)
      expect(record.maxSyncTime).toBe(0)
    })

    it('should handle ActiveRequest with various status values', () => {
      const statuses = ['active', 'inactive', 'pending', 'syncing', 'ready']
      statuses.forEach((status) => {
        const request: ActiveRequest = {
          nodeId: `node-${status}`,
          status: status,
          timestamp: Date.now(),
        }
        expect(request.status).toBe(status)
      })
    })

    it('should handle large values in Record', () => {
      const record: Record = {
        active: Number.MAX_SAFE_INTEGER,
        standby: Number.MAX_SAFE_INTEGER,
        activated: Array(1000).fill('node'),
        activatedPublicKeys: Array(1000).fill('pubKey'),
        maxSyncTime: Number.MAX_SAFE_INTEGER,
      }
      expect(record.active).toBe(Number.MAX_SAFE_INTEGER)
      expect(record.standby).toBe(Number.MAX_SAFE_INTEGER)
      expect(record.activated).toHaveLength(1000)
      expect(record.activatedPublicKeys).toHaveLength(1000)
      expect(record.maxSyncTime).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('Type compatibility', () => {
    it('should allow SignedActiveRequest to be used as ActiveRequest', () => {
      const signedRequest: SignedActiveRequest = {
        nodeId: 'compatNode',
        status: 'active',
        timestamp: 1234567890,
        sign: {
          owner: 'compatOwner',
          sig: 'compatSig',
        },
      }

      // SignedActiveRequest should be assignable to ActiveRequest
      const baseRequest: ActiveRequest = signedRequest
      expect(baseRequest.nodeId).toBe('compatNode')
      expect(baseRequest.status).toBe('active')
      expect(baseRequest.timestamp).toBe(1234567890)
    })

    it('should handle mismatched array lengths in Record', () => {
      const record: Record = {
        active: 3,
        standby: 2,
        activated: ['node1', 'node2'],
        activatedPublicKeys: ['pubKey1', 'pubKey2', 'pubKey3'],
        maxSyncTime: 15000,
      }
      expect(record.activated).toHaveLength(2)
      expect(record.activatedPublicKeys).toHaveLength(3)
      // Arrays can have different lengths - this is valid
    })
  })
})
