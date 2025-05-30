import { UnfinshedCycle } from '../../../src/p2p/CycleChainTypes'
import { CycleRecord } from '../../../src/p2p/CycleCreatorTypes'

describe('CycleChainTypes', () => {
  describe('Type exports', () => {
    it('should handle UnfinshedCycle structure', () => {
      const mockCycleRecord: CycleRecord = {
        counter: 1,
        mode: 'processing',
        previous: 'prevHash',
        start: 1234567890,
        duration: 60,
        networkId: 'network1',
        networkConfigHash: 'configHash',
        active: 2,
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
        refreshedArchivers: [],
        refreshedConsensors: [],
        refuted: [],
        removed: [],
        returned: [],
        safetyMode: false,
        safetyNum: 0,
        networkStateHash: 'stateHash',
        nodeListHash: 'nodeListHash',
        archiverListHash: 'archiverListHash',
        standbyNodeListHash: 'standbyNodeListHash',
        random: 0.5,
        leavingArchivers: [],
        archiversAtShutdown: [],
        maxSyncTime: 1000,
        syncing: 0,
        standby: 0,
        expired: 0,
        networkDataHash: [],
        networkReceiptHash: [],
        networkSummaryHash: [],
        target: 10,
        refutedArchivers: [],
        removedArchivers: [],
        txadd: [],
        txremove: [],
        txlisthash: '',
      }

      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          version: '1.0',
          timestamp: Date.now(),
          status: 'processing',
        },
        updates: {
          addedNodes: ['node3', 'node4'],
          removedNodes: ['node1'],
          configChanges: {
            maxNodes: 100,
            minNodes: 10,
          },
        },
        data: mockCycleRecord,
      }

      expect(unfinishedCycle.metadata).toBeDefined()
      expect(unfinishedCycle.updates).toBeDefined()
      expect(unfinishedCycle.data).toBeDefined()
      expect(unfinishedCycle.data.counter).toBe(1)
    })

    it('should handle empty metadata and updates in UnfinshedCycle', () => {
      const mockCycleRecord: CycleRecord = {
        counter: 2,
        mode: 'recovery',
        previous: 'prevHash2',
        start: 9876543210,
        duration: 30,
        networkId: 'network2',
        networkConfigHash: 'configHash2',
        active: 0,
        apoptosized: [],
        appRemoved: [],
        activated: [],
        activatedPublicKeys: [],
        desired: 5,
        joined: [],
        joinedArchivers: [],
        joinedConsensors: [],
        lost: [],
        lostArchivers: [],
        lostSyncing: [],
        refreshedArchivers: [],
        refreshedConsensors: [],
        refuted: [],
        removed: [],
        returned: [],
        safetyMode: false,
        safetyNum: 0,
        networkStateHash: 'stateHash2',
        nodeListHash: 'nodeListHash2',
        archiverListHash: 'archiverListHash2',
        standbyNodeListHash: 'standbyNodeListHash2',
        random: 0.7,
        leavingArchivers: [],
        archiversAtShutdown: [],
        maxSyncTime: 1000,
        syncing: 0,
        standby: 0,
        expired: 0,
        networkDataHash: [],
        networkReceiptHash: [],
        networkSummaryHash: [],
        target: 10,
        refutedArchivers: [],
        removedArchivers: [],
        txadd: [],
        txremove: [],
        txlisthash: '',
      }

      const unfinishedCycle: UnfinshedCycle = {
        metadata: {},
        updates: {},
        data: mockCycleRecord,
      }

      expect(Object.keys(unfinishedCycle.metadata)).toHaveLength(0)
      expect(Object.keys(unfinishedCycle.updates)).toHaveLength(0)
      expect(unfinishedCycle.data.counter).toBe(2)
      expect(unfinishedCycle.data.mode).toBe('recovery')
    })

    it('should handle nested LooseObject properties', () => {
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          deeply: {
            nested: {
              property: 'value',
              array: [1, 2, 3],
              boolean: true,
            },
          },
        },
        updates: {
          complex: {
            update: {
              nodes: ['a', 'b', 'c'],
              configs: {
                timeout: 5000,
                retries: 3,
              },
            },
          },
        },
        data: {} as CycleRecord,
      }

      expect(unfinishedCycle.metadata.deeply).toBeDefined()
      expect((unfinishedCycle.metadata.deeply as any).nested.property).toBe('value')
      expect(unfinishedCycle.updates.complex).toBeDefined()
      expect((unfinishedCycle.updates.complex as any).update.configs.timeout).toBe(5000)
    })
  })

  describe('Edge cases', () => {
    it('should handle UnfinshedCycle with null and undefined values in LooseObject', () => {
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          nullValue: null,
          undefinedValue: undefined,
          validValue: 'test',
        },
        updates: {
          mixedTypes: {
            string: 'text',
            number: 42,
            boolean: false,
            null: null,
            array: [null, undefined, 'value'],
          },
        },
        data: {} as CycleRecord,
      }

      expect(unfinishedCycle.metadata.nullValue).toBeNull()
      expect(unfinishedCycle.metadata.undefinedValue).toBeUndefined()
      expect(unfinishedCycle.metadata.validValue).toBe('test')
      expect((unfinishedCycle.updates.mixedTypes as any).array).toContain(null)
      expect((unfinishedCycle.updates.mixedTypes as any).array).toContain(undefined)
    })

    it('should handle UnfinshedCycle with array values in LooseObject', () => {
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          simpleArray: [1, 2, 3],
          mixedArray: ['string', 123, true, null],
          nestedArray: [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        },
        updates: {
          arrayOperations: {
            added: ['item1', 'item2'],
            removed: ['item3'],
            modified: [
              { id: 1, change: 'updated' },
              { id: 2, change: 'deleted' },
            ],
          },
        },
        data: {} as CycleRecord,
      }

      expect(Array.isArray(unfinishedCycle.metadata.simpleArray)).toBe(true)
      expect((unfinishedCycle.metadata.simpleArray as number[]).length).toBe(3)
      expect((unfinishedCycle.metadata.mixedArray as any[])[2]).toBe(true)
      expect((unfinishedCycle.metadata.nestedArray as number[][])[0][0]).toBe(1)
    })

    it('should handle UnfinshedCycle with function values in LooseObject', () => {
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          callback: () => 'result',
          asyncFunc: async () => 'async result',
          namedFunction: function test() {
            return 'named'
          },
        },
        updates: {
          handlers: {
            onClick: () => console.log('clicked'),
            onError: (err: any) => console.error(err),
          },
        },
        data: {} as CycleRecord,
      }

      expect(typeof unfinishedCycle.metadata.callback).toBe('function')
      expect(typeof unfinishedCycle.metadata.asyncFunc).toBe('function')
      expect(typeof unfinishedCycle.metadata.namedFunction).toBe('function')
      expect(typeof (unfinishedCycle.updates.handlers as any).onClick).toBe('function')
    })

    it('should handle UnfinshedCycle with Symbol and BigInt values', () => {
      const symbolKey = Symbol('test')
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          bigNumber: BigInt(9007199254740991),
          symbolValue: symbolKey,
          [symbolKey]: 'symbol keyed value',
        },
        updates: {
          largeNumbers: {
            maxSafeInt: Number.MAX_SAFE_INTEGER,
            bigInt: BigInt('123456789012345678901234567890'),
          },
        },
        data: {} as CycleRecord,
      }

      expect(typeof unfinishedCycle.metadata.bigNumber).toBe('bigint')
      expect(typeof unfinishedCycle.metadata.symbolValue).toBe('symbol')
      expect((unfinishedCycle.metadata as any)[symbolKey]).toBe('symbol keyed value')
    })
  })

  describe('Type flexibility', () => {
    it('should allow any structure in metadata and updates', () => {
      // Testing that LooseObject allows any structure
      const unfinishedCycle: UnfinshedCycle = {
        metadata: {
          customField1: 'value1',
          customField2: 123,
          customField3: {
            nested: true,
            level: 2,
          },
          'special-key': 'special-value',
          123: 'numeric key',
        },
        updates: {
          timestamp: Date.now(),
          changes: new Map([
            ['key1', 'value1'],
            ['key2', 'value2'],
          ]),
          buffer: Buffer.from('test'),
          date: new Date(),
          regex: /test/gi,
        },
        data: {} as CycleRecord,
      }

      expect(unfinishedCycle.metadata.customField1).toBe('value1')
      expect(unfinishedCycle.metadata['special-key']).toBe('special-value')
      expect(unfinishedCycle.metadata[123]).toBe('numeric key')
      expect(unfinishedCycle.updates.changes instanceof Map).toBe(true)
      expect(unfinishedCycle.updates.buffer instanceof Buffer).toBe(true)
      expect(unfinishedCycle.updates.regex instanceof RegExp).toBe(true)
    })
  })
})
