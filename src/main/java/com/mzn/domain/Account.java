package com.mzn.domain;

public class Account {
    private String uuid;
    private String username;
    private String email;
    private String password;
//    private Double money;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


//    public Double getMoney() {
//        return money;
//    }
//
//    public void setMoney(Double money) {
//        this.money = money;
//    }


    @Override
    public String toString() {
        return "Account{" +
                "uuid='" + uuid + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
