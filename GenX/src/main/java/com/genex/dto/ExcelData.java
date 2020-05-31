package com.genex.dto;

import java.io.Serializable;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude
public class ExcelData implements Serializable {

	private static final long serialVersionUID = 2366177856834547541L;

	public ExcelData() {
	}

	public ExcelData(@JsonProperty("finalSourceMap") Map<String, String> finalSourceMap,
			@JsonProperty("finalDestMap") Map<String, String> finalDestMap) {
		this.finalSourceMap = finalSourceMap;
		this.finalDestMap = finalDestMap;
	}

	private Map<String, String> finalSourceMap;
	private Map<String, String> finalDestMap;
	private String reportName;

	public Map<String, String> getFinalSourceMap() {
		return finalSourceMap;
	}

	public void setFinalSourceMap(Map<String, String> finalSourceMap) {
		this.finalSourceMap = finalSourceMap;
	}

	public Map<String, String> getFinalDestMap() {
		return finalDestMap;
	}

	public void setFinalDestMap(Map<String, String> finalDestMap) {
		this.finalDestMap = finalDestMap;
	}

	public String getReportName() {
		return reportName;
	}

	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

}
