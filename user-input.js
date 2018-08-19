let message = () => {
    return new Promise((res, rej) => {
        var readline = require('readline');
        console.log("xccc");
        var input = [];
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log("Enter the .....");
        rl.prompt();
        rl.on('line', function (cmd) {
            console.log("========================888888888======");
            console.log(cmd);
            input.push(cmd);
        });
        rl.on('close', function (cmd) {
            console.log("==============================");
            console.log(input);
            console.log(input.join('\n'));
            res(input.join('\n'));
           // process.exit(0);
        });
       
    });
}

let findPosition = ( fullString,findString) => {
    return new Promise((response, reject) => {
        // console.log(findString);
        // console.log(fullString);
        // console.log("in position");
        let position = fullString.search(findString);
        //console.log(position+"position");
        response(position);
    });

}


module.exports.findPosition = findPosition;
module.exports.message = message;