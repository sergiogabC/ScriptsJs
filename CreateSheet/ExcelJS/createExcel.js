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
    `=N${cellStartNum}/${margin}`,
    `=k${cellStartNum}* I${cellStartNum}`,
    `=SI(N${cellStartNum}="OPEX";2;1)*L${cellStartNum}*G${cellStartNum}`,
    dataQto.margin[i],
    dataQto.owner[i],
  ]);

  cellStartNum++;
}

console.log(matrizData);
