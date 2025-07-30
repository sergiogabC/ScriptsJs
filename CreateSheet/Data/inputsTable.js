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
  cTotalBandaKa: 12323,
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

export function getDataInputs() {
  const list = [
    [dataInputs.client],
    [dataInputs.country],
    [dataInputs.proposalManager],
    [dataInputs.ht19NumberSites],
    [dataInputs.sitesOutCoverage],
    [dataInputs.numSites],
    [dataInputs.remoteSpares],
    [dataInputs.totalOfSpares],
    [""],
    [dataInputs.capacitySes17],
    [dataInputs.overbooking],
    [dataInputs.cTotalBandaKa],
    [dataInputs.mbpsProm],
    [dataInputs.solDolar],
    [dataInputs.pUTExWorks],
    [dataInputs.costBandKaSes],
    [dataInputs.costHBandKa],
    [dataInputs.contract],
    [dataInputs.sitesPenalties],
    [dataInputs.rateFinancingCapex],
    [dataInputs.uit],
  ];
  return list;
}

const dataQto = {
  type: ["1111", "22"],
  category: ["sda", "vs"],
  subCategory: ["asa", "da"],
  manufacturerPart: ["qqqqq+qqq", "11"],
  margin: [12, 12],
  productCode: ["vv", "aa"],
  description: ["11", "ss"],
  qty: [22, 2],
  unitOfMeasure: ["asda", "ad"],
  discount: [11, 11],
  finance: ["www", "122"],
  owner: ["sad", "dad"],
};

export function getDataQto() {
  let matrizData = [];

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
    ]);
  }

  return matrizData;
}

export function getDataQtoJson() {
  let jsonData = [];

  for (let i = 0; i < dataQto.type.length; i++) {
    jsonData.push({
      row: i,
      data: {
        type: dataQto.type[i],
        category: dataQto.category[i],
        subCategory: dataQto.subCategory[i],
        manufacturerPart: dataQto.manufacturerPart[i],
        productCode: dataQto.productCode[i],
        description: dataQto.description[i],
        qty: dataQto.qty[i],
        unitMeasure: dataQto.unitOfMeasure[i],
        discount: dataQto.discount[i],
        finance: dataQto.finance[i],
      },
    });
  }

  return JSON.stringify(jsonData);
}
