package com.mzn.service.impl;

import com.mzn.dao.CommodityDao;
import com.mzn.domain.Commodity;
import com.mzn.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("commodityService")
public class CommodityServiceImpl implements CommodityService {

    @Autowired
    CommodityDao commodityDao;
    @Override
    public void addData(Commodity commodity) {
        System.out.println("Commodity addData...");
        commodityDao.addData(commodity);
    }

    @Override
    public List<Commodity> findAll() {
        System.out.println("Commodity findAll...");
        return commodityDao.findAll();
    }
}
