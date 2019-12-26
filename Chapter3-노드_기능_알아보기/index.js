const { odd, even } = require('./var');
const checkNumber = require('../../3장/func');

function checkStringOddOrEven(str)
{
    if(str.length % 2)
    {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));