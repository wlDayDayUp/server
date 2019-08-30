// 根据用户名查询用户数量
const queryUserByUserName = (username) => {
    return `SELECT COUNT(*) sl FROM T_USER WHERE T_USER.USERNAME = '${username}'`;
};

const insertUser = (username, password) => {
    return `INSERT INTO T_USER (USERNAME, PWD) VALUES('${username}', '${password}');`
};

const queryUserByUserNameAndPassword = (username, password) => {
    return `SELECT COUNT(*) sl, USERNAME FROM T_USER WHERE T_USER.USERNAME = '${username}' AND T_USER.PWD = '${password}'`;
};

module.exports = {
    queryUserByUserName,
    insertUser,
    queryUserByUserNameAndPassword,
};
