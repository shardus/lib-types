export type ReceiptMap = {[txId: string]: string[]};

export type ReceiptMapResult = {
  cycle: number;
  partition: number;
  receiptMap: ReceiptMap;
  txCount: number;
  txsMap: {[id:string]:any[]};  //need to make this {[id:string]:WrappedResponse[]}; somehow 
  txsMapEVMReceipt: {[id:string]:unknown[]};
};

export type OpaqueBlob = any; //Shardus is not supposed to know about the details of this, it is up to the dapp to define

//Shardus wrapper for a summary blob.  Has information that is needed for the reduce algorithm
export type SummaryBlob = {
  latestCycle: number; //The highest cycle that was used in this summary.
  counter: number;
  errorNull: number;
  partition: number;
  opaqueBlob: OpaqueBlob;
};

//A collection of blobs that share the same cycle.  For TX summaries
export type SummaryBlobCollection = {
  cycle: number;
  blobsByPartition: Map<number, SummaryBlob>;
};

// Stats collected for a cycle
export type StatsClump = {
  error: boolean;
  cycle: number;
  dataStats: SummaryBlob[];
  txStats: SummaryBlob[];
  covered: number[];
  coveredParititionCount: number;
  skippedParitionCount: number;
};
