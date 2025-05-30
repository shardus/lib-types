import {
  JoinedConsensor,
  JoinRequest,
  StartedSyncingRequest,
  FinishedSyncingRequest,
  StandbyRefreshRequest,
  UnjoinRequest,
  SignedUnjoinRequest,
  Txs,
  Record,
} from '../../../src/p2p/JoinTypes'

describe('JoinTypes', () => {
  describe('JoinedConsensor', () => {
    it('should have all required properties', () => {
      const consensor: JoinedConsensor = {
        publicKey: 'pubkey123',
        externalIp: '192.168.1.100',
        externalPort: 8080,
        internalIp: '10.0.0.100',
        internalPort: 9090,
        joinRequestTimestamp: 1234567890,
        activeTimestamp: 1234567900,
        activeCycle: 50,
        syncingTimestamp: 1234567895,
        readyTimestamp: 1234567898,
        address: 'node-address',
        cycleJoined: 'cycle-50',
        counterRefreshed: 75,
        id: 'unique-node-id',
      }

      expect(consensor.publicKey).toBe('pubkey123')
      expect(consensor.cycleJoined).toBe('cycle-50')
      expect(consensor.counterRefreshed).toBe(75)
      expect(consensor.id).toBe('unique-node-id')
    })

    it('should handle optional foundationNode property', () => {
      const regularNode: JoinedConsensor = {
        publicKey: 'regular',
        externalIp: '1.1.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 1,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        address: 'addr1',
        cycleJoined: 'cycle-1',
        counterRefreshed: 1,
        id: 'id1',
      }

      const foundationNode: JoinedConsensor = {
        publicKey: 'foundation',
        externalIp: '2.2.2.2',
        externalPort: 8080,
        internalIp: '10.0.0.2',
        internalPort: 9090,
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 1,
        syncingTimestamp: 1500,
        readyTimestamp: 1800,
        address: 'addr2',
        cycleJoined: 'cycle-1',
        counterRefreshed: 1,
        id: 'id2',
        foundationNode: true,
      }

      expect(regularNode.foundationNode).toBeUndefined()
      expect(foundationNode.foundationNode).toBe(true)
    })

    it('should handle edge cases for timestamps and counters', () => {
      const consensor: JoinedConsensor = {
        publicKey: 'test',
        externalIp: '0.0.0.0',
        externalPort: 0,
        internalIp: '0.0.0.0',
        internalPort: 0,
        joinRequestTimestamp: 0,
        activeTimestamp: 0,
        activeCycle: 0,
        syncingTimestamp: 0,
        readyTimestamp: 0,
        address: '',
        cycleJoined: '',
        counterRefreshed: 0,
        id: '',
      }

      expect(consensor.joinRequestTimestamp).toBe(0)
      expect(consensor.activeTimestamp).toBe(0)
      expect(consensor.counterRefreshed).toBe(0)
    })
  })

  describe('JoinRequest', () => {
    it('should have all required properties', () => {
      const request: JoinRequest = {
        nodeInfo: {
          publicKey: 'node-pubkey',
          externalIp: '3.3.3.3',
          externalPort: 8080,
          internalIp: '10.0.0.3',
          internalPort: 9090,
          joinRequestTimestamp: Date.now(),
          activeTimestamp: Date.now() + 1000,
          activeCycle: 100,
          syncingTimestamp: Date.now() + 500,
          readyTimestamp: Date.now() + 800,
          address: 'node-addr',
        },
        selectionNum: '123456',
        cycleMarker: 'cycle-marker-100',
        proofOfWork: 'pow-result-hash',
        version: '1.0.0',
        sign: {
          sig: 'request-signature',
          owner: 'owner-key',
        },
      }

      expect(request.nodeInfo).toBeDefined()
      expect(request.selectionNum).toBe('123456')
      expect(request.cycleMarker).toBe('cycle-marker-100')
      expect(request.proofOfWork).toBe('pow-result-hash')
      expect(request.version).toBe('1.0.0')
      expect(request.sign).toBeDefined()
    })

    it('should handle optional appJoinData', () => {
      const requestWithoutData: JoinRequest = {
        nodeInfo: {
          publicKey: 'key1',
          externalIp: '1.1.1.1',
          externalPort: 8080,
          internalIp: '10.0.0.1',
          internalPort: 9090,
          joinRequestTimestamp: 1000,
          activeTimestamp: 2000,
          activeCycle: 1,
          syncingTimestamp: 1500,
          readyTimestamp: 1800,
          address: 'addr1',
        },
        selectionNum: '1',
        cycleMarker: 'cycle1',
        proofOfWork: 'pow1',
        version: '1.0.0',
        sign: { sig: 'sig1', owner: 'owner1' },
      }

      const requestWithData: JoinRequest = {
        nodeInfo: {
          publicKey: 'key2',
          externalIp: '2.2.2.2',
          externalPort: 8080,
          internalIp: '10.0.0.2',
          internalPort: 9090,
          joinRequestTimestamp: 1000,
          activeTimestamp: 2000,
          activeCycle: 2,
          syncingTimestamp: 1500,
          readyTimestamp: 1800,
          address: 'addr2',
        },
        selectionNum: '2',
        cycleMarker: 'cycle2',
        proofOfWork: 'pow2',
        version: '1.0.0',
        sign: { sig: 'sig2', owner: 'owner2' },
        appJoinData: { goldenTicket: true, metadata: { tier: 'premium' } },
      }

      expect(requestWithoutData.appJoinData).toBeUndefined()
      expect(requestWithData.appJoinData).toEqual({
        goldenTicket: true,
        metadata: { tier: 'premium' },
      })
    })
  })

  describe('StartedSyncingRequest', () => {
    it('should have required properties', () => {
      const request: StartedSyncingRequest = {
        nodeId: 'standby-node-pubkey',
        cycleNumber: 150,
      }

      expect(request.nodeId).toBe('standby-node-pubkey')
      expect(request.cycleNumber).toBe(150)
    })

    it('should handle optional signature', () => {
      const unsigned: StartedSyncingRequest = {
        nodeId: 'node1',
        cycleNumber: 100,
      }

      const signed: StartedSyncingRequest = {
        nodeId: 'node2',
        cycleNumber: 200,
        sign: { sig: 'signature', owner: 'owner' },
      }

      expect(unsigned.sign).toBeUndefined()
      expect(signed.sign).toBeDefined()
      expect(signed.sign?.sig).toBe('signature')
    })
  })

  describe('FinishedSyncingRequest', () => {
    it('should have required properties', () => {
      const request: FinishedSyncingRequest = {
        nodeId: 'synced-node-id',
        cycleNumber: 175,
      }

      expect(request.nodeId).toBe('synced-node-id')
      expect(request.cycleNumber).toBe(175)
    })

    it('should handle optional signature', () => {
      const request: FinishedSyncingRequest = {
        nodeId: 'node-id',
        cycleNumber: 0,
        sign: { sig: 'finished-sig', owner: 'node-owner' },
      }

      expect(request.sign).toBeDefined()
      expect(request.cycleNumber).toBe(0)
    })
  })

  describe('StandbyRefreshRequest', () => {
    it('should have required properties', () => {
      const request: StandbyRefreshRequest = {
        publicKey: 'standby-pubkey',
        cycleNumber: 500,
      }

      expect(request.publicKey).toBe('standby-pubkey')
      expect(request.cycleNumber).toBe(500)
    })

    it('should handle edge cases', () => {
      const request: StandbyRefreshRequest = {
        publicKey: '',
        cycleNumber: Number.MAX_SAFE_INTEGER,
        sign: { sig: '', owner: '' },
      }

      expect(request.publicKey).toBe('')
      expect(request.cycleNumber).toBe(Number.MAX_SAFE_INTEGER)
      expect(request.sign?.sig).toBe('')
    })
  })

  describe('UnjoinRequest and SignedUnjoinRequest', () => {
    it('should have required properties for UnjoinRequest', () => {
      const request: UnjoinRequest = {
        publicKey: 'leaving-node-key',
        cycleNumber: 999,
      }

      expect(request.publicKey).toBe('leaving-node-key')
      expect(request.cycleNumber).toBe(999)
    })

    it('should extend UnjoinRequest with SignedObject for SignedUnjoinRequest', () => {
      const signedRequest: SignedUnjoinRequest = {
        publicKey: 'leaving-node',
        cycleNumber: 1000,
        sign: {
          sig: 'unjoin-signature',
          owner: 'node-owner',
        },
      }

      expect(signedRequest.publicKey).toBe('leaving-node')
      expect(signedRequest.cycleNumber).toBe(1000)
      expect(signedRequest.sign.sig).toBe('unjoin-signature')
      expect(signedRequest.sign.owner).toBe('node-owner')
    })
  })

  describe('Txs', () => {
    it('should have all transaction arrays', () => {
      const txs: Txs = {
        standbyAdd: [],
        startedSyncing: [],
        finishedSyncing: [],
        standbyRefresh: [],
        standbyRemove: [],
      }

      expect(txs.standbyAdd).toEqual([])
      expect(txs.startedSyncing).toEqual([])
      expect(txs.finishedSyncing).toEqual([])
      expect(txs.standbyRefresh).toEqual([])
      expect(txs.standbyRemove).toEqual([])
    })

    it('should handle populated transaction arrays', () => {
      const txs: Txs = {
        standbyAdd: [
          {
            nodeInfo: {
              publicKey: 'new-node',
              externalIp: '1.1.1.1',
              externalPort: 8080,
              internalIp: '10.0.0.1',
              internalPort: 9090,
              joinRequestTimestamp: 1000,
              activeTimestamp: 2000,
              activeCycle: 10,
              syncingTimestamp: 1500,
              readyTimestamp: 1800,
              address: 'addr',
            },
            selectionNum: '123',
            cycleMarker: 'cycle1',
            proofOfWork: 'pow',
            version: '1.0',
            sign: { sig: 'sig', owner: 'owner' },
          },
        ],
        startedSyncing: [
          { nodeId: 'node1', cycleNumber: 10 },
          { nodeId: 'node2', cycleNumber: 11, sign: { sig: 'sig', owner: 'owner' } },
        ],
        finishedSyncing: [{ nodeId: 'node3', cycleNumber: 12 }],
        standbyRefresh: [{ publicKey: 'standby1', cycleNumber: 15 }],
        standbyRemove: [{ publicKey: 'remove1', cycleNumber: 20, sign: { sig: 'sig1', owner: 'owner1' } }],
      }

      expect(txs.standbyAdd).toHaveLength(1)
      expect(txs.startedSyncing).toHaveLength(2)
      expect(txs.finishedSyncing).toHaveLength(1)
      expect(txs.standbyRefresh).toHaveLength(1)
      expect(txs.standbyRemove).toHaveLength(1)
    })
  })

  describe('Record', () => {
    it('should have all required properties', () => {
      const record: Record = {
        syncing: 5,
        joinedConsensors: [],
      }

      expect(record.syncing).toBe(5)
      expect(record.joinedConsensors).toEqual([])
    })

    it('should handle all optional properties', () => {
      const record: Record = {
        syncing: 0,
        joinedConsensors: [
          {
            publicKey: 'joined1',
            externalIp: '1.1.1.1',
            externalPort: 8080,
            internalIp: '10.0.0.1',
            internalPort: 9090,
            joinRequestTimestamp: 1000,
            activeTimestamp: 2000,
            activeCycle: 1,
            syncingTimestamp: 1500,
            readyTimestamp: 1800,
            address: 'addr',
            cycleJoined: 'cycle1',
            counterRefreshed: 1,
            id: 'id1',
          },
        ],
        standbyAdd: [
          {
            nodeInfo: {
              publicKey: 'standby1',
              externalIp: '2.2.2.2',
              externalPort: 8080,
              internalIp: '10.0.0.2',
              internalPort: 9090,
              joinRequestTimestamp: 3000,
              activeTimestamp: 4000,
              activeCycle: 2,
              syncingTimestamp: 3500,
              readyTimestamp: 3800,
              address: 'addr2',
            },
            selectionNum: '456',
            cycleMarker: 'cycle2',
            proofOfWork: 'pow2',
            version: '1.0',
            sign: { sig: 'sig2', owner: 'owner2' },
          },
        ],
        standbyRemove: ['0xabc123', '0xdef456'],
        startedSyncing: ['0x111', '0x222'],
        lostAfterSelection: ['0x333'],
        finishedSyncing: ['0x444', '0x555'],
        standbyRefresh: ['0x666', '0x777', '0x888'],
      }

      expect(record.standbyAdd).toHaveLength(1)
      expect(record.standbyRemove).toEqual(['0xabc123', '0xdef456'])
      expect(record.startedSyncing).toEqual(['0x111', '0x222'])
      expect(record.lostAfterSelection).toEqual(['0x333'])
      expect(record.finishedSyncing).toEqual(['0x444', '0x555'])
      expect(record.standbyRefresh).toHaveLength(3)
    })

    it('should handle empty optional arrays', () => {
      const record: Record = {
        syncing: 10,
        joinedConsensors: [],
        standbyAdd: [],
        standbyRemove: [],
        startedSyncing: [],
        lostAfterSelection: [],
        finishedSyncing: [],
        standbyRefresh: [],
      }

      expect(record.standbyAdd).toEqual([])
      expect(record.standbyRemove).toEqual([])
      expect(record.startedSyncing).toEqual([])
      expect(record.lostAfterSelection).toEqual([])
      expect(record.finishedSyncing).toEqual([])
      expect(record.standbyRefresh).toEqual([])
    })

    it('should handle hex strings in arrays', () => {
      const record: Record = {
        syncing: 1,
        joinedConsensors: [],
        standbyRemove: ['0x0', '0xffffffff', '0xABCDEF'],
        finishedSyncing: ['0x123456789abcdef'],
      }

      expect(record.standbyRemove).toContain('0x0')
      expect(record.standbyRemove).toContain('0xffffffff')
      expect(record.standbyRemove).toContain('0xABCDEF')
      expect(record.finishedSyncing?.[0]).toBe('0x123456789abcdef')
    })
  })
})
