const fs= require('fs')

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOut = `This is what we know about the avocado ${textIn} \nCreated on ${Date.now()}`


fs.writeFileSync('./txt/output.txt',  textOut)
const nextText = fs.readFileSync('./txt/output.txt', 'utf-8');

console.log(nextText)

