package com.mzn.service;

import com.mzn.domain.Student;

import java.util.List;

public interface StudentService {

    public List<Student> findAll();

    public void saveData(Student student);

    public Student findStudent(String student_number);
}
