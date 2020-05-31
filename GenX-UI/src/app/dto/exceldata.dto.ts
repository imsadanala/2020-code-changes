export class ExcelData {

  public finalSourceMap = {};
  public finalDestMap = {};
  public reportName: string;

  constructor(finalSourceMap, finalDestMap, reportName?: string) {
    this.finalSourceMap = finalSourceMap;
    this.finalDestMap = finalDestMap;
    this.reportName = reportName;
  }
}
