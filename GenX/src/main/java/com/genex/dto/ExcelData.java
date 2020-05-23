package com.genex.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude
public class ExcelData implements Serializable {

	private static final long serialVersionUID = 2366177856834547541L;
	private List<String> sourceData;
	private List<String> destinationData;
	private List<String> columnsToCompare;
	private List<String> varianceColumns;
	private List<String> testIds;
	private String reportName;
	private String isTemplateExcel;

	public ExcelData() {
	}

	public List<String> getSourceData() {
		return sourceData;
	}

	public void setSourceData(List<String> sourceData) {
		this.sourceData = sourceData;
	}

	public List<String> getDestinationData() {
		return destinationData;
	}

	public void setDestinationData(List<String> destinationData) {
		this.destinationData = destinationData;
	}

	public List<String> getColumnsToCompare() {
		return columnsToCompare;
	}

	public void setColumnsToCompare(List<String> columnsToCompare) {
		this.columnsToCompare = columnsToCompare;
	}

	public List<String> getVarianceColumns() {
		return varianceColumns;
	}

	public void setVarianceColumns(List<String> varianceColumns) {
		this.varianceColumns = varianceColumns;
	}

	public List<String> getTestIds() {
		return testIds;
	}

	public void setTestIds(List<String> testIds) {
		this.testIds = testIds;
	}

	public String getReportName() {
		return reportName;
	}

	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

	public String isTemplateExcel() {
		return isTemplateExcel;
	}

	public void setTemplateExcel(String isTemplateExcel) {
		this.isTemplateExcel = isTemplateExcel;
	}

}
