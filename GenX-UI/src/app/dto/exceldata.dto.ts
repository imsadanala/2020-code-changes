export class ExcelData {

  public sourceData: string[];
  public destinationData: string[];
  public columnsToCompare: string[];
  public varianceColumns: string[];
  public testIds: string[];
  public reportName: string;

  constructor(sourceData: string[], destinationData?: string[], columnsToCompare?: string[],
    varianceColumns?: string[], testIds?: string[], reportName?: string) {
    this.sourceData = sourceData;
    this.destinationData = destinationData;
    this.columnsToCompare = columnsToCompare;
    this.varianceColumns = varianceColumns;
    this.testIds = testIds;
    this.reportName = reportName;
  }
}
