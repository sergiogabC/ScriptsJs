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

    public String getUnitPrice(){
        if(margin ==0){
            return "[@[Unit Cost]]";
        }
        String marg = String.valueOf(margin/100);
        String unitPrice = "[@[Unit Cost]]/"+marg;
        return unitPrice;
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
