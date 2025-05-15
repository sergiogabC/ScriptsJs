const xlsx = require("xlsx");
const fs = require("fs");
const cF = require("../utils/convertirFecha.js");
const convertirFecha = cF.convertirFecha;

const workbook = xlsx.readFile("./archivosExcel/costingReport.xls");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

//Función para obtener un rango de filas
function extraerFilas(sheet, desdeFila, hastaFila) {
  const datos = [];

  for (let i = desdeFila; i <= hastaFila; i++) {
    console.log(i);
    const fila = {
      material_number: sheet[`A${i}`].v || "",
      description: sheet[`B${i}`].v || "",
      profit_center: sheet[`C${i}`].v || "",
      costing_date: convertirFecha(sheet[`D${i}`].w || ""),
      material_cost: parseFloat(Number(sheet[`E${i}`].v).toFixed(2) || 0.0),
      pls: parseFloat(Number(sheet[`F${i}`].v).toFixed(3) || 0.0),
      cost: parseFloat(Number(sheet[`G${i}`].v).toFixed(2) || 0.0),
    };

    datos.push(fila);
  }

  return datos;
}

const resultados = extraerFilas(sheet, 3, 49025);

console.log(resultados);

//Guardar como archivo JSON
fs.writeFileSync(
  "./json/costingReport.json",
  JSON.stringify(resultados, null, 1),
  "utf8"
);
