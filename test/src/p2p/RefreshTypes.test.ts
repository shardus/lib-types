import { Txs, Record } from '../../../src/p2p/RefreshTypes'
import { JoinedArchiver } from '../../../src/p2p/ArchiversTypes'
import { Node } from '../../../src/p2p/NodeListTypes'
import { NodeStatus } from '../../../src/p2p/P2PTypes'

describe('RefreshTypes', () => {
  describe('Txs', () => {
    it('should be an empty object', () => {
      const txs: Txs = {}

      expect(txs).toEqual({})
      expect(Object.keys(txs)).toHaveLength(0)
    })

    it('should be serializable', () => {
      const txs: Txs = {}
      const serialized = JSON.stringify(txs)
      const parsed = JSON.parse(serialized)

      expect(serialized).toBe('{}')
      expect(parsed).toEqual(txs)
    })
  })

  describe('Record', () => {
    it('should handle empty arrays', () => {
      const record: Record = {
        refreshedArchivers: [],
        refreshedConsensors: [],
      }

      expect(record.refreshedArchivers).toEqual([])
      expect(record.refreshedConsensors).toEqual([])
      expect(record.refreshedArchivers).toHaveLength(0)
      expect(record.refreshedConsensors).toHaveLength(0)
    })

    it('should handle refreshedArchivers', () => {
      const archivers: JoinedArchiver[] = [
        {
          publicKey: 'archiver-key-1',
          ip: '192.168.1.100',
          port: 4000,
          curvePk: 'archiver-curve-1',
        },
        {
          publicKey: 'archiver-key-2',
          ip: '192.168.1.101',
          port: 4001,
          curvePk: 'archiver-curve-2',
        },
      ]

      const record: Record = {
        refreshedArchivers: archivers,
        refreshedConsensors: [],
      }

      expect(record.refreshedArchivers).toHaveLength(2)
      expect(record.refreshedArchivers[0].publicKey).toBe('archiver-key-1')
      expect(record.refreshedArchivers[0].ip).toBe('192.168.1.100')
      expect(record.refreshedArchivers[0].port).toBe(4000)
      expect(record.refreshedArchivers[0].curvePk).toBe('archiver-curve-1')
      expect(record.refreshedArchivers[1].publicKey).toBe('archiver-key-2')
    })

    it('should handle refreshedConsensors', () => {
      const consensorNodes: Node[] = [
        {
          publicKey: 'node-key-1',
          externalIp: '1.1.1.1',
          externalPort: 8080,
          internalIp: '10.0.0.1',
          internalPort: 9090,
          address: '0xnode1',
          joinRequestTimestamp: 1000,
          activeTimestamp: 2000,
          activeCycle: 10,
          syncingTimestamp: 1500,
          readyTimestamp: 1900,
          cycleJoined: 'cycle-10',
          counterRefreshed: 5,
          id: 'node-1',
          curvePublicKey: 'curve-key-1',
          status: NodeStatus.ACTIVE,
        },
        {
          publicKey: 'node-key-2',
          externalIp: '2.2.2.2',
          externalPort: 8081,
          internalIp: '10.0.0.2',
          internalPort: 9091,
          address: '0xnode2',
          joinRequestTimestamp: 1100,
          activeTimestamp: 2100,
          activeCycle: 11,
          syncingTimestamp: 1600,
          readyTimestamp: 2000,
          cycleJoined: 'cycle-11',
          counterRefreshed: 6,
          id: 'node-2',
          curvePublicKey: 'curve-key-2',
          status: NodeStatus.READY,
          refuteCycles: [12, 13],
        },
      ]

      const record: Record = {
        refreshedArchivers: [],
        refreshedConsensors: consensorNodes,
      }

      expect(record.refreshedConsensors).toHaveLength(2)
      expect(record.refreshedConsensors[0].id).toBe('node-1')
      expect(record.refreshedConsensors[0].status).toBe(NodeStatus.ACTIVE)
      expect(record.refreshedConsensors[1].id).toBe('node-2')
      expect(record.refreshedConsensors[1].refuteCycles).toEqual([12, 13])
    })

    it('should handle both archivers and consensors', () => {
      const archiver: JoinedArchiver = {
        publicKey: 'archiver-pub',
        ip: '3.3.3.3',
        port: 5000,
        curvePk: 'archiver-curve',
      }

      const consensor: Node = {
        publicKey: 'consensor-pub',
        externalIp: '4.4.4.4',
        externalPort: 6000,
        internalIp: '10.0.0.4',
        internalPort: 6001,
        address: '0xconsensor',
        joinRequestTimestamp: 3000,
        activeTimestamp: 4000,
        activeCycle: 20,
        syncingTimestamp: 3500,
        readyTimestamp: 3900,
        cycleJoined: 'cycle-20',
        counterRefreshed: 10,
        id: 'consensor-1',
        curvePublicKey: 'consensor-curve',
        status: NodeStatus.SYNCING,
      }

      const record: Record = {
        refreshedArchivers: [archiver],
        refreshedConsensors: [consensor],
      }

      expect(record.refreshedArchivers).toHaveLength(1)
      expect(record.refreshedConsensors).toHaveLength(1)
      expect(record.refreshedArchivers[0].publicKey).toBe('archiver-pub')
      expect(record.refreshedConsensors[0].publicKey).toBe('consensor-pub')
    })

    it('should handle large arrays', () => {
      const manyArchivers: JoinedArchiver[] = Array(100)
        .fill(null)
        .map((_, i) => ({
          publicKey: `archiver-${i}`,
          ip: `192.168.1.${i % 256}`,
          port: 4000 + i,
          curvePk: `curve-${i}`,
        }))

      const manyConsensors: Node[] = Array(50)
        .fill(null)
        .map((_, i) => ({
          publicKey: `node-${i}`,
          externalIp: `1.1.1.${i % 256}`,
          externalPort: 8000 + i,
          internalIp: `10.0.0.${i % 256}`,
          internalPort: 9000 + i,
          address: `0xnode${i}`,
          joinRequestTimestamp: 1000 + i,
          activeTimestamp: 2000 + i,
          activeCycle: i,
          syncingTimestamp: 1500 + i,
          readyTimestamp: 1900 + i,
          cycleJoined: `cycle-${i}`,
          counterRefreshed: i,
          id: `node-id-${i}`,
          curvePublicKey: `curve-${i}`,
          status: NodeStatus.ACTIVE,
        }))

      const record: Record = {
        refreshedArchivers: manyArchivers,
        refreshedConsensors: manyConsensors,
      }

      expect(record.refreshedArchivers).toHaveLength(100)
      expect(record.refreshedConsensors).toHaveLength(50)
      expect(record.refreshedArchivers[99].publicKey).toBe('archiver-99')
      expect(record.refreshedConsensors[49].id).toBe('node-id-49')
    })

    it('should handle archivers with edge case values', () => {
      const archivers: JoinedArchiver[] = [
        {
          publicKey: '',
          ip: '0.0.0.0',
          port: 0,
          curvePk: '',
        },
        {
          publicKey: 'a'.repeat(100),
          ip: '255.255.255.255',
          port: 65535,
          curvePk: 'b'.repeat(100),
        },
      ]

      const record: Record = {
        refreshedArchivers: archivers,
        refreshedConsensors: [],
      }

      expect(record.refreshedArchivers[0].ip).toBe('0.0.0.0')
      expect(record.refreshedArchivers[0].port).toBe(0)
      expect(record.refreshedArchivers[1].ip).toBe('255.255.255.255')
      expect(record.refreshedArchivers[1].port).toBe(65535)
    })

    it('should handle consensors with various statuses', () => {
      const statuses = [
        NodeStatus.INITIALIZING,
        NodeStatus.STANDBY,
        NodeStatus.SELECTED,
        NodeStatus.SYNCING,
        NodeStatus.READY,
        NodeStatus.ACTIVE,
      ]

      const consensors: Node[] = statuses.map((status, i) => ({
        publicKey: `node-${status}`,
        externalIp: '1.1.1.1',
        externalPort: 8080,
        internalIp: '10.0.0.1',
        internalPort: 9090,
        address: '0xnode',
        joinRequestTimestamp: 1000,
        activeTimestamp: 2000,
        activeCycle: 10,
        syncingTimestamp: 1500,
        readyTimestamp: 1900,
        cycleJoined: 'cycle-10',
        counterRefreshed: 5,
        id: `node-${status}-id`,
        curvePublicKey: 'curve',
        status: status,
      }))

      const record: Record = {
        refreshedArchivers: [],
        refreshedConsensors: consensors,
      }

      expect(record.refreshedConsensors).toHaveLength(6)
      statuses.forEach((status, i) => {
        expect(record.refreshedConsensors[i].status).toBe(status)
      })
    })

    it('should be serializable with complex data', () => {
      const record: Record = {
        refreshedArchivers: [
          {
            publicKey: 'arch-1',
            ip: '1.2.3.4',
            port: 5000,
            curvePk: 'curve-1',
          },
        ],
        refreshedConsensors: [
          {
            publicKey: 'node-1',
            externalIp: '5.6.7.8',
            externalPort: 8080,
            internalIp: '10.0.0.1',
            internalPort: 9090,
            address: '0xabc',
            joinRequestTimestamp: 1000,
            activeTimestamp: 2000,
            activeCycle: 10,
            syncingTimestamp: 1500,
            readyTimestamp: 1900,
            cycleJoined: 'cycle-10',
            counterRefreshed: 5,
            id: 'node-1-id',
            curvePublicKey: 'curve-node-1',
            status: NodeStatus.ACTIVE,
            refuteCycles: [11, 12],
            foundationNode: true,
            refreshedCounter: 3,
          },
        ],
      }

      const serialized = JSON.stringify(record)
      const parsed = JSON.parse(serialized)

      expect(parsed).toEqual(record)
      expect(parsed.refreshedArchivers[0].publicKey).toBe('arch-1')
      expect(parsed.refreshedConsensors[0].status).toBe(NodeStatus.ACTIVE)
    })
  })
})
