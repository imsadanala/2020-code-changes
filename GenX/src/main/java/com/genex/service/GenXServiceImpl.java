package com.genex.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.genex.dto.ExcelData;

@Service
public class GenXServiceImpl implements GenXService {
	String reportName = null;

	public byte[] getdiscrepancies(ExcelData excelData) {
		List<String> srcData = excelData.getSourceData();
		reportName = excelData.getReportName();
		if ("template".equalsIgnoreCase(reportName)) {
			return generateExcel(srcData.toArray(new String[0]), null);
		}
		List<String> destData = excelData.getDestinationData();
		// List<String> columnsToCompare = excelData.getColumnsToCompare();
		// List<String> varianceColumns = excelData.getVarianceColumns();
		List<String> testIds = excelData.getTestIds();
		String[] sourceHdr = srcData.get(0).split(",");
		String[] destHdr = destData.get(0).split(",");
		List<String> sourceData = new ArrayList<>();
		sourceData = srcData.subList(1, srcData.size());
		List<String> destinatinData = new ArrayList<>();
		destinatinData = destData.subList(1, destData.size());
		Map<String, List<String>> map = new HashMap<>();
		for (String s : testIds) {
			String[] colToCheck = s.split(":");
			if (map.containsKey(colToCheck[0])) {
				map.get(colToCheck[0]).add(colToCheck[1] + ":" + colToCheck[2]);
			} else {
				List<String> col = new ArrayList<>();
				col.add(colToCheck[1] + ":" + colToCheck[2]);
				map.put(colToCheck[0], col);
			}
		}
		for (String testId : map.keySet()) {
			if ("1".equalsIgnoreCase(testId) && "report1".equalsIgnoreCase(excelData.getReportName())) {
				compareSourceAndDestination(sourceHdr, destHdr, sourceData, destinatinData, map.get(testId), "1");
				return generateExcel(sourceHdr, sourceData);
			} else if ("2".equalsIgnoreCase(testId) && "report2".equalsIgnoreCase(excelData.getReportName())) {
				compareSourceAndDestination(destHdr, sourceHdr, destinatinData, sourceData, map.get(testId), "2");
				return generateExcel(destHdr, destinatinData);
			} else {
				compareSourceAndDestination(sourceHdr, destHdr, sourceData, destinatinData, map.get("1"), "1");
				compareSourceAndDestinationWithVarience(sourceHdr, destHdr, sourceData, destinatinData, map.get("3"),
						"1");
				sourceData.stream().forEach(System.out::println);
				destinatinData.stream().forEach(System.out::println);
				return generateExcel(sourceHdr, sourceData);
			}
		}
		return null;
	}

	private byte[] generateExcel(String[] sourceHdr, List<String> sourceData) {
		XSSFWorkbook workBook = null;
		byte[] bytes = null;
		ByteArrayOutputStream byteArrayOutputStream = null;
		try {
			workBook = populateWorkBook(sourceData, sourceHdr);
			byteArrayOutputStream = new ByteArrayOutputStream();
			workBook.write(byteArrayOutputStream);
			bytes = byteArrayOutputStream.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				byteArrayOutputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return bytes;
	}

	private static void compareSourceAndDestination(String[] sourceHdr, String[] DestinationHdr,
			List<String> sourceData, List<String> destinatinData, List<String> clomnToCompare, String ruleType) {
		try {
			int i = 0;
			int j = 0;
			for (String s : sourceData) {
				String srcData = s;
				String[] src = srcData.split(",");
				String inTarget = "false";
				for (String destData : destinatinData) {
					if (inTarget.equalsIgnoreCase("false")) {
						String[] dest = destData.split(",");
						col: for (String col : clomnToCompare) {
							int srcIndex = 0;
							int destIndex = 0;
							if (ruleType.equalsIgnoreCase("1")) {
								srcIndex = getIndexOfColomn(sourceHdr, col.substring(0, col.indexOf(":")));
								destIndex = getIndexOfColomn(DestinationHdr, col.substring(col.indexOf(":") + 1));
							} else {
								destIndex = getIndexOfColomn(DestinationHdr, col.substring(0, col.indexOf(":")));
								srcIndex = getIndexOfColomn(sourceHdr, col.substring(col.indexOf(":") + 1));
							}
							if (src[srcIndex].equalsIgnoreCase(dest[destIndex])) {
								inTarget = "true";
							} else {
								inTarget = "false";
								break col;
							}
						}
						j++;
					}
				}
				s = s + "," + inTarget + "," + String.valueOf(j);
				sourceData.set(i, s);
				i++;
				j = 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void compareSourceAndDestinationWithVarience(String[] sourceHdr, String[] destinationHdr,
			List<String> sourceData, List<String> destinatinData, List<String> clomnToCompare, String ruleType) {
		int i = 0;
		for (String s : sourceData) {
			String srcData = s;
			String[] src = srcData.split(",");
			if (src[src.length - 2].equalsIgnoreCase("true")) {
				String inTarget = "false";
				int destIndx = Integer.parseInt(src[src.length - 1]);
				String destData = destinatinData.get(destIndx - 1);
				if (inTarget.equalsIgnoreCase("false")) {
					String[] dest = destData.split(",");
					if(clomnToCompare != null) {
						col: for (String col : clomnToCompare) {
							int srcIndex = 0;
							int destIndex = 0;
							if (ruleType.equalsIgnoreCase("1")) {
								srcIndex = getIndexOfColomn(sourceHdr, col.substring(0, col.indexOf(":")));
								destIndex = getIndexOfColomn(destinationHdr, col.substring(col.indexOf(":") + 1));
							} else {
								destIndex = getIndexOfColomn(destinationHdr, col.substring(0, col.indexOf(":")));
								srcIndex = getIndexOfColomn(sourceHdr, col.substring(col.indexOf(":") + 1));
							}
							if (src[srcIndex].equalsIgnoreCase(dest[destIndex])) {
								inTarget = "true";
							} else {
								inTarget = "false";
								break col;
							}
						}
					}
				}
				s = s + "," + inTarget;
				sourceData.set(i, s);
				i++;
			}
		}
	}

	public static int getIndexOfColomn(String[] hdrArray, String col) {
		for (int i = 0; i < hdrArray.length; i++) {
			if (hdrArray[i].trim().equalsIgnoreCase(col)) {
				return i;
			}
		}
		return -1;
	}

	private XSSFWorkbook populateWorkBook(List<String> excelData, String[] excelHeader) throws IOException {
		XSSFWorkbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("GenxData");
		XSSFFont headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);
		Row headerRow = sheet.createRow(0);
		String[] hdrCol = excelHeader;
		for (int i = 0; i < hdrCol.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(hdrCol[i]);
			cell.setCellStyle(headerCellStyle);
		}
		if (!"template".equalsIgnoreCase(reportName)) {
			Cell cell = headerRow.createCell(hdrCol.length);
			cell.setCellValue("report1".equalsIgnoreCase(reportName) ? "Exists In Destination" : "Exists In Source");
			cell.setCellStyle(headerCellStyle);
		}
		int rowNum = 1;
		if (excelData != null) {
			for (String s : excelData) {
				Row row = sheet.createRow(rowNum++);
				String[] srcDataRow = s.split(",");
				if ("report3".equalsIgnoreCase(reportName)
						&& (srcDataRow[srcDataRow.length - 1].equalsIgnoreCase("true")
								|| srcDataRow[srcDataRow.length - 1].equalsIgnoreCase("false"))) {
					srcDataRow[srcDataRow.length - 2] = srcDataRow[srcDataRow.length - 1];
				}
				for (int i = 0; ((i <= srcDataRow.length - 2 && !"report3".equalsIgnoreCase(reportName))
						|| (i <= srcDataRow.length - 2 && "report3".equalsIgnoreCase(reportName))); i++) {
					row.createCell(i).setCellValue(srcDataRow[i]);
				}
			}
		}
		for (int i = 0; i < hdrCol.length; i++) {
			sheet.autoSizeColumn(i);
		}
		return workbook;
	}
}
