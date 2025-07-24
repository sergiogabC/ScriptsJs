import XlsxPopulate from "xlsx-populate";
import { getDataInputs, getDataQto } from "../Data/inputsTable.js";

const dataInputs = getDataInputs();
const dataQto = getDataQto();
XlsxPopulate.fromFileAsync("./files/QTO.xlsx").then((workBook) => {
  let sheet = workBook.sheet("QTO DB");
  let rangeInputs = sheet.range("C2:C22");
  console.log("dataQto: ", dataQto);
  rangeInputs.value(dataInputs);

  let rangeQto = sheet.range("A25:J26");
  rangeQto.value(dataQto);
  return workBook.toFileAsync("./files/qtoC3.xlsx");
});
