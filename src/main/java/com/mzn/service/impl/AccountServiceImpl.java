package com.mzn.service.impl;

import com.mzn.dao.AccountDao;
import com.mzn.dao.User;
import com.mzn.domain.Account;
import com.mzn.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {


    @Autowired
    private AccountDao accountDao;

    public List<Account> findAll() {
        System.out.println("业务层执行le...");
        return accountDao.findAll();
    }

    @Override
    public void saveAccount(Account account) {
        System.out.println("业务层保存数据...");
        accountDao.saveAccount(account);
    }

    @Override
    public Account findAccount(String email) {
        System.out.println("查询账户数据...");

        return accountDao.findAccount(email);
    }

}
