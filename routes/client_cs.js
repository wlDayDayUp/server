const router = require('koa-router')();
const fs = require("fs");
const path = require("path");

router.prefix('/test');

/**
 *  用户注册
 *  @param username 用户名
 *  @param password 密码
 *  <p>
 *      1. 传入参数不能为空
 *      2. 根据username判断存不存在
 *  </p>
 */
router.get('/getCs', async (ctx, next) => {
    let username = ctx.query.username || "";
    let age = ctx.query.age || "";

    ctx.body = {
        success: true,
        // msg: `你好！你的信息：${username} : ${age}`,
        msg: null,
        info: null
        // info: {
        //     phone: '13333333333'
        // }
    }
});

//  /test/uploadfile
router.post('/uploadfile', async (ctx, next) => {

    // 上传单个文件
    const file = ctx.request.files.test_png; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(path.resolve("./"), 'public/upload') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
});

//  /test/uploadfiles 多文件上传测试
router.post('/uploadfiles', async (ctx, next) => {

    console.log(ctx.request.files);
    // 上传单个文件
    for (let filesKey in ctx.request.files) {
        console.log(filesKey);
        console.log(typeof filesKey);

        const file = ctx.request.files[filesKey]; // 获取上传文件
        console.log(file);
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = path.join(path.resolve("./"), 'public/upload') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }


    return ctx.body =
        {
            success: true,
            msg: "上传成功！"
        }
});


module.exports = router;
