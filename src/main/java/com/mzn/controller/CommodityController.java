package com.mzn.controller;

import com.mzn.domain.Commodity;
import com.mzn.service.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("commodity")
public class CommodityController {

    @Autowired
    CommodityService commodityService;

    @RequestMapping("addData")
    public void addData(Commodity commodity, HttpServletRequest request, HttpServletResponse response) throws IOException {
        commodity.setCommodityID(commodity.getCommodityID());
        System.out.println(commodity.toString());
        commodityService.addData(commodity);
        System.out.println("添加数据成功...");
        response.sendRedirect(request.getContextPath()+"/commodity/findAll");
        return ;
    }

    @RequestMapping("findAll")
    public String findAll(HttpServletRequest request, HttpServletResponse response){
        List<Commodity> commodityList = commodityService.findAll();
        request.setAttribute("commodityList", commodityList);
        return "data_list";
    }
}
