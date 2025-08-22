export type QlikDataTableType = {
  WO: string;
  scheduledGroup: string;
  description: string;
  type: string;
  program: string;
  workGroup: string;
  polSub: string;
  status: string;
  statusDate: Date | null;
};

export type QlikDataTableResponseType = {
  WO: string;
  "SCHD GRP": string;
  "Desc.": string;
  "WO Type": string;
  Program: string;
  "Wrk Grp": string;
  "Pol. Sub.": string;
  "WO Status": string;
  "Status Date": string;
};
