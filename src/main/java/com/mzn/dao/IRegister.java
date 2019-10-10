package com.mzn.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface IRegister {

//    @Insert("${value}")
//    public void insert(String sql);
    @Insert({"insert into user values(#{uuid},#{username},#{email},#{password})"})
    public void insert( User user);
//    @Insert({"insert into user values(?,?,?,?)"})
//    public void insert( String uuid, String username, String mail, String password);
    @Select("${value}")
    public List<User> select(String sql);
//    public List<LinkedHashMap<String, Object>> select(String sql);


    @Update("${value}")
    public void update(String sql);
    @Delete("${value}")
    public void delete(String sql);
}
