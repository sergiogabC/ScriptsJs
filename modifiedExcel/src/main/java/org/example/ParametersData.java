package org.example;

import java.util.ArrayList;
import java.util.List;

public class ParametersData {

    String client;
    String country;
    String proposalManager;
    int hT19numberSites;
    int sitesOutCoverage;
    int numberSites;
    float remoteSpares;
    int totalSpares;
    String servicePlan;
    int totalCapacityS17Mbps;
    float overbooking;
    int totalKaBandCapacityMbps;
    float averageMbpsSite;
    float solDolar;
    float terminalUnitPriceExWorks;
    int costSesKaBandMbpsMonthUsd;
    int costHuguesKaBandMbpsMonthUsd;
    int contract;
    float sitesPenaltiesMonth;
    float capexFinancingRate;
    int uit;

    public String[] getListStrings(){
        String[] listAttributes = {client,country,proposalManager,servicePlan};
        return listAttributes;
    }

    public float[] getListFloats(){
        float[] listAttributes = {remoteSpares,overbooking,averageMbpsSite,solDolar,terminalUnitPriceExWorks,sitesPenaltiesMonth,capexFinancingRate};
        return listAttributes;
    }

    public int[] getListInts(){
        int[] listAttributes = {hT19numberSites,sitesOutCoverage,numberSites,totalSpares,totalCapacityS17Mbps,totalKaBandCapacityMbps,costSesKaBandMbpsMonthUsd,costHuguesKaBandMbpsMonthUsd,contract,uit};
        return listAttributes;
    }

    @Override
    public String toString() {
        return "ParametersData{" +
                "client='" + client + '\'' +
                ", country='" + country + '\'' +
                ", proposalManager='" + proposalManager + '\'' +
                ", hT19numberSites=" + hT19numberSites +
                ", sitesOutCoverage=" + sitesOutCoverage +
                ", numberSites=" + numberSites +
                ", remoteSpares=" + remoteSpares +
                ", totalSpares=" + totalSpares +
                ", servicePlan='" + servicePlan + '\'' +
                ", totalCapacityS17Mbps=" + totalCapacityS17Mbps +
                ", overbooking=" + overbooking +
                ", totalKaBandCapacityMbps=" + totalKaBandCapacityMbps +
                ", averageMbpsSite=" + averageMbpsSite +
                ", solDolar=" + solDolar +
                ", terminalUnitPriceExWorks=" + terminalUnitPriceExWorks +
                ", costSesKaBandMbpsMonthUsd=" + costSesKaBandMbpsMonthUsd +
                ", costHuguesKaBandMbpsMonthUsd=" + costHuguesKaBandMbpsMonthUsd +
                ", contract=" + contract +
                ", sitesPenaltiesMonth=" + sitesPenaltiesMonth +
                ", capexFinancingRate=" + capexFinancingRate +
                ", uit=" + uit +
                '}';
    }
}
