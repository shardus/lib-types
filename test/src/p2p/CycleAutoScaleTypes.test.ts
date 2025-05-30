import { ScaleType, Record, ScaleRequest, Txs, SignedScaleRequest } from '../../../src/p2p/CycleAutoScaleTypes'

describe('CycleAutoScaleTypes', () => {
  describe('ScaleType enum', () => {
    it('should have correct values for all scale types', () => {
      expect(ScaleType.UP).toBe('up')
      expect(ScaleType.DOWN).toBe('down')
    })

    it('should have all expected scale type keys', () => {
      const expectedKeys = ['UP', 'DOWN']
      const actualKeys = Object.keys(ScaleType)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('should have all expected scale type values', () => {
      const expectedValues = ['up', 'down']
      const actualValues = Object.values(ScaleType)
      expect(actualValues).toEqual(expectedValues)
    })
  })

  describe('Type exports', () => {
    it('should handle Record structure', () => {
      const record: Record = {
        desired: 10,
        target: 15,
      }
      expect(record.desired).toBe(10)
      expect(record.target).toBe(15)
    })

    it('should handle ScaleRequest structure', () => {
      const scaleRequest: ScaleRequest = {
        nodeId: 'node123',
        timestamp: 1234567890,
        counter: 5,
        scale: ScaleType.UP,
      }
      expect(scaleRequest.nodeId).toBe('node123')
      expect(scaleRequest.timestamp).toBe(1234567890)
      expect(scaleRequest.counter).toBe(5)
      expect(scaleRequest.scale).toBe('up')
    })

    it('should handle ScaleRequest with custom scale string', () => {
      const scaleRequest: ScaleRequest = {
        nodeId: 'node456',
        timestamp: 9876543210,
        counter: 10,
        scale: 'custom-scale',
      }
      expect(scaleRequest.scale).toBe('custom-scale')
    })

    it('should handle SignedScaleRequest structure', () => {
      const signedRequest: SignedScaleRequest = {
        nodeId: 'signedNode123',
        timestamp: 1111111111,
        counter: 7,
        scale: ScaleType.DOWN,
        sign: {
          owner: 'owner123',
          sig: 'signature123',
        },
      }
      expect(signedRequest.nodeId).toBe('signedNode123')
      expect(signedRequest.timestamp).toBe(1111111111)
      expect(signedRequest.counter).toBe(7)
      expect(signedRequest.scale).toBe('down')
      expect(signedRequest.sign.owner).toBe('owner123')
      expect(signedRequest.sign.sig).toBe('signature123')
    })

    it('should handle Txs structure', () => {
      const txs: Txs = {
        autoscaling: [
          {
            nodeId: 'txNode1',
            timestamp: 1234567890,
            counter: 1,
            scale: ScaleType.UP,
            sign: {
              owner: 'txOwner1',
              sig: 'txSig1',
            },
          },
          {
            nodeId: 'txNode2',
            timestamp: 1234567891,
            counter: 2,
            scale: ScaleType.DOWN,
            sign: {
              owner: 'txOwner2',
              sig: 'txSig2',
            },
          },
        ],
      }
      expect(txs.autoscaling).toHaveLength(2)
      expect(txs.autoscaling[0].scale).toBe('up')
      expect(txs.autoscaling[1].scale).toBe('down')
      expect(txs.autoscaling[0].nodeId).toBe('txNode1')
      expect(txs.autoscaling[1].nodeId).toBe('txNode2')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty autoscaling array in Txs', () => {
      const txs: Txs = {
        autoscaling: [],
      }
      expect(txs.autoscaling).toHaveLength(0)
      expect(Array.isArray(txs.autoscaling)).toBe(true)
    })

    it('should handle Record with equal desired and target', () => {
      const record: Record = {
        desired: 20,
        target: 20,
      }
      expect(record.desired).toBe(record.target)
      expect(record.desired).toBe(20)
    })

    it('should handle Record with zero values', () => {
      const record: Record = {
        desired: 0,
        target: 0,
      }
      expect(record.desired).toBe(0)
      expect(record.target).toBe(0)
    })

    it('should handle large counter values in ScaleRequest', () => {
      const scaleRequest: ScaleRequest = {
        nodeId: 'largeCounterNode',
        timestamp: Date.now(),
        counter: Number.MAX_SAFE_INTEGER,
        scale: ScaleType.UP,
      }
      expect(scaleRequest.counter).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('Type compatibility', () => {
    it('should allow SignedScaleRequest to be used as ScaleRequest', () => {
      const signedRequest: SignedScaleRequest = {
        nodeId: 'compatNode',
        timestamp: 1234567890,
        counter: 3,
        scale: ScaleType.UP,
        sign: {
          owner: 'compatOwner',
          sig: 'compatSig',
        },
      }

      // SignedScaleRequest should be assignable to ScaleRequest
      const baseRequest: ScaleRequest = signedRequest
      expect(baseRequest.nodeId).toBe('compatNode')
      expect(baseRequest.timestamp).toBe(1234567890)
      expect(baseRequest.counter).toBe(3)
      expect(baseRequest.scale).toBe('up')
    })
  })
})
