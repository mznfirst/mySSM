package com.mzn.domain;

import java.util.UUID;

public class Commodity {
    private String commodityID;
    private String commodityName;
    private String goodsName;
    private String goodsPrice;
    private String goodsNumber;
    private String goodsInfo;

    public String getCommodityID() {
        return commodityID;
    }

    public void setCommodityID(String commodityID) {
        commodityID = UUID.randomUUID().toString().replace("-","");
        this.commodityID = commodityID;
    }

    public String getCommodityName() {
        return commodityName;
    }

    public void setCommodityName(String commodityName) {
        this.commodityName = commodityName;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(String goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public String getGoodsNumber() {
        return goodsNumber;
    }

    public void setGoodsNumber(String goodsNumber) {
        this.goodsNumber = goodsNumber;
    }

    public String getGoodsInfo() {
        return goodsInfo;
    }

    public void setGoodsInfo(String goodsInfo) {
        this.goodsInfo = goodsInfo;
    }

    @Override
    public String toString() {
        return "Commodity{" +
                "commodityID='" + commodityID + '\'' +
                ", commodityName='" + commodityName + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", goodsPrice='" + goodsPrice + '\'' +
                ", goodsNumber='" + goodsNumber + '\'' +
                ", goodsInfo='" + goodsInfo + '\'' +
                '}';
    }
}
