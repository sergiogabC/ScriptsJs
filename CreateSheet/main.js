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

const titlesQtos = [
  "Type",
  "Category",
  "Subcategory",
  "Manufacturer Part #",
  "Product Code",
  "Description",
  "Qty",
  "Unit of Measure",
  "Discount",
  "Finance?",
  "Unit Price",
  "Unit Disc. Price",
  "Ext. Disc. Price",
  "Unit Cost",
  "Ext. Cost",
  "Profit Margin",
  "Owner",
  "Monthly Price per Site",
  "Monthly Cost per Site",
  "Monthly Price per Mbps",
  "Monthly Cost per Mbps",
  "Financed CAPEX",
  "Financed Monthly Price per Site",
  "Notes",
];

const cellsNum = [4, 5, 6, 7, 13, 14];

const dataInputs = [
  "MINEDU",
  "PERU",
  "JUAN ASTO",
  1204,
  0,
  1204,
  3.0,
  37,
  ".30/5",
  0,
  17,
  7023,
  5.8,
  "S/ 3.70",
  409.2,
  125,
  40,
  18,
  1.0,
  14.0,
  1338,
];

const dataQto = [
  "CAPEX",
  "Hughes Equipment",
  "VSAT",
  "1505216-0332",
  "HT2010",
  "HT2010 Consumer Broadband Satellite Router, Ka Band only",
  1204,
  "Unit",
  0,
  "NRC",
  85.08,
];

const dataResult = [
  [
    "CAPEX",
    "Hughes Equipment",
    "VSAT",
    "1505216-0332",
    "HT2010",
    "HT2010 Consumer Broadband Satellite Router, Ka Band only",
    1204,
    "Unit",
    0,
    "NRC",
    121.54,
    121.54,
    146337.6,
    85.08,
    102436.32,
    30,
    "HNS",
    6.75,
    4.73,
    1.16,
    0.81,
    0.0,
    0.0,
  ],
];

//------------------------Estilos----------------------------
const fontTitlesInputs = { name: "Calibri", size: 9, bold: true };
const alignmentsTitlesInputs = { vertical: "bottom", horizontal: "right" };
const fillTitlesInputs = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "BDD7EE" },
};

const fontDatasInputsBold = {
  name: "Calibri",
  size: 9,
  bold: true,
  color: { argb: "C00000" },
};

const aligmentsDatasInputs = { vertical: "bottom", horizontal: "left" };

const fillDatasInputs = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "D9D9D9" },
};

const borderDatasInputs = {
  bottom: { style: "thin" },
  left: { style: "thin" },
  right: { style: "thin" },
};

const fontTitlesQto = { name: "Calibri", size: 10, bold: true };

const aligmentTitlesQto = {
  vertical: "center",
  horizontal: "center",
  wrapText: true,
};
const fillTitlesQto = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "D9D9D9" },
};

//------------------------Comienzo de WorkBook----------------------
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

let cellInputTitle = sheet.getCell("A1");
let cellDataTitle = sheet.getCell("C1");

cellInputTitle.value = "Inputs";
cellInputTitle.font = { size: 9, name: "Calibri", color: { argb: "FFFFFF" } };
cellInputTitle.alignment = { horizontal: "center", vertical: "bottom" };
cellInputTitle.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "000000" },
};

cellDataTitle.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "000000" },
};

//FFFFFF

let numCel = 2;

//------------------------Pintado de tabla inputs------------------------
for (let title of titlesInputs) {
  sheet.mergeCells(`A${numCel}:B${numCel}`);
  let cell = sheet.getCell(`B${numCel}`);
  cell.value = title;
  cell.font = fontTitlesInputs;
  cell.alignment = alignmentsTitlesInputs;
  cell.fill = fillTitlesInputs;
  let row = sheet.getRow(numCel);

  if (cellsNum.includes(numCel)) {
    row.height = 15;
  } else {
    row.height = 12;
  }

  if (numCel === 22) cell.border = { bottom: { style: "thin" } };
  let cellData = sheet.getCell(`C${numCel}`);
  cellData.font = fontDatasInputsBold;
  cellData.alignment = aligmentsDatasInputs;
  cellData.fill = fillDatasInputs;
  cellData.border = borderDatasInputs;
  numCel++;
}

//------------------------Pintado de tabla qto-------------------

let columnsTitles = [];

for (let title of titlesQtos) {
  columnsTitles.push({ name: title, filterButton: true });
}

let rowsDatas = [];

try {
  sheet.addTable({
    name: "Qto",
    ref: "A24",
    style: {
      theme: null,
    },
    columns: columnsTitles,
    rows: dataResult,
  });
} catch (e) {
  console.log(e);
}

// let row = sheet.getRow(24);

// row.values = titlesQtos;
// row.height = 13;
// row.eachCell((cell, colNumber) => {
//   cell.font = fontTitlesQto;
//   cell.alignment = aligmentTitlesQto;
//   cell.fill = fillTitlesQto;
// });

workBook.xlsx.writeFile("./files/qtoC3.xlsx");
