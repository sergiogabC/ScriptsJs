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
        ListDatas listDataCompletes;

        Type type = new TypeToken<ListDatas>(){}.getType();
        FileReader reader = new FileReader(pathData);

        listDataCompletes = gson.fromJson(reader,type);
        List<DataComplete> listDatas = listDataCompletes.listDatas;

        String[] listParametersStrings = listDataCompletes.parameters.getListStrings();
        float[] listParametersFloats = listDataCompletes.parameters.getListFloats();
        int[] listParametersInts = listDataCompletes.parameters.getListInts();

        //Obtener archivo xlsx
        InputStream input = Main.class.getClassLoader().getResourceAsStream("QTO.xlsx");
        try (XSSFWorkbook workbook = new XSSFWorkbook(input)) {

            //Obtener sheet
            XSSFSheet sheet = workbook.getSheetAt(0);


            //Introducir Datos primera tabla parametros
            int totalLenght = listParametersStrings.length+listParametersFloats.length+listParametersInts.length;

            int[] listIStrings = {1,2,3,9};
            int[] listIFloats = {7,11,13,14,15,19,20};
            int iStrings = 0;
            int iFloats = 0;
            int iInts = 0;

            for(int i = 1; i<=totalLenght;i++){
                XSSFRow rowParameters = sheet.getRow(i);
                XSSFCell cellParameter = rowParameters.getCell(2);

                int finalSi = i;
                if(Arrays.stream(listIStrings).anyMatch(n-> n == finalSi)){
                    cellParameter.setCellValue(listParametersStrings[iStrings]);

                    iStrings++;
                    continue;
                }

                if(Arrays.stream(listIFloats).anyMatch(n-> n == finalSi)){
                    cellParameter.setCellValue(listParametersFloats[iFloats]);

                    iFloats++;
                    continue;
                }


                cellParameter.setCellValue(listParametersInts[iInts]);
                iInts++;


            }

            //Obtener tabla y rango
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

            //Creación de la nueva referencia
            CellReference newCellEnd = new CellReference(newRowIndex, collEnd);
            AreaReference newRange = workbook.getCreationHelper().createAreaReference(cellStart, newCellEnd);
            table.setArea(newRange);

            int[] numNotValue = {11,12, 14, 15, 17, 18, 19, 20, 21, 22};
            int rowPrimary = rowStart +2;
            for(DataComplete dataComplete: listDatas){
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

            //Ingresar funcion en tabla de calculos generales

            XSSFRow rowCapex =sheet.getRow(4);
            XSSFRow rowOpex =sheet.getRow(5);
            XSSFRow rowTotal = sheet.getRow(6);

            int f = 5;
            int g =6;
            int h = 7;

            XSSFCell cellCapexPrice = rowCapex.getCell(f);
            XSSFCell cellCapexCost = rowCapex.getCell(g);
            XSSFCell cellOpexPrice = rowOpex.getCell(f);
            XSSFCell cellOpexCost = rowOpex.getCell(g);

            int [][] rutaCell = {{4,h},{5,h},{6,h},{13,f},{13,g},{13,h}};

            XSSFCell cellTotalPrice = rowTotal.getCell(5);
            XSSFCell cellTotalCost = rowTotal.getCell(6);

            int rowStartForm = rowStart+1;
            int rowEndForm = newRowIndex+1;

            String formCapexPrice = "SUMIF(A"+rowStartForm+":A"+rowEndForm+",\"CAPEX\",M"+rowStartForm+":M"+rowEndForm+")";
            String formCapexCost = "SUMIF(A"+rowStartForm+":A"+rowEndForm+",\"CAPEX\",O"+rowStartForm+":O"+rowEndForm+")";
            String formOpexPrice = "SUMIF(A"+rowStartForm+":A"+rowEndForm+",\"OPEX\",M"+rowStartForm+":M"+rowEndForm+")";
            String formOpexCost = "SUMIF(A"+rowStartForm+":A"+rowEndForm+",\"OPEX\",O"+rowStartForm+":O"+rowEndForm+")";

            String formTotalPrice ="SUM(F5:F6)";
            String formTotalCost ="SUM(G5:G6)";

            setForm(cellCapexPrice,formCapexPrice);
            setForm(cellCapexCost,formCapexCost);
            setForm(cellOpexPrice,formOpexPrice);
            setForm(cellOpexCost,formOpexCost);

            setForm(cellTotalPrice,formTotalPrice);
            setForm(cellTotalCost,formTotalCost);

            formRecharger(sheet,rutaCell);

            XSSFSheet sheet2 = workbook.getSheetAt(1);

            int c = 2;

            int[][] rutaCellSheet2 = {{1,c},{2,c},{3,c}};
            formRecharger(sheet2,rutaCellSheet2);

            //Salida del archivo
            FileOutputStream outputStream = new FileOutputStream(pathOut);
            workbook.write(outputStream);
            workbook.setForceFormulaRecalculation(true);
            workbook.close();
            outputStream.close();
        }
        System.out.println("check");
    }

    public static void styleCopier(int numRow,XSSFSheet sheet){

        XSSFRow rowObtained = sheet.getRow(24);
        XSSFRow rowModified = sheet.getRow(numRow);
        for(int i = 0; i<24;i++){
            XSSFCell cellObtained = rowObtained.getCell(i);
            XSSFCellStyle styleObtained = cellObtained.getCellStyle();

            XSSFCell cellModified = rowModified.getCell(i);
            cellModified.setCellStyle(styleObtained);
        }
    }

    public static void formRecharger(XSSFSheet sheet, int[][] matriz){

        for(int[] ruta: matriz){
            XSSFRow rowPrueba = sheet.getRow(ruta[0]);
            XSSFCell cellPrueba = rowPrueba.getCell(ruta[1]);
            String form = cellPrueba.getCellFormula();
            cellPrueba.setBlank();
            cellPrueba.setCellFormula(form);
        }

    }

    public static void setForm(XSSFCell cell,String form){
        cell.setCellFormula(form);
    }

    public static void formulaCopier(int numRow,XSSFSheet sheet){

        XSSFRow rowObtained = sheet.getRow(24);
        XSSFRow rowModified = sheet.getRow(numRow);
        for(int i = 11; i<23;i++){
            if(!(i == 13 || i == 16)){
                XSSFCell cellObtained = rowObtained.getCell(i);
                String formulaObtained = cellObtained.getCellFormula();

                XSSFCell cellModified = rowModified.getCell(i);
                cellModified.setCellFormula(formulaObtained);
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
                    String marg = values.data.getMarg();
                    int rowForm = row+1;
                    cellObtained.setCellFormula("N"+rowForm+"/"+marg);
                    continue;
                }

                if(i == 13){
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