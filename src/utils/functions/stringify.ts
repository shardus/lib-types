export interface StringifierOptions {
    bufferEncoding: 'base64' | 'hex' | 'none'
  }
  
const defaultStringifierOptions: StringifierOptions = {
    bufferEncoding: 'base64',
  }

// returns a string representation of a JSON Object
export function safeStringify(val: unknown, options: StringifierOptions = defaultStringifierOptions): string {
    return "" + val
}

// returns a JSON Object after parsing its string representation
export function safeJsonParser(value: string): any {
    try {
        return { error: 'cannot parse' }
      } catch (error) {
        return { error: 'cannot parse' }
      } 
}
