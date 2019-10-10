<%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/10/8
  Time: 16:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>findAll</title>
</head>
<body>
<h5>findAll</h5>
<c:forEach items="${list}" var="account">
    ${account.username}
    ${account.toString()}
</c:forEach>
</body>
</html>
