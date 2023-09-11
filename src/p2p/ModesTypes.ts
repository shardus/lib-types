/** TYPES */
// No TXs for this module

export interface Txs {
  mode: []
}

export interface Record {
  mode: 'forming' | 'processing' | 'safety' | 'recovery'
}
