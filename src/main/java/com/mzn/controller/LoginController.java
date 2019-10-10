package com.mzn.controller;

import com.mzn.dao.IRegister;
import com.mzn.dao.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Controller
public class LoginController {

    @RequestMapping("login")
    public String login(HttpServletRequest request) throws IOException {
        String email = request.getParameter("inputEmail");
        String password = request.getParameter("inputPassword");

        String resource = "mybatis-cfg.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession session = sqlSessionFactory.openSession();
        IRegister iRegister = session.getMapper(IRegister.class);


        try {

        }catch (Exception e){
            System.out.println(e);
        }finally {
            session.close();
            inputStream.close();
        }
        String sql = "select * from user where email='"+email+"'";
//        String sql = "select * from user where email='#{email}'";
        List<User>  userList = iRegister.select(sql);


//        List<User> userList = iRegister.select("select * from user");

        for (User users:userList){
            System.out.println(users.toString());
            if(!password.equals(users.getPassword())){
                return "failed";
            }
        }
        return "success";
    }
}
