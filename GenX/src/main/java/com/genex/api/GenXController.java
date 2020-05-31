package com.genex.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.genex.dto.ExcelData;
import com.genex.service.GenXService;

@RestController
@CrossOrigin
@RequestMapping("/future")
public class GenXController {

	@Autowired
	GenXService genXService;

	@PostMapping("/genx/test-step-executor")
	public byte[] getDestDataList(@RequestBody ExcelData excelData) {
		byte[] getdiscrepancies = genXService.getdiscrepancies(excelData);
		return getdiscrepancies != null ? getdiscrepancies : new byte[2];
	}

}
