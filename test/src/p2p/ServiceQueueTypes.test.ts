import {
  Txs,
  AddNetworkTx,
  RemoveNetworkTx,
  SignedAddNetworkTx,
  SignedRemoveNetworkTx,
  NetworkTxEntry,
  Record,
} from '../../../src/p2p/ServiceQueueTypes'

describe('ServiceQueueTypes', () => {
  describe('Type exports', () => {
    it('should handle AddNetworkTx structure', () => {
      const addTx: AddNetworkTx = {
        hash: 'tx123hash',
        type: 'transfer',
        txData: { from: 'alice', to: 'bob', amount: 100 },
        cycle: 42,
        priority: 5,
      }
      expect(addTx.hash).toBe('tx123hash')
      expect(addTx.type).toBe('transfer')
      expect(addTx.txData).toEqual({ from: 'alice', to: 'bob', amount: 100 })
      expect(addTx.cycle).toBe(42)
      expect(addTx.priority).toBe(5)
      expect(addTx.subQueueKey).toBeUndefined()
    })

    it('should handle AddNetworkTx with subQueueKey', () => {
      const addTx: AddNetworkTx = {
        hash: 'tx456hash',
        type: 'stake',
        txData: { validator: 'validator1', amount: 1000 },
        cycle: 50,
        priority: 10,
        subQueueKey: 'high-priority',
      }
      expect(addTx.hash).toBe('tx456hash')
      expect(addTx.type).toBe('stake')
      expect(addTx.txData).toEqual({ validator: 'validator1', amount: 1000 })
      expect(addTx.cycle).toBe(50)
      expect(addTx.priority).toBe(10)
      expect(addTx.subQueueKey).toBe('high-priority')
    })

    it('should handle RemoveNetworkTx structure', () => {
      const removeTx: RemoveNetworkTx = {
        txHash: 'tx789hash',
        cycle: 55,
      }
      expect(removeTx.txHash).toBe('tx789hash')
      expect(removeTx.cycle).toBe(55)
    })

    it('should handle SignedAddNetworkTx structure', () => {
      const signedAddTx: SignedAddNetworkTx = {
        hash: 'signedTx123',
        type: 'deploy',
        txData: { contract: 'MyContract', code: '0x123' },
        cycle: 60,
        priority: 15,
        sign: {
          owner: 'signer123',
          sig: 'signature123',
        },
      }
      expect(signedAddTx.hash).toBe('signedTx123')
      expect(signedAddTx.type).toBe('deploy')
      expect(signedAddTx.txData).toEqual({ contract: 'MyContract', code: '0x123' })
      expect(signedAddTx.cycle).toBe(60)
      expect(signedAddTx.priority).toBe(15)
      expect(signedAddTx.sign.owner).toBe('signer123')
      expect(signedAddTx.sign.sig).toBe('signature123')
    })

    it('should handle SignedRemoveNetworkTx structure', () => {
      const signedRemoveTx: SignedRemoveNetworkTx = {
        txHash: 'removeTx456',
        cycle: 65,
        sign: {
          owner: 'remover123',
          sig: 'removeSig123',
        },
      }
      expect(signedRemoveTx.txHash).toBe('removeTx456')
      expect(signedRemoveTx.cycle).toBe(65)
      expect(signedRemoveTx.sign.owner).toBe('remover123')
      expect(signedRemoveTx.sign.sig).toBe('removeSig123')
    })

    it('should handle NetworkTxEntry structure', () => {
      const txEntry: NetworkTxEntry = {
        hash: 'entryHash123',
        tx: {
          hash: 'txHash123',
          type: 'mint',
          txData: { token: 'TOKEN', amount: 5000 },
          cycle: 70,
          priority: 20,
        },
      }
      expect(txEntry.hash).toBe('entryHash123')
      expect(txEntry.tx.hash).toBe('txHash123')
      expect(txEntry.tx.type).toBe('mint')
      expect(txEntry.tx.txData).toEqual({ token: 'TOKEN', amount: 5000 })
      expect(txEntry.tx.cycle).toBe(70)
      expect(txEntry.tx.priority).toBe(20)
    })

    it('should handle Txs structure', () => {
      const txs: Txs = {
        txadd: [
          {
            hash: 'add1',
            type: 'transfer',
            txData: { from: 'alice', to: 'bob', amount: 100 },
            cycle: 80,
            priority: 1,
          },
          {
            hash: 'add2',
            type: 'stake',
            txData: { validator: 'val1', amount: 2000 },
            cycle: 81,
            priority: 2,
            subQueueKey: 'staking',
          },
        ],
        txremove: [
          { txHash: 'remove1', cycle: 82 },
          { txHash: 'remove2', cycle: 83 },
        ],
      }
      expect(txs.txadd).toHaveLength(2)
      expect(txs.txremove).toHaveLength(2)
      expect(txs.txadd[0].hash).toBe('add1')
      expect(txs.txadd[1].subQueueKey).toBe('staking')
      expect(txs.txremove[0].txHash).toBe('remove1')
      expect(txs.txremove[1].cycle).toBe(83)
    })

    it('should handle Record structure', () => {
      const record: Record = {
        txadd: [
          {
            hash: 'rec1',
            type: 'transfer',
            txData: { data: 'test' },
            cycle: 90,
            priority: 5,
          },
        ],
        txremove: [{ txHash: 'recRemove1', cycle: 91 }],
        txlisthash: 'hash123abc',
      }
      expect(record.txadd).toHaveLength(1)
      expect(record.txremove).toHaveLength(1)
      expect(record.txlisthash).toBe('hash123abc')
      expect(record.txadd[0].hash).toBe('rec1')
      expect(record.txremove[0].txHash).toBe('recRemove1')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty arrays in Txs', () => {
      const txs: Txs = {
        txadd: [],
        txremove: [],
      }
      expect(txs.txadd).toHaveLength(0)
      expect(txs.txremove).toHaveLength(0)
      expect(Array.isArray(txs.txadd)).toBe(true)
      expect(Array.isArray(txs.txremove)).toBe(true)
    })

    it('should handle empty arrays in Record', () => {
      const record: Record = {
        txadd: [],
        txremove: [],
        txlisthash: '',
      }
      expect(record.txadd).toHaveLength(0)
      expect(record.txremove).toHaveLength(0)
      expect(record.txlisthash).toBe('')
    })

    it('should handle AddNetworkTx with various data types', () => {
      const txWithString: AddNetworkTx<string> = {
        hash: 'hash1',
        type: 'message',
        txData: 'Hello World',
        cycle: 100,
        priority: 0,
      }
      expect(txWithString.txData).toBe('Hello World')

      const txWithNumber: AddNetworkTx<number> = {
        hash: 'hash2',
        type: 'number',
        txData: 42,
        cycle: 101,
        priority: 1,
      }
      expect(txWithNumber.txData).toBe(42)

      const txWithArray: AddNetworkTx<string[]> = {
        hash: 'hash3',
        type: 'array',
        txData: ['item1', 'item2', 'item3'],
        cycle: 102,
        priority: 2,
      }
      expect(txWithArray.txData).toEqual(['item1', 'item2', 'item3'])

      const txWithNull: AddNetworkTx<null> = {
        hash: 'hash4',
        type: 'null',
        txData: null,
        cycle: 103,
        priority: 3,
      }
      expect(txWithNull.txData).toBeNull()
    })

    it('should handle zero and negative priorities', () => {
      const zeroPriority: AddNetworkTx = {
        hash: 'zero',
        type: 'test',
        txData: {},
        cycle: 110,
        priority: 0,
      }
      expect(zeroPriority.priority).toBe(0)

      const negativePriority: AddNetworkTx = {
        hash: 'negative',
        type: 'test',
        txData: {},
        cycle: 111,
        priority: -10,
      }
      expect(negativePriority.priority).toBe(-10)
    })

    it('should handle large cycle numbers', () => {
      const largeCycle: AddNetworkTx = {
        hash: 'large',
        type: 'test',
        txData: {},
        cycle: Number.MAX_SAFE_INTEGER,
        priority: 1,
      }
      expect(largeCycle.cycle).toBe(Number.MAX_SAFE_INTEGER)

      const largeCycleRemove: RemoveNetworkTx = {
        txHash: 'largeRemove',
        cycle: Number.MAX_SAFE_INTEGER,
      }
      expect(largeCycleRemove.cycle).toBe(Number.MAX_SAFE_INTEGER)
    })

    it('should handle complex nested txData', () => {
      interface ComplexData {
        user: {
          id: string
          profile: {
            name: string
            settings: {
              theme: string
              notifications: boolean
            }
          }
        }
        metadata: {
          timestamp: number
          version: string
        }
      }

      const complexTx: AddNetworkTx<ComplexData> = {
        hash: 'complex',
        type: 'user-update',
        txData: {
          user: {
            id: 'user123',
            profile: {
              name: 'John Doe',
              settings: {
                theme: 'dark',
                notifications: true,
              },
            },
          },
          metadata: {
            timestamp: Date.now(),
            version: '1.0.0',
          },
        },
        cycle: 120,
        priority: 5,
      }

      expect(complexTx.txData.user.id).toBe('user123')
      expect(complexTx.txData.user.profile.name).toBe('John Doe')
      expect(complexTx.txData.user.profile.settings.theme).toBe('dark')
      expect(complexTx.txData.user.profile.settings.notifications).toBe(true)
      expect(complexTx.txData.metadata.version).toBe('1.0.0')
    })
  })

  describe('Type compatibility', () => {
    it('should allow SignedAddNetworkTx to be used as AddNetworkTx', () => {
      const signedTx: SignedAddNetworkTx = {
        hash: 'signed123',
        type: 'transfer',
        txData: { amount: 500 },
        cycle: 130,
        priority: 10,
        sign: {
          owner: 'owner123',
          sig: 'sig123',
        },
      }

      // SignedAddNetworkTx should be assignable to AddNetworkTx
      const baseTx: AddNetworkTx = signedTx
      expect(baseTx.hash).toBe('signed123')
      expect(baseTx.type).toBe('transfer')
      expect(baseTx.txData).toEqual({ amount: 500 })
      expect(baseTx.cycle).toBe(130)
      expect(baseTx.priority).toBe(10)
    })

    it('should allow SignedRemoveNetworkTx to be used as RemoveNetworkTx', () => {
      const signedRemove: SignedRemoveNetworkTx = {
        txHash: 'signedRemove123',
        cycle: 140,
        sign: {
          owner: 'remover456',
          sig: 'removeSig456',
        },
      }

      // SignedRemoveNetworkTx should be assignable to RemoveNetworkTx
      const baseRemove: RemoveNetworkTx = signedRemove
      expect(baseRemove.txHash).toBe('signedRemove123')
      expect(baseRemove.cycle).toBe(140)
    })

    it('should handle Record with mixed signed and unsigned transactions', () => {
      const record: Record = {
        txadd: [
          {
            hash: 'unsigned1',
            type: 'transfer',
            txData: { amount: 100 },
            cycle: 150,
            priority: 1,
          },
          {
            hash: 'signed1',
            type: 'stake',
            txData: { amount: 200 },
            cycle: 151,
            priority: 2,
            sign: {
              owner: 'staker1',
              sig: 'stakeSig1',
            },
          } as SignedAddNetworkTx,
        ],
        txremove: [
          { txHash: 'remove1', cycle: 152 },
          {
            txHash: 'signedRemove1',
            cycle: 153,
            sign: {
              owner: 'remover1',
              sig: 'removeSig1',
            },
          } as SignedRemoveNetworkTx,
        ],
        txlisthash: 'mixedHash123',
      }

      expect(record.txadd).toHaveLength(2)
      expect(record.txremove).toHaveLength(2)
      expect(record.txadd[0].hash).toBe('unsigned1')
      expect(record.txadd[1].hash).toBe('signed1')
    })

    it('should be serializable', () => {
      const addTx: AddNetworkTx = {
        hash: 'serial1',
        type: 'test',
        txData: { data: 'test data' },
        cycle: 160,
        priority: 5,
        subQueueKey: 'test-queue',
      }

      const removeTx: RemoveNetworkTx = {
        txHash: 'serialRemove1',
        cycle: 161,
      }

      const txs: Txs = {
        txadd: [addTx],
        txremove: [removeTx],
      }

      const serialized = JSON.stringify(txs)
      const parsed = JSON.parse(serialized)

      expect(parsed.txadd[0].hash).toBe('serial1')
      expect(parsed.txremove[0].txHash).toBe('serialRemove1')
      expect(parsed).toEqual(txs)
    })
  })
})
