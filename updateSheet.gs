function updateGoogleSheet(data, name) {
  const spreadsheetId = "1LPnkiJ8nyAtE5Q..."; // ID link google sheet
  const sheetName = name;

  if (!data || !Array.isArray(data) || data.length === 0) {
    Logger.log("No valid data provided for update.");
    return;
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) { sheet = spreadsheet.insertSheet(sheetName); }
    sheet.clear();

    // const originalHeaders = Object.keys(data[0]);
    // const customHeaders = originalHeaders.map(header => {
    //   switch (header) {
    //     // case "sn": return "Stock Name";
    //     default: return header;
    //   }
    // });

    const selectedColumns = ["ss", "mp"]; // Select column
    const headers = selectedColumns.map(col => {
      switch (col) {
        case "ss": return "Mã CK";
        case "mp": return "Giá khớp lệnh";
        default: return col;
      }
    });

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);

    const dataRows = data.map(obj => selectedColumns.map(col => obj[col] || ""));
    const dataRange = sheet.getRange(2, 1, dataRows.length, headers.length);
    dataRange.setValues(dataRows);

    const mpColumnIndex = selectedColumns.indexOf("mp") + 1;
    if (mpColumnIndex > 0) {
      const mpRange = sheet.getRange(2, mpColumnIndex, dataRows.length, 1);
      mpRange.setNumberFormat("#,##0.00");
    }

    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4CAF50");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");

    const tableRange = sheet.getRange(1, 1, dataRows.length + 1, headers.length);
    tableRange.setBorder(
      true, true, true, true,
      true, true
    );
    sheet.autoResizeColumns(1, headers.length);
    Logger.log("Data successfully updated with styled headers and table borders!");
  } catch (error) {
    Logger.log(`Error updating sheet: ${error.message}`);
  }
}
