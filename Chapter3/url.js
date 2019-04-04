const url = require('url');
// url 모듈 안에 URL 생성자가 존재 => 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됨. => WHATWG의 url
// WHATWG에만 있는 username, password, origin, searchParams 속성이 존재함


const URL = url.URL;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('--------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));