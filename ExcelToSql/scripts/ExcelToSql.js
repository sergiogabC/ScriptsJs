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
  const workbook = xlsx.readFile("costingReport.xls");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet); // array de objetos

  // Conecta a la base de datos
  const connection = await mysql.createConnection(dbConfig);

  // Inserta los datos
  const insertQuery = `
    INSERT INTO costing_report 
    (materialNumber, description, profit_center, costing_date, material_cost)
    VALUES (?, ?, ?, ?, ?)
  `;

  for (const row of data) {
    await connection.execute(insertQuery, [
      row.nombre || "",
      row.descripcion || "",
      row.unidad_medida || "",
      row.precio_unitario || 0,
      row.proveedor || "",
      row.fecha_actualizacion || null,
    ]);
  }

  await connection.end();
  console.log("Excel importado a MySQL correctamente.");
}

importarExcel().catch(console.error);
