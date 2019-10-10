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
import java.util.UUID;


//@RequestMapping("register")
@Controller
public class RegisterController {
    @RequestMapping("/register")
    public String register(HttpServletRequest request) throws IOException {
        System.out.println("registerController 执行了...");
        String email = request.getParameter("inputEmail");
        String password = request.getParameter("inputPassword");
        String username = request.getParameter("inputUserName");
        String duplicatePassword = request.getParameter("duplicatePassword");

        System.out.println(email);
//        if (!password.equals(duplicatePassword) | password.length()<8){
        if (!password.equals(duplicatePassword)){
            System.out.println("密码不符合要求....");
            return "redirect:signin/register.jsp";
        }


        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);

        String uuid = UUID.randomUUID().toString().replace("-","");
        System.out.println(uuid);
        user.setUuid(uuid);
        System.out.println("数据插入前："+ user.toString());

        String resource = "mybatis-cfg.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession session = sqlSessionFactory.openSession();
        IRegister iRegister = session.getMapper(IRegister.class);

        try {
//            iRegister.insert(user);
//        iRegister.insert(uuid,username,email,password);

            List<User> userList = iRegister.select("select * from user");

            for (User users:userList){
                System.out.println(users.toString());
            }

            session.commit();
        }catch (Exception e){
            System.out.println(e);
        }finally {
            session.close();
            inputStream.close();
        }

        return "index";
    }

}
