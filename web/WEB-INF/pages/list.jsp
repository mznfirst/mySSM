<%--
  Created by IntelliJ IDEA.
  User: MZN
  Date: 2019/10/8
  Time: 16:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="Taglib" prefix="ec" %>


<html>
<head>
    <title>findAll</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/ecside/js/ecside.js"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ecside/css/ecside_style.css" />
    <script language="JavaScript" src="${pageContext.request.contextPath}/ecside/js/prototype_mini.js" ></script>
</head>
<body>

<div id="context-menu">
    <ul class="dropdown-menu" role="menu" style="margin-top: 100px">
        <li style="cursor: hand"><a href="#">动物</a>
            <ul class="dropdown-menu" role="menu" style="margin-top: 100px">
                <li style="cursor: hand"><a tabindex="-1" onclick=""><i class="defaultIcon"></i>♂</a></li>
                <li style="cursor: hand"><a tabindex="-1" onclick=""><i class="defaultIcon"></i>小猪</a></li>
                <li style="cursor: hand"><a tabindex="-1" onclick=""><i class="defaultIcon"></i>小狗</a></li>
            </ul>
        </li>
    </ul>
</div>





    <table border=0 cellspacing=0 cellpadding="0" style="width: 50%">
<%--        style="height: 100%;width: 100%;display: inline-grid"--%>
            <tr>
                <th>学号</th>
                <th>姓名</th>
            </tr>
<%--        <tr>--%>

                <ec:table items="studentList" var="student" classic="false" useAjax="false"  title="信息列表" showPrint="false" showTitle="true"
                          rowsDisplayed="30" sortRowsCallback="limit" filterRowsCallback="limit" pageSizeList="10,20,30,50,100"
                          sortable="true" filterable="true" resizeColWidth="true" style ="text-align:center;border:2px;table-layout:fixed;"
                >
<%--                <ec:table items="studentList" var="student" rowsDisplayed="30">--%>
                    <ec:row recordKey="${student.student_number}">
                        <ec:column width="20" title="&#160" property="mycheckBox" cell="checkbox" resizeColWidth="false">

                        </ec:column>
                        <ec:column property="_1" width="30" title="序号" sortable="false" resizeColWidth="true">
                            <%
                                out.write("<i style='margin-top:3px'/>");
                            %>
                        </ec:column>
                        <ec:column property="student_number" width="120" title="学号"  style="text-align:center"></ec:column>
                        <ec:column property="student_name" width="80" title="姓名"  style="text-align:center"></ec:column>
                    </ec:row>
                </ec:table>
    </table>
<%--        </tr>--%>
              <%--  <ec:table items="studentList" var="student" classic="false" useAjax="false"  title="信息列表" showPrint="true" showTitle="true"
                          rowsDisplayed="30" sortRowsCallback="limit" filterRowsCallback="limit" pageSizeList="10,20,30,50,100"
                          sortable="true" filterable="true" resizeColWidth="true" style ="text-align:center;border:2px;table-layout:fixed;"
                >
                        <ec:row recordKey="${student.student_number}" highlightRow="">
                            <ec:column property="student_number" width="120" title="学号"  style="text-align:center"></ec:column>
                            <ec:column property="student_name" width="80" title="姓名"  style="text-align:center"></ec:column>
                        </ec:row>
                </ec:table>--%>






<%--<textarea id="ecs_t_date" rows="" cols="" style="display:none">
<input type="text" class="inputtext" value=""
       style="width:100%;" name="" />
<input class="calendarImgButton" οnclick="ECSideUtil.showCalendar(this)" type="button" id="date_button"/>
</textarea>

<textarea id="ecs_t_input" rows="" cols="" style="display:none">
<input type="text" class="inputtext" value="" οnblur="ECSideUtil.updateEditCell(this)"
       style="width:100%;" name="" />
</textarea>--%>

<table border="1">
    <tr>
        <td>
            2016021646
        </td>
        <td>
            焦静涛
        </td>
    </tr>
</table>


<%--<c:forEach items="${list}" var="account">
    ${account.username}
    ${account.toString()}
    ${account}
</c:forEach>--%>
</body>
</html>
