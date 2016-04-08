var command = function(text){
    return (text.msg.charAt(0)=="!");
}

var botMessage=function(text){    
    switch (text.msg){
        case '!hello':
            var user = 'BOT';
            var msg = 'hello everyone';            
            break;
    }
  return {user,msg};
}

exports.command = command;
exports.botMessage = botMessage;
