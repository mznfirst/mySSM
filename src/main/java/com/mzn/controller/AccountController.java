package com.mzn.controller;

import com.mzn.dao.AccountDao;
import com.mzn.domain.Account;
import com.mzn.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
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

    @RequestMapping("login1")
    public void login(Account account, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        ModelAndView modelAndView = new ModelAndView();
        String email = account.getEmail();
        Account account_db = accountService.findAccount(email);
        if(account_db.getPassword().equals(account.getPassword())){
            System.out.println(account_db.getUsername()+"登录成功...");
            request.setCharacterEncoding("GBK");

            request.setAttribute("loginName",account_db.getUsername());
//            request.getSession().setAttribute("loginName",account_db.getUsername());

//            request.getRequestDispatcher("/adminlte3/index.jsp").forward(request,response);

            response.sendRedirect(request.getContextPath() + "/adminlte3/index.jsp?loginName="+account_db.getUsername());
        }else{
            response.sendRedirect(request.getContextPath() + "/signin/index.jsp");
        }
        return;
    }
    @RequestMapping("login")
    public ModelAndView login2(Account account, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        ModelAndView modelAndView = new ModelAndView();
        String email = account.getEmail();
        Account account_db = accountService.findAccount(email);
        if(account_db.getPassword().equals(account.getPassword())){
            System.out.println(account_db.getUsername()+"登录成功...");
            modelAndView.addObject("loginName",account_db.getUsername());
            modelAndView.setViewName("redirect:/adminlte3/index2.jsp");

        }else{
            response.sendRedirect(request.getContextPath() + "/signin/index.jsp");
        }
        return modelAndView;
    }

}
