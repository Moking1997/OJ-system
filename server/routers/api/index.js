const Router = require('koa-router')
const Sequelize = require('sequelize');

const sequelize = new Sequelize('oj', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' ,
});

let router = new Router()

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Problem = sequelize.define('problem', {
    // 属性
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
        // allowNull 默认为 true
    },
    tag:{
        type: Sequelize.STRING
    }
}, {
        freezeTableName: true,
        //去掉默认的添加时间和更新时间
        timestamps: false,
        indexes: [
            //普通索引,默认BTREE
            {
                unique: true,
                fields: ['pid']
            },
        ]
});
// Problem.findAll().then(problems => {
//     console.log("All users:", JSON.stringify(problems, null, 4));
// });

router.get('/problem/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await Problem.findOne({ where: { id: id } })
})
router.get('/problem', async ctx => {
    ctx.body = await Problem.findAll()
})

router.get('/tags/:tag', async ctx => {
    let { tag } = ctx.params
    ctx.body = await Problem.findOne({ where: { tag: tag } })})

module.exports = router.routes()