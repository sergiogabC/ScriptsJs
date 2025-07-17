import ExcelJS from "exceljs";
// import {} from "../files";

const workBook = await new ExcelJS.Workbook().xlsx.readFile(
  "../files/QTO.xlsx"
);
const sheet = workBook.getWorksheet("QTO DB");
const tables = sheet.getTables();
const table = sheet.getTable("Table1");
// const row = sheet.getRow(25);
// row.eachCell((cel, colNumber) => {
//   console.log(cel);
// });

workBook.xlsx.writeFile("../files/qtoC3.xlsx");
