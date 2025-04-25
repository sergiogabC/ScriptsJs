const xlsx = require("xlsx");
const fs = require("fs");

// Carga el archivo Excel
const workbook = xlsx.readFile(".xlsx");

// Asume que la info está en la primera hoja
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convierte a JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Guarda el JSON en un archivo
fs.writeFileSync("materiales.json", JSON.stringify(data, null, 2), "utf8");

console.log("✅ Excel convertido a JSON con éxito.");
