const xlsx = require("xlsx");
const fs = require("fs");

const workbook = xlsx.readFile("./archivosExcel/costingReport.xls");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

// Función para obtener un rango de filas
function extraerFilas(sheet, desdeFila, hastaFila) {
  const datos = [];

  for (let i = desdeFila; i <= hastaFila; i++) {
    const fila = {
      material_number: sheet[`A${i}`]?.v || "",
      description: sheet[`B${i}`]?.v || "",
      profit_center: sheet[`C${i}`]?.v || "",
      costing_date: sheet[`D${i}`]?.v || "",
      material_cost: sheet[`E${i}`]?.v || 0.0,
      pls: sheet[`F${i}`]?.v || 0.0,
      cost: sheet[`G${i}`]?.v || 0.0,
    };

    datos.push(fila);
  }

  return datos;
}

// Extraer de la fila 2 a la 500
const resultados = extraerFilas(sheet, 4, 49026);

// Mostrar resultados
console.log(resultados);

// Guardar como archivo JSON
fs.writeFileSync(
  "./json/costingReport.json",
  JSON.stringify(resultados, null, 1),
  "utf8"
);
