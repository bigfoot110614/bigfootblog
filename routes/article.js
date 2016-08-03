/**
 * Created by APIG on 2016/7/30.
 */
var express = require('express');
var router = express.Router();
var auth=require('../middle');
markdown = require('markdown').markdown;
router.get('/list', function (req, res) {
    Model('Article').find().populate('user').exec(function (err, docs) {
        docs.forEach(function (doc) {
            doc.content = markdown.toHTML(doc.content);
        });
       res.render('article/list',{title:'文章列表',articles:docs})
    });
    //populate把字符串转换为对象
})
router.get('/add', auth.checkLogin,function (req, res) {
    res.render('article/add',{title:'文章'});
});

router.post('/add',auth.checkLogin, function (req, res) {
    var article=req.body;
    article.user=req.session.user._id;//从session中获取当前用户的id
    Model('Article').create(article, function (err, doc) {
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/');
        }
    })
});
router.get('/detail/:_id', function (req, res) {
    Model('Article').findById(req.params._id, function (err, doc) {
        res.render('article/detail',{title:'文章详情',article:doc})
    })
})
router.get('/delete/:_id', function (req, res) {
    Model('Article').remove({_id:req.params._id},function(err,result){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }
        req.flash('success', '删除文章成功!');
        res.redirect('/');//注册成功后返回主页
    });
});
module.exports = router;