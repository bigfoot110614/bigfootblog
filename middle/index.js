module.exports={
    //ÒªÇóÎ´µÇÂ¼
    checkNotLogin: function (req,res,next) {
        if(req.session.user){
            req.flash('error','ÒÑ¾­µÇÂ¼');
            res.redirect('/');
        }else{
            next();
        }
    },
    //ÒªÇóµÇÂ¼
    checkLogin: function (req,res,next) {
        if(req.session.user){
            next();
        }else{
            req.flash('error','Î´µÇÂ¼');
            res.redirect('/user/login');
        }
    }
}