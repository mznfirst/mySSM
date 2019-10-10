<%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/9/30
  Time: 16:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../bootstrap-lib/favicon.ico">

    <title>Register Template for Bootstrap</title>
    <script src="${pageContext.request.contextPath}/js/jquery-3.4.1.min.js"></script>
    <!-- Bootstrap core CSS -->
    <link href="${pageContext.request.contextPath}/bootstrap-lib/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/bootstrap-lib/mycss/register.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/bootstrap-lib/assets/js/ie-emulation-modes-warning.js"></script>


</head>
<body>
<script type="text/javascript">
    $(function () {
        //选择器
        $(".container>.form-registerin").submit(function () {
            //val() - 设置或返回表单字段的值
            var inputUserName = $('#inputUserName').val();
            var inputEmail = $('#inputEmail').val();
            var inputPassword = $('#inputPassword').val();
            var duplicatePassword = $('#duplicatePassword').val();

            if (!inputPassword.equal(duplicatePassword)){
                
            }
            console.log(inputEmail);
            console.log(inputPassword);
            $.ajax({
                type: "POST",
                url: "${pageContext.request.contextPath}/sa",
                cache: false,
                async: false,
                data: $(".container>.form-registerin").serialize(),
                error: function(request) {
                    alert("Connection error");
                },
                success: function(data) {
                    alert("注册成功，请登录");
                    <%--window.location.replace("${pageContext.request.contextPath}/signin/index.jsp");--%>
                    // window.location.href="index.jsp?backurl="+window.location.href;
                    window.location.href="http://www.baidu.com";
                    // var r = window.confirm("注册成功，请登录");
                    // if(r==true){
                    //     window.location.replace("index.jsp");
                    // }
                }
            });
        });
    })
</script>

<div class="container">

<%--    <form id="register" class="form-registerin">--%>
   <%-- <form action="${pageContext.request.contextPath}/account/saveAccount" method="post"  class="form-registerin">
        <h2 class="form-register-heading">Please register in</h2>
        <label for="inputUserName" class="sr-only">Email address</label>
        <input type="text" name="inputUserName" id="inputUserName" class="form-control" placeholder="User Name" required autofocus>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" name="inputEmail" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>

        <input type="password" name="inputPassword" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="password-tip" style="display:none">
            <span><cite></cite></span>
            <p id="pwdrule1">长度为6-18个字符</p>
            <p id="pwdrule2">不能是9位以下的纯数字</p>
            <p id="pwdrule3">不能包含空格</p>
        </div>
        <div class="password-strong" style="display:none">
            <!-- 以下3个 不会重复出现，目前3个一起出现造成的换行问题请无视 -->
            <p style="display:none"><span class="level-1" ><b></b></span>弱</p>
            <p style="display:none"><span class="level-2" ><b></b></span>中</p>
            <p style="display:none"><span class="level-3" ><b></b></span>强</p>
        </div>
        <label for="duplicatePassword" class="sr-only">Password</label>
        <input type="password" name="duplicatePassword" id="duplicatePassword" class="form-control" placeholder="Repeat the password" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <input type="submit" class="btn btn-lg btn-primary btn-block" value="register in"/>
&lt;%&ndash;        <button id="button" class="btn btn-lg btn-primary btn-block " type="submit">register in</button>&ndash;%&gt;
    </form>
    --%>
    <form action="${pageContext.request.contextPath}/account/saveAccount" method="post" class="form-registerin">
        <h2 class="form-register-heading">Please register in</h2>
<%--        <label for="inputUserName" class="sr-only">Email address</label>--%>
        <input type="text" name="username" id="inputUserName" class="form-control" placeholder="User Name" required autofocus>
<%--        <label for="inputEmail" class="sr-only">Email address</label>--%>
        <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
<%--        <label for="inputPassword" class="sr-only">Password</label>--%>
        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>

<%--        <label for="duplicatePassword" class="sr-only">Password</label>--%>
        <input type="password" name="duplicatePassword" id="duplicatePassword" class="form-control" placeholder="Repeat the password" required>

        <input type="submit" class="btn btn-lg btn-primary btn-block" value="register in"/>
    </form>

</div> <!-- /container -->
<script src="${pageContext.request.contextPath}/js/register.js"></script>
</body>
</html>