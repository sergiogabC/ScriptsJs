export function convertirFecha(fecha) {
  const [mes, dia, anio] = fecha.split("/");

  const anioCompleto = anio.length === 2 ? `20${anio}` : anio; //El año debe ser de 2000 hacia delante
  //Se coloca un 0 precededor
  const mesFormateado = mes.padStart(2, "0");
  const diaFormateado = dia.padStart(2, "0");

  return `${anioCompleto}-${mesFormateado}-${diaFormateado}`;
}
