import {
  InvestigateArchiverMsg,
  ArchiverDownMsg,
  ArchiverUpMsg,
  ArchiverRefutesLostMsg,
  Txs,
  Record,
} from '../../../src/p2p/LostArchiverTypes'
import { SignedObject } from '../../../src/p2p/P2PTypes'

describe('LostArchiverTypes', () => {
  describe('InvestigateArchiverMsg', () => {
    it('should have all required properties', () => {
      const msg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: 'archiver-public-key-to-investigate',
        investigator: 'investigator-public-key',
        sender: 'sender-public-key',
        cycle: 'cycle-marker-100',
      }

      expect(msg.type).toBe('investigate')
      expect(msg.target).toBe('archiver-public-key-to-investigate')
      expect(msg.investigator).toBe('investigator-public-key')
      expect(msg.sender).toBe('sender-public-key')
      expect(msg.cycle).toBe('cycle-marker-100')
    })

    it('should enforce type as investigate', () => {
      const msg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: 'target1',
        investigator: 'inv1',
        sender: 'sender1',
        cycle: 'cycle1',
      }

      expect(msg.type).toBe('investigate')
      // Type should be literally 'investigate'
    })

    it('should handle empty string values', () => {
      const msg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: '',
        investigator: '',
        sender: '',
        cycle: '',
      }

      expect(msg.target).toBe('')
      expect(msg.investigator).toBe('')
      expect(msg.sender).toBe('')
      expect(msg.cycle).toBe('')
    })
  })

  describe('ArchiverDownMsg', () => {
    it('should have all required properties', () => {
      const investigateMsg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: 'down-archiver',
        investigator: 'investigator-node',
        sender: 'sender-node',
        cycle: 'cycle-50',
      }

      const downMsg: ArchiverDownMsg = {
        type: 'down',
        investigateMsg: investigateMsg,
        cycle: 'cycle-51',
      }

      expect(downMsg.type).toBe('down')
      expect(downMsg.investigateMsg).toEqual(investigateMsg)
      expect(downMsg.cycle).toBe('cycle-51')
    })

    it('should enforce type as down', () => {
      const msg: ArchiverDownMsg = {
        type: 'down',
        investigateMsg: {
          type: 'investigate',
          target: 'target',
          investigator: 'inv',
          sender: 'sender',
          cycle: 'cycle1',
        },
        cycle: 'cycle2',
      }

      expect(msg.type).toBe('down')
    })

    it('should maintain reference to investigate message', () => {
      const investigateMsg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: 'archiver-123',
        investigator: 'node-456',
        sender: 'node-789',
        cycle: 'cycle-100',
      }

      const downMsg: ArchiverDownMsg = {
        type: 'down',
        investigateMsg,
        cycle: 'cycle-101',
      }

      // Should reference same object
      expect(downMsg.investigateMsg).toBe(investigateMsg)
      expect(downMsg.investigateMsg.target).toBe('archiver-123')
    })
  })

  describe('ArchiverRefutesLostMsg', () => {
    it('should have all required properties', () => {
      const refuteMsg: ArchiverRefutesLostMsg = {
        archiver: 'archiver-public-key-refuting',
        cycle: 'cycle-marker-200',
      }

      expect(refuteMsg.archiver).toBe('archiver-public-key-refuting')
      expect(refuteMsg.cycle).toBe('cycle-marker-200')
    })

    it('should handle various public key formats', () => {
      const msg1: ArchiverRefutesLostMsg = {
        archiver: '0xabcdef123456',
        cycle: 'cycle1',
      }

      const msg2: ArchiverRefutesLostMsg = {
        archiver: 'simple-key',
        cycle: 'cycle2',
      }

      const msg3: ArchiverRefutesLostMsg = {
        archiver: '',
        cycle: '',
      }

      expect(msg1.archiver).toBe('0xabcdef123456')
      expect(msg2.archiver).toBe('simple-key')
      expect(msg3.archiver).toBe('')
    })
  })

  describe('ArchiverUpMsg', () => {
    it('should have all required properties', () => {
      const investigateMsg: InvestigateArchiverMsg = {
        type: 'investigate',
        target: 'archiver-up',
        investigator: 'inv-node',
        sender: 'sender-node',
        cycle: 'cycle-300',
      }

      const downMsg: ArchiverDownMsg = {
        type: 'down',
        investigateMsg,
        cycle: 'cycle-301',
      }

      const refuteMsg: ArchiverRefutesLostMsg = {
        archiver: 'archiver-up',
        cycle: 'cycle-302',
      }

      const upMsg: ArchiverUpMsg = {
        type: 'up',
        downMsg,
        refuteMsg,
        cycle: 'cycle-303',
      }

      expect(upMsg.type).toBe('up')
      expect(upMsg.downMsg).toEqual(downMsg)
      expect(upMsg.refuteMsg).toEqual(refuteMsg)
      expect(upMsg.cycle).toBe('cycle-303')
    })

    it('should enforce type as up', () => {
      const msg: ArchiverUpMsg = {
        type: 'up',
        downMsg: {
          type: 'down',
          investigateMsg: {
            type: 'investigate',
            target: 't',
            investigator: 'i',
            sender: 's',
            cycle: 'c1',
          },
          cycle: 'c2',
        },
        refuteMsg: {
          archiver: 'a',
          cycle: 'c3',
        },
        cycle: 'c4',
      }

      expect(msg.type).toBe('up')
    })

    it('should maintain nested message structure', () => {
      const upMsg: ArchiverUpMsg = {
        type: 'up',
        downMsg: {
          type: 'down',
          investigateMsg: {
            type: 'investigate',
            target: 'original-target',
            investigator: 'original-investigator',
            sender: 'original-sender',
            cycle: 'cycle-1',
          },
          cycle: 'cycle-2',
        },
        refuteMsg: {
          archiver: 'original-target',
          cycle: 'cycle-3',
        },
        cycle: 'cycle-4',
      }

      // Verify nested structure
      expect(upMsg.downMsg.investigateMsg.target).toBe('original-target')
      expect(upMsg.refuteMsg.archiver).toBe('original-target')
      expect(upMsg.downMsg.type).toBe('down')
      expect(upMsg.downMsg.investigateMsg.type).toBe('investigate')
    })
  })

  describe('Txs', () => {
    it('should have all required arrays', () => {
      const txs: Txs = {
        lostArchivers: [],
        refutedArchivers: [],
      }

      expect(txs.lostArchivers).toEqual([])
      expect(txs.refutedArchivers).toEqual([])
    })

    it('should handle SignedObject wrapper for ArchiverDownMsg', () => {
      const signedDownMsg: SignedObject<ArchiverDownMsg> = {
        type: 'down',
        investigateMsg: {
          type: 'investigate',
          target: 'target-archiver',
          investigator: 'investigator',
          sender: 'sender',
          cycle: 'cycle-10',
        },
        cycle: 'cycle-11',
        sign: {
          sig: 'signature-for-down-msg',
          owner: 'owner-public-key',
        },
      }

      const txs: Txs = {
        lostArchivers: [signedDownMsg],
        refutedArchivers: [],
      }

      expect(txs.lostArchivers).toHaveLength(1)
      expect(txs.lostArchivers[0].sign.sig).toBe('signature-for-down-msg')
      expect(txs.lostArchivers[0].type).toBe('down')
    })

    it('should handle SignedObject wrapper for ArchiverUpMsg', () => {
      const signedUpMsg: SignedObject<ArchiverUpMsg> = {
        type: 'up',
        downMsg: {
          type: 'down',
          investigateMsg: {
            type: 'investigate',
            target: 'archiver1',
            investigator: 'node1',
            sender: 'node2',
            cycle: 'c1',
          },
          cycle: 'c2',
        },
        refuteMsg: {
          archiver: 'archiver1',
          cycle: 'c3',
        },
        cycle: 'c4',
        sign: {
          sig: 'up-msg-signature',
          owner: 'up-msg-owner',
        },
      }

      const txs: Txs = {
        lostArchivers: [],
        refutedArchivers: [signedUpMsg],
      }

      expect(txs.refutedArchivers).toHaveLength(1)
      expect(txs.refutedArchivers[0].sign.sig).toBe('up-msg-signature')
      expect(txs.refutedArchivers[0].type).toBe('up')
    })

    it('should handle multiple signed messages', () => {
      const txs: Txs = {
        lostArchivers: [
          {
            type: 'down',
            investigateMsg: {
              type: 'investigate',
              target: 'arch1',
              investigator: 'inv1',
              sender: 's1',
              cycle: 'c1',
            },
            cycle: 'c2',
            sign: {
              sig: 'sig1',
              owner: 'owner1',
            },
          },
          {
            type: 'down',
            investigateMsg: {
              type: 'investigate',
              target: 'arch2',
              investigator: 'inv2',
              sender: 's2',
              cycle: 'c3',
            },
            cycle: 'c4',
            sign: {
              sig: 'sig2',
              owner: 'owner2',
            },
          },
        ],
        refutedArchivers: [
          {
            type: 'up',
            downMsg: {
              type: 'down',
              investigateMsg: {
                type: 'investigate',
                target: 'arch3',
                investigator: 'inv3',
                sender: 's3',
                cycle: 'c5',
              },
              cycle: 'c6',
            },
            refuteMsg: {
              archiver: 'arch3',
              cycle: 'c7',
            },
            cycle: 'c8',
            sign: {
              sig: 'sig3',
              owner: 'owner3',
            },
          },
        ],
      }

      expect(txs.lostArchivers).toHaveLength(2)
      expect(txs.refutedArchivers).toHaveLength(1)
    })
  })

  describe('Record', () => {
    it('should have all required arrays', () => {
      const record: Record = {
        lostArchivers: [],
        refutedArchivers: [],
        removedArchivers: [],
      }

      expect(record.lostArchivers).toEqual([])
      expect(record.refutedArchivers).toEqual([])
      expect(record.removedArchivers).toEqual([])
    })

    it('should handle public keys in arrays', () => {
      const record: Record = {
        lostArchivers: ['pubkey1', 'pubkey2', 'pubkey3'],
        refutedArchivers: ['pubkey2'],
        removedArchivers: ['pubkey1', 'pubkey3'],
      }

      expect(record.lostArchivers).toHaveLength(3)
      expect(record.refutedArchivers).toHaveLength(1)
      expect(record.removedArchivers).toHaveLength(2)
      expect(record.lostArchivers).toContain('pubkey2')
      expect(record.refutedArchivers).toContain('pubkey2')
    })

    it('should handle empty strings in arrays', () => {
      const record: Record = {
        lostArchivers: ['', 'valid-key', ''],
        refutedArchivers: [],
        removedArchivers: [''],
      }

      expect(record.lostArchivers).toHaveLength(3)
      expect(record.lostArchivers).toContain('')
      expect(record.removedArchivers).toEqual([''])
    })

    it('should handle hex format public keys', () => {
      const record: Record = {
        lostArchivers: ['0xabc123', '0xdef456'],
        refutedArchivers: ['0xdef456'],
        removedArchivers: ['0xabc123', '0x789012'],
      }

      expect(record.lostArchivers[0]).toBe('0xabc123')
      expect(record.refutedArchivers[0]).toBe('0xdef456')
      expect(record.removedArchivers).toContain('0x789012')
    })

    it('should handle duplicate entries', () => {
      const record: Record = {
        lostArchivers: ['key1', 'key1', 'key2'],
        refutedArchivers: ['key1'],
        removedArchivers: ['key1', 'key2', 'key2'],
      }

      expect(record.lostArchivers).toEqual(['key1', 'key1', 'key2'])
      expect(record.removedArchivers).toEqual(['key1', 'key2', 'key2'])
    })
  })
})
