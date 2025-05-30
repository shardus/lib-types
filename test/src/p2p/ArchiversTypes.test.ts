import {
  RequestTypes,
  DataRequest,
  DataResponse,
  DataRecipient,
  JoinedArchiver,
  Request,
  Txs,
  Record,
  RestartCycleRecord,
} from '../../../src/p2p/ArchiversTypes'
import { TypeNames } from '../../../src/p2p/SnapshotTypes'
import { CycleRecord } from '../../../src/p2p/CycleCreatorTypes'

describe('ArchiversTypes', () => {
  describe('RequestTypes enum', () => {
    it('should have correct values for all request types', () => {
      expect(RequestTypes.JOIN).toBe('JOIN')
      expect(RequestTypes.ACTIVE).toBe('ACTIVE')
      expect(RequestTypes.LEAVE).toBe('LEAVE')
    })

    it('should have all expected request type keys', () => {
      const expectedKeys = ['JOIN', 'ACTIVE', 'LEAVE']
      const actualKeys = Object.keys(RequestTypes)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('should have all expected request type values', () => {
      const expectedValues = ['JOIN', 'ACTIVE', 'LEAVE']
      const actualValues = Object.values(RequestTypes)
      expect(actualValues).toEqual(expectedValues)
    })
  })

  describe('Type exports', () => {
    it('should handle DataRequest structure for Cycle type', () => {
      const dataRequest: DataRequest<CycleRecord> = {
        type: TypeNames.CYCLE,
        lastData: 100,
      }
      expect(dataRequest.type).toBe('CYCLE')
      expect(dataRequest.lastData).toBe(100)
    })

    it('should handle DataRequest structure for StateMetaData type', () => {
      const dataRequest: DataRequest<import('../../../src/p2p/SnapshotTypes').StateMetaData> = {
        type: TypeNames.STATE_METADATA,
        lastData: 200,
      }
      expect(dataRequest.type).toBe('STATE_METADATA')
      expect(dataRequest.lastData).toBe(200)
    })

    it('should handle DataResponse structure', () => {
      const dataResponse: DataResponse = {
        publicKey: 'pubkey123',
        responses: {
          CYCLE: [{ counter: 1 } as CycleRecord],
          STATE_METADATA: [{ counter: 2, stateHashes: [], receiptHashes: [], summaryHashes: [] }],
        },
        recipient: 'recipient123',
      }
      expect(dataResponse.publicKey).toBe('pubkey123')
      expect(dataResponse.responses.CYCLE).toHaveLength(1)
      expect(dataResponse.responses.STATE_METADATA).toHaveLength(1)
      expect(dataResponse.recipient).toBe('recipient123')
    })

    it('should handle DataResponse with partial responses', () => {
      const dataResponse: DataResponse = {
        publicKey: 'pubkey456',
        responses: {
          CYCLE: [{ counter: 3 } as CycleRecord],
        },
        recipient: 'recipient456',
      }
      expect(dataResponse.publicKey).toBe('pubkey456')
      expect(dataResponse.responses.CYCLE).toHaveLength(1)
      expect(dataResponse.responses.STATE_METADATA).toBeUndefined()
    })

    it('should handle JoinedArchiver structure', () => {
      const archiver: JoinedArchiver = {
        publicKey: 'archiverPubKey',
        ip: '192.168.1.100',
        port: 9090,
        curvePk: 'curvePubKey123',
      }
      expect(archiver.publicKey).toBe('archiverPubKey')
      expect(archiver.ip).toBe('192.168.1.100')
      expect(archiver.port).toBe(9090)
      expect(archiver.curvePk).toBe('curvePubKey123')
    })

    it('should handle DataRecipient structure', () => {
      const recipient: DataRecipient = {
        nodeInfo: {
          publicKey: 'nodePubKey',
          ip: '10.0.0.1',
          port: 8080,
          curvePk: 'nodeCurvePk',
        },
        dataRequests: [
          { type: TypeNames.CYCLE, lastData: 50 },
          { type: TypeNames.STATE_METADATA, lastData: 60 },
        ],
        curvePk: 'recipientCurvePk',
      }
      expect(recipient.nodeInfo.publicKey).toBe('nodePubKey')
      expect(recipient.dataRequests).toHaveLength(2)
      expect(recipient.dataRequests[0].type).toBe('CYCLE')
      expect(recipient.dataRequests[1].type).toBe('STATE_METADATA')
      expect(recipient.curvePk).toBe('recipientCurvePk')
    })

    it('should handle Request structure', () => {
      const request: Request = {
        nodeInfo: {
          publicKey: 'requestNodePubKey',
          ip: '172.16.0.1',
          port: 7070,
          curvePk: 'requestNodeCurvePk',
        },
        appData: { custom: 'data' },
        requestType: RequestTypes.JOIN,
        requestTimestamp: 1234567890,
        sign: {
          owner: 'owner123',
          sig: 'signature123',
        },
      }
      expect(request.nodeInfo.publicKey).toBe('requestNodePubKey')
      expect(request.appData).toEqual({ custom: 'data' })
      expect(request.requestType).toBe('JOIN')
      expect(request.requestTimestamp).toBe(1234567890)
      expect(request.sign.owner).toBe('owner123')
      expect(request.sign.sig).toBe('signature123')
    })

    it('should handle Txs structure', () => {
      const txs: Txs = {
        archivers: [
          {
            nodeInfo: {
              publicKey: 'txNodePubKey',
              ip: '192.168.2.1',
              port: 6060,
              curvePk: 'txNodeCurvePk',
            },
            appData: null,
            requestType: RequestTypes.ACTIVE,
            requestTimestamp: 9876543210,
            sign: {
              owner: 'txOwner',
              sig: 'txSignature',
            },
          },
        ],
      }
      expect(txs.archivers).toHaveLength(1)
      expect(txs.archivers[0].requestType).toBe('ACTIVE')
      expect(txs.archivers[0].nodeInfo.publicKey).toBe('txNodePubKey')
    })

    it('should handle Record structure', () => {
      const record: Record = {
        joinedArchivers: [
          {
            publicKey: 'joined1',
            ip: '10.0.0.1',
            port: 8081,
            curvePk: 'joinedCurve1',
          },
        ],
        leavingArchivers: [
          {
            publicKey: 'leaving1',
            ip: '10.0.0.2',
            port: 8082,
            curvePk: 'leavingCurve1',
          },
        ],
        archiversAtShutdown: [
          {
            publicKey: 'shutdown1',
            ip: '10.0.0.3',
            port: 8083,
            curvePk: 'shutdownCurve1',
          },
        ],
      }
      expect(record.joinedArchivers).toHaveLength(1)
      expect(record.leavingArchivers).toHaveLength(1)
      expect(record.archiversAtShutdown).toHaveLength(1)
      expect(record.joinedArchivers[0].publicKey).toBe('joined1')
      expect(record.leavingArchivers[0].publicKey).toBe('leaving1')
      expect(record.archiversAtShutdown[0].publicKey).toBe('shutdown1')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty arrays in Record', () => {
      const record: Record = {
        joinedArchivers: [],
        leavingArchivers: [],
        archiversAtShutdown: [],
      }
      expect(record.joinedArchivers).toHaveLength(0)
      expect(record.leavingArchivers).toHaveLength(0)
      expect(record.archiversAtShutdown).toHaveLength(0)
    })

    it('should handle empty responses in DataResponse', () => {
      const dataResponse: DataResponse = {
        publicKey: 'emptyPubKey',
        responses: {},
        recipient: 'emptyRecipient',
      }
      expect(dataResponse.publicKey).toBe('emptyPubKey')
      expect(Object.keys(dataResponse.responses)).toHaveLength(0)
      expect(dataResponse.recipient).toBe('emptyRecipient')
    })

    it('should handle empty dataRequests in DataRecipient', () => {
      const recipient: DataRecipient = {
        nodeInfo: {
          publicKey: 'emptyReqPubKey',
          ip: '127.0.0.1',
          port: 3000,
          curvePk: 'emptyReqCurvePk',
        },
        dataRequests: [],
        curvePk: 'recipientEmptyCurvePk',
      }
      expect(recipient.dataRequests).toHaveLength(0)
      expect(recipient.nodeInfo.publicKey).toBe('emptyReqPubKey')
    })
  })

  describe('Type alias', () => {
    it('should handle RestartCycleRecord as CycleRecord alias', () => {
      const restartRecord: RestartCycleRecord = {
        counter: 999,
        mode: 'restart',
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
        previous: 'prevHash',
        refreshedArchivers: [],
        refreshedConsensors: [],
        refuted: [],
        removed: [],
        returned: [],
        networkConfigHash: 'configHash',
        networkId: 'network1',
        start: 1000,
        duration: 60,
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
      } as CycleRecord
      expect(restartRecord.counter).toBe(999)
      expect(restartRecord.mode).toBe('restart')
    })
  })
})
