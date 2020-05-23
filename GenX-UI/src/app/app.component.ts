import { Component, ElementRef } from '@angular/core';
import { UploadService } from './upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ExcelData } from './dto/exceldata.dto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Excel';

  constructor(private uploadservice: UploadService) {
  }

  form = new FormGroup({
    selecttest: new FormControl('', Validators.required),
    sourcedropdown: new FormControl('', Validators.required),
    destinationdropdown: new FormControl('', Validators.required)
  });

  excelSheet: XLSX.WorkSheet;
  fileName: string;
  destFileName: string;
  columnsName: string;
  workbooks: XLSX.WorkBook;
  destinationlabel: boolean;
  sourcelabel: boolean;
  columnsLabel: boolean;
  sourceValue: string;
  destinationValue: string;
  file: File;
  filelist: any[];
  listarr: string[];
  contentvalue = '';
  storevar = '';
  arrayBuffer: any;
  lastarray: any[];
  headerSrc = '';
  destSrc = '';  
  testType = '';
  displayTable = 'none';

  sourceXlsData: any[];
  destXlsData: any[];
  compareColumnXlsData: any[];
  updatedSourceData: string[] = [];
  updatedDestinationData: string[] = [];
  dropdownValues: string[] = [];
  selectedColumnSdata = { testingType: '', sourceColumn: '', destinationColumn: '' };
  selectedColumnSdataList: any = [];
  sourceUploadLabel = 'Browse Source XLS file';
  destinationUploadLabel = 'Browse Destination XLS file';
  templateUploadLabel = 'Browse Template XLS file';
  comparedColumnValues: string[] = [];
  templateUploadedFlag: boolean;
  compareColumnsmap = new Map();


  uploadSourceXls() {
    this.sourcelabel = true;
    this.listarr = this.sourceXlsData;
    this.headerSrc = this.listarr[0];
    for (let i in this.sourceXlsData) {
      for (let j in this.sourceXlsData[i]) {
        this.contentvalue = this.storevar + this.listarr[i][j];
        this.storevar = this.contentvalue + ' , ';
      }
      this.storevar = '';
      this.updatedSourceData.push(this.contentvalue);
    }
    this.sourceUploadLabel = this.fileName + ' uploaded successfully';
  }

  populateSourceXlsData(sourceXlsData) {
    this.file = sourceXlsData.target.files[0];
    this.fileName = sourceXlsData.target.files[0].name;
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.sourceXlsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
    };
    this.sourceUploadLabel = this.fileName + ' browsed successfully';
  }

  populateDestinatioXlsData(destinationXlsData) {
    this.file = destinationXlsData.target.files[0];
    this.destFileName = destinationXlsData.target.files[0].name;
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.destXlsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
    };
    this.destinationUploadLabel = this.destFileName + ' browsed successfully';
  }

  uploadDestinationXls() {
    this.destinationlabel = true;
    this.listarr = this.destXlsData;
    this.destSrc = this.listarr[0];
    for (let i in this.destXlsData) {
      for (let j in this.destXlsData[i]) {
        this.contentvalue = this.storevar + this.listarr[i][j];
        this.storevar = this.contentvalue + ' , ';
      }
      this.storevar = null;
      this.updatedDestinationData.push(this.contentvalue);
    }
    this.destinationUploadLabel = this.destFileName + ' uploaded successfully';
  }

  onAdd() {
    this.displayTable = 'block';
    this.testType = this.form.get('selecttest').value;
    this.destinationValue = this.form.get('destinationdropdown').value;
    this.sourceValue = this.form.get('sourcedropdown').value;
    this.dropdownValues.push(this.testType + ":" + this.sourceValue + ":" + this.destinationValue);
    this.selectedColumnSdata = {
      testingType: this.testType,
      sourceColumn: this.sourceValue,
      destinationColumn: this.destinationValue
    };
    this.selectedColumnSdataList.push(this.selectedColumnSdata);
  }

  exportToExcel(reportName: string) {
    this.dropdownValues = this.templateUploadedFlag ? this.comparedColumnValues : this.dropdownValues;
    this.uploadservice.exportToExcel(new ExcelData(this.updatedSourceData, this.updatedDestinationData,
      this.dropdownValues, null, this.dropdownValues, reportName)).subscribe(data => {
        const link = window.URL.createObjectURL(data);
        let element = document.createElement('a');
        document.body.appendChild(element);
        element.setAttribute('style', 'display: none');
        element.href = link;
        element.download = 'Sample';
        element.click();
      });
  }

  downloadTemplateExcel() {
    this.uploadservice.exportToExcel(new ExcelData(['TestType', 'Source Column', 'Destination Column'],
      null, null, null, null, 'template')).subscribe(data => {
        const link = window.URL.createObjectURL(data);
        let element = document.createElement('a');
        document.body.appendChild(element);
        element.setAttribute('style', 'display: none');
        element.href = link;
        element.download = 'Sample';
        element.click();
      });
  }

  populateCompareColumnsXlsData(compareColumnXlsData) {
    this.file = compareColumnXlsData.target.files[0];
    this.columnsName = compareColumnXlsData.target.files[0].name;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = () => {
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      let workbook = XLSX.read(arr.join(''), { type: 'binary' });
      this.compareColumnXlsData = XLSX.utils.sheet_to_json(workbook.
        Sheets[workbook.SheetNames[0]], { raw: true, header: 1, defval: '' });
      this.compareColumnXlsData.shift();
    };
    this.templateUploadLabel = this.columnsName + ' browsed successfully';
  }

  bindCompareColumnData() {
    this.compareColumnXlsData.forEach(columnsData => {
      this.comparedColumnValues.push(columnsData[0] + ':' + columnsData[1] + ':' + columnsData[2]);
    });
    this.templateUploadLabel = this.columnsName + ' uploaded successfully';
    this.templateUploadedFlag = true;
  }
}
