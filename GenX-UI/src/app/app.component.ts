import { Component, ElementRef, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ExcelData } from './dto/exceldata.dto';
import { ExcelConstants } from './util/excel-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  fileName: string;
  destFileName: string;
  columnsName: string;
  destinationlabel: boolean;
  sourcelabel: boolean;
  columnsLabel: boolean;
  file: File;
  listarr: string[];
  contentvalue = '';
  storevar = '';
  arrayBuffer: any;
  lastarray: any[];
  sourceHeaders = '';
  destinationHeaders = '';
  displayTable = 'none';

  sourceXlsData: any[];
  destXlsData: any[];
  compareColumnXlsData: any[];
  updatedSourceData: string[] = [];
  updatedDestinationData: string[] = [];
  dropdownValues: string[] = [];
  selectedColumnSdata = { testingType: '', sourceColumn: '', destinationColumn: '' };
  selectedColumnSdataList: any = [];
  sourceUploadLabel = 'browse Source XLS file';
  destinationUploadLabel = 'browse Destination XLS file';
  templateUploadLabel = 'browse Template XLS file';
  comparedColumnValues: string[] = [];
  templateUploadedFlag: boolean;
  sourceUploadedFlag: boolean;
  destinationUploadedFlag: boolean;
  compareColumnsmap = new Map<string, number>();
  compareColumsMapKeys: string[] = [];
  optionSeletedValue = 'Select Test Type';
  enableReportsTab: boolean;
  eisSourceMap: Map<string, string>;
  eisDestMap: Map<string, string>;
  eidSourceMap: Map<string, string>;
  eidDestMap: Map<string, string>;
  varianceSourceMap: Map<string, string>;
  varianceDestMap: Map<string, string>;
  finalSourceMap = {};
  finalDestMap = {};

  disableExistInSourceReport = true;
  disableExistInDestinationReport = true;
  disableVarianceReport = true;

  constructor(private uploadservice: UploadService) {
  }

  ngOnInit() {
    this.compareColumnsmap.set('Select Test Type', 0);
    this.compareColumnsmap.set(ExcelConstants.EXISTS_IN_SOURCE, 1);
    this.compareColumnsmap.set(ExcelConstants.EXISTS_IN_DESTINATION, 2);
    this.compareColumnsmap.set(ExcelConstants.VARIANCE, 3);
    this.compareColumsMapKeys = Array.from(this.compareColumnsmap.keys());
  }

  form = new FormGroup({
    selecttest: new FormControl('', Validators.required),
    sourcedropdown: new FormControl('', Validators.required),
    destinationdropdown: new FormControl('', Validators.required)
  });


  uploadSourceXls() {
    console.log('uploadSourceXls() STARTS..');
    this.sourcelabel = true;
    this.listarr = this.sourceXlsData;
    this.sourceHeaders = this.listarr[0];
    console.log('uploadSourceXls() .. sourceHeaders', this.sourceHeaders);
    this.sourceUploadLabel = this.fileName + ' uploaded successfully';
    this.sourceUploadedFlag = true;
    console.log('uploadSourceXls() ENDS..');
  }

  populateSourceXlsData(sourceXlsData) {
    console.log('populateSourceXlsData() STARTS..');
    this.sourceUploadLabel = '';
    this.sourceUploadedFlag = false;
    this.file = sourceXlsData.target.files[0];
    this.fileName = sourceXlsData.target.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      console.log('populateSourceXlsData() files processing STARTS..');
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.sourceXlsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
      this.sourceUploadLabel = this.fileName + ' browsed successfully';
      console.log('populateSourceXlsData() files processing ENDS..');
    };

    console.log('populateSourceXlsData() ENDS..');
  }

  populateDestinatioXlsData(destinationXlsData) {
    console.log('populateDestinatioXlsData() STARTS..');
    this.destinationUploadLabel = '';
    this.destinationUploadedFlag = false;
    this.file = destinationXlsData.target.files[0];
    this.destFileName = destinationXlsData.target.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.destXlsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
      this.destinationUploadLabel = this.destFileName + ' browsed successfully';
      console.log('populateDestinatioXlsData() ENDS..');
    };

  }

  uploadDestinationXls() {
    console.log('uploadDestinationXls() STARTS..');
    this.destinationlabel = true;
    this.listarr = this.destXlsData;
    this.destinationHeaders = this.listarr[0];
    console.log('uploadDestinationXls().. destinationHeaders ', this.destinationHeaders);
    this.destinationUploadLabel = this.destFileName + ' uploaded successfully';
    this.destinationUploadedFlag = true;
    console.log('uploadDestinationXls() ENDS..');
  }

  removeComparedColumn(deletedColumn) {
    const index: number = this.selectedColumnSdataList.indexOf(deletedColumn);
    this.selectedColumnSdata = this.selectedColumnSdataList[index];
    const dropDownDeletedData = this.compareColumnsmap.get(this.selectedColumnSdata.testingType) +
      ':' + this.selectedColumnSdata.sourceColumn + ':' + this.selectedColumnSdata.destinationColumn;
    const destinatioIndex: number = this.dropdownValues.indexOf(dropDownDeletedData);
    if (destinatioIndex > -1) {
      this.dropdownValues.splice(destinatioIndex, 1);
    }
    if (index > -1) {
      this.selectedColumnSdataList.splice(index, 1);
    }
  }

  addColumnsCompareData() {
    this.displayTable = 'block';
    const testType = this.form.get('selecttest').value;
    const destinationValue = this.form.get('destinationdropdown').value;
    const sourceValue = this.form.get('sourcedropdown').value;
    if (testType && destinationValue && sourceValue) {
      this.selectedColumnSdata = {
        testingType: testType,
        sourceColumn: sourceValue,
        destinationColumn: destinationValue
      };
      //if (this.selectedColumnSdataList.indexOf(this.selectedColumnSdata) === -1) {
      this.selectedColumnSdataList.push(this.selectedColumnSdata);
      this.dropdownValues.push(this.compareColumnsmap.get(testType) + ':' + sourceValue + ':' + destinationValue);
      //}
    }
  }

  isReportsTabEnabled(isEnabled) {
    this.enableReportsTab = isEnabled;
  }

  populateCompareColumnsXlsData(compareColumnXlsData) {
    this.templateUploadLabel = '';
    this.templateUploadedFlag = false;
    this.file = compareColumnXlsData.target.files[0];
    this.columnsName = compareColumnXlsData.target.files[0].name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      const workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.compareColumnXlsData = XLSX.utils.sheet_to_json(workbook.
        Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
      this.compareColumnXlsData.shift();
    };
    this.templateUploadLabel = this.columnsName + ' browsed successfully';
  }

  bindCompareColumnData() {
    let testingType: string;
    this.compareColumnXlsData.forEach(columnsData => {
      testingType = columnsData[0];
      this.comparedColumnValues.push(this.compareColumnsmap.get(columnsData[0]) + ':' + columnsData[1] +
        ':' + columnsData[2]);
    });
    this.templateUploadLabel = this.columnsName + ' uploaded successfully';
    this.templateUploadedFlag = true;
  }

  generateCompareColumnsMap() {
    let eISTestType = '';
    const eISSourceArray: string[] = [];
    const eISDestinationArray: string[] = [];

    let eIDTestType = '';
    const eIDSourceArray: string[] = [];
    const eIDDestinationArray: string[] = [];

    let varianceTestType = '';
    const varianceSourceArray: string[] = [];
    const varianceDestinationArray: string[] = [];

    this.selectedColumnSdataList.forEach(columnsData => {
      if (columnsData.testingType === ExcelConstants.EXISTS_IN_SOURCE) {
        eISTestType = columnsData.testingType;
        eISSourceArray.push(this.sourceXlsData[0].indexOf(columnsData.sourceColumn));
        eISDestinationArray.push(this.destXlsData[0].indexOf(columnsData.destinationColumn));
      } else if (columnsData.testingType === ExcelConstants.EXISTS_IN_DESTINATION) {
        eIDTestType = columnsData.testingType;
        eIDSourceArray.push(this.sourceXlsData[0].indexOf(columnsData.sourceColumn));
        eIDDestinationArray.push(this.destXlsData[0].indexOf(columnsData.destinationColumn));
      } else {
        varianceTestType = columnsData.testingType;
        varianceSourceArray.push(this.sourceXlsData[0].indexOf(columnsData.sourceColumn));
        varianceDestinationArray.push(this.destXlsData[0].indexOf(columnsData.destinationColumn));
      }
    });
    if (eISTestType === ExcelConstants.EXISTS_IN_SOURCE) {
      this.disableExistInSourceReport = false;
      this.eisSourceMap = new Map<string, string>();
      this.eisDestMap = new Map<string, string>();
      this.generateEISMap(eISSourceArray, eISDestinationArray, this.eisSourceMap, this.eisDestMap);
    } else if (eISTestType === ExcelConstants.EXISTS_IN_DESTINATION) {
      this.disableExistInDestinationReport = false;
      this.eidSourceMap = new Map<string, string>();
      this.eidDestMap = new Map<string, string>();
      this.generateEISMap(eISSourceArray, eISDestinationArray, this.eidSourceMap, this.eidDestMap);
    } else {
      this.disableVarianceReport = false;
      this.varianceSourceMap = new Map<string, string>();
      this.varianceDestMap = new Map<string, string>();
      this.generateEISMap(eISSourceArray, eISDestinationArray, this.varianceSourceMap, this.varianceDestMap);
    }
  }

  generateEISMap(eISSourceArray: string[], eISDestinationArray: string[], sourceMap, destMap) {
    for (let i = 1; i < this.sourceXlsData.length; i++) {
      var key = '';
      for (let j = 0; j < eISSourceArray.length; j++) {
        if (j > 0) {
          key = key + ',';
        }
        key = key + this.sourceXlsData[i][eISSourceArray[j]];
      }
      sourceMap.set(key, 'false');
    }
    console.log('this.eisSourceMap', this.eisSourceMap);
    console.log('this.eidSourceMap', this.eidSourceMap);
    console.log('this.varianceSourceMap', this.varianceSourceMap);
    for (let i = 1; i < this.destXlsData.length; i++) {
      var key = '';
      for (let j = 0; j < eISDestinationArray.length; j++) {
        if (j > 0) {
          key = key + ',';
        }
        key = key + this.destXlsData[i][eISDestinationArray[j]];
      }
      destMap.set(key, 'false');
    }
    console.log('this.eisDestinationMap', this.eisDestMap);
    console.log('this.eidDestMap', this.eidDestMap);
    console.log('this.varianceDestMap', this.varianceDestMap);
  }


  exportToExcel(reportName: string) {
    //this.dropdownValues = this.templateUploadedFlag ? this.comparedColumnValues : this.dropdownValues;
    this.setFinalMap(reportName);
    const list = [];
    list.push(JSON.stringify(this.finalSourceMap));
    list.push(JSON.stringify(this.finalDestMap));
    console.log('list', list);

    this.uploadservice.exportToExcel(new ExcelData(this.finalSourceMap, this.finalDestMap, reportName)).subscribe(data => {
      console.log('this.finalSourceMap', this.finalSourceMap);
      console.log('this.finalDestMap', this.finalDestMap);
      const link = window.URL.createObjectURL(data);
      const element = document.createElement('a');
      document.body.appendChild(element);
      element.setAttribute('style', 'display: none');
      element.href = link;
      reportName = ExcelConstants.REPORT_2 ? this.destFileName : this.fileName;
      element.download = reportName;
      element.click();
    });
  }

  downloadTemplateExcel() {
    // this.uploadservice.exportToExcel(new ExcelData(['TestType', 'Source Column', 'Destination Column'],
    //   null, null, null, null, 'template')).subscribe(data => {
    //     const link = window.URL.createObjectURL(data);
    //     let element = document.createElement('a');
    //     document.body.appendChild(element);
    //     element.setAttribute('style', 'display: none');
    //     element.href = link;
    //     element.download = 'Sample_Template';
    //     element.click();
    //   });
  }

  setFinalMap(reportName: string) {
    switch (reportName) {
      case 'report1':
        this.finalSourceMap = this.getJsonObject(this.eisSourceMap);
        this.finalDestMap = this.getJsonObject(this.eisDestMap);
        break;
      case ExcelConstants.REPORT_2:
        this.finalSourceMap = this.eidSourceMap;
        this.finalDestMap = this.eidDestMap;
        break;
      case ExcelConstants.REPORT_3:
        this.finalSourceMap = this.varianceSourceMap;
        this.finalDestMap = this.varianceDestMap;
        break;
      default:
        break;
    }
  }
  getJsonObject(sourceMap: Map<string, string>) {
    const sourceJsonMap = {};
    sourceMap.forEach((value, key) => {
      sourceJsonMap[key] = value;
    });
    return sourceJsonMap;
  }
}
