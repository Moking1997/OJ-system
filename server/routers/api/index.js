const Router = require('koa-router')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

const sequelize = new Sequelize('jol', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
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
    problem_id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    source: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    input: {
        type: Sequelize.TEXT
    },
    output: {
        type: Sequelize.TEXT
    },
    sample_input: {
        type: Sequelize.TEXT
    },
    sample_output: {
        type: Sequelize.TEXT
    },
    catalogs: {
        type: Sequelize.STRING
    },
    in_date: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

const Catalog = sequelize.define('problem_catalogs', {
    ID: {
        type: Sequelize.BIGINT(11),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    label: {
        type: Sequelize.STRING
    },
    parentID: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

router.get('/problem/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await Problem.findAll({ where: { problem_id: id } })
})
router.get('/problem/catalog', async ctx => {
    // let { id } = ctx.params
    ctx.body = await Problem.findAll()
})
router.get('/problem/catalog/:id', async ctx => {
    let { id } = ctx.params
    ctx.body = await Problem.findAll({ where: { catalogs: { [Op.like]: `%,${id},%` } } })
})
router.post('/problem/catalog/add/id', async ctx => {
    let { label, parentID } = ctx.request.fields
    Catalog.create({ label: label, parentID: parentID })
    ctx.response = 'success'
})
router.post('/problem/catalog/delete/id', async ctx => {
    let { id } = ctx.request.fields
    Catalog.destroy({ where: { ID: id } })
    ctx.response = 'success'
})
router.get('/problem', async ctx => {
    ctx.body = await Problem.findAll()
})
router.get('/problem/data/:data', async ctx => {
    let { data } = ctx.params
    let content = ",0,1,6,"
    Problem.update({ catalogs: content }, {
        where: { title: { [Op.like]: `%${data}%` } }
    })
    ctx.body = await Problem.findAll({ where: { title: { [Op.like]: `%${data}%` } } })

})
router.get('/getProblemList', async ctx => {
    console.log(ctx.request.query)
    let { currentPage = 1 } = ctx.request.query
    let offset = (currentPage - 1) * 10
    let userList = await Problem.findAndCountAll({
        // where: {
        // },
        offset,
        limit: 10
    }).then(res => {
        let result = {};
        result.data = res.rows;
        result.total = res.count;
        return result;
    });
    ctx.body = userList;
})

router.get('/tags/:tag', async ctx => {
    console.log('data', ctx.params['tag'])
    let id = (ctx.params['tag']).split("&")[0]
    let tag = (ctx.params['tag']).split("&")[1]
    console.log(id, tag)
    ctx.body = await Problem.findAll({ where: { catalogs: { [Op.like]: `%,${id},%` }, tag: tag } })
})

router.get('/catalog/:parentID', async ctx => {
    let { parentID } = ctx.params
    ctx.body = await Catalog.findAll({ where: { parentID: parentID } })
})

router.get('/getProblemList/:date', async ctx => {
    let id = (ctx.params['date']).split("&")[0]
    let tag = (ctx.params['date']).split("&")[1]
    let currentPage = (ctx.params['date']).split("&")[2] || '1'
    let offset = (currentPage - 1) * 10;
    let userList = await Problem.findAndCountAll({
        where: { catalogs: { [Op.like]: `%,${id},%` }, tag: tag },
        offset,
        limit: 10
    }).then(res => {
        let result = {};
        result.data = res.rows;
        result.total = res.count;
        return result;
    });
    ctx.body = userList;
})
router.post('/issue', async ctx => {
    ctx.body = ctx.request.fields
    let { title, catalogs, tags, sample_input, sample_output } = ctx.request.fields
    // console.log(title, catalogs, tags, contents)
    // Article.create({ title: title, catalogs: catalogs, tags: tags, content: contents })
    console.log(ctx.request.fields)
    fs.mkdir("upload/" + title, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
    });
    fs.writeFile('./upload/' + title + "/" + tags + ".in", sample_input, function (err) {
        if (err) {
            console.log("文件写入失败", err)
        } else {
            console.log("文件写入成功");

        }

    })
    ctx.response.body = 'success'
})

module.exports = router.routes()