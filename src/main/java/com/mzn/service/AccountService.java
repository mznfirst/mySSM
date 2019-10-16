package com.mzn.service;

import com.mzn.domain.Account;

import java.util.List;


public interface AccountService {

    public List<Account> findAll();

    public void saveAccount(Account account);

    public Account findAccount(String email);

}
