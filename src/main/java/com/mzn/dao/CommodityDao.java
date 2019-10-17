package com.mzn.dao;

import com.mzn.domain.Commodity;
import com.mzn.domain.Student;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CommodityDao {

    @Select("select * from commodity")
    public List<Commodity> findAll();

    //    @Insert("${values}")
    @Insert({"insert into commodity values(#{commodityID},#{commodityName},#{goodsName},#{goodsPrice},#{goodsNumber},#{goodsInfo})"})
    public void insert(String sql);

    @Insert({"insert into commodity values(#{commodityID},#{commodityName},#{goodsName},#{goodsPrice},#{goodsNumber},#{goodsInfo})"})
    public void addData(Commodity commodity);

    //    @Select("select * from student where student_number=#{student_number}")
    @Select("select (student_number,student_name,sex,specialities) from commodity where commodityName=#{commodityName}")
    public Commodity findCommodity(Commodity commodityName);
}
