package com.mzn.dao;

import com.mzn.domain.Account;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDao {

    @Select("select * from user")
    public List<Account> findAll();


//    @Insert("${values}")
    @Insert({"insert into user values(#{uuid},#{username},#{email},#{password})"})
    public void insert(String sql);

    @Insert({"insert into user values(#{uuid},#{username},#{email},#{password})"})
    public void saveAccount(Account account);

    @Select({"select * from user where email=#{email}"})
    public Account findAccount(String email);
}
