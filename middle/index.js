module.exports={
    //Ҫ��δ��¼
    checkNotLogin: function (req,res,next) {
        if(req.session.user){
            req.flash('error','�Ѿ���¼');
            res.redirect('/');
        }else{
            next();
        }
    },
    //Ҫ���¼
    checkLogin: function (req,res,next) {
        if(req.session.user){
            next();
        }else{
            req.flash('error','δ��¼');
            res.redirect('/user/login');
        }
    }
}