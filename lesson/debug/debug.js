/**
 * Created by APIG on 2016/7/30.
 */
module.exports= function (name) {
    return function (msg) {
        //�жϻ��������е�debug��ֵ�Ƿ���ڵ�ǰ������name
        console.log(msg)
    }
}