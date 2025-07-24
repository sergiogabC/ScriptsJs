import ExcelJS from "exceljs";

async function readXlsx(filename) {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filename);
  const sheet = workBook.getWorksheet("QTO DB");
  const table = sheet.getTable("Table1");
  sheet.addRow(["1111", "", "", "qqqqq+qqq", "", "11", 22, "", 11, "www"], 2);
  workBook.xlsx.writeFile("./files/qtoC3.xlsx");
}
readXlsx("./files/QTO.xlsx");
