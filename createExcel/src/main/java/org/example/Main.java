package org.example;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Scanner;

class Data{
    String type;
    String category;
    String subCategory;
    String manufacturerPart;
    String productCode;
    String description;
    int qty;
    String unitMeasure;
    int discount;
    String finance;

    public String[] returnArrayStrings(){
        return new String[]{type, category,subCategory,manufacturerPart,productCode,description,unitMeasure,finance};
    }

    @Override
    public String toString() {
        return "Data{" +
                "type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", subCategory='" + subCategory + '\'' +
                ", manufacturerPart='" + manufacturerPart + '\'' +
                ", productCode='" + productCode + '\'' +
                ", description='" + description + '\'' +
                ", qty=" + qty +
                ", unitMeasure='" + unitMeasure + '\'' +
                ", discount=" + discount +
                ", finance='" + finance + '\'' +
                '}';
    }
}

class DataComplete{
    int row;
    Data data;
    @Override
    public String toString() {
        return "DataComplete{" +
                "row=" + row +
                ", data=" + data +
                '}';
    }

}

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        Gson gson = new Gson();
        List<DataComplete> dataCompletes = null;

        while(scanner.hasNextLine()){

            String jsonLine = scanner.nextLine();
            if (jsonLine.equalsIgnoreCase("FIN")) {
                break;
            }
            dataCompletes = gson.fromJson(jsonLine,new TypeToken<List<DataComplete>>(){}.getType());

        }

        scanner.close();

        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("sheetOne");


        int numR = 0;
        for(DataComplete dataComplete: dataCompletes){
            Row row = sheet.createRow(numR);
            String[] dataCells = dataComplete.data.returnArrayStrings();
            int numC = 0;
            for(String dataCell: dataCells){
                Cell cell = row.createCell(numC);
                cell.setCellValue(dataCell);
                numC++;
            }
            numR++;
        }



        try (OutputStream fileOut = new FileOutputStream("workbook.xlsx")) {
            wb.write(fileOut);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}