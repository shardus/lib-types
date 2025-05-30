import {
  NodeStatus,
  NodeInfo,
  P2PNode,
  SignedObject,
  Node,
  Route,
  InternalHandler,
  GossipHandler,
} from '../../../src/p2p/P2PTypes'

describe('P2PTypes', () => {
  describe('NodeStatus enum', () => {
    it('should have correct values for all node statuses', () => {
      expect(NodeStatus.INITIALIZING).toBe('initializing')
      expect(NodeStatus.STANDBY).toBe('standby')
      expect(NodeStatus.SELECTED).toBe('selected')
      expect(NodeStatus.SYNCING).toBe('syncing')
      expect(NodeStatus.READY).toBe('ready')
      expect(NodeStatus.ACTIVE).toBe('active')
    })

    it('should have all expected status keys', () => {
      const expectedKeys = ['INITIALIZING', 'STANDBY', 'SELECTED', 'SYNCING', 'READY', 'ACTIVE']
      const actualKeys = Object.keys(NodeStatus)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('should have all expected status values', () => {
      const expectedValues = ['initializing', 'standby', 'selected', 'syncing', 'ready', 'active']
      const actualValues = Object.values(NodeStatus)
      expect(actualValues).toEqual(expectedValues)
    })
  })

  describe('Type exports', () => {
    it('should export LooseObject type', () => {
      const obj: Record<string, unknown> = { foo: 'bar', baz: 123 }
      expect(obj).toBeDefined()
    })

    it('should handle SignedObject type structure', () => {
      const signedObj: SignedObject = {
        data: 'test',
        sign: {
          owner: '0x123',
          sig: 'signature123',
        },
      }
      expect(signedObj.sign.owner).toBe('0x123')
      expect(signedObj.sign.sig).toBe('signature123')
    })

    it('should handle P2PNode structure', () => {
      const node: P2PNode = {
        publicKey: 'pubkey123',
        externalIp: '192.168.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 8081,
        address: '0xabc123',
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567891,
        activeCycle: 1,
        syncingTimestamp: 1234567892,
        readyTimestamp: 1234567893,
        refreshedCounter: 5,
      }
      expect(node.publicKey).toBe('pubkey123')
      expect(node.refreshedCounter).toBe(5)
    })

    it('should handle Node structure', () => {
      const node: Node = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'pubkey123',
      }
      expect(node.ip).toBe('192.168.1.1')
      expect(node.port).toBe(8080)
      expect(node.publicKey).toBe('pubkey123')
    })

    it('should handle NodeInfo structure with enum', () => {
      const nodeInfo: NodeInfo = {
        curvePublicKey: 'curvePubKey123',
        externalIp: '192.168.1.1',
        externalPort: 8080,
        id: 'node123',
        internalIp: '10.0.0.1',
        internalPort: 8081,
        publicKey: 'pubkey123',
        status: NodeStatus.ACTIVE,
      }
      expect(nodeInfo.status).toBe('active')
      expect(nodeInfo.id).toBe('node123')
    })

    it('should handle Route structure', () => {
      const route: Route<(req: any, res: any) => void> = {
        method: 'GET',
        name: 'test-route',
        handler: (req, res) => res.send('OK'),
      }
      expect(route.method).toBe('GET')
      expect(route.name).toBe('test-route')
      expect(typeof route.handler).toBe('function')
    })

    it('should handle InternalHandler type', () => {
      const handler: InternalHandler<{ data: string }, { success: boolean }, { id: string }> = (
        payload,
        respond,
        sender,
        tracker,
        msgSize
      ) => {
        expect(payload.data).toBeDefined()
        expect(sender.id).toBeDefined()
        expect(tracker).toBeDefined()
        expect(msgSize).toBeDefined()
        respond({ success: true })
      }

      // Test handler parameters
      handler({ data: 'test' }, () => {}, { id: 'sender1' }, 'tracker123', 100)
    })

    it('should handle GossipHandler type', () => {
      const handler: GossipHandler<{ message: string }, { id: string }> = (payload, sender, tracker, msgSize) => {
        expect(payload.message).toBeDefined()
        expect(sender.id).toBeDefined()
        expect(tracker).toBeDefined()
        expect(msgSize).toBeDefined()
      }

      // Test handler parameters
      handler({ message: 'gossip' }, { id: 'sender1' }, 'tracker123', 50)
    })
  })

  describe('Optional fields', () => {
    it('should handle P2PNode with optional refreshedCounter', () => {
      const nodeWithoutCounter: P2PNode = {
        publicKey: 'pubkey123',
        externalIp: '192.168.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 8081,
        address: '0xabc123',
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567891,
        activeCycle: 1,
        syncingTimestamp: 1234567892,
        readyTimestamp: 1234567893,
      }
      expect(nodeWithoutCounter.refreshedCounter).toBeUndefined()
    })

    it('should handle Route with optional method', () => {
      const routeWithoutMethod: Route<() => void> = {
        name: 'test-route',
        handler: () => {},
      }
      expect(routeWithoutMethod.method).toBeUndefined()
      expect(routeWithoutMethod.name).toBe('test-route')
    })
  })
})
