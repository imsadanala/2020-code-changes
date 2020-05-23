import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from './upload.service';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadExcelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
