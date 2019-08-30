const sql = require('../utils/sql');
const router = require('koa-router')();


router.prefix('/users');

/**
 *  用户注册
 *  @param username 用户名
 *  @param password 密码
 *  <p>
 *      1. 传入参数不能为空
 *      2. 根据username判断存不存在
 *  </p>
 */
router.post('/register', async (ctx, next) => {
    let username = ctx.request.body.username || "";
    let password = ctx.request.body.password || "";

    if (username && password) {
        await ctx.dbExe(sql.queryUserByUserName(username))
            .then(
                async filed => {
                    // 判断是否存在用户名
                    if (filed[0]['sl'] === 0) {
                        // 创建新用户
                        await ctx.dbExe(sql.insertUser(username, password)).then(filed => {
                            if (filed.affectedRows !== 0) {
                                ctx.body = {
                                    success: true,
                                    msg: '注册成功！'
                                }
                            } else {
                                ctx.body = {
                                    success: true,
                                    msg: '注册失败！'
                                }
                            }
                        }).catch(err => {
                            console.log(err);
                            ctx.body = {
                                success: false,
                                msg: '服务器异常！'
                            }
                        });
                    } else {
                        ctx.body = {
                            success: false,
                            msg: '用户名已经存在！'
                        }
                    }
                }
            ).catch(err => {
                console.log(err);
                ctx.body = {
                    success: false,
                    msg: '服务器异常！'
                }
            });
    } else {
        ctx.body = {
            success: false,
            msg: '用户名或者密码不能为空！'
        }
    }
});

/**
 * 登录
 * 根据username、password查询
 */
router.post('/login', async (ctx, netx) => {

    let username = ctx.request.body.username || "";
    let password = ctx.request.body.password || "";

    await ctx.dbExe(sql.queryUserByUserNameAndPassword(username, password))
        .then(filed => {
            if (!(filed[0]['sl'] === 0)) {
                ctx.body = {
                    success: true,
                    msg: '登录成功！',
                    data: {
                        username: filed[0]['USERNAME']
                    }
                }
            } else {
                ctx.body = {
                    success: false,
                    msg: '用户不存在，请先注册！'
                }
            }
        }).catch(err => {
            console.log(err);
            ctx.body = {
                success: false,
                msg: '服务器失败！'
            }
        });
});

module.exports = router;
