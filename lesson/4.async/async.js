exports.module = {

    series: function (tasks, callback) {
        var index = 0;
        var result = [];

        function next(err, data) {
            if (index > 0) //���Ե�һ��data
                result.push(data);
            //�������Խ������д������̵��ص�����
            if (index >= tasks.length || err) {
                return callback(err, result);
            }
            //�õ���ǰ��task������
            var task = tasks[index++];
            task(next);
        }

        next();
    },
    parallel: function (tasks, callback) {

    }
}