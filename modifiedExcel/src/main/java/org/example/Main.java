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
import java.util.Arrays;
import java.util.List;



public class Main {

    public static void main(String[] args) throws Exception {
        //Datos


        //Obtener archivo xlsx
        File archivo = new File("QTO.xlsx");
        InputStream input = new FileInputStream(archivo);
        XSSFWorkbook workbook = new XSSFWorkbook(input);

        //Obtener tabla y rango
        XSSFSheet sheet = workbook.getSheetAt(0);
        List<XSSFTable> tables = sheet.getTables();
        XSSFTable table = tables.get(0);
        AreaReference rangeTable = table.getArea();

        //Obtener celdas
        CellReference cellStart = rangeTable.getFirstCell();
        CellReference cellEnd = rangeTable.getLastCell();

        //Columnas y filas del rango
        int rowStart  = cellStart.getRow();
        int rowEnd = cellEnd.getRow();
        int collStart = cellStart.getCol();
        int collEnd = cellEnd.getCol();
        int numIncrement = 5;
        int newRowIndex = rowEnd + numIncrement;

        //Crear las nuevas filas
        Row newRow = sheet.createRow(newRowIndex);
        //Row rowBase = sheet.getRow(rowEnd);

        for (int col = collStart; col <= collEnd; col++) {
            newRow.createCell(col);
        }

        //Agregar los estilos y formulas a las celdas
        int row = rowStart+2;
        int[] numNotValue = {11,12,14,15,17,18,19,20,21,22};
        for(int i = 1;i<=numIncrement;i++){
            styleCopier(row,sheet);
            formulaCopier(row,sheet);
            setValue(row,sheet,"xxx",numNotValue);
            row++;
        }

        //Creación de la nueva referencia
        CellReference newCellEnd = new CellReference(newRowIndex, collEnd);
        AreaReference newRange = workbook.getCreationHelper().createAreaReference(cellStart, newCellEnd);
        table.setArea(newRange);


        //Salida del archivo
        FileOutputStream outputStream = new FileOutputStream("QTO Output.xlsx");
        workbook.write(outputStream);
        outputStream.close();
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
                String formulaObtained = cellObtained.getCellFormula();

                XSSFRow rowModified = sheet.getRow(numRow);
                XSSFCell cellModified = rowModified.getCell(cellNumI);
                cellModified.setCellFormula(formulaObtained);
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

    public static void setValue(int row,XSSFSheet sheet,String values,int[] numNotValues){

        for (int i = 0; i < 23; i++) {

            int finalI = i;
            if(!(Arrays.stream(numNotValues).anyMatch(n-> n == finalI))){

                XSSFRow rowObtained = sheet.getRow(row);
                XSSFCell cellObtained = rowObtained.getCell(i);

                cellObtained.setCellValue(values);
            }

        }

    }


}