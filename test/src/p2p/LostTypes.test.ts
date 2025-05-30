import {
  LostReport,
  SignedLostReport,
  SignedDownGossipMessage,
  SignedUpGossipMessage,
  LostRecord,
  Txs,
  Record,
  RemoveByAppMessage,
  RemoveCertificate,
} from '../../../src/p2p/LostTypes'

describe('LostTypes', () => {
  describe('LostReport', () => {
    it('should handle basic LostReport structure', () => {
      const report: LostReport = {
        target: 'node-123',
        checker: 'checker-node-456',
        reporter: 'reporter-node-789',
        cycle: 100,
      }

      expect(report.target).toBe('node-123')
      expect(report.checker).toBe('checker-node-456')
      expect(report.reporter).toBe('reporter-node-789')
      expect(report.cycle).toBe(100)
      expect(report.killother).toBeUndefined()
    })

    it('should handle LostReport with killother flag', () => {
      const report: LostReport = {
        target: 'target-node',
        checker: 'checker-node',
        reporter: 'reporter-node',
        cycle: 50,
        killother: true,
      }

      expect(report.killother).toBe(true)
    })

    it('should handle zero cycle number', () => {
      const report: LostReport = {
        target: 'node-a',
        checker: 'node-b',
        reporter: 'node-c',
        cycle: 0,
      }

      expect(report.cycle).toBe(0)
    })
  })

  describe('SignedLostReport', () => {
    it('should combine LostReport with signature', () => {
      const signedReport: SignedLostReport = {
        target: 'lost-node',
        checker: 'checking-node',
        reporter: 'reporting-node',
        cycle: 200,
        sign: {
          owner: 'owner-public-key',
          sig: 'signature-hash',
        },
      }

      expect(signedReport.target).toBe('lost-node')
      expect(signedReport.sign.owner).toBe('owner-public-key')
      expect(signedReport.sign.sig).toBe('signature-hash')
    })

    it('should handle SignedLostReport with killother', () => {
      const signedReport: SignedLostReport = {
        target: 'target',
        checker: 'checker',
        reporter: 'reporter',
        cycle: 150,
        killother: false,
        sign: {
          owner: 'owner',
          sig: 'sig',
        },
      }

      expect(signedReport.killother).toBe(false)
    })
  })

  describe('SignedDownGossipMessage', () => {
    it('should handle complete down gossip message', () => {
      const downMessage: SignedDownGossipMessage = {
        report: {
          target: 'down-node',
          checker: 'checker',
          reporter: 'reporter',
          cycle: 100,
          sign: {
            owner: 'report-owner',
            sig: 'report-sig',
          },
        },
        status: 'down',
        cycle: 100,
        sign: {
          owner: 'message-owner',
          sig: 'message-sig',
        },
      }

      expect(downMessage.report.target).toBe('down-node')
      expect(downMessage.status).toBe('down')
      expect(downMessage.cycle).toBe(100)
      expect(downMessage.sign.owner).toBe('message-owner')
    })

    it('should handle different status values', () => {
      const statuses = ['reported', 'checking', 'down', 'confirmed']

      statuses.forEach((status) => {
        const message: SignedDownGossipMessage = {
          report: {
            target: 'node',
            checker: 'checker',
            reporter: 'reporter',
            cycle: 50,
            sign: { owner: 'o1', sig: 's1' },
          },
          status: status,
          cycle: 50,
          sign: { owner: 'o2', sig: 's2' },
        }

        expect(message.status).toBe(status)
      })
    })
  })

  describe('SignedUpGossipMessage', () => {
    it('should handle up gossip message', () => {
      const upMessage: SignedUpGossipMessage = {
        target: 'refuted-node',
        status: 'up',
        cycle: 250,
        sign: {
          owner: 'refuter-owner',
          sig: 'refuter-sig',
        },
      }

      expect(upMessage.target).toBe('refuted-node')
      expect(upMessage.status).toBe('up')
      expect(upMessage.cycle).toBe(250)
    })

    it('should handle large cycle numbers', () => {
      const upMessage: SignedUpGossipMessage = {
        target: 'node',
        status: 'active',
        cycle: Number.MAX_SAFE_INTEGER,
        sign: {
          owner: 'owner',
          sig: 'sig',
        },
      }

      expect(upMessage.cycle).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('RemoveByAppMessage', () => {
    it('should handle remove by app message', () => {
      const removeMessage: RemoveByAppMessage = {
        target: 'removed-node',
        certificate: {
          nodePublicKey: 'node-public-key-123',
          cycle: 300,
        },
      }

      expect(removeMessage.target).toBe('removed-node')
      expect(removeMessage.certificate.nodePublicKey).toBe('node-public-key-123')
      expect(removeMessage.certificate.cycle).toBe(300)
      expect(removeMessage.certificate.signs).toBeUndefined()
      expect(removeMessage.certificate.sign).toBeUndefined()
    })

    it('should handle certificate with signatures', () => {
      const removeMessage: RemoveByAppMessage = {
        target: 'target-node',
        certificate: {
          nodePublicKey: 'pub-key',
          cycle: 150,
          signs: [
            { owner: 'owner1', sig: 'sig1' },
            { owner: 'owner2', sig: 'sig2' },
            { owner: 'owner3', sig: 'sig3' },
          ],
          sign: { owner: 'main-owner', sig: 'main-sig' },
        },
      }

      expect(removeMessage.certificate.signs).toHaveLength(3)
      expect(removeMessage.certificate.sign).toBeDefined()
    })
  })

  describe('RemoveCertificate', () => {
    it('should handle minimal certificate', () => {
      const cert: RemoveCertificate = {
        nodePublicKey: 'minimal-key',
        cycle: 0,
      }

      expect(cert.nodePublicKey).toBe('minimal-key')
      expect(cert.cycle).toBe(0)
    })

    it('should handle certificate with empty signatures array', () => {
      const cert: RemoveCertificate = {
        nodePublicKey: 'key',
        cycle: 100,
        signs: [],
      }

      expect(cert.signs).toEqual([])
    })
  })

  describe('LostRecord', () => {
    it('should handle complete lost record', () => {
      const record: LostRecord = {
        target: 'lost-target',
        cycle: 400,
        status: 'checking',
        checker: 'checker-node',
        reporter: 'reporter-node',
        message: {
          someData: 'test',
          nestedObject: { key: 'value' },
        },
        gossiped: true,
      }

      expect(record.target).toBe('lost-target')
      expect(record.cycle).toBe(400)
      expect(record.status).toBe('checking')
      expect(record.gossiped).toBe(true)
      expect(record.message).toEqual({
        someData: 'test',
        nestedObject: { key: 'value' },
      })
    })

    it('should handle record without optional fields', () => {
      const record: LostRecord = {
        target: 'target',
        cycle: 50,
        status: 'reported',
        checker: 'checker',
        reporter: 'reporter',
      }

      expect(record.message).toBeUndefined()
      expect(record.gossiped).toBeUndefined()
    })

    it('should handle different status values', () => {
      const statuses = ['reported', 'checking', 'down', 'up']

      statuses.forEach((status) => {
        const record: LostRecord = {
          target: 'node',
          cycle: 100,
          status: status,
          checker: 'c',
          reporter: 'r',
        }

        expect(record.status).toBe(status)
      })
    })
  })

  describe('Txs', () => {
    it('should handle empty transaction arrays', () => {
      const txs: Txs = {
        lost: [],
        refuted: [],
        removedByApp: [],
      }

      expect(txs.lost).toEqual([])
      expect(txs.refuted).toEqual([])
      expect(txs.removedByApp).toEqual([])
    })

    it('should handle populated transaction arrays', () => {
      const txs: Txs = {
        lost: [
          {
            report: {
              target: 'lost1',
              checker: 'c1',
              reporter: 'r1',
              cycle: 10,
              sign: { owner: 'o1', sig: 's1' },
            },
            status: 'down',
            cycle: 10,
            sign: { owner: 'o2', sig: 's2' },
          },
        ],
        refuted: [
          {
            target: 'refuted1',
            status: 'up',
            cycle: 20,
            sign: { owner: 'o3', sig: 's3' },
          },
          {
            target: 'refuted2',
            status: 'active',
            cycle: 21,
            sign: { owner: 'o4', sig: 's4' },
          },
        ],
        removedByApp: [
          {
            target: 'removed1',
            certificate: {
              nodePublicKey: 'key1',
              cycle: 30,
            },
          },
        ],
      }

      expect(txs.lost).toHaveLength(1)
      expect(txs.refuted).toHaveLength(2)
      expect(txs.removedByApp).toHaveLength(1)
      expect(txs.lost[0].report.target).toBe('lost1')
      expect(txs.refuted[1].target).toBe('refuted2')
    })
  })

  describe('Record', () => {
    it('should handle empty record arrays', () => {
      const record: Record = {
        lost: [],
        lostSyncing: [],
        refuted: [],
        appRemoved: [],
      }

      expect(record.lost).toEqual([])
      expect(record.lostSyncing).toEqual([])
      expect(record.refuted).toEqual([])
      expect(record.appRemoved).toEqual([])
    })

    it('should handle populated record arrays', () => {
      const record: Record = {
        lost: ['node1', 'node2', 'node3'],
        lostSyncing: ['sync1'],
        refuted: ['refuted1', 'refuted2'],
        appRemoved: ['app1', 'app2', 'app3', 'app4'],
      }

      expect(record.lost).toHaveLength(3)
      expect(record.lostSyncing).toHaveLength(1)
      expect(record.refuted).toHaveLength(2)
      expect(record.appRemoved).toHaveLength(4)
    })

    it('should handle duplicate values in arrays', () => {
      const record: Record = {
        lost: ['node1', 'node1', 'node2'],
        lostSyncing: [],
        refuted: ['node2', 'node2'],
        appRemoved: ['app1'],
      }

      expect(record.lost).toEqual(['node1', 'node1', 'node2'])
      expect(record.refuted).toEqual(['node2', 'node2'])
    })

    it('should handle long node IDs', () => {
      const longId = 'a'.repeat(100)
      const record: Record = {
        lost: [longId],
        lostSyncing: [longId + '-syncing'],
        refuted: [longId + '-refuted'],
        appRemoved: [longId + '-removed'],
      }

      expect(record.lost[0]).toHaveLength(100)
      expect(record.lostSyncing[0]).toHaveLength(108)
    })
  })
})
