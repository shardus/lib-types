import { Node, Update } from '../../../src/p2p/NodeListTypes'
import { NodeStatus } from '../../../src/p2p/P2PTypes'

describe('NodeListTypes', () => {
  describe('Node', () => {
    it('should handle complete Node structure', () => {
      const node: Node = {
        // JoinedConsensor properties
        publicKey: 'public-key-123',
        externalIp: '192.168.1.100',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        address: '0x1234567890abcdef',
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567900,
        activeCycle: 100,
        syncingTimestamp: 1234567895,
        readyTimestamp: 1234567898,
        cycleJoined: 'cycle-marker-100',
        counterRefreshed: 50,
        id: 'node-id-123',
        // Node specific properties
        curvePublicKey: 'curve-public-key-456',
        status: NodeStatus.ACTIVE,
      }

      expect(node.publicKey).toBe('public-key-123')
      expect(node.curvePublicKey).toBe('curve-public-key-456')
      expect(node.status).toBe(NodeStatus.ACTIVE)
      expect(node.id).toBe('node-id-123')
      expect(node.refuteCycles).toBeUndefined()
    })

    it('should handle Node with refuteCycles', () => {
      const node: Node = {
        publicKey: 'pub-key',
        externalIp: '1.2.3.4',
        externalPort: 8000,
        internalIp: '10.0.0.1',
        internalPort: 9000,
        address: '0xabc',
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 10,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        cycleJoined: 'cycle-10',
        counterRefreshed: 5,
        id: 'node-1',
        curvePublicKey: 'curve-key',
        status: NodeStatus.READY,
        refuteCycles: [101, 102, 103],
      }

      expect(node.refuteCycles).toEqual([101, 102, 103])
      expect(node.refuteCycles).toHaveLength(3)
    })

    it('should handle Node with optional refreshedCounter', () => {
      const node: Node = {
        publicKey: 'key',
        externalIp: '127.0.0.1',
        externalPort: 3000,
        internalIp: '127.0.0.1',
        internalPort: 3001,
        address: '0x123',
        joinRequestTimestamp: 100,
        activeTimestamp: 200,
        activeCycle: 1,
        syncingTimestamp: 150,
        readyTimestamp: 190,
        refreshedCounter: 10,
        cycleJoined: 'cycle-1',
        counterRefreshed: 0,
        id: 'id',
        curvePublicKey: 'curve',
        status: NodeStatus.SYNCING,
      }

      expect(node.refreshedCounter).toBe(10)
    })

    it('should handle Node with foundationNode flag', () => {
      const node: Node = {
        publicKey: 'foundation-key',
        externalIp: '8.8.8.8',
        externalPort: 443,
        internalIp: '10.0.0.1',
        internalPort: 444,
        address: '0xfoundation',
        joinRequestTimestamp: 0,
        activeTimestamp: 1,
        activeCycle: 0,
        syncingTimestamp: 0,
        readyTimestamp: 1,
        cycleJoined: 'genesis',
        counterRefreshed: 0,
        id: 'foundation-1',
        foundationNode: true,
        curvePublicKey: 'foundation-curve',
        status: NodeStatus.ACTIVE,
      }

      expect(node.foundationNode).toBe(true)
    })

    it('should handle all NodeStatus values', () => {
      const statuses = [
        NodeStatus.INITIALIZING,
        NodeStatus.STANDBY,
        NodeStatus.SELECTED,
        NodeStatus.SYNCING,
        NodeStatus.READY,
        NodeStatus.ACTIVE,
      ]

      statuses.forEach((status) => {
        const node: Node = {
          publicKey: 'key',
          externalIp: '1.1.1.1',
          externalPort: 1234,
          internalIp: '10.0.0.1',
          internalPort: 1235,
          address: '0x111',
          joinRequestTimestamp: 1000,
          activeTimestamp: 2000,
          activeCycle: 5,
          syncingTimestamp: 1500,
          readyTimestamp: 1900,
          cycleJoined: 'cycle-5',
          counterRefreshed: 1,
          id: `node-${status}`,
          curvePublicKey: 'curve',
          status: status,
        }

        expect(node.status).toBe(status)
      })
    })

    it('should handle empty refuteCycles array', () => {
      const node: Node = {
        publicKey: 'key',
        externalIp: '1.1.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        address: '0x123',
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 10,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        cycleJoined: 'cycle-10',
        counterRefreshed: 5,
        id: 'node-1',
        curvePublicKey: 'curve',
        status: NodeStatus.ACTIVE,
        refuteCycles: [],
      }

      expect(node.refuteCycles).toEqual([])
      expect(node.refuteCycles).toHaveLength(0)
    })
  })

  describe('Update', () => {
    it('should require only id field', () => {
      const update: Update = {
        id: 'node-123',
      }

      expect(update.id).toBe('node-123')
      expect(update.publicKey).toBeUndefined()
      expect(update.status).toBeUndefined()
    })

    it('should allow partial updates with id', () => {
      const update: Update = {
        id: 'update-node',
        status: NodeStatus.ACTIVE,
        curvePublicKey: 'new-curve-key',
      }

      expect(update.id).toBe('update-node')
      expect(update.status).toBe(NodeStatus.ACTIVE)
      expect(update.curvePublicKey).toBe('new-curve-key')
      expect(update.publicKey).toBeUndefined()
    })

    it('should allow updating all fields', () => {
      const update: Update = {
        id: 'full-update',
        publicKey: 'new-public-key',
        externalIp: '2.2.2.2',
        externalPort: 8888,
        internalIp: '10.0.0.2',
        internalPort: 9999,
        address: '0xnewaddress',
        joinRequestTimestamp: 2000,
        activeTimestamp: 3000,
        activeCycle: 200,
        syncingTimestamp: 2500,
        readyTimestamp: 2900,
        refreshedCounter: 20,
        cycleJoined: 'cycle-200',
        counterRefreshed: 100,
        foundationNode: false,
        curvePublicKey: 'new-curve',
        status: NodeStatus.READY,
        refuteCycles: [201, 202],
      }

      expect(update.id).toBe('full-update')
      expect(update.publicKey).toBe('new-public-key')
      expect(update.externalPort).toBe(8888)
      expect(update.refuteCycles).toEqual([201, 202])
    })

    it('should handle status-only update', () => {
      const update: Update = {
        id: 'status-update-node',
        status: NodeStatus.SYNCING,
      }

      expect(update.id).toBe('status-update-node')
      expect(update.status).toBe(NodeStatus.SYNCING)
      expect(Object.keys(update)).toHaveLength(2)
    })

    it('should handle timestamp updates', () => {
      const now = Date.now()
      const update: Update = {
        id: 'timestamp-node',
        syncingTimestamp: now,
        readyTimestamp: now + 1000,
        activeTimestamp: now + 2000,
      }

      expect(update.syncingTimestamp).toBe(now)
      expect(update.readyTimestamp).toBe(now + 1000)
      expect(update.activeTimestamp).toBe(now + 2000)
    })

    it('should handle network configuration updates', () => {
      const update: Update = {
        id: 'network-update',
        externalIp: '3.3.3.3',
        externalPort: 7777,
        internalIp: '172.16.0.1',
        internalPort: 7778,
      }

      expect(update.externalIp).toBe('3.3.3.3')
      expect(update.externalPort).toBe(7777)
      expect(update.internalIp).toBe('172.16.0.1')
      expect(update.internalPort).toBe(7778)
    })

    it('should handle refuteCycles update', () => {
      const update: Update = {
        id: 'refute-update',
        refuteCycles: [300, 301, 302, 303, 304],
      }

      expect(update.refuteCycles).toHaveLength(5)
      expect(update.refuteCycles![2]).toBe(302)
    })

    it('should handle minimal update with empty string id', () => {
      const update: Update = {
        id: '',
      }

      expect(update.id).toBe('')
    })
  })

  describe('Type utilities', () => {
    it('should handle Node as Update', () => {
      const node: Node = {
        publicKey: 'key',
        externalIp: '1.1.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        address: '0x123',
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 10,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        cycleJoined: 'cycle-10',
        counterRefreshed: 5,
        id: 'node-1',
        curvePublicKey: 'curve',
        status: NodeStatus.ACTIVE,
      }

      // A Node should be usable as an Update since Update is a partial Node with required id
      const update: Update = node
      expect(update.id).toBe('node-1')
    })
  })
})
