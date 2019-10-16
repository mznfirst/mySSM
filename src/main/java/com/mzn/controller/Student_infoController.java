package com.mzn.controller;

import com.mzn.domain.Student;
import com.mzn.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("student")
public class Student_infoController {
    @Autowired
    StudentService studentService;

    @RequestMapping("findAll")
    public String findAll(Model model, HttpServletResponse response, HttpServletRequest request) throws IOException, ServletException {
        List<Student> studentList = studentService.findAll();
        System.out.println("studentList 查询成功：...");
        request.setAttribute("studentList",studentList);
//        model.addAttribute(studentList);
//        response.sendRedirect("register_success");
//        request.getRequestDispatcher("url").forward(request,response);
//        return "redirect:/mySSM/signin/register_success.jsp";
        return "list";
    }

    @RequestMapping("findStudent")
    public void findStudent(){
        studentService.findStudent("");
    }

    @RequestMapping("addData")
    public void addData(){

    }

}
