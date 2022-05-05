
const req = require('express/lib/request');
const res = require('express/lib/response');
const bcrypt = require('bcrypt')
const dbConfig = require('../util/dbconfig');
const { hash } = require('bcrypt');


// 生成随机数
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 电话号码校验，邮箱校验
function checkoutPhone(phone) {
    return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))
}

function checkoutEmail(email) {
    return (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))
}

// 获取用户表单数据
getUser = (req, res) => {
    var sql = "select * from user";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');

        } else {
            res.send({
                'list': data
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 通过 cate_id =？ 查询Post表单数据
getPostUser = (req, res) => {
    let { id } = req.query;
    var sql = "select * from post where cate_id=?";
    var sqlArr = [id];
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');

        } else {
            res.send({
                'list': data
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


// 模拟发送验证码
sendCode = (req, res) => {
    // let phone = req.body.user_phone;
    let { phone } = req.query;
    if (phone !== null) {
        let code = rand(1000, 9999);
        res.send({
            'code': 200,
            'phone': phone,
            'msg': '发送成功',
            'list': code,
        })
    } else {
        res.send({
            'msg': "phone为空"
        })
    }
}

// 改
updatePost = (req, res) => {
    let { id, name } = req.query;
    let sql = "update post set name=? where cate_id=?";
    var sqlArr = [name, id];
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');

        } else {
            res.send({
                'code': 200,
                'msg': 'success',
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 增 insert into post (id,name,pic,desc,cate_id,create_time) values();
addPost = (req, res) => {
    let { id, name, pic, desc, cate_id } = req.query;
    let sql = "insert into post(id,name,pic,post_describe,cate_id,create_time) values(?,?,?,?,?,?)";
    let create_time = new Date();
    var sqlArr = [id, name, pic, desc, cate_id, create_time];
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');

        } else {
            res.send({
                'code': 200,
                'msg': 'success',
                'data': data
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}


// 删 delete from person where id = 1;
deletePost = (req, res) => {
    let { id } = req.query;
    let sql = "delete from post where id = ?;";
    var sqlArr = [id];
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');

        } else {
            res.send({
                'code': 200,
                'msg': 'success',
                'data': data
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

registerUser = (req, res) => {
    try {
        let { name, password, phone, email } = req.query;
        // 密码加密存储 const isPasswordValid = bcrypt.compareSync(password, user.password);
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        // 电话号码校验
        if (!checkoutPhone(phone)) {
            throw "电话号码不合法"
        }

        // 邮箱校验
        if (!checkoutEmail(email)) {
            throw "邮箱不合法"
        }
        // 生成随机id
        let id = Math.random().toString(36).slice(-6);
        // 生成创建时间
        let create_time = new Date();
        // 默认权限普通用户 updated_time：B
        const access_level = "B";


        // 插入数据库：
        let sql = "insert into virtual_users(id,name,password,access_level,phone,email,created_time) values(?,?,?,?,?,?,?)";
        var sqlArr = [id, name, hash,access_level,phone,email,create_time];
        var callBack = (err, data) => {
            if (err) {
                console.log('链接失败', err);

            } else {
                res.send({
                    'code': 200,
                    'msg': 'success',
                    'data': data
                })
            }
        }

        dbConfig.sqlConnect(sql, sqlArr, callBack)

    } catch (error) {
        res.send({
            'code': 200,
            'msg': 'error:'+error
        })
    }
}


module.exports = {
    getUser,
    getPostUser,
    sendCode,
    updatePost,
    addPost,
    deletePost,

    // official 
    // 注册用户接口 register
    registerUser
}