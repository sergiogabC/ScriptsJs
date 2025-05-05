const xlsx = require("xlsx");
const mysql = require("mysql2/promise");

// Configura tu conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  database: "QTOS",
};

async function importarExcel() {
  // Lee el Excel
  const workbook = xlsx.readFile("./archivosExcel/costingReport.xls");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Conecta a la base de datos
  const connection = await mysql.createConnection(dbConfig);

  // Inserta los datos
  const insertQuery = `
    INSERT INTO costing_report 
    (material_number, description, profit_center, costing_date, material_cost, pls, cost_total)
    VALUES (?, ?, ?, STR_TO_DATE(?,"%m/%d/%y"), ?, ?, ?)`;

  for (let i = 4; i < 49026; i++) {
    console.log(i);

    await connection.execute(insertQuery, [
      sheet[`A${i}`]?.v || "",
      sheet[`B${i}`]?.v || "",
      sheet[`C${i}`]?.v || "",
      sheet[`D${i}`]?.w || "",
      sheet[`E${i}`]?.v || 0.0,
      sheet[`F${i}`]?.v || 0.0,
      sheet[`G${i}`]?.v || 0.0,
    ]);
  }

  await connection.end();
  console.log("Excel importado a MySQL correctamente.");
}

importarExcel().catch(console.error);
