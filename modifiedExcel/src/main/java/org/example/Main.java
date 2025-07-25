package org.example;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.AreaReference;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFCell;

import java.io.*;

import java.util.ArrayList;
import java.util.List;



public class Main {

        public static void main(String[] args) throws Exception {

            File archivo = new File("QTO.xlsx");


            InputStream input = new FileInputStream(archivo);
            XSSFWorkbook workbook = new XSSFWorkbook(input);
            XSSFSheet sheet = workbook.getSheetAt(0);

            List<XSSFTable> tables = sheet.getTables();

            XSSFTable table = tables.get(0);

            AreaReference rangeTable = table.getArea();

            CellReference cellStart = rangeTable.getFirstCell();
            CellReference cellEnd = rangeTable.getLastCell();

            int rowStart = cellStart.getRow();
            int rowEnd = cellEnd.getRow();
            int collStart = cellStart.getCol();
            int collEnd = cellEnd.getCol();
            int numIncrement = 1;
            int newRowIndex = rowEnd + numIncrement;


            Row newRow = sheet.createRow(newRowIndex);

            Row rowBase = sheet.getRow(rowEnd);

            for (int col = collStart; col <= collEnd; col++) {
                Cell cell = newRow.createCell(col);

            }

            int numStartRow = 25;
            for(int i = 1;i<=numIncrement;i++){
                formulaCopier(numStartRow,sheet);
                styleCopier(numStartRow,sheet);
                numStartRow++;
            }

            CellReference newCellEnd = new CellReference(newRowIndex, collEnd);
            AreaReference newRange = workbook.getCreationHelper().createAreaReference(cellStart, newCellEnd);
            table.setArea(newRange);



            FileOutputStream ouputStream = new FileOutputStream("QTO Output.xlsx");
            workbook.write(ouputStream);
            ouputStream.close();
            workbook.close();
            System.out.println("check");
        }

        public static void styleCopier(int numRow,XSSFSheet sheet){
            int cellNumI = 0;
            for(int i = 0; i<24;i++){
                XSSFRow rowObtained = sheet.getRow(24);
                XSSFCell cellObtained = rowObtained.getCell(cellNumI);
                XSSFCellStyle styleObtained = cellObtained.getCellStyle();

                XSSFRow rowModified = sheet.getRow(numRow);
                XSSFCell cellModified = rowModified.getCell(cellNumI);
                cellModified.setCellStyle(styleObtained);
                cellNumI++;
            }
        }

        public static void formulaCopier(int numRow,XSSFSheet sheet){
            int cellNumI = 11;

            for(int i = 11; i<23;i++){
                if(!(cellNumI == 13 || cellNumI == 16)){
                    XSSFRow rowObtained = sheet.getRow(24);
                    XSSFCell cellObtained = rowObtained.getCell(cellNumI);
                    String styleObtained = cellObtained.getCellFormula();

                    XSSFRow rowModified = sheet.getRow(numRow);
                    XSSFCell cellModified = rowModified.getCell(cellNumI);
                    cellModified.setCellFormula(styleObtained);
                    cellNumI++;
                }else {
                    cellNumI++;
                }

            }
        }

        public static XSSFCell obtainedCell(int numRow,int numCol,XSSFSheet sheet){
            XSSFRow rowObtained = sheet.getRow(numRow);
            XSSFCell cellObtained = rowObtained.getCell(numCol);

            return cellObtained;
        }


}


