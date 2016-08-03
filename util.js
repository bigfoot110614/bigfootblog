module.exports={
    md5: function (str) {
        require('crypto').createHash('md5').update(str).digest('hex');
    }
}