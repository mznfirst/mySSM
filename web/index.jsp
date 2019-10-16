<%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/9/30
  Time: 15:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%=request.getContextPath()%>--%>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
<%--  <a href="signin/register.jsp">跳转</a>--%>
<%--  <a href="register.do">注册</a>--%>
<%--  <a href="${pageContext.request.contextPath}/register.do">跳转action</a>--%>
  <a href="signin/index.jsp">登录</a>
  <a href="signin/register2.jsp">注册</a>
  <br>
  <a href="${pageContext.request.contextPath}/account/findAll">findAll</a> <br>
  <a href="${pageContext.request.contextPath}/student/findAll">StudentfindAll</a>
  </body>
</html>
