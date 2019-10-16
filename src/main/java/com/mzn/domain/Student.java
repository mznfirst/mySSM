package com.mzn.domain;

import java.util.Date;

public class Student {
    private String examinee_id; // '考生号'
    private String province; //'生源省市'
    private String student_number; // '学号'
    private String student_name; // '姓名'
    private String sex; // '性别'
    private Date birthday; //'出生日期'
    private String id_number; // '身份证号'
    private String politics_status; // '政治面貌'
    private String nation; //'民族'
    private String school_code; // '学校代码'
    private String school; // '学校'
    private String department_code; // '培养单位代码'
    private String department;// '培养单位'
    private String specialities_code;//'专业代码'
    private String specialities;// '专业名称'
    private String branchs; // '分院'
    private String xi_code; // '系所号'
    private String class_num; // '班号'
    private String Education_level; // '层次'
    private String education_time; // '学制'
    private String educational_form; //' 学习形式'
    private Date school_time; // '入学时间'
    private String grade; // '年级'
    private String student_status; // ' 学籍状态'
    private String luqu_type_code; // '录取类别码'
    private String luqu_type; // '录取类别'
    private String register; // '注册状态'
    private String remark; // '备注'

    public String getExaminee_id() {
        return examinee_id;
    }

    public void setExaminee_id(String examinee_id) {
        this.examinee_id = examinee_id;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getStudent_number() {
        return student_number;
    }

    public void setStudent_number(String student_number) {
        this.student_number = student_number;
    }

    public String getStudent_name() {
        return student_name;
    }

    public void setStudent_name(String student_name) {
        this.student_name = student_name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getPolitics_status() {
        return politics_status;
    }

    public void setPolitics_status(String politics_status) {
        this.politics_status = politics_status;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getSchool_code() {
        return school_code;
    }

    public void setSchool_code(String school_code) {
        this.school_code = school_code;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getDepartment_code() {
        return department_code;
    }

    public void setDepartment_code(String department_code) {
        this.department_code = department_code;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSpecialities_code() {
        return specialities_code;
    }

    public void setSpecialities_code(String specialities_code) {
        this.specialities_code = specialities_code;
    }

    public String getSpecialities() {
        return specialities;
    }

    public void setSpecialities(String specialities) {
        this.specialities = specialities;
    }

    public String getBranchs() {
        return branchs;
    }

    public void setBranchs(String branchs) {
        this.branchs = branchs;
    }

    public String getXi_code() {
        return xi_code;
    }

    public void setXi_code(String xi_code) {
        this.xi_code = xi_code;
    }

    public String getClass_num() {
        return class_num;
    }

    public void setClass_num(String class_num) {
        this.class_num = class_num;
    }

    public String getEducation_level() {
        return Education_level;
    }

    public void setEducation_level(String education_level) {
        Education_level = education_level;
    }

    public String getEducation_time() {
        return education_time;
    }

    public void setEducation_time(String education_time) {
        this.education_time = education_time;
    }

    public String getEducational_form() {
        return educational_form;
    }

    public void setEducational_form(String educational_form) {
        this.educational_form = educational_form;
    }

    public Date getSchool_time() {
        return school_time;
    }

    public void setSchool_time(Date school_time) {
        this.school_time = school_time;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getStudent_status() {
        return student_status;
    }

    public void setStudent_status(String student_status) {
        this.student_status = student_status;
    }

    public String getLuqu_type_code() {
        return luqu_type_code;
    }

    public void setLuqu_type_code(String luqu_type_code) {
        this.luqu_type_code = luqu_type_code;
    }

    public String getLuqu_type() {
        return luqu_type;
    }

    public void setLuqu_type(String luqu_type) {
        this.luqu_type = luqu_type;
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @Override
    public String toString() {
        return "Student{" +
                "student_number='" + student_number + '\'' +
                ", student_name='" + student_name + '\'' +
                ", sex='" + sex + '\'' +
                ", id_number='" + id_number + '\'' +
                ", specialities='" + specialities + '\'' +
                ", grade='" + grade + '\'' +
                '}';
    }
}
