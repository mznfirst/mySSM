package com.mzn;

import com.mzn.dao.AccountDao;
import com.mzn.dao.IRegister;
import com.mzn.dao.User;
import com.mzn.domain.Account;
import com.mzn.service.impl.AccountServiceImpl;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class test {

    @Test
    public void test(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        AccountServiceImpl accountService = (AccountServiceImpl) applicationContext.getBean("accountService");
        accountService.findAll();
    }
@Test
    public void test2() throws IOException {
        String resource = "mybatis-cfg.xml";
        InputStream inputStream = null;
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession session = sqlSessionFactory.openSession();

    AccountDao accountDao = session.getMapper(AccountDao.class);
    try {
        List<Account> accounts = accountDao.findAll();

        for (Account account:accounts){
            System.out.println(account.toString());
        }

    }catch (Exception e){
        System.out.println(e);
    }finally {
        session.close();
        inputStream.close();
    }


        /*IRegister iRegister = session.getMapper(IRegister.class);
        try {
            List<User> userList = iRegister.select("select * from user");

            for (User users:userList){
                System.out.println(users.toString());
            }

        }catch (Exception e){
            System.out.println(e);
        }finally {
            session.close();
            inputStream.close();
        }*/

    }
}
