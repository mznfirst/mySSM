package com.mzn.controller;

import com.mzn.dao.AccountDao;
import com.mzn.domain.Account;
import com.mzn.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("account")
public class AccountController {

    @Autowired
    AccountService accountService;
    @RequestMapping("findAll")
    public String findAll(Model model){

        System.out.println("表现层：查询所有账户信息...");
        List<Account> accounts = accountService.findAll();
        for (Account account:accounts){
            System.out.println(account.toString());
        }
        model.addAttribute("list",accounts);
        return "list";
    }

    @RequestMapping("saveAccount")
    public void saveAccount(Account account, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (account.getPassword().equals(request.getParameter("duplicatePassword"))) {
            account.setUuid(UUID.randomUUID().toString().replace("-", ""));
            accountService.saveAccount(account);
            response.sendRedirect(request.getContextPath() + "/account/findAll");
        }else {
            response.sendRedirect(request.getContextPath() + "/signin/register2.jsp");
        }

    }
}
