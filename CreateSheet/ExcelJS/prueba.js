import ExcelJS from "exceljs";

async function readXlsx(filename) {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filename);
  const sheet = workBook.getWorksheet("QTO DB");
  const table = sheet.getTable("Table1");
  table.addRow(["1111", "", "", "qqqqq+qqq", "", "11", 22, "", 11, "www"], 2);
}

readXlsx("./files/QTO.xlsx");
