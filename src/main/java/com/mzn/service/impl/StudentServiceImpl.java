package com.mzn.service.impl;

import com.mzn.dao.StudentDao;
import com.mzn.domain.Student;
import com.mzn.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("studentService")
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentDao studentDao;

    @Override
    public List<Student> findAll() {
        List<Student> student_list = studentDao.findAll();
        return student_list;
    }

    @Override
    public void saveData(Student student) {
        studentDao.saveData(student);
    }

    @Override
    public Student findStudent(String student_number) {
        Student student = studentDao.findStudent(student_number);
        return student;
    }
}
