package com.mzn.dao;

import com.mzn.domain.Student;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface StudentDao {

    @Select("select * from student")
    public List<Student> findAll();

    //    @Insert("${values}")
    @Insert({"insert into student values(#{uuid},#{username},#{email},#{password})"})
    public void insert(String sql);

    @Insert({"insert into student values(#{uuid},#{username},#{email},#{password})"})
    public void saveData(Student student);

//    @Select("select * from student where student_number=#{student_number}")
    @Select("select (student_number,student_name,sex,specialities) from student where student_number=#{student_number}")
    public Student findStudent(String student_number);

}
