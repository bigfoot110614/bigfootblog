/**
 * Created by APIG on 2016/7/30.
 */
module.exports= function (name) {
    return function (msg) {
        //判断环境变量中的debug的值是否等于当前的名称name
        console.log(msg)
    }
}