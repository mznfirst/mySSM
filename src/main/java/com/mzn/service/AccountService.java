package com.mzn.service;

import com.mzn.domain.Account;
import org.apache.ibatis.annotations.Insert;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository("accountDao")
public interface AccountService {

    public List<Account> findAll();

    public void saveAccount(Account account);

}
