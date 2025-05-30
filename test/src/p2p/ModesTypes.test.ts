import { Txs, Record } from '../../../src/p2p/ModesTypes'

describe('ModesTypes', () => {
  describe('Txs', () => {
    it('should have mode as empty array', () => {
      const txs: Txs = {
        mode: [],
      }

      expect(txs.mode).toEqual([])
      expect(Array.isArray(txs.mode)).toBe(true)
      expect(txs.mode).toHaveLength(0)
    })

    it('should enforce empty array type', () => {
      const txs: Txs = {
        mode: [],
      }

      // TypeScript should enforce that mode is always an empty array
      expect(txs.mode).toStrictEqual([])
    })
  })

  describe('Record', () => {
    it('should handle forming mode', () => {
      const record: Record = {
        mode: 'forming',
      }

      expect(record.mode).toBe('forming')
    })

    it('should handle processing mode', () => {
      const record: Record = {
        mode: 'processing',
      }

      expect(record.mode).toBe('processing')
    })

    it('should handle safety mode', () => {
      const record: Record = {
        mode: 'safety',
      }

      expect(record.mode).toBe('safety')
    })

    it('should handle recovery mode', () => {
      const record: Record = {
        mode: 'recovery',
      }

      expect(record.mode).toBe('recovery')
    })

    it('should handle restart mode', () => {
      const record: Record = {
        mode: 'restart',
      }

      expect(record.mode).toBe('restart')
    })

    it('should handle restore mode', () => {
      const record: Record = {
        mode: 'restore',
      }

      expect(record.mode).toBe('restore')
    })

    it('should handle shutdown mode', () => {
      const record: Record = {
        mode: 'shutdown',
      }

      expect(record.mode).toBe('shutdown')
    })

    it('should handle all valid modes', () => {
      const validModes: Record['mode'][] = [
        'forming',
        'processing',
        'safety',
        'recovery',
        'restart',
        'restore',
        'shutdown',
      ]

      validModes.forEach((mode) => {
        const record: Record = { mode }
        expect(record.mode).toBe(mode)
        expect(typeof record.mode).toBe('string')
      })
    })

    it('should handle mode transitions', () => {
      // Simulate mode transitions
      let record: Record = { mode: 'forming' }
      expect(record.mode).toBe('forming')

      record = { mode: 'processing' }
      expect(record.mode).toBe('processing')

      record = { mode: 'safety' }
      expect(record.mode).toBe('safety')

      record = { mode: 'recovery' }
      expect(record.mode).toBe('recovery')

      record = { mode: 'shutdown' }
      expect(record.mode).toBe('shutdown')
    })
  })

  describe('Type structure', () => {
    it('should have correct structure for Txs', () => {
      const txs: Txs = {
        mode: [],
      }

      const keys = Object.keys(txs)
      expect(keys).toEqual(['mode'])
      expect(keys).toHaveLength(1)
    })

    it('should have correct structure for Record', () => {
      const record: Record = {
        mode: 'forming',
      }

      const keys = Object.keys(record)
      expect(keys).toEqual(['mode'])
      expect(keys).toHaveLength(1)
    })

    it('should be serializable', () => {
      const txs: Txs = { mode: [] }
      const record: Record = { mode: 'processing' }

      const serializedTxs = JSON.stringify(txs)
      const serializedRecord = JSON.stringify(record)

      expect(serializedTxs).toBe('{"mode":[]}')
      expect(serializedRecord).toBe('{"mode":"processing"}')

      const parsedTxs = JSON.parse(serializedTxs)
      const parsedRecord = JSON.parse(serializedRecord)

      expect(parsedTxs).toEqual(txs)
      expect(parsedRecord).toEqual(record)
    })
  })
})
