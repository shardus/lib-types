import { Change } from '../../../src/p2p/CycleParserTypes'
import { JoinedConsensor } from '../../../src/p2p/JoinTypes'
import { Update } from '../../../src/p2p/NodeListTypes'

describe('CycleParserTypes', () => {
  describe('Change', () => {
    it('should have all required properties', () => {
      const change: Change = {
        added: [],
        removed: [],
        updated: [],
      }

      expect(change.added).toBeDefined()
      expect(change.removed).toBeDefined()
      expect(change.updated).toBeDefined()
    })

    it('should handle empty arrays', () => {
      const change: Change = {
        added: [],
        removed: [],
        updated: [],
      }

      expect(change.added).toEqual([])
      expect(change.removed).toEqual([])
      expect(change.updated).toEqual([])
    })

    it('should handle populated added array with JoinedConsensors', () => {
      const joinedConsensors: JoinedConsensor[] = [
        {
          publicKey: 'pubkey1',
          externalIp: '192.168.1.1',
          externalPort: 8080,
          internalIp: '10.0.0.1',
          internalPort: 9090,
          joinRequestTimestamp: 1234567890,
          activeTimestamp: 1234567900,
          activeCycle: 100,
          syncingTimestamp: 1234567895,
          readyTimestamp: 1234567898,
          cycleJoined: 'cycle-1',
          counterRefreshed: 10,
          id: 'node-id-1',
          address: 'address1',
        },
        {
          publicKey: 'pubkey2',
          externalIp: '192.168.1.2',
          externalPort: 8080,
          internalIp: '10.0.0.2',
          internalPort: 9090,
          joinRequestTimestamp: 1234567891,
          activeTimestamp: 1234567901,
          activeCycle: 101,
          syncingTimestamp: 1234567896,
          readyTimestamp: 1234567899,
          cycleJoined: 'cycle-2',
          counterRefreshed: 11,
          id: 'node-id-2',
          address: 'address2',
          foundationNode: true,
        },
      ]

      const change: Change = {
        added: joinedConsensors,
        removed: [],
        updated: [],
      }

      expect(change.added).toHaveLength(2)
      expect(change.added[0].publicKey).toBe('pubkey1')
      expect(change.added[1].foundationNode).toBe(true)
    })

    it('should handle removed array with node IDs', () => {
      const nodeIds = ['node-1', 'node-2', 'node-3']

      const change: Change = {
        added: [],
        removed: nodeIds,
        updated: [],
      }

      expect(change.removed).toHaveLength(3)
      expect(change.removed).toEqual(['node-1', 'node-2', 'node-3'])
    })

    it('should handle updated array with Update objects', () => {
      const updates: Update[] = [
        {
          id: 'node-1',
          status: 'active' as any,
          curvePublicKey: 'curve-key-1',
        },
        {
          id: 'node-2',
          publicKey: 'updated-pubkey',
          externalPort: 8081,
        },
      ]

      const change: Change = {
        added: [],
        removed: [],
        updated: updates,
      }

      expect(change.updated).toHaveLength(2)
      expect(change.updated[0].status).toBe('active')
      expect(change.updated[1].publicKey).toBe('updated-pubkey')
    })

    it('should handle all arrays populated simultaneously', () => {
      const change: Change = {
        added: [
          {
            publicKey: 'new-node',
            externalIp: '1.1.1.1',
            externalPort: 8080,
            internalIp: '10.0.0.1',
            internalPort: 9090,
            joinRequestTimestamp: Date.now(),
            activeTimestamp: Date.now() + 1000,
            activeCycle: 10,
            syncingTimestamp: Date.now() + 500,
            readyTimestamp: Date.now() + 800,
            cycleJoined: 'cycle-10',
            counterRefreshed: 5,
            id: 'new-node-id',
            address: 'new-address',
          },
        ],
        removed: ['old-node-1', 'old-node-2'],
        updated: [{ id: 'existing-node', status: 'syncing' as any }],
      }

      expect(change.added).toHaveLength(1)
      expect(change.removed).toHaveLength(2)
      expect(change.updated).toHaveLength(1)
    })

    it('should maintain order in added array (oldest to newest)', () => {
      const oldNode: JoinedConsensor = {
        publicKey: 'old',
        externalIp: '1.1.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 1,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        cycleJoined: 'cycle-1',
        counterRefreshed: 1,
        id: 'old-id',
        address: 'old-addr',
      }

      const newNode: JoinedConsensor = {
        publicKey: 'new',
        externalIp: '2.2.2.2',
        externalPort: 8080,
        internalIp: '10.0.0.2',
        internalPort: 9090,
        joinRequestTimestamp: 5000,
        activeTimestamp: 6000,
        activeCycle: 5,
        syncingTimestamp: 5500,
        readyTimestamp: 5800,
        cycleJoined: 'cycle-5',
        counterRefreshed: 5,
        id: 'new-id',
        address: 'new-addr',
      }

      const change: Change = {
        added: [oldNode, newNode], // Should be ordered by joinRequestTimestamp
        removed: [],
        updated: [],
      }

      expect(change.added[0].joinRequestTimestamp).toBeLessThan(change.added[1].joinRequestTimestamp)
    })

    it('should handle edge cases with special characters in IDs', () => {
      const change: Change = {
        added: [],
        removed: ['node-with-special-chars-!@#$%', 'node_with_underscores', 'node.with.dots'],
        updated: [
          { id: 'special!@#$', externalPort: null as any },
          { id: 'unicode-节点', internalPort: undefined },
        ],
      }

      expect(change.removed).toContain('node-with-special-chars-!@#$%')
      expect(change.updated[0].externalPort).toBeNull()
      expect(change.updated[1].internalPort).toBeUndefined()
    })
  })
})
