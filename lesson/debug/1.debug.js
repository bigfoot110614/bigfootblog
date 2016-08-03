/*
* 我需要一个日志记录器
* 要求通过环境变量的配置来控制要输出哪些日志
* */

/*需求 要匹配所有的logger*/
var debug=require('./debug');
var logger_warn=debug('warn');
logger_warn('warn');

var logger_error=debug('error');
logger_error('error');