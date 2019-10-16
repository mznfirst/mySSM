<%@ page import="java.util.List" %>
<%@ page import="com.mzn.domain.Student" %><%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/10/2
  Time: 9:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="Taglib" prefix="ec" %>
<html>
<head>
    <title>注册成功</title>
    <script src="${pageContext.request.contextPath}/js/jquery-3.4.1.min.js"></script>
</head>
<body>
<%
    List<Student> studentList = (List<Student>) request.getAttribute("studentList");
%>
<c
<c:forEach items="${list}" var="studentList">
   <div>
           ${studentList}
   </div>
</c:forEach>
<ec:table items="info_list" var="studentList" useAjax="false" action="${pageContext.request.contextPath}/student/findAll" title="信息列表">
    <ec:row >
        <ec:column property="123" title="001" width="30">
            <ec:attribute>
                <%

                %>
            </ec:attribute>
        </ec:column>
        <ec:column property="_1" title="002" width="30">
            <ec:attribute>

            </ec:attribute>
        </ec:column>
    </ec:row>
</ec:table>
<%--<script type="text/javascript">
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
</script>--%>

<%--<script language="JavaScript">
    var xmlhttp;
    function createXMLHttp(){
        if (window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("MicroSoft.XMLHTTP");
        }
    }
    function showMsg(){
        createXMLHttp();
        xmlhttp.open("GET","${pageContext.request.contextPath}/student/findAll");
        xmlhttp.onreadystatechange = showMsgCallback;
        xmlhttp.send("null");
    }
    function showMsgCallback(){
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
                document.getElementById("text_out").innerHTML = "showMsgCallback 200..."

                var text = xmlhttp.responseText;
                // $("#msg").innerHTML = text;
                document.getElementById("text_out").innerHTML = text;
            }else{
                alert("服务器返回状态"+xmlhttp.statusText);
            }
        }
    }
</script>--%>


<%--<script type="text/javascript">
    $(function () {

        $('#list').click(function () {
            alert("123");
        });


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
</script>--%>
<a href="${pageContext.request.contextPath}/student/findAll" class="btn btn-tool btn-sm" >List</a>

<%--<script type="text/javascript">
    $(function(){
        $("#button").click(function () {
            alert("点击了");
            // window.location.replace("index.jsp");
            window.location.href="http://www.baidu.com";
        });
    });
</script>--%>
<button id="button" class="btn btn-lg btn-primary btn-block " type="submit">register in</button>
<p id="text_out"></p>






</body>
</html>
