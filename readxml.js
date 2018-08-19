const http = require('http');
const fs = require('fs');
const readline = require('readline-sync');
const defectFolder = './defect-inputs/';
const userInput = require('./user-input');
let startPos;
let endPos;
let inputString = '';
let firstPart;
let endPart;
let startPosChunk;
let endPosChunk;
userInput.message().then((result) => {
  inputString = result;
  userInput.findPosition(inputString, '<dataStore>').then((start) => {
    startPos = start;
  })
}).then(() => {
  userInput.findPosition(inputString, '</session>').then(endPosition => {
    endPos = endPosition;
  });
}).then(() => { 
  inputString = inputString.trim();
  firstPart = inputString.slice(startPos, endPos);
  endPart = inputString.slice(endPos);
}).then(() => {
  fs.readdirSync(defectFolder).forEach(file => {
    let getxml = '';
    let myReadStream = fs.createReadStream(__dirname + '/defect-inputs/' + file, 'utf8');
    let myWriteStream = fs.createWriteStream(__dirname + '/defect-outputs/' + file);
    myReadStream.on('data', (chunk) => {
      return new Promise ( (res,rej) => {
         startPosChunk = chunk.search("<data");
         endPosChunk = chunk.search("</data");
        res(chunk);
      }).then((chunk)=>{
        let getxml = firstPart.concat('\n\t\t\t');
        getxml = getxml.concat(chunk.slice(startPosChunk, endPosChunk + 7));
        getxml = getxml.concat('\n\t');
        getxml = getxml.concat(endPart);
        myWriteStream.write(getxml, (err, data) => {
          if (err) {
            console.log("error",err);
          }
          else
          {
            console.log("data",data);
          }

        });
      });
    });
  })
});


