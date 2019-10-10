<%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/10/2
  Time: 9:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册成功</title>
    <script src="${pageContext.request.contextPath}/js/jquery-3.4.1.min.js"></script>
</head>
<body>
<%--
<script type="text/javascript">
    $(function () {
        //选择器
        $(".container>.form-registerin").submit(function () {
            //val() - 设置或返回表单字段的值
            var inputUserName = $('#inputUserName').val();
            var inputEmail = $('#inputEmail').val();
            var inputPassword = $('#inputPassword').val();
            var duplicatePassword = $('#duplicatePassword').val();

            console.log(inputEmail);
            console.log(inputPassword);
            $.ajax({
                type: "POST",
                url: "${pageContext.request.contextPath}/register.do",
                cache: false,
                async: false,
                data: $(".container>.form-registerin").serialize(),
                error: function(request) {
                    alert("Connection error");
                },
                success: function(data) {
                    alert("注册成功，请登录");
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
--%>



<script type="text/javascript">
    $(function(){
        $("#button").click(function () {
            alert("点击了");
            // window.location.replace("index.jsp");
            window.location.href="http://www.baidu.com";
        });
    });
</script>
<button id="button" class="btn btn-lg btn-primary btn-block " type="submit">register in</button>
</body>
</html>
