
this.tips = {
    phoneEmpty: '请输入手机号码',
    phoneInvalid: '请输入有效的手机号码',
    phoneExist: '该手机号已注册，请尝试直接 <a class="blue" href="' + this.config.loginUrl + '">登录</a>',
    captchaEmpty: '验证码不能为空',
    captchaError: '验证码错误',
    sendLoading: '发送中...',
    sendDefault: '获取验证码',
    reSendMsg: '重新发送',
    sendMsgError: '发送失败，请重新尝试',
    phoneCodeError: '手机验证码不正确',
    confirmPwdEmpty: '请再次输入密码',
    pwdNotSame: '您两次输入的密码不一致',
    emailEmpty: '请输入邮箱',
    emailInvalid: '请输入正确的邮箱',
    emailNotSupport: '邮箱后辍不支持',
    emailExist: '该邮箱账号已注册，请尝试直接 <a class="blue" href="' + this.config.loginUrl + '">登录</a>'
};

this.init = function() {
    var that = this;

    $("#txtphonepwd").focus(function() {
        that.showPswError('txtphonepwd');
    });
    $("#txtphonepwd").blur(function() {
        that.checkPassword('txtphonepwd');
    });
    $("#txtphonepwd").keyup(function() {
        that.showPswError('txtphonepwd');
    });

    $("#txtphonepwd2").focus(function() {
        that.hideError('password2');
    });
    $("#txtphonepwd2").blur(function() {
        that.checkPassword2();
    });

    $("#txtemail").focus(function() {
        that.hideError('email_dd');
    });
    $("#txtemail").blur(function() {
        that.checkEmail();
    });

};


this.checkEmailForbid = function()
{
    var checkresulet=false;
    var name = $("#txtemail").val();
    var idx=name.indexOf('@');
    if(idx!=-1){
        var idxname = $.trim(name.substr(idx+1));//获取邮箱后缀
        for(var i=0;i < this.forbidEmails.length;i++)
        {
            if(idxname == this.forbidEmails[i])
            {
                checkresulet=true;
                break;
            }
        }
    }
    return checkresulet;
};

this.checkEmail = function() {
    var showid='email_dd';
    var name = $("#txtemail").val();
    name = $.trim(name);
    if (name == null || name.length <= 0) {
        this.showError(showid, this.tips.emailEmpty);
        return false;
    }
    var re = new RegExp(/^(\w)+([-.]\w+)*@[\w-]+(\.[\w-]+)+$/);
    if (!re.test(name)) {
        this.showError(showid, this.tips.emailInvalid);
        return false;
    }

    re = new RegExp(/^(\w)+([-.]\w+)*@[((\w)+\.)]+(com|net|cn|org)$/);
    if (!re.test(name.toLowerCase())) {
        this.showError(showid, this.tips.emailNotSupport);
        return false;
    }

    if(this.checkEmailForbid())
    {
        this.showError(showid, this.tips.emailNotSupport);
        return false;
    }
    this.showPassTip(showid);
    var that = this;
    this.authApi.checkAccount(name, 102, function(result){
        if(result.data.existing == true) {
            that.checkAccount = false;
            that.showError(showid, that.tips.emailExist);
            return ;
        }

        if(result.data.existing == false ) that.checkAccount = true;

        that.showPassTip(showid);
    });
};

this.checkPassword = function(txtid){
    var psw = $('#' + txtid).val();
    if (psw == null || psw == 'undefined' || psw.length == 0) {
        this.showPswError(txtid);
        $('#phonepwd').addClass('error');
        return false;
    }
    var re = /^[0-9]{0,8}$/;
    if (re.test(psw) == true) {
        this.showPswError(txtid);
        $('#phonepwd').addClass('error');
        return false;
    }
    else{
        $('#pwdrule2').removeClass('red');
    }
    re = /\s/g;
    if (re.test(psw) == true) {
        this.showPswError(txtid);
        $('#phonepwd').addClass('error');
        return false;
    }

    /*re=/^[a-zA-Z0-9!@#_]+$/;
    if (re.test(psw) != true) {
        this.showPswError(txtid);
        $('#phonepwd').addClass('error');
        return false;
    }*/
    if (psw.length < 6 || psw.length > 18) {
        this.showPswError(txtid);
        $('#phonepwd').addClass('error');
        return false;
    }

    this.authPasswdNew(txtid);
    return true;
};

this.checkPassword2 = function() {
    var psw = $('#txtphonepwd').val();
    if(!this.checkPassword('txtphonepwd')) return false;

    var psw2 = $('#txtphonepwd2').val();
    if (psw2.length == 0) {
        this.showError('password2', this.tips.confirmPwdEmpty);
        return false;
    }
    if (psw != psw2) {
        this.showError('password2', this.tips.pwdNotSame);
        return false;
    }
    this.showPassTip('password2');
    return true;
};

this.authPasswdNew = function(id) {
    var string = $('#' + id).val();
    var level=0;
    if(/[a-zA-Z]+/.test(string))
        level+=1;
    if(/[0-9]+/.test(string))
        level+=1;
    if(/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(string))
        level+=1;
    this.disPwdStrength();
    $('.password-tip').hide();
    $('.password-strong').show();
    $('.password-strong p:eq(' + (level - 1) + ')').show();
};
this.doRegister = function() {
    if(this.isRegistering) return false;
    var phone = $("#txtphonenumber").val();
    var password   = $("#txtphonepwd").val();
    var code  = $("#txtphonecode").val();
    var card = '';
    phone = $.trim(phone);
    phone = phone.replace(/[ ]/g,"");

    var areano = $('.ui-select-text').text().split('+');
    if (areano.length == 2) areano = $.trim(areano[1]);
    else areano = '';

    var phoneIsAbroad = 0;

    if (areano != '86') {
        phone = '+' + areano + phone;
        phoneIsAbroad = 1;
    }

    if (this.checkAccount != true) {
        this.checkPhoneNumber();
        console.log('check phone number error');
        return false;
    }

    if($("#card").length > 0){
        card = $("#txtcard").val();
        var re = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (re.test(card) === false) {
            this.showError('card', '请输入正确的身份证');
            return false;
        }
    }

    if (this.checkPassword('txtphonepwd') != true) {
        console.log('check passswrod error');
        return false;
    }
    if (this.checkPassword2() != true) {
        console.log('check passswrod2 error');
        return false;
    }
    if (this.checkCode() != true) {
        console.log('check code error');
        return false;
    }

    if ($('#deal').is(':checked') != true) {
        console.log('agree error');
        //$(".deal").addClass('error');
        return false;
    }

    this.loading();
};