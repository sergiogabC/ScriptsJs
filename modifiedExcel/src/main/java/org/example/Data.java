package org.example;

public class Data {

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
    double unitCost;
    String owner;
    int margin;


    public String[] getArrayStrings(){
        return new String[]{type, category,subCategory,manufacturerPart,productCode,description,unitMeasure,finance,owner};
    }

    public int[] getArrayNums(){
        return new int[]{qty,discount};
    }

    public String getMarg(){
        if(margin == 0){
            return "[@[Unit Cost]]";
        }
        float marg = (float) margin /100;
        float mar = 1-marg;

        return String.valueOf(mar);
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
