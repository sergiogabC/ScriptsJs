import ExcelJs from "exceljs";

const titlesInputs = [
  "Client:",
  "Country:",
  "Proposal Manager:",
  "HUGHES T19 Number of Sites:",
  "Sites out of coverage:",
  "Number of Sites:",
  "Remote Spares:",
  "Total of Spares:",
  "Service Plan:",
  "Total capacity SES-17 (Mbps):",
  "Overbooking",
  "Total Ka band Capacity (Mbps):",
  "Average Mbps per Site:",
  "#¡DESCONOCIDO!",
  "Terminal Unit Price (USD) - ExWorks USA:",
  "COST - SES Ka band Mbps / Month (USD):",
  "COST - HUGHES  Ka band Mbps / Month (USD):",
  "Contract:",
  "% sites with Penalties / month:",
  "CAPEX Financing Rate:",
  "UIT:",
];

const fontTitlesInputs = { name: "Calibri", size: 9, bold: true };
const alignmentsTitlesInputs = { vertical: "bottom", horizontal: "right" };
const fillTitlesInputs = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "BDD7EE" },
};
const workBook = new ExcelJs.Workbook();

workBook.creator = "";
workBook.created = new Date();
workBook.modified = new Date();
workBook.properties.date1904 = true;
workBook.calcProperties.fullCalcOnLoad = true;

const sheet = workBook.addWorksheet("QTO DB");

sheet.columns = [
  {},
  { width: 27 },
  { width: 15 },
  { width: 22 },
  { width: 30 },
  { width: 45 },
  { width: 17 },
  { width: 17 },
  { width: 12 },
  { width: 12 },
  { width: 12.5 },
  { width: 17 },
  { width: 16 },
  { width: 12 },
  { width: 13.5 },
];

sheet.mergeCells("A1:B1");
let celInputTitle = sheet.getCell("A1");
celInputTitle.value = "Input";
celInputTitle.font = { size: 9, name: "Calibri", color: { argb: "FFFFFF" } };
celInputTitle.alignment = { horizontal: "center", vertical: "bottom" };
celInputTitle.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "000000" },
};

//FFFFFF

let numCel = 2;
for (let title of titlesInputs) {
  sheet.mergeCells(`A${numCel}:B${numCel}`);
  let cell = sheet.getCell(`B${numCel}`);
  cell.value = title;
  cell.font = fontTitlesInputs;
  cell.alignment = alignmentsTitlesInputs;
  cell.fill = fillTitlesInputs;
  numCel++;
}

workBook.xlsx.writeFile("./files/qtoC3.xlsx");
