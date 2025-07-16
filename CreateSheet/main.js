import ExcelJs from "exceljs";
import { titlesQtos, titlesInputs } from "./services/constExcel.js";

const insertDataForms = (cellLetter, formula) => {
  let numCell = 25;
  for (let i = 1; i <= matrizData.length; i++) {
    sheet.getCell(`${cellLetter}${numCell}`).value = {
      formula: formula,
      result: null,
    };

    numCell++;
  }
};

const insertStyleData = (cellLetters) => {
  for (let letter of cellLetters) {
    let numCell = 25;
    for (let i = 1; i <= matrizData.length; i++) {
      let cell = sheet.getCell(`${letter}${numCell}`);
      cell.font = fontDataQto;
      cell.alignment = aligmentDataQto;
      cell.fill = fillQto;
      numCell++;
    }
  }
};

const dataInputs = {
  client: "",
  country: "",
  proposalManager: "",
  ht19NumberSites: 1,
  sitesOutCoverage: 0,
  numSites: 1111,
  remoteSpares: 0,
  totalOfSpares: 0,
  capacitySes17: 0,
  overbooking: 0,
  cTotalBandaKa: 11111,
  mbpsProm: 0,
  solDolar: 0,
  pUTExWorks: 0,
  costBandKaSes: 0,
  costHBandKa: 0,
  contract: 11,
  sitesPenalties: 0,
  rateFinancingCapex: 12,
  uit: 0,
};

const dataQto = {
  type: ["1111", "22"],
  category: ["", ""],
  subCategory: ["", ""],
  manufacturerPart: ["qqqqq+qqq", "11"],
  margin: [12, 12],
  productCode: ["", ""],
  description: ["11", ""],
  qty: [22, 2],
  unitOfMeasure: ["", ""],
  discount: [11, 11],
  finance: ["www", "122"],
  owner: ["", ""],
};

const cellsNumHeigth = [4, 5, 6, 7, 13, 14];

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

const fillQto = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "D9D9D9" },
};

const fontDataQto = { name: "Calibri", size: 10 };
const aligmentDataQto = {
  vertical: "center",
  horizontal: "center",
};

//------------------------Comienzo de WorkBook----------------------
const workBook = new ExcelJs.Workbook();

workBook.creator = "";
workBook.created = new Date();
workBook.modified = new Date();
workBook.properties.date1904 = true;

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

  if (cellsNumHeigth.includes(numCel)) {
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

let matrizData = [];
let cellStartNum = 25;

for (let i = 0; i < dataQto.type.length; i++) {
  let margin = 1 - dataQto.margin[i] === 0 ? 0 : dataQto.margin[i] / 100;

  matrizData.push([
    dataQto.type[i],
    dataQto.category[i],
    dataQto.subCategory[i],
    dataQto.manufacturerPart[i],
    dataQto.productCode[i],
    dataQto.description[i],
    dataQto.qty[i],
    dataQto.unitOfMeasure[i],
    dataQto.discount[i],
    dataQto.finance[i],
    null,
    null,
    null,
    54,
    null,
    null,
    dataQto.owner[i],
    null,
    null,
    null,
    null,
    null,
    null,
    "",
  ]);

  cellStartNum++;
}

try {
  sheet.addTable({
    name: "Qto",
    ref: "A24",
    style: {
      theme: null,
    },
    columns: columnsTitles,
    rows: matrizData,
  });
} catch (e) {
  console.log(e);
}

insertDataForms("K", "[[Unit Cost]]/0.7");
insertDataForms("L", "[[Unit Price]]*(1-[Discount])");
insertDataForms("M", `IF([Type]=1,$C$19,1)*[[Unit Disc. Price]]*[Qty]`);
insertDataForms(
  "O",
  `IF([Type]="OPEX",$C$19,1)*[[Unit Cost]]*[Qty]
`
);
insertDataForms("P", `1-([[Ext. Cost]]/[[Ext. Disc. Price]])`);
insertDataForms("R", `[[Ext. Disc. Price]]/$C$7/$C$19`);
insertDataForms("S", `[[Ext. Cost]]/$C$7/$C$19`);
insertDataForms("T", `[[Ext. Disc. Price]]/$C$13/$C$19`);
insertDataForms("U", `[[Ext. Cost]]/$C$13/$C$19`);
insertDataForms(
  "V",
  `IF(AND([Type]="CAPEX",[[Finance?]]="MRC"),PMT($C$21/12,$C$19,-[[Ext. Disc. Price]]),0)`
);
insertDataForms(
  "W",
  `IF(AND([Type]="CAPEX",[[Finance?]]="MRC"),PMT($C$21/12,$C$19,-[[Ext. Disc. Price]])/$C$7,IF([Type]="OPEX",[[Ext. Disc. Price]]/$C$7/$C$19,0))`
);

const rowTitle = sheet.getRow(24);

rowTitle.height = 13;
rowTitle.eachCell((cell, colNumber) => {
  cell.font = fontTitlesQto;
  cell.alignment = aligmentTitlesQto;
  cell.fill = fillQto;
});

insertStyleData([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "N",
  "Q",
  "X",
]);

// let rowData = sheet.getRow(25);
// rowData.height = 13;
// rowData.eachCell((cell, colnumber) => {
// cell.font = fontDataQto;
// cell.alignment = aligmentDataQto;
// cell.fill = fillQto;
// });

workBook.calcProperties.fullCalcOnLoad = true;
workBook.xlsx.writeFile("./files/qtoC3.xlsx");
