
drop table commodity;

select * from commodity;



create table seller(
    username varchar(40),
    email varchar(40) unique not null,
    password varchar(40),
    sex bool comment'0为男, 1为女',
    phonenumber varchar(11),
    homeAddress tinytext,
    profile_picture varchar(50) comment'头像',
    idCard varchar(18) comment'身份证号码',
    actualName varchar(20) comment'真实姓名',
    primary key(idCard),
    foreign key shop(shopid) references idCard
);


# 商品
create table commodity(
    #commodityID varchar(32) unique not null comment'商品ID',
    #commodityName varchar(40) comment'店铺名',
    goodsID varchar(32) unique not null comment'商品ID',
    goodsName varchar(20) not null comment'商品名',
    goodsPrice integer(10) not null comment'商品价格',
    goodsNumber tinyint not null comment'商品数量',
    goodsInfo text comment'商品信息',
    primary key(goodsID),
    foreign key shop(shopid) references goodsID
);

# 店铺
create table shop(
    shopid varchar(32) unique not null primary key comment'店铺ID',
    shopName varchar(40) not null comment'店铺名称',
    createTime date comment'店铺创建时间',
    money int comment'投入资金',
#    foreign key commodity(goodsID) references shopid
    foreign key seller(idCard) references shopid
);
