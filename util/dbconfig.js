const mysql = require('mysql');
module.exports = {
    // 数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'virtual'
    },

    // 连接池：mysql
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config);

        pool.getConnection((err,conn)=>{
            if(err){
                console.log('连接失败',err);
                return;
            }
            // 事件驱动回调
            conn.query(sql,sqlArr,callBack);
            // 释放链接
            conn.release();
        })
    }
}