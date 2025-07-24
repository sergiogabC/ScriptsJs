import ExcelJs from "exceljs";
import { titlesQtos, titlesInputs } from "./constExcel.js";

const insertFormInCell = (cell, form) => {
  if (Array.isArray(cell)) {
    for (let c of cell) {
      let cellValue = sheet.getCell(c);
      cellValue.value = {
        formula: form,
        result: null,
      };
    }
  } else {
    let cellValue = sheet.getCell(cell);
    cellValue.value = {
      formula: form,
      result: null,
    };
  }
};

const insertStyleCell = (cell, styles) => {
  if (Array.isArray(cell)) {
    for (let c of cell) {
      let cell = sheet.getCell(c);
      cell.alignment =
        typeof styles.alignment === "undefined" ? null : styles.alignment;
      cell.font = typeof styles.font === "undefined" ? null : styles.font;
      cell.fill = typeof styles.fill === "undefined" ? null : styles.fill;
      cell.border = typeof styles.border === "undefined" ? null : styles.border;
    }
  } else {
    let cell = sheet.getCell(cell);
    cell.alignment =
      typeof styles.aligment === "undefined" ? null : styles.alignment;
    cell.font = typeof styles.font === "undefined" ? null : styles.font;
    cell.fill = typeof styles.fill === "undefined" ? null : styles.fill;
    cell.border = typeof styles.border === "undefined" ? null : styles.border;
  }
};

const insertStyleCellLetterIter = (letters, styles, numStart, lengthI) => {
  for (let letter of letters) {
    let num = numStart;
    for (let i = 1; i <= lengthI; i++) {
      let cell = sheet.getCell(letter + num);
      cell.alignment =
        typeof styles.alignment === "undefined" ? null : styles.alignment;
      cell.font = typeof styles.font === "undefined" ? null : styles.font;
      cell.fill = typeof styles.fill === "undefined" ? null : styles.fill;
      cell.border = typeof styles.border === "undefined" ? null : styles.border;
      num++;
    }
  }
};

const insertFormTotal = (letter, listForms) => {
  let numCell = 5;
  for (let form of listForms) {
    let cell = sheet.getCell(`${letter}${numCell}`);
    cell.value = { formula: form, result: null };
    numCell++;
  }
};

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

//--Inserta los datos generales

const insertDataStyle = (cellLetters, fillStyle, format) => {
  for (let letter of cellLetters) {
    let numCell = 25;
    for (let i = 1; i <= matrizData.length; i++) {
      let cell = sheet.getCell(`${letter}${numCell}`);
      cell.font = fontDataQto;
      cell.alignment = aligmentDataQto;
      cell.fill = fillStyle;
      if (!(typeof format === "undefined")) cell.numFmt = format;
      numCell++;
    }
  }
};

const listDataInputs = (dataInputs) => {
  const list = [
    dataInputs.client,
    dataInputs.country,
    dataInputs.proposalManager,
    dataInputs.ht19NumberSites,
    dataInputs.sitesOutCoverage,
    dataInputs.numSites,
    dataInputs.remoteSpares,
    dataInputs.totalOfSpares,
    "",
    dataInputs.capacitySes17,
    dataInputs.overbooking,
    dataInputs.cTotalBandaKa,
    dataInputs.mbpsProm,
    dataInputs.solDolar,
    dataInputs.pUTExWorks,
    dataInputs.costBandKaSes,
    dataInputs.costHBandKa,
    dataInputs.contract,
    dataInputs.sitesPenalties,
    dataInputs.rateFinancingCapex,
    dataInputs.uit,
  ];
  return list;
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

//------------------------Styles----------------------------

//Width Column
const widthColumn = [
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
  { width: 14 },
  { width: 10 },
  { width: 22 },
  { width: 22 },
  { width: 24 },
  { width: 24 },
  { width: 17 },
  { width: 28 },
  { width: 10 },
];

//---------------Titles Inputs-----------
const fontTitlesInputs = { name: "Calibri", size: 9, bold: true };
const alignmentsTitlesInputs = { vertical: "bottom", horizontal: "right" };
const fillTitlesInputs = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "BDD7EE" },
};

//---------------Titles Datas-----------
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

//---------------Titles Qtos-----------
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
const fillCalcQto = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "F8CBAD" },
};

//---------------Data Qtos-----------
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

sheet.columns = widthColumn;

sheet.mergeCells("A1:B1");

let cellInputTitle = sheet.getCell("A1");
cellInputTitle.value = "Inputs";
cellInputTitle.font = { size: 9, name: "Calibri", color: { argb: "FFFFFF" } };
cellInputTitle.alignment = { horizontal: "center", vertical: "bottom" };
cellInputTitle.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "000000" },
};

let cellDataTitle = sheet.getCell("C1");
cellDataTitle.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "000000" },
};

//------------------------Pintado de tabla inputs------------------------

let numCellTitle = 2;
let numCellData = 2;

const listData = listDataInputs(dataInputs);

for (let title of titlesInputs) {
  sheet.mergeCells(`A${numCellTitle}:B${numCellTitle}`);
  let cell = sheet.getCell(`B${numCellTitle}`);
  cell.value = title;
  cell.font = fontTitlesInputs;
  cell.alignment = alignmentsTitlesInputs;
  cell.fill = fillTitlesInputs;
  let row = sheet.getRow(numCellTitle);
  if (cellsNumHeigth.includes(numCellTitle)) {
    row.height = 15;
  } else {
    row.height = 12;
  }
  if (numCellTitle === 22) cell.border = { bottom: { style: "thin" } };
  numCellTitle++;
}
for (let data of listData) {
  let cellData = sheet.getCell(`C${numCellData}`);
  cellData.value = data;
  cellData.font = fontDatasInputsBold;
  cellData.alignment = aligmentsDatasInputs;
  cellData.fill = fillDatasInputs;
  cellData.border = borderDatasInputs;
  numCellData++;
}

//------------------------Pintado de tabla qto-------------------

let columnsTitles = [];

for (let title of titlesQtos) {
  columnsTitles.push({ name: title, filterButton: true });
}

let matrizData = [];
let cellQtoNum = 25;

for (let i = 0; i < dataQto.type.length; i++) {
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

  cellQtoNum++;
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
const listColLCalc = [12, 13, 15, 16, 18, 19, 20, 21, 22, 23];
rowTitle.height = 13;
rowTitle.eachCell((cell, collNumber) => {
  cell.font = fontTitlesQto;
  cell.alignment = aligmentTitlesQto;
  listColLCalc.includes(collNumber)
    ? (cell.fill = fillCalcQto)
    : (cell.fill = fillQto);
});

insertDataStyle(["A", "B", "C", "D", "E", "F", "Q", "H", "J", "X"], fillQto);
insertDataStyle(
  ["L", "M", "O", "R", "S", "T", "U", "V", "W"],
  fillCalcQto,
  `_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)`
);
insertDataStyle(["G"], fillQto, "0");
insertDataStyle(["I"], fillQto, "0%");
insertDataStyle(["P"], fillCalcQto, "0%");
insertDataStyle(
  ["K", "N"],
  fillQto,
  `_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)`
);

//------------------------Pintado de tabla Totals-------------------

const listFormsPrice = [
  `SUMIF(A24:A40,"CAPEX",M24:M40)`,
  `SUMIF(A24:A40,"OPEX",M24:M40)`,
  `SUM(F5:F6)`,
];
const listFormsCost = [
  `SUMIF(A24:A40,"CAPEX",O24:O40)`,
  `SUMIF(A24:A40,"OPEX",O24:O40)`,
  `SUM(G5:G6)`,
];
const listFormsMargin = [`1-(G5/F5)`, `1-(G6/F6)`, `1-(G7/F7)`];

insertFormTotal("F", listFormsPrice);
insertFormTotal("G", listFormsCost);
insertFormTotal("H", listFormsMargin);

const fontTitleTotal = { name: "Calibri", size: 11, bold: true };
const alignmentTitleTotal = { vertical: "center", horizontal: "center" };
const aligmentPriceTotal = { vertical: "center", horizontal: "left" };
const fillTitleTotal = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "B4C6E7" },
};
const bordTotal = {
  bottom: { style: "thin" },
  left: { style: "thin" },
  right: { style: "thin" },
  top: { style: "thin" },
};

const alignmentDataTotal = { vertical: "center", horizontal: "left" };
const fillDataTotal = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "D9D9D9" },
};
const fontDataTotal = { name: "Calibri", size: 11 };

const insertTitleAndStyleTotal = (cell, title) => {
  let cellValue = sheet.getCell(cell);
  cellValue.value = title;
  cellValue.font = fontTitleTotal;
  if (title === "PRICE" || title === "Price x Site x Month") {
    cellValue.alignment = aligmentPriceTotal;
  } else {
    cellValue.alignment = alignmentTitleTotal;
  }
  cellValue.fill = fillTitleTotal;
  cellValue.border = bordTotal;
};
insertTitleAndStyleTotal("E5", "CAPEX");
insertTitleAndStyleTotal("E6", "OPEX");
insertTitleAndStyleTotal("F4", "PRICE");
insertTitleAndStyleTotal("G4", "COST");
insertTitleAndStyleTotal("H4", "MARGIN");
insertTitleAndStyleTotal("F13", "Price x Site x Month");
insertTitleAndStyleTotal("G13", "Cost x Site x Month");
insertTitleAndStyleTotal("H13", "MARGIN");

insertFormInCell("F14", `F7/C7/C19`);
insertFormInCell("G14", `G7/C7/C19`);
insertFormInCell("H14", `1-(G14/F14)`);

insertStyleCellLetterIter(
  ["F", "G", "H"],
  {
    alignment: alignmentDataTotal,
    border: bordTotal,
    font: fontDataTotal,
    fill: fillDataTotal,
  },
  5,
  3
);

insertStyleCell(["F14", "G14", "H14"], {
  alignment: alignmentDataTotal,
  border: bordTotal,
  font: fontDataTotal,
  fill: fillDataTotal,
});

workBook.calcProperties.fullCalcOnLoad = true;
workBook.xlsx.writeFile("./files/qtoC3.xlsx");
