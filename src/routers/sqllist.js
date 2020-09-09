const express = require('express');
const router = express.Router();
const sql = require('../test_ms');

router.get('/list/:page?', async (req, res)=>{

    let page = req.params.page < 1 ?  1 :req.params.page;

    const result = await sql(page);

    res.render('sql-list/list', {data: result});
});


router.get('/test', async (req, res)=>{

    const result = await sql();
    res.json(result);
});


router.get('/',  (req, res)=>{


    res.redirect( req.baseUrl  + '/list');
});


module.exports = router;