package org.example;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.AreaReference;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFCell;

import java.io.*;

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
            int newRowIndex = rowEnd + 1;


            Row newRow = sheet.createRow(newRowIndex);

            Row rowBase = sheet.getRow(rowEnd);

            for (int col = collStart; col <= collEnd; col++) {
                Cell cell = newRow.createCell(col);
                cell.setCellValue("data");
            }


            int cellNumI = 0;
            for(int i = 0; i<24;i++){
                XSSFRow rowObtained = sheet.getRow(24);
                XSSFCell cellObtained = rowObtained.getCell(cellNumI);
                XSSFCellStyle styleObtained = cellObtained.getCellStyle();

                XSSFRow rowModified = sheet.getRow(25);
                XSSFCell cellMofied = rowModified.getCell(cellNumI);
                cellMofied.setCellStyle(styleObtained);
                cellNumI++;
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






}


