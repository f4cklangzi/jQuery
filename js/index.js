$(function(){
    if ($.cookie('username')){
        $('#member').text($.cookie('username'));
        $('#member,#login_out').show();
        $('#reg_a,#login_in').hide();
    }else{
        $('#member,#login_out').hide();
        $('#reg_a,#login_in').show();
    }

    //按钮样式
    $('#search_button').button({
        // disabled:true                      //是否禁止按钮
        // label:'按钮'                       //按钮上的文字
        icons:{
            primary:'ui-icon-search'                       //在文字前面显示 http://api.jqueryui.com/theming/icons/
            // secondary:'ui-icon-carat-1-s'                                     //在文字后面显示
        }
        // text:true                                            //是否显示按钮上面的文字
    });
    // $('#search_button').button('disable');                   //禁用按钮
    // $('#search_button').button('enable');                    //启用按钮
    // $('#search_button').button('destroy');                   //删除按钮，直接阻断button
    // $('#search_button').button('widget');                    //获取按钮的jQuery对象
    // $('#search_button').button('refresh');                   //更新按钮布局
    // $('#search_button').button('option','param');            //获取option属性的值
    // $('#search_button').button('option','param','value');    //设置option属性的值

    $('#question_button').button({
        icons:{
            primary:'ui-icon-lightbulb'                       //在文字前面显示 http://api.jqueryui.com/theming/icons/
        }
    }).click(function () {
        if ($.cookie('username')){
            $('#question').dialog('open');
            //编辑器
            $('#editor').cleditor({
                height:190,
                width:450
            });
        }else{
            $('#error').dialog('open').text('请先登录...');
            setTimeout(function () {
                $('#error').dialog('close');
                $('#login').dialog('open');
            },1000);
        }
    });
    //自动补全
    $('#email').autocomplete({
        //request获取用户输入的内容，有一个属性term;response绑定数据源，不会过滤
        source:function (request,response) {
            var hosts=['qq.com','163.com','126.com','vip.com','gmail.com','hotmail.com'],
                term=request.term,                  //获取用户输入的内容
                name=term,
                host='',
                ix=term.indexOf('@'),               //@的位置
                result=[];                           //最终呈现的数组
            result.push(term);
            //当有@的时候重新分配用户名和域名
            if (ix>-1){
                name=term.slice(0,ix);              //获取输入的用户名
                host=term.slice(ix+1);              //获取输入的域名
            }
            if (name){
                //如果用户已经输入@和后面的域名，那么就找到相关的域名提示,否则提取出所有域名
                var findedHosts=(host?$.grep(hosts,function (value,index) {
                    return value.indexOf(host)>-1;
                }):hosts),
                    findedResult=$.map(findedHosts,function (value,index) {
                    return name+'@'+value;
                });
                result=result.concat(findedResult);
            }
            response(result);
        },
        // disabled:false
        // minLength:1                             //触发补全列表最少输入字符数
        delay:0,                                   //触发延迟，单位毫秒，默认300
        autoFocus:true                              //设为true时第一个会被默认选定
        // create:function (e,ui) {
        //                                             //自动补全被创建时触发，UI为空
        // }
        // open:function (e,ui) {
        //                                             //自动补全被显示时触发，UI为空
        // }
        // close:function (e,ui) {
        //                                             //自动补全被关闭时触发，UI为空
        // }
        // focus:function (e,ui) {         //自动补全获取焦点时触发，UI有一个子属性对象item，分别有两个属性label，
        //                                 //补全文本显示的文字，value将要输入框的值，一般两个相同
        // }
        // select:function (e,ui) {
        //                                             //选定一组值时触发，UI为空
        // }
        // change:function (e,ui) {
        //                                             //当自动补全失去焦点且内容被改变时触发，UI为空
        // }
        // search:function (e,ui) {
        //                                     //自动补全搜索完毕时触发，UI为空
        // }
        // create:function (e,ui) {
        //                                     //自动补全搜索完成后，菜单显示之前时触发，UI有一个子对象content(数组)
        // }
        // 其他事件属性进入函数内部详细查看
    });

    $('#reg').buttonset();                    //将单选框部件设置为按钮

    //日历UI插件
    $('#birthday').datepicker({
        //国际化选项
        dateFormat:'yy-mm-dd',              //指定日历返回的时间格式
        // dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],   //以数组形式指定星期中的天的长格式
        // dayNamesShort:['日','一','二','三','四','五','六']     //以数组形式指定星期中的天的短格式
        dayNamesMin:['日','一','二','三','四','五','六'],         //以数组形式指定星期中的天的极短格式
        monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        // altField:'#idName'          //在指定的input中显示选择的日期
        // altFormat:'yy/mm/dd'        //指定input中的日期格式
        // appendText:'TEXT'           //在日期选择器的input域后面添加附加文本(在input后面增加一个span)
        // showWeek:true,              //是否显示周，默认为false
        // weekHeader:'周'             //显示周的标题，默认为Wk
        firstDay:1,                    //指定日历中的星期从星期几开始，默认为0，即星期日
        //外观选项
        // disabled:true,              //是否禁用日历,默认false
        // numberOfMonths:2            //显示的月份个数，默认1
        showOtherMonths:true,          //在当前月份的表格中显示其他月份日期，但不可选择，默认false
        // selectOtherMonths:true      //可以选择其他月份的日期，默认false
        changeMonth:true,              //显示快速选择月份的下拉菜单，默认false
        changeYear:true,                //显示快速选择年份的下拉菜单，默认false
        // isRTL:true                      //是否由右向左绘制日历，默认false
        // autoSize:true                   //是否自动调整控件大小，输入框大小
        // showOn:'button',     //如何使日历显示出来，默认focus(input获得焦点),属性有button(点击按钮),both(都可以)
        // buttonText:'选择',                   //showOn设置为button时按钮上显示的文字
        // buttonImage:'image/pic.gif',         //showOn设置为button时按钮上显示的图片
        // buttonImageOnly:true,                //showOn设置为button时用图片代替按钮
        // showButtonPanel:true,                 //是否显示日历菜单按钮，默认false
        // closeText:'关闭',               //设置菜单中关闭按钮文本
        // currentText:'今日',             //设置菜单中获取今日日期按钮文本
        nextText:'下月',                //设置下一月的Alt文本
        prevText:'上月',                //设置上一月的Alt文本
        // navigationAsDateFormat:true,    //设置prev/next/current的文字可以是format日期格式
        yearSuffix:'年',                //附加在年份后面的文本
        showMonthAfterYear:true,         //设置是否让月份显示在年份之后
        //日期选择选项
        // minDate:-36500,                   //前面最多能选择之前100天内的日期
        maxDate:0,                       //后面最多能选择0天之后的日期(生日不会在未来)
        // defaultDate:'1995-09-25',       //预设默认选定日期，默认为今日
        yearRange:'1900:2020',            //设置年份下拉菜单区间,优先级比min和max低
        hideIfNoPrevNext:true,           //设置为true，如果上月和下月不存在则不显示按钮
        // gotoCurrent:true,                    //配合showButtonPanel使用，不常用
        //视觉选项
        // showAnimate:false,              //设置为false无效果，默认为fadeIn
        // duration:1000,                  //日期显示或消失的持续时间，默认300MS
        //事件选项
        // beforeShow:function () {
        //                                 //日历显示之前调用
        // },
        beforeShowDay:function (date) {
            if(date.getDay()==6 || date.getDay()==0){
                return [true,'holiday','周末'];
            }else{                      //显示日历中的每个日期时调用，date参数是一个Date类对象，该方法必须返回一个
                return [true,'','工作日'];
            }                            //数组来指定每个日期的信息：1.该日期是否可以被选择(true or false)2.该
        }                              //日期单元格使用的CSS类3.日期单元格上显示的字符串提示信息
        // onChangeMonthYear:function (year,month,inst) {
        //                     //日历显中显示的月份或者年份改变时调用,参数分别是改变后的年份，月份和DOMjQuery对象
        // },
        // onClose:function (dateText,inst) {
        //                                 //日历关闭调用,dateTest是选定日期的字符串,选择后也会激活
        // },
        // onSelect:function (dateText,inst) {
        //                                 //在选择日期时调用，dateTest是选定日期的字符串
        // }
    });


    //输入框提示信息
    // $('#reg input[title]').tooltip({
    //     // disabled:true                                   //禁用提示
    //     // content:'提示'                                  //设置提示文字
    //     // items:'input'                                   //过滤器，其他的不使用提示
    //     // tooltipClass:'className'                         //指定样式的Class名称
    //     // position:{
    //     //     my:'left top',                                  //提示框与输入框左下角的相对位置
    //     //     at:'right bottom'                               //以my为基准点设置
    //     // },
    //     // show:'drop',                                         //显示时的特效
    //     // hide:'drop'                                          //隐藏时的特效
    //     // track:true                                        //提示信息是否跟随鼠标
    //     // create:function (e,ui) {
    //     //                                             //工具提示被创建时调用,ui参数为空
    //     // },
    //     // open:function (e,ui) {
    //     //                                             //工具提示被显示时调用,ui参数为tooltip返回JQuery对象
    //     // },
    //     // close:function (e,ui) {
    //     //                                             //工具提示被创建时调用,ui参数为tooltip返回JQuery对象
    //     // }                                           //关闭后可以再次用tooltip('open)重新打开
    //     //其他方法与dialog()的一样
    // });

    //对话框
    $('#reg').dialog({
        title:'会员注册',
        buttons:{
            '注册':function () {
                $(this).submit();
            }
            // '取消':function () {
            //     $(this).dialog('close');
            // }
        },
        // show:false,                          //这两个可以设置字符串形式的特效
        // hide:false,
        autoOpen:false,                     //是否自动打开
        // draggable:false,                     //是否可以移动
        resizable:false,                     //是否可以调整大小
        modal:true,                          //对话框外是否可操作
        closeText:'关闭'                     //设置关闭按钮的title
        // position:'left top',                 //设置对话框坐标位置
        // width:350
        // height:600,
        // minWidth:200,
        // minHeight:300,
        // maxWidth:600,
        // maxHeight:700
        // focus:function (e,ui) {        //获得焦点时的事件
        //     alert('获得焦点');
        // },
        // create:function (e,ui) {       //创建时的事件，直接执行
        //     alert('创建成功');
        // },
        // open:function (e,ui) {        //打开时的事件，autoOpen:false时不会立即执行，必须要打开显示出来才会执行
        //     alert('打开成功');
        // },
        // close:function (e,ui) {        //当对话框关闭时执行
        //     alert('关闭成功');
        // },
        // beforeClose:function (e,ui) {
        //     alert('即将关闭');          //当对话框关闭时执行，如果返回false则不会关闭
        //     return false;
        // }
        // drag:function (e,ui) {
        //     alert('每次移动都执行');          //当对话框移动时执行，如果返回false则不会关闭
        //     return false;                   //ui有两个属性对象1.position(当前坐标，有两个子属性，top和left)
        // }                                    //2.offset(当前移动的坐标，有两个子属性，top和left)
        // dragStart:function (e,ui) {
        //     alert('每次移动都执行');          //当对话框移动时执行，如果返回false则不会关闭
        //                                         //ui有两个属性对象1.position(当前坐标，有两个子属性，top和left)
        // },                                       //2.offset(当前移动的坐标，有两个子属性，top和left)
        // dragStop:function (e,ui) {
        //     alert('每次移动都执行');          //当对话框移动时执行，如果返回false则不会关闭
        //     //ui有两个属性对象1.position(当前坐标，有两个子属性，top和left)
        // }
        // resize:function (e,ui) {
        //     alert('每次调整大小都执行');     //当调整对话框大小时执行，UI有四个属性，详情参考手册
        // },
        // resizeStart:function (e,ui) {
        //     alert('开始拖拉对话框执行');     //当调整对话框大小时执行，UI有四个属性，详情参考手册
        // },
        // resizeStop:function (e,ui) {
        //     alert('结束拖拉对话框执行');     //当调整对话框大小时执行，UI有四个属性，详情参考手册
        // }

    });

    //提问对话框
    $('#question').dialog({
        title:'问题发布',
        buttons:{
            '提问':function () {
                $(this).ajaxSubmit({
                    url:'add_content.php',
                    type:'POST',
                    data:{
                        username:$.cookie('username')
                    },
                    resetForm:true,             //提交成功后重置表单,不会清除表单默认值
                    beforeSubmit:function (formData,jqForm,options) {  //一般用于数据验证，通过返回true
                        $('#question').dialog('close');
                        $('#loading').dialog('open').text('正在提问...');//options.url的值就是设置的URL参数的值，jqForm得到整个表单的jQuery对象，formData可以得到表单数据
                    },
                    success:function (responseText,statusText) {
                        $('#loading').dialog('close');
                        if (responseText==='success'){
                            $('iframe').contents().find('body').html('');
                            $('#success').dialog('open').text('提问成功');
                            setTimeout(function () {
                                $('#success').dialog('close');
                                getContent();
                            },1000);
                        }else if(responseText==='null'){
                            $('#error').dialog('open').text('请至少输入标题');
                            setTimeout(function () {
                                $('#error').dialog('close');
                                $('#question').dialog('open');
                            },1000);
                        }else{
                            $('#error').dialog('open').text('系统错误');
                            setTimeout(function () {
                                $('#error').dialog('close');
                            },1000);
                        }
                    },
                    error:function (event,errorText,errorType) {
                        $('#loading').dialog('close');
                        $('#error').dialog('open').text('网络错误');
                        setTimeout(function () {
                            $('#error').dialog();
                        },1000);
                    }
                });
            }
        },
        autoOpen:false,                     //是否自动打开
        resizable:false,                     //是否可以调整大小
        modal:true,                          //对话框外是否可操作
        closeText:'关闭',                     //设置关闭按钮的title
        width:500,
        height:360
    });

    $('#reg_a').click(function () {
        $('#reg').dialog('open');                          //将创建好的对话框显示出来
        // $('#reg').dialog('close');                      //将显示出来的对话框隐藏
        // $('#reg').dialog('destroy');                    //将创建的对话框删除销毁
        // $('#reg').dialog('isOpen');                     //返回对话框的打开状态
        // $('#reg').dialog('widget');                     //获取整个对话框的jQuery对象，不是里面内容的对象
        // $('#reg').dialog('option','param');             //获取option属性的值
        // $('#reg').dialog('option','param','value');     //设置option属性的值
        // $('#reg').on('dialogclose',function () {
        //     alert('Close');                             //用on()方法绑定事件示例
        // })
    });

    //表单验证
    // $.validator.setDefaults({       //设置全局默认属性
    //     // debug:true
    // });
    $('#reg').validate({
        // debug:true,                     //调试模式打开，不会提交
        submitHandler:function (form) {
            $(form).ajaxSubmit({
                url:'add_user.php',
                type:'POST',
                // target:'#box',              //服务器返回的内容放在#box里
                // dateType:null,
                // clearForm:true,             //提交成功后是否清空表单
                resetForm:true,             //提交成功后重置表单,不会清除表单默认值
                // data:{                      //增加额外的数据提交
                //     name:'value'
                // },
                beforeSubmit:function (formData,jqForm,options) {  //一般用于数据验证，通过返回true
                    $('#reg').dialog('close');
                    $('#loading').dialog('open').text('正在注册...');//options.url的值就是设置的URL参数的值，jqForm得到整个表单的jQuery对象，formData可以得到表单数据
                    $.cookie('username',$('#username').val(),{expires:7});
                },
                success:function (responseText,statusText) {
                    $('#loading').dialog('close');
                    if (responseText=='success'){
                        $('#success').dialog('open').text('注册成功');
                        setTimeout(function () {
                            $('#success').dialog('close');
                            $('#reg input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                            if ($.cookie('username')){
                                $('#member').text($.cookie('username'));
                                $('#member,#login_out').show();
                                $('#reg_a,#login_in').hide();
                            }else{
                                $('#member,#login_out').hide();
                                $('#reg_a,#login_in').show();
                            }
                        },1000);
                    }else {
                        $('#error').dialog('open').text('系统错误');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                            $.removeCookie('username');
                        },1000);
                    }
                },
                error:function (xhr,errorText,errorInfo) {
                    $('#loading').dialog('close');
                    $('#error').dialog('open').text('网络错误');
                    setTimeout(function () {
                        $('#error').dialog('close');
                        $('#reg input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                        $.removeCookie('username');
                    },1000);
                }
            });     //验证成功后执行，并且阻止了默认提交，通常用于Ajax提交
        },
        // ignore:'#password',             //忽略验证某个

        // groups:{
        //     error:'username password repassword email birthday' //群组错误提示
        // },

        // focusInvalid:false,                                         //显示群组的错误提示
        // errorPlacement:function (error,element) {
        //     $.each(error,function (index,value) {
        //         $('.error').html($('.error').html()+$(value).html());
        //     });
        // },
        // groups:{                                            //群组错误提示，分开
        //     error_username:'username',
        //     error_password:'password',
        //     error_repassword:'repassword',
        //     error_email:'email',
        //     error_birthday:'birthday'
        // },
        errorPlacement:function (error,element) {           //将群组的错误指定存放位置
            error.appendTo('.regError');
        },
        // errorClass:'errorClass',            //设置错误提示的class 名
        errorElement:'li',                      //设置错误提示的标签名
        // success:'success',                  //设置成功后加载的class
        // success:function (label) {
        //     $('.star').addClass('success'); //设置成功后执行的事件
        // },
        highlight:function (element,errorClass) {
            $(element).css('border','1px solid #ff9900');   //为有错误的元素设置样式
            $(element).removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号

        },
        unhighlight : function (element, errorClass) {
            $(element).css('border', '1px solid #ccc'); //为成功的元素取消样式
            if(element.name!=='birthday'){
                $(element).addClass('success').parent().find('span').html('&nbsp;'); //为成功的加上勾,去掉*号
            }
        },
        rules:{
            username:{
                required:true,      //是否必填字段
                // minlength:5      //最小位数
                // maxlength:10     //最大位数
                rangelength:[5,15],   //位数区间
                // min:5            //输入值最小为5
                // max:10           //输入值最大为10
                // range:[5,10]     //输入值区间
                // email:true       //电子邮件格式
                // url:true         //网址格式，必须有http://
                // date:true        //必须日期格式且日期有效
                // dateISO:true     //日期格式正确即可
                // number:true      //必须数字
                // digits:true      //必须正整数
                // creditcard:true  //信用卡号格式
                //equalTo:"#field"  //输入值必须和#field 相同
                remote:{
                    url:'check_user.php',
                    type:'POST'
                }//使用ajax 方法调用check.php 验证输入值
            },
            password:{
                required:true,
                rangelength:[6,20]
            },
            repassword:{
                required:true,
                equalTo:'#password',
                rangelength:[6,15]
            },
            email:{
                required:true,
                email:true
            },
            birthday:{
                date:true
            }
        },
        messages:{
            username:{
                required:'用户名不得为空',
                rangelength:$.validator.format('用户名长度在{0}-{1}之间'),
                remote:'用户名被占用'
            },
            password:{
                required:'密码不得为空',
                rangelength:$.validator.format('密码长度在{0}-{1}之间')
            },
            repassword:{
                required:'两次输入的密码不一致',
                equalTo:'两次输入的密码不一致',
                rangelength:'两次输入的密码不一致'
            },
            email:{
                required:'邮箱不得为空',
                email:'邮箱格式不正确'
            },
            birthday:{
                date:'日期不合法'
            }
        }

    });
    // $('username').rules('add',{                              //单独添加验证规则
    //     required:true,      //是否必填字段
    //     rangelength:[5,15]   //位数区间
    //     messages:{
    //         required:'提示',
    //         rangelength:'提示'
    //     }
    // });
    // $('username').rules('remove','required rangelength');    //移除规则，第二个参数可以不写

    // $('postCode').rules('add',{
    //     required:true,      //是否必填字段
    //     postCode:true,
    //     messages:{
    //         required:'必填'
    //     }
    // });                                                            //自定义验证规则
    // $.validator.addMethod('postCode',function (value,element) {
    //     var par=/^[0-9]{6}$/;
    //     return this.optional(element) || (par.test(value));
    // },'请输入正确的邮编');

    //Ajax提交插件
    // $('#reg').ajaxForm(function () {
    //     alert('提交成功');              //会直接实现ajax提交，自动阻止默认行为，提交的默认页面是action的值
    // });
    // $('#reg').submit(function () {
    //     alert('11');
    //     $(this).ajaxSubmit({
    //         url:'../add_user.php',
    //         type:post,
    //         // target:'#box',              //服务器返回的内容放在#box里
    //         // dateType:null,
    //         clearForm:true,             //提交成功后是否清空表单
    //         // resetForm:true,             //提交成功后重置表单,不会清除表单默认值
    //         // data:{                      //增加额外的数据提交
    //         //     name:'value'
    //         // },
    //         // beforeSubmit:function (formData,jqForm,options) {  //一般用于数据验证，通过返回true
    //         //     //options.url的值就是设置的URL参数的值，jqForm得到整个表单的jQuery对象，formData可以得到表单数据
    //         // },
    //         success:function (responseText,statusText) {
    //
    //         },
    //         error:function (event,errorText,errorType) {
    //
    //         }
    //     });
    //     // return false;               //手动阻止自动提交
    // });
    // $('#reg').formSerialize()       //表单序列化
    // $('#reg').fieldSerialize()      //序列化某一字段
    // $('#reg').fieldValue()          //获取某一字段的值
    // $('#reg').resetForm()           //重置表单
    // $('#reg').clearFields()         //清空某个字段

    //cookie插件
    // $.cookie('user','admin',{
    //     expires:7,              //过期时间
    //     path:'/jQuery',         //设置路径
    //     domain:'127.0.0.1',     //设置域名
    //     secure:true             //是否安全连接
    // });
    // alert($.cookie('user'));        //读取cookie
    // $.removeCookie('user');         //删除COOKIE，默认当前目录下
    // $.removeCookie('user',{
    //     path:'/'                    //删除COOKIE，默认当前目录下
    // });

    //登录对话框
    $('#login').dialog({
        title:'会员登录',
        buttons:{
            '登录':function () {
                $(this).submit();
            }
        },
        autoOpen:false,                     //是否自动打开
        resizable:false,                     //是否可以调整大小
        modal:true,                          //对话框外是否可操作
        closeText:'关闭'                     //设置关闭按钮的title
    });
    $('#login_in').click(function () {
        $('#login').dialog('open');                          //将创建好的对话框显示出来
    });
    $('#login_out').click(function () {
        $.removeCookie('username');
        $('#member,#login_out').hide();
        $('#reg_a,#login_in').show();
    });

    //用户等待加载对话框
    $('#loading').dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        draggable:false,
        resizable:false,
        width:180,
        height:50
    }).prev('.ui-widget-header').hide();
    $('#success').dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        draggable:false,
        resizable:false,
        width:180,
        height:50
    }).prev('.ui-widget-header').hide();
    $('#error').dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        draggable:false,
        resizable:false,
        width:180,
        height:50
    }).prev('.ui-widget-header').hide();
    //表单验证
    $('#login').validate({
        submitHandler:function (form) {
            $(form).ajaxSubmit({
                url:'check_user.php',
                type:'POST',
                resetForm:true,             //提交成功后重置表单,不会清除表单默认值
                beforeSubmit:function (formData,jqForm,options) {  //一般用于数据验证，通过返回true
                    $('#login').dialog('close');
                    $('#loading').dialog('open').text('正在登录...');//options.url的值就是设置的URL参数的值，jqForm得到整个表单的jQuery对象，formData可以得到表单数据
                    if ($('#expires').is(':checked')){
                        $.cookie('username',$('#login_username').val(),{expires:7});
                    }else{
                        $.cookie('username',$('#login_username').val());
                    }
                },
                success:function (responseText,statusText) {
                    $('#loading').dialog('close');
                    if (responseText=='success'){
                        $('#success').dialog('open').text('登录成功');
                        setTimeout(function () {
                            $('#success').dialog('close');
                            $('#login input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                            if ($.cookie('username')){
                                $('#member').text($.cookie('username'));
                                $('#member,#login_out').show();
                                $('#reg_a,#login_in').hide();
                            }else{
                                $('#member,#login_out').hide();
                                $('#reg_a,#login_in').show();
                            }
                        },1000);
                    }else if(responseText=='null') {
                        $('#error').dialog('open').text('账号或密码错误');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                            $.removeCookie('username');
                        },1000);
                    }else{
                        $('#error').dialog('open').text('系统错误');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                            $.removeCookie('username');
                        },1000);
                    }
                },
                error:function (xhr,errorText,errorInfo) {
                    $('#loading').dialog('close');
                    $('#error').dialog('open').text('网络错误,请重试');
                    setTimeout(function () {
                        $('#error').dialog('close');
                        $('#login input').removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号
                        $.removeCookie('username');
                    },1000);
                }
            });     //验证成功后执行，并且阻止了默认提交，通常用于Ajax提交
        },
        errorPlacement:function (error,element) {           //将群组的错误指定存放位置
            error.appendTo('.loginError');
        },
        errorElement:'li',                      //设置错误提示的标签名
        highlight:function (element,errorClass) {
            $(element).css('border','1px solid #ff9900');   //为有错误的元素设置样式
            $(element).removeClass('success').parent().find('span').html('*');//为有错误的去掉勾,加上*号

        },
        unhighlight : function (element, errorClass) {
            $(element).css('border', '1px solid #ccc'); //为成功的元素取消样式
            if(element.name!=='birthday'){
                $(element).addClass('success').parent().find('span').html('&nbsp;'); //为成功的加上勾,去掉*号
            }
        },
        rules:{
            username:{
                required:true,      //是否必填字段
                rangelength:[5,20]
            },
            password:{
                required:true,
                rangelength:[6,20]
            }
        },
        messages:{
            username:{
                required:'用户名不得为空',
                rangelength:$.validator.format('用户名长度在{0}-{1}之间')
            },
            password:{
                required:'密码不得为空',
                rangelength:$.validator.format('密码长度在{0}-{1}之间')
            }
        }

    });

    //选项卡UI
    //选项卡内容添加函数
    function tabs(url) {
        var html='';
        var question_id=0;
        $.ajax({
            async:false,        //ajax是异步执行，不会等ajax执行完才执行ajax后面的代码，这样导致html还没有重新赋值，所以要取消异步！！！
            url:url,
            type:'POST',
            success:function (response,status,xhr) {
                var json = $.parseJSON(response);
                var content = [];
                var show_content = [];
                var down = '';
                var up = '';
                $.each(json, function (index, value) {
                    question_id=value.id;
                    if (value.error) {
                        $('#error').dialog('open').text(value.error);
                        setTimeout(function () {
                            $('#error').dialog('close');
                        }, 1000);
                        return false;
                    }
                    index = 0;
                    content[index] = value.content;
                    show_content[index] = value.content.replace(/<[^>]+>/g, "");
                    if (show_content[index].length > 200) {
                        down = '<span class="down" index="' + index + '">...显示全部</span>';
                        up = '<span class="up" index="' + index + '">收起</span>';
                        show_content[index] = show_content[index].substr(0, 200) + down;
                    } else {
                        down = '';
                        up = '';
                    }
                    comment_list = '<div class="comment_list"  index="' + index + '"><div class="comment_line"></div><div class="load_more" index="' + index + '">加载更多</div><div class="loading_comment" index="' + index + '">正在加载评论...</div><form><textarea  name="comment" placeholder="写下你的评论..."></textarea><input type="button" value="评论"></form></div> ';
                    html += '<h4>' + value.username + ' 发表于 ' + value.date + '</h4><h3>' + value.title + '</h3><div class="editor" index="' + index + '">' + show_content[index] + '</div><div class="bottom"><span class="comment_count" index="' + index + '">' + value.count + '条评论</span><span class="comment_up" index="' + index + '">收起评论</span>' + up + '</div><hr noshade="noshade" size="1">' + comment_list;
                    $('.up').hide();
                });
                //单独给tab里面的元素绑定事件
                $('#tabs').on('click','.down[index]',function () {
                    allContent=content[$(this).attr('index')];
                    $('.editor[index=0]').html(allContent);
                    $(this).hide();
                    $('.up[index=0]').show();
                }).on('click','.up[index]',function () {
                    $('.editor[index=0]').html(show_content[$(this).attr('index')]);
                    $(this).hide();
                    $('.down[index=0]').show();
                }).on('click','.comment_count[index=0]',function () {                                   //评论界面显示
                    if ($.cookie('username')){
                        $(this).hide();
                        $('.comment_up[index=0]').show();
                        $('.comment_list[index] input[type=button]').button();
                        $('.comment_list[index=0]').show();
                        getComment_tab(question_id,true);
                    }else {
                        $('#error').dialog('open').text('请先登录...');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login').dialog('open');
                        },1000);
                    }
                }).on('click','.comment_up[index]',function () {                                   //评论界面显示
                    $(this).hide();
                    $('.comment_count[index=0]').show();
                    $('.comment_list[index] input[type=button]').button();
                    $('.comment_list[index=0]').hide();
                }).on('click','.comment_list[index=0] input[type=button]',function () {               //提交评论
                                                                                                      //小心这个地方的变量覆盖上面的！！！
                    text_content=$(this).parent().find('textarea').val();
                    if(text_content){
                        $('#loading').dialog('open').text('发表中...');
                        $.ajax({
                            url:'add_comment.php',
                            type:'POST',
                            data:{
                                question_id:question_id,
                                username:$.cookie('username'),
                                content:text_content
                            },
                            success:function (responseText,status,xhr) {
                                $('#loading').dialog('close');
                                if (responseText=='success'){
                                    $('#success').dialog('open').text('发表成功');
                                    str=$('.comment_count[index=0]').text();
                                    num=parseInt(str.substr(0,str.length-3))+1;
                                    $('.comment_count[index=0]').text(num+'条评论');
                                    getComment_tab(question_id,false);
                                    setTimeout(function () {
                                        $('#success').dialog('close');
                                        $('.comment_list[index=0]').find('textarea').val('');
                                    },1000);
                                }else {
                                    $('#error').dialog('open').text('系统错误');
                                    setTimeout(function () {
                                        $('#error').dialog('close');
                                    },1000);
                                }
                            },
                            error:function (event,errorText,errorType) {
                                $('$loading').dialog('close');
                                $('#error').dialog('open').text('网络错误');
                                setTimeout(function () {
                                    $('#error').dialog('close');
                                },1000);
                            }
                        });
                    }
                });
            }
        });
        return html;
    }
    $('#tabs').tabs({
        //外观选项
        // collapsible:true        //允许选项卡折叠内容
        // disabled:[0]            //使用数组指定禁用某些选项卡
        // event:'mouseover'       //触发选项卡的事件，默认click
        // active:1                //如果设置值为数值，则是初始化要显示的tab,如果是布尔则是初始化时是否折叠，前提是collapsible：true
        // heightstyle:'content'   //默认content，根据内容调整高度；Auto则根据最高的为基准；fill填充一定的高度
        // show:true               //切换选项卡时是否采用淡入效果
        // hide:true               //切换选项卡时是否采用淡出效果
        //选项卡事件
        create:function (event,ui) {
            ui.panel.html(decodeURI(tabs('show_new.php')));
            //创建tab时激活事件，UI参数有两个子属性tab和panel,分别是活动选项卡的对象和内容
        },
        activate:function (event,ui) {
            //每次切换都要把之前绑定的事件"全部"取消掉！！！
            $('#tabs').off('click','.down[index]').off('click','.up[index]').off('click','.comment_count[index=0]').off('click','.comment_up[index]').off('click','.comment_list[index=0] input[type=button]');
            ui.oldPanel.html('');
            if (ui.newPanel.attr('index')=='hot'){
                ui.newPanel.html(decodeURI(tabs('show_hot.php')));
            }else if(ui.newPanel.attr('index')=='distill'){
                ui.newPanel.html(decodeURI(tabs('show_distill.php')));
            }else if(ui.newPanel.attr('index')=='new'){
                ui.newPanel.html(decodeURI(tabs('show_new.php')));
            }
            //当切换一个选项卡时激活UI有四个属性，newTab,newPanel,oldTab,oldPanel
        }
        // beforeActive:function (event,ui) {
        //     //当切换一个选项卡之前激活UI有四个属性，newTab,newPanel,oldTab,oldPanel
        // }
        // load:function (event,ui) {
        //     //当ajax加载一个文档时激活事件UI有四个属性，newTab,newPanel,oldTab,oldPanel
        // }
        // beforeload:function (event,ui) {
        //     //当ajax加载一个文档前激活事件UI有四个属性，newTab,newPanel,jqXHR,ajaxSettings
        // }
    });

    //选项卡UI方法
    // $('#tabs').tabs('disable',0);       //禁用选项卡
    // $('#tabs').tabs('enable',0);
    // $('#button').click(function () {
    //     alert('2');
    //     $('#tabs').tabs('load',0);
    // });

    //折叠菜单UI
    $('#accordion').accordion({
        //外观选项
        collapsible:true        //允许折叠菜单折叠内容
        // disabled:true            //使用数组指定禁用所有菜单
        // event:'mouseover'       //触发折叠菜单的事件，默认click
        // active:1                //如果设置值为数值，则是初始化要显示的tab,如果是布尔则是初始化时是否折叠，前提是collapsible：true
        // heightstyle:'content'   //默认content，根据内容调整高度；Auto则根据最高的为基准；fill填充一定的高度
        // show:true               //切换选项卡时是否采用淡入效果
        // hide:true               //切换选项卡时是否采用淡出效果
        // header:'h1'              //设置折叠菜单的标题标签，默认h1
        // icons:{
        //     header:'',              //标题图标
        //     activeHeader:''         //展开后的标题图标
        // }

        //方法跟选项卡一样
    });

    //获取数据
    getContent();
    function getContent() {
        $.ajax({
            url:'show_content.php',
            type:'POST',
            success:function (response,status,xhr) {
                var json=$.parseJSON(response);
                var html='';
                var content=[];
                var show_content=[];
                var down='';
                var up='';
                var count=[];
                var question_page=2;
                var total_question_count=0;
                $.each(json,function (index,value) {
                    if(value.error){
                        $('#error').dialog('open').text(value.error);
                        setTimeout(function () {
                            $('#error').dialog('close');
                        },1000);
                        return false;
                    }
                    index=value.id;
                    total_question_count=value.total_question_count;
                    count[index]=value.count;
                    content[index]=value.content;
                    show_content[index]=value.content.replace(/<[^>]+>/g,"");
                    if (show_content[index].length>200){
                        down='<span class="down" index="'+index+'">...显示全部</span>';
                        up='<span class="up" index="'+index+'">收起</span>';
                        show_content[index]=show_content[index].substr(0,200)+down;
                    }else{
                        down='';
                        up='';
                    }
                    comment_list='<div class="comment_list"  index="'+index+'"><div class="comment_line"></div><div class="load_more" index="'+index+'">加载更多</div><div class="loading_comment" index="'+index+'">正在加载评论...</div><form><textarea  name="comment" placeholder="写下你的评论..."></textarea><input type="button" value="评论"></form></div> ';
                    html +='<h4>'+value.username+' 发表于 '+value.date+'</h4><h3>'+value.title+'</h3><div class="editor" index="'+index+'">'+show_content[index]+'</div><div class="bottom"><span class="comment_count" index="'+index+'">'+value.count+'条评论</span><span class="comment_up" index="'+index+'">收起评论</span>'+up+'</div><hr noshade="noshade" size="1">'+comment_list;
                    $('.up').hide();
                });
                $('.content').html(decodeURI(html));
                if (question_page<=total_question_count){
                    $('.main_left').append('<div id="load_more_question">加载更多</div>');
                    $('#load_more_question').button().show();
                }
                $(document).on('click','#load_more_question',function () {
                    $(this).button('disable').html('<img src="img/more_load.gif"/>');
                    $.ajax({
                        url: 'show_content.php',
                        type: 'POST',
                        data: {
                            page:question_page
                        },
                        success: function (response, status, xhr) {
                            //不能用this代替！！！
                            $('#load_more_question').button('enable').html('加载更多');
                            var json=$.parseJSON(response);
                            var comment_line='';
                            $.each(json,function (index,value) {
                                index=value.id;
                                content[index]=value.content;
                                show_content[index]=value.content.replace(/<[^>]+>/g,"");
                                if (show_content[index].length>200){
                                    down='<span class="down" index="'+index+'">...显示全部</span>';
                                    up='<span class="up" index="'+index+'">收起</span>';
                                    show_content[index]=show_content[index].substr(0,200)+down;
                                }else{
                                    down='';
                                    up='';
                                }
                                comment_list='<div class="comment_list"  index="'+index+'"><div class="comment_line"></div><div class="load_more" index="'+index+'">加载更多</div><div class="loading_comment" index="'+index+'">正在加载评论...</div><form><textarea  name="comment" placeholder="写下你的评论..."></textarea><input type="button" value="评论"></form></div> ';
                                comment_line+='<h4>'+value.username+' 发表于 '+value.date+'</h4><h3>'+value.title+'</h3><div class="editor" index="'+index+'">'+show_content[index]+'</div><div class="bottom"><span class="comment_count" index="'+index+'">'+value.count+'条评论</span><span class="comment_up" index="'+index+'">收起评论</span>'+up+'</div><hr noshade="noshade" size="1">'+comment_list;
                            });
                            $('.content').append(decodeURI(comment_line));
                            question_page++;
                            if (question_page>total_question_count){
                                $('#load_more_question').hide();
                            }
                        },
                        error: function () {
                            $('#load_more_question').button('enable').html('加载更多');
                            $('#error').dialog('open').text('网络错误');
                            setTimeout(function () {
                                $('#error').dialog('close');
                            },1000);
                        }
                    });
                });

                //因为收上去过后的‘显示全部’是新加上去的，所以无法触发事件，这个时候就要用到事件委托！！！
                // 绑定在.editor上面时新加载的问题还是会无效，所以直接绑定在document
                $('.content').on('click','.down[index]',function () {
                    allContent=content[$(this).attr('index')];
                    $('.editor[index='+$(this).attr('index')+']').html(allContent);
                    $(this).hide();
                    $('.up[index='+$(this).attr('index')+']').show();
                });
                //因为.up没有在.editor里面，所以绑定会无效！！！
                // $('.up[index]').on('click',function () {
                //     $('.editor[index='+$(this).attr('index')+']').html(show_content[$(this).attr('index')]);
                //     $(this).hide();
                //     $('.down[index='+$(this).attr('index')+']').show();
                // });
                //可以绑定在document！！！
                //但是为了使tab里面的元素无效，只有绑定在.content上
                $('.content').on('click','.up[index]',function () {
                    $('.editor[index='+$(this).attr('index')+']').html(show_content[$(this).attr('index')]);
                    $(this).hide();
                    $('.down[index='+$(this).attr('index')+']').show();
                }).on('click','.comment_count[index]',function () {                                   //评论界面显示
                    if ($.cookie('username')){
                        $(this).hide();
                        $('.comment_up[index='+$(this).attr('index')+']').show();
                        $('.comment_list[index] input[type=button]').button();
                        $('.comment_list[index='+$(this).attr('index')+']').show();
                        getComment($(this).attr('index'),true);
                    }else {
                        $('#error').dialog('open').text('请先登录...');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login').dialog('open');
                        },1000);
                    }
                }).on('click','.comment_up[index]',function () {                                   //评论界面显示
                        $(this).hide();
                        $('.comment_count[index='+$(this).attr('index')+']').show();
                        $('.comment_list[index] input[type=button]').button();
                        $('.comment_list[index='+$(this).attr('index')+']').hide();
                }).on('click','.comment_list[index] input[type=button]',function () {               //提交评论
                    //小心这个地方的变量覆盖上面的！！！
                    text_content=$(this).parent().find('textarea').val();
                    question_id= $(this).parent().parent().attr('index');
                    if(text_content){
                        $('#loading').dialog('open').text('发表中...');
                        $.ajax({
                            url:'add_comment.php',
                            type:'POST',
                            data:{
                                question_id:question_id,
                                username:$.cookie('username'),
                                content:text_content
                            },
                            success:function (responseText,status,xhr) {
                                $('#loading').dialog('close');
                                if (responseText=='success'){
                                    $('#success').dialog('open').text('发表成功');
                                    str=$('.comment_count[index='+question_id+']').text();
                                    num=parseInt(str.substr(0,str.length-3))+1;
                                    $('.comment_count[index='+question_id+']').text(num+'条评论');
                                    getComment(question_id,false);
                                    //绑定的事件一定要销毁，不然只要页面没刷新就会一直存在下去！！！
                                    $('.comment_list').off('click','.load_more[index='+question_id+']');
                                    setTimeout(function () {
                                        $('#success').dialog('close');
                                        $('.comment_list[index='+question_id+']').find('textarea').val('');
                                    },1000);
                                }else {
                                    $('#error').dialog('open').text('系统错误');
                                    setTimeout(function () {
                                        $('#error').dialog('close');
                                    },1000);
                                }
                            },
                            error:function (event,errorText,errorType) {
                                $('$loading').dialog('close');
                                $('#error').dialog('open').text('网络错误');
                                setTimeout(function () {
                                    $('#error').dialog('close');
                                },1000);
                            }
                        });
                    }
                });
            }
        });
    }
    function getComment(question_id,isIf) {
        if (isIf==false){
            fuck=0;
        }else{
            fuck=$('.comment_list[index='+question_id+']').find('dl').length;
        }
        if (fuck==0){
            $.ajax({
                url:'show_comment.php',
                type:'POST',
                data:{
                    id:question_id
                },
                beforeSend:function () {
                    $('comment_list[index='+question_id+']').show();
                    $('.loading_comment[index='+question_id+']').button();
                },
                success:function (response,status,xhr) {
                    $('.loading_comment[index='+question_id+']').hide();
                    var json=$.parseJSON(response);
                    var comment_line='';
                    var page=2;
                    var count=0;
                    $.each(json,function (index,value) {
                        count=value.count;
                        comment_line+='<dl><dt>'+value.username+'</dt><dd>'+value.content+'</dd><dd class="date">'+value.date+'</dd></dl> ';
                    });
                    $('.comment_list[index='+question_id+'] .comment_line').html(decodeURI(comment_line));
                    if (page<=count){
                        $('.load_more[index='+question_id+']').button().show();
                    }
                    $('.comment_list').on('click','.load_more[index='+question_id+']',function () {
                        $(this).button('disable').html('<img src="img/more_load.gif"/>');
                        $.ajax({
                            url: 'show_comment.php',
                            type: 'POST',
                            data: {
                                id: question_id,
                                page:page
                            },
                            success: function (response, status, xhr) {
                                $('.load_more[index='+question_id+']').button('enable').html('加载更多');
                                var json=$.parseJSON(response);
                                var comment_line='';
                                $.each(json,function (index,value) {
                                    comment_line+='<dl><dt>'+value.username+'</dt><dd>'+value.content+'</dd><dd class="date">'+value.date+'</dd></dl> ';
                                });
                                $('.comment_list[index='+question_id+'] .comment_line').append(decodeURI(comment_line));
                                page++;
                                if (page>count){
                                    $('.load_more[index='+question_id+']').hide();
                                }
                            },
                            error: function () {
                                $('.load_more[index='+question_id+']').button('enable').html('加载更多');
                                $('#error').dialog('open').text('网络错误');
                                setTimeout(function () {
                                    $('#error').dialog('close');
                                },1000);
                            }
                        });
                    });


                },
                error:function (event,errorText,errorType) {
                    $('#loading').dialog('close');
                    $('#error').dialog('open').text('网络错误');
                    setTimeout(function () {
                        $('#error').dialog('close');
                    },1000);
                }
            });
        }

    }
    function getComment_tab(question_id,isIf) {
        if (isIf==false){
            fuck=0;
        }else{
            fuck=$('#tabs .comment_list[index=0]').find('dl').length;
        }
        if (fuck==0){
            $.ajax({
                url:'show_comment.php',
                type:'POST',
                data:{
                    id:question_id
                },
                beforeSend:function () {
                    $('#tabs comment_list[index=0]').show();
                    $('#tabs .loading_comment[index=0]').button();
                },
                success:function (response,status,xhr) {
                    $('#tabs .loading_comment[index=0]').hide();
                    var json=$.parseJSON(response);
                    var comment_line='';
                    var page=2;
                    var count=0;
                    $.each(json,function (index,value) {
                        count=value.count;
                        comment_line+='<dl><dt>'+value.username+'</dt><dd>'+value.content+'</dd><dd class="date">'+value.date+'</dd></dl> ';
                    });
                    $('#tabs .comment_list[index=0] .comment_line').html(decodeURI(comment_line));
                    if (page<=count){
                        $('#tabs .load_more[index=0]').button().show();
                    }
                    $('#tabs .comment_list').on('click','.load_more[index=0]',function () {
                        $(this).button('disable').html('<img src="img/more_load.gif"/>');
                        $.ajax({
                            url: 'show_comment.php',
                            type: 'POST',
                            data: {
                                id: question_id,
                                page:page
                            },
                            success: function (response, status, xhr) {
                                $('#tabs .load_more[index=0]').button('enable').html('加载更多');
                                var json=$.parseJSON(response);
                                var comment_line='';
                                $.each(json,function (index,value) {
                                    comment_line+='<dl><dt>'+value.username+'</dt><dd>'+value.content+'</dd><dd class="date">'+value.date+'</dd></dl> ';
                                });
                                $('#tabs .comment_list[index=0] .comment_line').append(decodeURI(comment_line));
                                page++;
                                if (page>count){
                                    $('#tabs .load_more[index=0]').hide();
                                }
                            },
                            error: function () {
                                $('#tabs .load_more[index=0]').button('enable').html('加载更多');
                                $('#error').dialog('open').text('网络错误');
                                setTimeout(function () {
                                    $('#error').dialog('close');
                                },1000);
                            }
                        });
                    });


                },
                error:function (event,errorText,errorType) {
                    $('#loading').dialog('close');
                    $('#error').dialog('open').text('网络错误');
                    setTimeout(function () {
                        $('#error').dialog('close');
                    },1000);
                }
            });
        }
    }

});