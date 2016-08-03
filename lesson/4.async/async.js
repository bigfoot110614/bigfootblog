exports.module = {

    series: function (tasks, callback) {
        var index = 0;
        var result = [];

        function next(err, data) {
            if (index > 0) //忽略第一次data
                result.push(data);
            //如果索引越界或者有错误立刻调回调函数
            if (index >= tasks.length || err) {
                return callback(err, result);
            }
            //得到当前的task并调用
            var task = tasks[index++];
            task(next);
        }

        next();
    },
    parallel: function (tasks, callback) {

    }
}