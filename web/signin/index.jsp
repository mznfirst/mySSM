<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String contextPath = request.getContextPath();%>
<html lang="en">
<head>
    <%@include file="head.jsp"%>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

</head>

<body>

<div class="container">

    <form action="${ContextPath}/account/login" class="form-signin" method="post">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <input class="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"/>
<%--        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>--%>
    </form>

</div> <!-- /container -->


<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="${ContextPath}/bootstrap-lib/assets/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
