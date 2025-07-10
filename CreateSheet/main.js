//import * as fs from "fs";
import { Workbook } from "exceljs";

const workBook = Workbook();

workBook.creator = "";
workBook.created = new Date();
workBook.modified = new Date();
workBook.properties.date1904 = true;

workbook.views = [
  {
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 1,
    visibility: "visible",
  },
];

const sheet = workBook.addWorksheet("QTO DB");
