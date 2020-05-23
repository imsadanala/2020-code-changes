import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, observable } from 'rxjs';
import { ExcelData } from './dto/exceldata.dto';

@Injectable()
export class UploadService {

  constructor(private httpclient: HttpClient) { }
  public url = 'http://localhost:8088/genx/srcDataList';
  public newUrl: 'http://localhost:8088/';
  public exportExcelUrl = 'http://localhost:9090/future/genx/test-step-executor/';
  public data;
  getDatalist(lists: Array<string>) {

    return this.httpclient.post(this.url, lists);

  }
  getDestDatalist(lists: Array<string>) {
    this.url = 'http://localhost:8088/genx/destDataList';
    return this.httpclient.post(this.url, lists);
  }

  public exportToExcel(excelData: ExcelData): Observable<any> {
    return Observable.create(observ => {
      let xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', this.exportExcelUrl, true);
      xmlHttpRequest.setRequestHeader('content-type', 'application/json');
      xmlHttpRequest.responseType = 'blob';
      xmlHttpRequest.onreadystatechange = function (oEvent: Event) {
        if (xmlHttpRequest.readyState === 4) {
          if (xmlHttpRequest.status === 200) {
            observ.next(new Blob(
              [xmlHttpRequest.response],
              { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
            ));
            observ.complete();
          } else {
            observ.error(xmlHttpRequest.response);
          }
        }
      };
      xmlHttpRequest.send(JSON.stringify(excelData));
    });
  }
}
