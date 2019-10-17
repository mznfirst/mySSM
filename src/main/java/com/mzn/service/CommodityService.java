package com.mzn.service;

import com.mzn.domain.Commodity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public interface CommodityService {


    public void addData(Commodity commodity);
    public List<Commodity> findAll();

}
