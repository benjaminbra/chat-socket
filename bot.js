var command = function(text){
    return (text.msg.charAt(0)=="!");
}

var botMessage=function(text){    
    switch (text.msg){
        case '!hello':
            var pseudo = 'BOT';
            var msg = 'hello everyone';
            break;
    }
    var channel = text.channel;
    return {pseudo,channel,msg};
}

exports.command = command;
exports.botMessage = botMessage;
