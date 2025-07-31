package org.example;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.AreaReference;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFCell;

import java.io.*;


import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;



public class Main {

    public static void main(String[] args) throws Exception {



        if(args.length>2){
            System.exit(1);
        }

        String pathData = args[0];
        String pathOut = args[1];

        Gson gson = new Gson();
        List<DataComplete> dataCompletes = null;

        Type type = new TypeToken<List<DataComplete>>(){}.getType();
        FileReader reader = new FileReader(pathData);

        dataCompletes = gson.fromJson(reader,type);


        //Obtener archivo xlsx
        InputStream input = Main.class.getClassLoader().getResourceAsStream("QTO.xlsx");
        try (XSSFWorkbook workbook = new XSSFWorkbook(input)) {

            //Obtener tabla y rango
            XSSFSheet sheet = workbook.getSheetAt(0);
            List<XSSFTable> tables = sheet.getTables();
            XSSFTable table = tables.get(0);
            AreaReference rangeTable = table.getArea();

            //Obtener celdas
            CellReference cellStart = rangeTable.getFirstCell();
            CellReference cellEnd = rangeTable.getLastCell();

            //Columnas y filas del rango
            int rowStart = cellStart.getRow();
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

            int[] numNotValue = {11,12, 14, 15, 17, 18, 19, 20, 21, 22};
            int rowPrimary = rowStart +2;
            for(DataComplete dataComplete: dataCompletes){
                setValue(rowPrimary,sheet,dataComplete,numNotValue);
                rowPrimary++;
            }

            //Agregar los estilos y formulas a las celdas
            int rowSecundary= rowStart + 2;
            for (int i = 1; i <= numIncrement; i++) {
                styleCopier(rowSecundary, sheet);
                formulaCopier(rowSecundary, sheet);
                rowSecundary++;
            }




            //Creación de la nueva referencia
            CellReference newCellEnd = new CellReference(newRowIndex, collEnd);
            AreaReference newRange = workbook.getCreationHelper().createAreaReference(cellStart, newCellEnd);
            table.setArea(newRange);


            //Salida del archivo
            FileOutputStream outputStream = new FileOutputStream(pathOut);
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();
        }
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

    public static void setValue(int row,XSSFSheet sheet,DataComplete values,int[] numNotValues){

        int numI = 0;
        int stringI = 0;

        String[] datas = values.data.getArrayStrings();

        int[] datasNums = values.data.getArrayNums();
        int[] notString = {6,8,11};

        XSSFRow rowObtained = sheet.getRow(row);

        for (int i = 0; i<23;i++) {
            int finalNum = i;

            if(!(Arrays.stream(numNotValues).anyMatch(n-> n == finalNum))){
                XSSFCell cellObtained = rowObtained.getCell(i);

                if(i == 10){
                    cellObtained.setCellValue(values.data.getUnitPrice());
                    continue;
                }

                if(i == 11){
                    cellObtained.setCellValue(values.data.unitCost);
                    continue;
                }

                int finalStringI = stringI;

                if(!(Arrays.stream(notString).anyMatch(n-> n == finalNum))){
                    cellObtained.setCellValue(datas[stringI]);
                    stringI++;
                    continue;
                }

                cellObtained.setCellValue(datasNums[numI]);
                numI++;



            }

        }

    }


}