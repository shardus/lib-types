import { ActiveNode } from '../../../src/p2p/SyncTypes'

describe('SyncTypes', () => {
  describe('ActiveNode', () => {
    it('should handle basic ActiveNode structure', () => {
      const node: ActiveNode = {
        ip: '192.168.1.100',
        port: 8080,
        publicKey: 'pubKey123abc',
      }

      expect(node.ip).toBe('192.168.1.100')
      expect(node.port).toBe(8080)
      expect(node.publicKey).toBe('pubKey123abc')
    })

    it('should handle various IP formats', () => {
      // IPv4
      const ipv4Node: ActiveNode = {
        ip: '10.0.0.1',
        port: 3000,
        publicKey: 'ipv4Key',
      }
      expect(ipv4Node.ip).toBe('10.0.0.1')

      // IPv6
      const ipv6Node: ActiveNode = {
        ip: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        port: 443,
        publicKey: 'ipv6Key',
      }
      expect(ipv6Node.ip).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')

      // IPv6 shortened
      const ipv6ShortNode: ActiveNode = {
        ip: '::1',
        port: 8080,
        publicKey: 'ipv6ShortKey',
      }
      expect(ipv6ShortNode.ip).toBe('::1')

      // Localhost
      const localhostNode: ActiveNode = {
        ip: 'localhost',
        port: 3000,
        publicKey: 'localKey',
      }
      expect(localhostNode.ip).toBe('localhost')

      // Domain name
      const domainNode: ActiveNode = {
        ip: 'example.com',
        port: 80,
        publicKey: 'domainKey',
      }
      expect(domainNode.ip).toBe('example.com')
    })

    it('should handle various port numbers', () => {
      // Standard HTTP
      const httpNode: ActiveNode = {
        ip: '192.168.1.1',
        port: 80,
        publicKey: 'httpKey',
      }
      expect(httpNode.port).toBe(80)

      // Standard HTTPS
      const httpsNode: ActiveNode = {
        ip: '192.168.1.2',
        port: 443,
        publicKey: 'httpsKey',
      }
      expect(httpsNode.port).toBe(443)

      // Custom port
      const customPortNode: ActiveNode = {
        ip: '192.168.1.3',
        port: 9999,
        publicKey: 'customKey',
      }
      expect(customPortNode.port).toBe(9999)

      // High port number
      const highPortNode: ActiveNode = {
        ip: '192.168.1.4',
        port: 65535,
        publicKey: 'highPortKey',
      }
      expect(highPortNode.port).toBe(65535)

      // Low port number
      const lowPortNode: ActiveNode = {
        ip: '192.168.1.5',
        port: 1,
        publicKey: 'lowPortKey',
      }
      expect(lowPortNode.port).toBe(1)
    })

    it('should handle various public key formats', () => {
      // Hex string
      const hexKeyNode: ActiveNode = {
        ip: '10.0.0.1',
        port: 8080,
        publicKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      }
      expect(hexKeyNode.publicKey).toBe('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef')

      // Base64
      const base64KeyNode: ActiveNode = {
        ip: '10.0.0.2',
        port: 8080,
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1234567890',
      }
      expect(base64KeyNode.publicKey).toBe('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1234567890')

      // Short key
      const shortKeyNode: ActiveNode = {
        ip: '10.0.0.3',
        port: 8080,
        publicKey: 'pk_123',
      }
      expect(shortKeyNode.publicKey).toBe('pk_123')

      // Long key
      const longKey = 'a'.repeat(1000)
      const longKeyNode: ActiveNode = {
        ip: '10.0.0.4',
        port: 8080,
        publicKey: longKey,
      }
      expect(longKeyNode.publicKey).toBe(longKey)
      expect(longKeyNode.publicKey).toHaveLength(1000)

      // Empty string (edge case)
      const emptyKeyNode: ActiveNode = {
        ip: '10.0.0.5',
        port: 8080,
        publicKey: '',
      }
      expect(emptyKeyNode.publicKey).toBe('')
    })

    it('should handle array of ActiveNodes', () => {
      const nodes: ActiveNode[] = [
        { ip: '192.168.1.1', port: 8080, publicKey: 'key1' },
        { ip: '192.168.1.2', port: 8081, publicKey: 'key2' },
        { ip: '192.168.1.3', port: 8082, publicKey: 'key3' },
      ]

      expect(nodes).toHaveLength(3)
      expect(nodes[0].ip).toBe('192.168.1.1')
      expect(nodes[1].port).toBe(8081)
      expect(nodes[2].publicKey).toBe('key3')
    })

    it('should be serializable', () => {
      const node: ActiveNode = {
        ip: '10.20.30.40',
        port: 5000,
        publicKey: 'serializableKey123',
      }

      const serialized = JSON.stringify(node)
      const parsed = JSON.parse(serialized)

      expect(parsed).toEqual(node)
      expect(parsed.ip).toBe('10.20.30.40')
      expect(parsed.port).toBe(5000)
      expect(parsed.publicKey).toBe('serializableKey123')
    })

    it('should handle object with exact properties', () => {
      const node: ActiveNode = {
        ip: '192.168.1.100',
        port: 3000,
        publicKey: 'exactKey',
      }

      const keys = Object.keys(node)
      expect(keys).toEqual(['ip', 'port', 'publicKey'])
      expect(keys).toHaveLength(3)
    })

    it('should handle edge case port numbers', () => {
      // Port 0 (sometimes used for dynamic port allocation)
      const port0Node: ActiveNode = {
        ip: '127.0.0.1',
        port: 0,
        publicKey: 'port0Key',
      }
      expect(port0Node.port).toBe(0)

      // Negative port (invalid but TypeScript allows numbers)
      const negativePortNode: ActiveNode = {
        ip: '127.0.0.1',
        port: -1,
        publicKey: 'negativePortKey',
      }
      expect(negativePortNode.port).toBe(-1)

      // Port beyond valid range
      const beyondRangePortNode: ActiveNode = {
        ip: '127.0.0.1',
        port: 70000,
        publicKey: 'beyondRangeKey',
      }
      expect(beyondRangePortNode.port).toBe(70000)
    })

    it('should handle special characters in strings', () => {
      const specialNode: ActiveNode = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'key-with-special-chars!@#$%^&*()_+={[}]|\\:;"\'<,>.?/',
      }
      expect(specialNode.publicKey).toBe('key-with-special-chars!@#$%^&*()_+={[}]|\\:;"\'<,>.?/')

      const unicodeNode: ActiveNode = {
        ip: '192.168.1.2',
        port: 8080,
        publicKey: 'key-with-unicode-🔑-characters-ñ-中文',
      }
      expect(unicodeNode.publicKey).toBe('key-with-unicode-🔑-characters-ñ-中文')
    })

    it('should handle nodes with identical properties', () => {
      const node1: ActiveNode = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'sameKey',
      }

      const node2: ActiveNode = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'sameKey',
      }

      expect(node1).toEqual(node2)
      expect(JSON.stringify(node1)).toBe(JSON.stringify(node2))
    })

    it('should handle large collections of nodes', () => {
      const largeNodeArray: ActiveNode[] = Array.from({ length: 1000 }, (_, i) => ({
        ip: `192.168.${Math.floor(i / 256)}.${i % 256}`,
        port: 8000 + i,
        publicKey: `key${i}`,
      }))

      expect(largeNodeArray).toHaveLength(1000)
      expect(largeNodeArray[0].ip).toBe('192.168.0.0')
      expect(largeNodeArray[0].port).toBe(8000)
      expect(largeNodeArray[999].ip).toBe('192.168.3.231')
      expect(largeNodeArray[999].port).toBe(8999)
    })

    it('should handle node comparison and filtering', () => {
      const nodes: ActiveNode[] = [
        { ip: '192.168.1.1', port: 8080, publicKey: 'key1' },
        { ip: '192.168.1.2', port: 8080, publicKey: 'key2' },
        { ip: '192.168.1.1', port: 9090, publicKey: 'key3' },
        { ip: '192.168.1.3', port: 8080, publicKey: 'key4' },
      ]

      // Filter by IP
      const sameIpNodes = nodes.filter((n) => n.ip === '192.168.1.1')
      expect(sameIpNodes).toHaveLength(2)

      // Filter by port
      const samePortNodes = nodes.filter((n) => n.port === 8080)
      expect(samePortNodes).toHaveLength(3)

      // Find by public key
      const specificNode = nodes.find((n) => n.publicKey === 'key3')
      expect(specificNode?.port).toBe(9090)
    })
  })

  describe('Type structure', () => {
    it('should maintain type safety', () => {
      const validNode: ActiveNode = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'validKey',
      }

      // TypeScript will enforce that all properties exist and are of correct type
      expect(typeof validNode.ip).toBe('string')
      expect(typeof validNode.port).toBe('number')
      expect(typeof validNode.publicKey).toBe('string')
    })

    it('should work with object destructuring', () => {
      const node: ActiveNode = {
        ip: '10.0.0.1',
        port: 3000,
        publicKey: 'destructKey',
      }

      const { ip, port, publicKey } = node
      expect(ip).toBe('10.0.0.1')
      expect(port).toBe(3000)
      expect(publicKey).toBe('destructKey')
    })

    it('should work with object spread', () => {
      const baseNode: ActiveNode = {
        ip: '192.168.1.1',
        port: 8080,
        publicKey: 'baseKey',
      }

      const updatedNode: ActiveNode = {
        ...baseNode,
        port: 9090,
      }

      expect(updatedNode.ip).toBe('192.168.1.1')
      expect(updatedNode.port).toBe(9090)
      expect(updatedNode.publicKey).toBe('baseKey')
      expect(baseNode.port).toBe(8080) // Original unchanged
    })
  })
})
