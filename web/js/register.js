function QRegister (config) {
    var code = '';  // 滑动验证通过后的code
    var sig = '';   // 滑动验证通过后的sig
    var intervalCount = 60;

    this.captchaObj = '';
    this.captchaType = 0;
    this.captchaAppId = "1600000770";
	
	this.config = {
		appId: '10',
        areaId: 1,        
        format: 'jsonp',
        backUrl: '',
        apiUrl: '',
        loginUrl: '/login.html'
	};
	
	if(config) this.config = config;
	
	this.authApi = new YuewenAuthen(this.config);
	this.authApi.apiUrl = this.config.apiUrl;
	
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
	
	this.checkAccount = false;
    this.codeKey = '';
	this.sessionKey = '';	
	this.needValidateCode = true;
	this.sendCodeTimeout = '';
	this.requestID = '';
	this.time = Math.round(new Date().getTime()/1000);
	this.isRegistering = false;
	this.isChecking = false;
	this.force = 0;
    this.validateShow = false ;   // 标识是否出腾讯验证码   flase 出图片验证码   true 出腾讯验证码
    this.validateSrc = '';        //  验证码src
	this.getslidejs = 0 ;
	
	//屏蔽国外的邮箱
	this.forbidEmails = ['chacuo.net', '027168.com', 'sharklasers.com', 'grr.la', 'guerrillamail.biz',
  	'guerrillamail.com', 'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org',
  	'guerrillamailblock.com','spam4.me', 'yopmail.fr', 'yopmail.net', 'yopmail.com',
  	'cool.fr.nf','jetable.fr.nf','nospam.ze.tc','nomail.xl.cx','mega.zik.dj','speed.1s.fr',
    'courriel.fr.nf','moncourrier.fr.nf','monemail.fr.nf','monmail.fr.nf','meltmail.com',
    'mailinator.com','anonymbox.com'];
	this.hasShowCaptcha = false;
	
	this.phoneInterval = function() {
		var that = this;
		var interval = setInterval(function() {
            intervalCount--;
	        if (intervalCount <= 0) {
                that.codeKey = '';
                intervalCount = 60;
	            clearInterval(interval);
	            if (!that.validateShow){
                    $("#txtphoneimgcode").val('');
				}

	           // that.showCaptcha();
				//that.getCaptchaType();
	            that.closeSendLoading();
	        }
	        else {
	            $("#get_code").html("(" + intervalCount + ")" + that.tips.reSendMsg);
	        }
	    }, 1000);
	};
	
	this.init = function() {
	    var that = this;
	    $("#txtphonenumber").blur(function() {
	    	that.checkPhoneNumber();
	    });
	    $("#txtphonenumber").focus(function() {
	    	that.hideError('phone');
	    });
        $('#txtphonenumber').on('change', function () {
            that.codeKey = '';
        });
        $("#txtcard").blur(function() {
            var card = $("#txtcard").val();
            var re = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (re.test(card) === false) {
                that.showError('card', '请输入正确的身份证');
            }
        });
        $("#txtcard").focus(function() {
            that.hideError('card');
        });

	    $("#get_code").click(function() {
            that.sendCode();
	    });

	    // 刷新验证码
	    $("#refresh_code").click(function(){
            //that.getRefreshCaptchaType();
	    	that.refreshCode();
	    });

	    $("#txtphoneimgcode").focus(function() {
	    	that.hideError('imgphonernd_code');
	    });

	    //  出图片验证
	    if (!this.validateShow){
            $("#txtphoneimgcode").blur(function() {
                that.checkImageCode('txtphoneimgcode','imgphonernd_code');
            });
		}

	    $("#txtphonecode").focus(function() {
	    	that.hideError('phonecode');
	    });
	    $("#txtphonecode").blur(function() {
	    	that.checkCode();
	    });
	    
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
	    
	    $("#btnPhoneRegister").click(function(){
	    	that.doRegister();
	    });
	    
	    $("#btnMailRegister").click(function(){
	    	that.doRegisterByEmail();
	    });
	    
	    $('.deal').click(function(){
	    	if ($('#deal').is(':checked') != true) {
				$(".go-reg").addClass('disabled');
			}
	    	else {
	    		$(".go-reg").removeClass('disabled');
	    	}
	    });
	    
	    this.initPhoneAreaSelect();
	};
	
		
	
	this.checkPhoneNumber = function() {
		// 检查手机号码
		var phonearea = $('.ui-select-text').text();
		var phone     = $('#txtphonenumber').val();
		var accountType = 101; //中国大陆
		
		phone = phone.replace(/[ ]/g,"");
		phone = $.trim(phone);
		
		var areano = $('.ui-select-text').text().split('+');
		if (areano.length == 2) areano = $.trim(areano[1]);
		
		if (phone == 'undefined' || phone.length == 0) {
			this.showError('phone', this.tips.phoneEmpty);
			return ;
		}
		
		if (phonearea.indexOf('+86') > 0) {
			var phoneIsAboard  = false;
			//var re = /^(13[0-9]|15[0-9]|18[0-9]|145|147|17[0-9])\d{8}$/;
			var re = /^1\d{10}$/;
			if (re.test(phone) != true) {
				this.showError('phone', this.tips.phoneInvalid)
				return ;
			}
			
		}
		else {
			var re = /^\d+$/;
			var phoneIsAboard  = true;
			if(re.test(phone) != true) {
				this.showError('phone', this.tips.phoneInvalid)
				return ;
			}
			phone = '+' + areano + phone;
			accountType = 105; //海外
		}
		
		var that = this;
		this.isChecking = true;
		this.authApi.checkAccount(phone, accountType, function(result){
			if(result && result.data.existing == true) {
				that.checkAccount = false;
				that.showError('phone', that.tips.phoneExist)
				return ;
			}
			else if(result && result.code != 0) {
				that.checkAccount = false;
				that.showError('phone', result.message)
				return ;
			}
			
			if(result.code == 0 && result.data.existing == false ) {
				that.checkAccount = true;
			}
			this.isChecking = false;
		});
		
		this.showPassTip('phone');
		
		return ;
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

	// 获取验证码类型
	this.getCaptchaType = function () {
        var that = this;
		this.authApi.getCaptchaType(1,function (data) {
			if (data.code == 0 ){
                that.needValidateCode = data.data.needValidateCode;
                that.hasShowCaptcha = true;
                that.captchaType = 0;

                if (data.data.imgSrc !='' && data.data.needValidateCode == true){
                    that.sessionKey = data.data.sessionKey;

                    // 出腾讯验证码 隐藏图片验证码框
                    if ( data.data.imgSrc.indexOf('tencentCode;') == 0 ) {
                        that.validateShow = true;       // 标识 是否出腾讯验证码
                        that.validateSrc = data.data.imgSrc.slice(12);
                        that.setCaptchaType(that,that.validateSrc);

                        var callbackFun = function (retJson) {
                            if (retJson.ret == 0) {
                                if (!that.captchaType) {
                                    that.hideError('slide-verify');
                                    var ticket = capGetTicket();
                                    code = ticket.randstr;
                                    sig = ticket.ticket;
                                } else if (that.captchaType == 1) {
                                    sig = retJson.ticket;
                                    code = retJson.randstr;
                                    that.sendCode();
                                }
                            } else {
                                alert('验证失败');
                            }
                        };

                        if(!that.captchaType) {
                            that.validateSrc += "&clientype=2";
                            $("#imgphonernd_code").hide();  // 隐藏图片验证码
                            $('#cap_iframe').html('');
                            $('#slide-verify').show();
                        }else if(that.captchaType == 1){
                            $('#slide-verify').hide();
                        }

                        $.getScript(that.validateSrc, function () {
                            that.showPageCaptcha('cap_iframe',callbackFun);
                        });

                    }

                    //  出图片验证码 展示图片验证码，  隐藏滑动验证码
                    if (that.validateShow == false){
                        that.validateSrc = data.data.imgSrc;
                        $('#imgphonernd').attr('src',data.data.imgSrc);
                        $('#slide-verify').hide();      // 隐藏滑块
						$("#imgphonernd_code").show();  // 显示图片验证码块
                    }
                }
			}
        });
    };

    this.setCaptchaType = function (that,url) {
        that.captchaType = url.indexOf("ssl.captcha.qq.com/TCaptcha.js") > 0 ? 1 : 0;
    };

    this.showPageCaptcha = function (capName, callbackFun) {
        code = sig = '';
        if (!this.captchaType){
            //显示验证码
            var capOption={callback:callbackFun, type:"point", firstvrytype:1};
            capInit(document.getElementById(capName), capOption);
            //回调函数：验证码页面关闭时回调
        } else if(this.captchaType == 1) {
            this.captchaObj = new TencentCaptcha( document.getElementById(capName), this.captchaAppId, callbackFun);
            this.captchaObj.show();
        }
    };

	this.showCaptcha = function(id) {		
		var that = this;
		if(!id) id = 'imgphonernd';
		this.authApi.getCaptcha(this.force, function(result) {
			if(result.code == 0) {
				that.needValidateCode = result.data.needValidateCode;
				$("#" + id + "_code").show();					
				that.hasShowCaptcha = true;
				$("#" + id).attr('src', result.data.imgSrc);
				that.sessionKey = result.data.sessionKey;
			}
		});
	};
	
	this.showMailCaptcha = function() {		
		var that = this;
		this.showCaptcha('imgmailrnd');
	};

	// 刷新验证码
	this.getRefreshCaptchaType = function () {
        var that = this;
        this.authApi.getCaptchaType(1,function (data) {
            if (data.code == 0 ){
                if (data.data.imgSrc !='' && data.data.needValidateCode == true){
                    that.sessionKey = data.data.sessionKey;
                    that.captchaType = 0;
                    // 出腾讯验证码 隐藏图片验证码框
                    if ( data.data.imgSrc.indexOf('tencentCode;') == 0 ) {
                        that.validateShow = true;                        // 标识 是否出腾讯验证码
                        that.validateSrc = data.data.imgSrc.slice(12);
                        that.setCaptchaType(that,that.validateSrc);
                        if (!that.captchaType) {
                            that.validateSrc += "&clientype=2";
                            $("#slide-verify").show();
                        } else if (that.captchaType == 1) {
                            $("#slide-verify").hide();
                        }
                        $("#imgphonernd_code").hide();  // 隐藏图片验证码
                    }

                    //  出图片验证码 展示图片验证码，  隐藏滑动验证码
                    if (that.validateShow == false){
                        that.validateSrc = data.data.imgSrc;
                        $('#imgphonernd').attr('src',data.data.imgSrc);
                        $('#slide-verify').hide();  // 隐藏滑块
                        $("#imgphonernd_code").show();  // 显示图片验证码块
                    }
                }
            }
        });
    };

	
	this.refreshCode = function(id) {
		if(!id) id = "imgphonernd";
		var curTime = Math.round(new Date().getTime() / 1000);
		if(curTime - this.time > 30) {
			this.showCaptcha(id);
			this.time = curTime;
			return;
		}
		
		this.time = curTime;
				
		var url = $("#" + id).attr("src");
				
		if (url != "" && url != "images/code.png") {
			if (url.indexOf("&rnd=") > -1) {
				url = url.substr(0, url.indexOf("&rnd=")) + "&rnd=" + Math.random();
			}
			else {
				url = url + "&rnd=" + Math.random();
			}
		}
		
		$("#" + id).attr("src", url);
	};
	
	this.checkCode = function() {
		var code = $('#txtphonecode').val();
		if(this.requestID == '') {
			this.showError('phonecode', this.tips.phoneCodeError);
			return false;
		}
		
		if (code.length == 0) {
			this.showError('phonecode', this.tips.phoneCodeError);
			return false;
		}
		
		var re = /^[0-9]{4,}$/;
		if (re.test(code) != true) {
			this.showError('phonecode', this.tips.phoneCodeError);
			return false;
		}
		this.showPassTip('phonecode');
		return true;
	};

	this.sendCode = function() {	
		//检查是否达到时间间隔
		if(intervalCount > 0 && intervalCount < 60) return;
		
		var that = this;
		if (this.checkAccount != true && !this.isChecking) {
			this.checkPhoneNumber();
			console.log('check phone number error');
			return ;
		}
		if(this.checkAccount != true && this.isChecking) {
			setTimeout(function(){
				that.sendCode();
			},200);
			return;
		};
		
		var phone = $("#txtphonenumber").val();
		phone = $.trim(phone);
		var areano = $('.ui-select-text').text().split('+');
		if (areano.length == 2) areano = $.trim(areano[1]);
		else areano = '';
		var phoneIsAbroad = 0;
		if (areano != '86') {
			phone = '+' + areano + phone;
			phoneIsAbroad = 1;
		}

		//  兼容部分	start
		var captchaCode = '';
		// 滑动严码code

        if (this.hasShowCaptcha) {
            if (this.validateShow) {
                if (code && sig) {
                    captchaCode = code + ";" + sig;
                } else {
                    this.showError('slide-verify', '腾讯验证码较验失败');
                    return false;
                }
            }
            // 出图片验证码时 验证
            if (!this.validateShow) {
                captchaCode = $("#txtphoneimgcode").val();
                if (this.codeKey && !this.checkImageCode('txtphoneimgcode', 'imgphonernd_code')) return false;
            }
        }

		// 兼容部分 end
		
		this.hideError('phonecode');

		this.authApi.getVerificationCode(phone, phoneIsAbroad, 0, this.codeKey, captchaCode, function(result) {
			if (result.code == 0 ) {
                if (result.data.nextAction == 8 || result.data.nextAction == 11) {
                    that.dealSendMsgValidate(result);
                    return;
                }
                that.sessionKey = result.data.sessionKey;
                that.requestID = result.data.sessionKey;  //  短信sessionKey
                that.phoneInterval();
            }
            else {
                var curEle = that.validateShow ? 'slide-verify' : 'imgphonernd_code';
                if(result.code == -11003){
                    that.getCaptchaType();
                    that.showError(curEle, that.validateShow ? '腾讯验证码已过期' : result.message);
                }
            	else if(result.code == -11004 || result.code == -10086) {
					that.getCaptchaType();
                    that.showError(curEle, that.validateShow ? '腾讯验证码较验失败' : that.tips.captchaError);
                }
            	else if(result.code == -11001) {
            		that.showError('phone', that.tips.phoneExist);
            	}
            	else if(result.data) {
            		that.showError('phonecode', result.message);
            	}
            	else{
                    that.showError('phonecode', that.tips.sendMsgError);
                }
            	
            	that.closeSendLoading();
            }
						
		});				

	};

    this.dealSendMsgValidate = function(data) {
        var that = this;
        that.validateSrc = data.data.imgSrc;
        that.hasShowCaptcha = true;
        that.codeKey = data.data.sessionKey;
        // 出腾讯验证码 隐藏图片验证码框
        if ( data.data.nextAction == 11) {
            that.validateShow = true;       // 标识 是否出腾讯验证码
            that.validateSrc = data.data.imgSrc;
            that.setCaptchaType(that,that.validateSrc);
            var callbackFun = function (retJson) {
                if (retJson.ret == 0) {
                    if (!that.captchaType) {
                        that.hideError('slide-verify');
                        var ticket = capGetTicket();
                        code = ticket.randstr;
                        sig = ticket.ticket;
                    } else if (that.captchaType == 1) {
                        sig = retJson.ticket;
                        code = retJson.randstr;
                        that.sendCode();
                    }
                } else {
                    alert('验证失败');
                }
            };

            if(!that.captchaType) {
                that.validateSrc += "&clientype=2";
                $("#imgphonernd_code").hide();  // 隐藏图片验证码
                $('#cap_iframe').html('');
                $('#slide-verify').show();
            }else if(that.captchaType == 1){
                $('#slide-verify').hide();
            }

            $.getScript(that.validateSrc, function () {
                that.showPageCaptcha('cap_iframe',callbackFun);
            });

        }else if (data.data.nextAction == 8){
            that.validateShow = false;
            $('#imgphonernd').attr('src',data.data.imgSrc);
            $('#slide-verify').hide();      // 隐藏滑块
            $("#imgphonernd_code").show();  // 显示图片验证码块
        }
    };

    //验证图片验证码
    this.checkImageCode = function(txtid,showid) {

        if(!this.needValidateCode) return true;

        var code = $('#'+txtid).val();
        if (code.length == 0) {
            this.showError(showid, this.tips.captchaEmpty);
            return false;
        }

        return true;
    };


    this.sendLoading = function() {
        var msg = arguments[0] || this.tips.sendLoading;
        $("#get_code").html(msg);        
        $("#get_code").attr("disabled", "disabled");

    };
    
    this.closeSendLoading = function() {
        $("#get_code").html(this.tips.sendDefault);
        $("#get_code").removeAttr("disabled");
    };
    
    this.showPswError = function(id) {	
		var psw = $('#'+id).val();
		$('#phonepwd').removeClass('error');
		var valid = true;
		if (psw != '') {
			var re = /^[0-9]{6,8}$/;
			if (re.test(psw) == true) {
				$('#pwdrule2').addClass('red');
				valid = false
			}
			else {
				$('#pwdrule2').removeClass('red');
			}
				
			re = /\s/g;
			if (re.test(psw) == true) {
				$('#pwdrule3').addClass('red');
				valid = false
			}
			else{
				$('#pwdrule3').removeClass('red');
			}
			
			var minlen = 6;
			var maxlen = 18;		
			
			
			if (psw.length < minlen || psw.length > maxlen) {
				$('#pwdrule1').addClass('red');
				valid = false
			}
			else {
				$('#pwdrule1').removeClass('red');
			}
		} else {			
			valid = false
		}
		
		this.disPwdStrength();
		
		if (!valid) {
			//$('#phonepwd').addClass('error');
			$(".password-tip").show();	
		}				
		else {
			$(".password-tip").hide();
			//$('#phonepwd').removeClass('error');
			this.authPasswdNew(id);
		}
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
        var that = this;
        this.authApi.doRegisterByPhone(phone, phone, phoneIsAbroad, 101, that.rsa_encryption(password), this.requestID, code, this.config.backUrl, function(result){
        	
        	if(result && result.code == 0 ) {
        		var data = result.data;
        		if(that.config.ticket == 1) {
        			var params = {
        				account: phone,
                		ticket: data.ticket,
                		autoKey: data.autoLoginSessionKey,
                		autoTime: data.autoLoginKeppTime,
                		guid: data.ywGuid,
                        ywopenid: data.ywOpenId
            		}
        		} else {
        			var params = {
        				account: phone,
                		guid: data.ywGuid,
                        ywopenid: data.ywOpenId
            		}
        		}
        		
        		var queryString = '';
        		if(that.config.queryString) 
        			queryString = '?' + that.config.queryString + '&' + $.param(params);       			
        		else
        			queryString = '?' + $.param(params);
        		
        		location.href = '/success.html' + queryString;
        		       		       		
        	} else if(result.code == 11007){
        		that.showError('phonecode', '短信验证码无效');
        	}
        	else {
        		alert(result.message);
        	}
        	that.closeLoading();
        });        
       
	};
	
	this.doRegisterByEmail = function() {
		if(this.isRegistering) return false;
        var name = $("#txtemail").val();
        var psw   = $("#txtphonepwd").val();
		var code  = $("#txtphoneimgcode").val();
        name = $.trim(name);
		
		if (this.checkAccount != true) {
			this.checkEmail();
			return false;
		}
		if (this.checkPassword('txtphonepwd') != true) return false;
		if (this.checkPassword2() != true) return false;
		
		if ($('#deal').is(':checked') != true) {
			//console.log('agree error');
			return false;
		}
		
		if(this.needValidateCode && !this.checkImageCode('txtphoneimgcode','imgphonernd_code')) return false;
        
        this.mailLoading();
        var that = this;
        
        this.authApi.doRegisterByEmail(name, name, 102, psw, this.sessionKey, code, this.config.backUrl, this.config.ajaxdm, function(result){
        	if(result && result.code == 0 ) {
                // 处理言吧逻辑
                if (that.config.appId == 43 || that.config.appId == 44) { // 此处暂时写死，该逻辑2017年6月31号后可以去掉
                    var rednovelCk = $.cookie('rednovel' + that.config.appId);
                    if (rednovelCk == '' || rednovelCk == undefined) {
                        $.cookie('rednovel' + that.config.appId, 1, {expires: (30*24*60*60), path: '/'});
                    }
                }
                $.cookie('ywtab', 1, {expires: (30*24*60*60), path: '/'});
                
        		var params = {
    				account: name
        		}
        		if(that.config.queryString)
        			var queryString = '?' + that.config.queryString + '&' + $.param(params);
        		else 
        			var queryString = '?' + $.param(params);
        		
        		location.href = '/verify.html' + queryString;
        	} 
        	else if(result.code == -11001) {
        		that.showError('email_dd', that.tips.emailExist)
        	}
        	else if(result.code == -11003 || result.code == -11004) {
        		that.showCaptcha();
        		that.showError('imgphonernd_code', '验证码错误或已过期，请重新输入');
        	}
        	else if(result.code == -11011) {
        		that.showError('email_dd', '当前账号正在验证中，请前往账号邮箱进行验证');
        	}
        	else if(result && result.message){
        		alert(result.message);
        	}
        	that.mailCloseLoading();
        });
        
	};
	
	this.mailLoading = function() {
		this.isRegistering = true;
        $("#btnMailRegister").html('正在注册...');
        $("#btnMailRegister").attr("disabled", "disabled");
    };
    
    this.mailCloseLoading = function() {
    	this.isRegistering = false;
        $("#btnMailRegister").html('立 即 注 册');
        $("#btnMailRegister").attr("disabled", "disabled");
    };
	
	this.disPwdStrength = function () {
		$('.password-strong').hide();
		$('.password-strong p').hide();
	};
	
    this.loading = function() {
    	this.isRegistering = true;
        $("#btnPhoneRegister").html('正在注册...');
        $("#btnPhoneRegister").attr("disabled", "disabled");

    };
    
    this.closeLoading = function() {
    	this.isRegistering = false;
        $("#btnPhoneRegister").html('立 即 注 册');
        $("#btnPhoneRegister").removeAttr("disabled");
    };
    
	this.showError = function(id, msg, showid) {
		$('#'+id + ' .icon-pass').remove();
		$('#'+id + ' .icon-error').remove();	
		$('#'+id + ' .error-tip').remove();
		var spanhtml='<i class="sprite icon-error"></i><p class="error-tip">' + msg + '</p></dd>'
		$('#'+id).addClass('error');
		if(showid)
		{
			$('#'+showid).html(spanhtml);
		}
		else 
		{
			$('#'+id).append(spanhtml);
		}
	};
	
	this.hideError = function(id,showid) {		
		
        $('#'+id).removeClass('error');
        $('#'+id + ' .icon-pass').remove();
        if(showid)
        {
			$('#'+showid).html('');	
			$('#'+showid).hide();
        }
		else
		{		
			$('#'+id + ' .icon-error').remove();	
			$('#'+id + ' .error-tip').remove();
		}
	};
	
	this.showPassTip = function(id,showid) {		
		$('#'+id).removeClass('error');
		$('#'+id + ' .icon-pass').remove();
		$('#'+id + ' .icon-error').remove();	
		$('#'+id + ' .error-tip').remove();
		
		if(showid){
			$('#'+showid).html('<i class="sprite icon-pass"></i>');
			$('#'+showid).css('display','inline-block');	
		}
		else {
			$('#'+id).append('<i class="sprite icon-pass"></i>');
        }		
	};
	
	this.initPhoneAreaSelect = function() {
		if(typeof(GPhoneArea) == 'undefined')
			return;
		
		var data = GPhoneArea;
		var areaHtml = '';	
		var hotArea = data.hot;	
		
		var processName = function(name) {
			name = name.replace(/\(|\)/, '');
			var len = name.length;
			var maxlen = 4;
			if((len - maxlen) > 0) {
				name = name.substring(0, maxlen);
				return name + '..&nbsp;&nbsp;';
			}			
			var nbsbCount = maxlen  - len;
			for (var i = 0; i < nbsbCount; i++) {
				name += '&#12288;'; //中文占位符
			}
			
			name = name + '&nbsp;&nbsp;&nbsp;&nbsp;';
			return name;
		}
		
		$.each(hotArea, function(key1, area) {
			areaHtml += '<option>' + processName(area.chineseName) + '+' + area.code +'</option>';
		});
		$.each(data, function(key, areaArr){
			if(key == 'hot') return;
			$.each(areaArr, function(key1, area) {
				areaHtml += '<option>' + processName(area.chineseName) + '+' + area.code +'</option>';
			});
		});
				
		$("#txtphonearea").html(areaHtml);
		$('#txtphonearea').selectMatch();
	};
    
    this.rsa_encryption = function(password) {
        var rsa = new RSAKey();
        rsa.setPublic(this.config.modulus, this.config.exponent);  // 生成公钥
        var encrypt_password = rsa.encrypt(password);   // 加密数据
        if (encrypt_password.length > 50) {
            return encrypt_password ;
        }else{
            return password ;
        }
    };
	
	this.init();
}