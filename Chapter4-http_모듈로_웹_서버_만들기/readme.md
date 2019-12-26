# 4.1 요청과 응답 이해하기 

- 클라이언트 => 서버 : 요청(request) 보내고 -> 서버에선 요청의 내용을 읽고 처리한 뒤 클라이언트에게 응답(response)을 보냄

```javascript
    const http = require('http');

    http.createServer((req, res) => {
        // 여기에 어떻게 응답할지 적어줌 
        // request를 줄여 req, response을 줄여 res
        // req 객체는 요청에 관한 정보들을, res 객체는 응답에 관한 정보들을 담음
    });
```

- http 서버가 있어야 웹 브라우저의 요청 처리 가능 => http 모듈 사용 
- http 모듈 => createServer 메소드가 존재 => 인자로 요청에 대한 콜백 함수 넣을 수 있음 
- 요청이 들어올 때마다 매번 콜백 함수가 실행됨. => 이 콜백 함수에 응답을 적어주면 됨.

```javascript
    const http = require('http');

    http.createServer((req,res)=>{
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');

    }).listen(8080,()=>{
        console.log('8080번 포트에서 서버 대기 중');
    });
```

- createServer 메서드 뒤에 listen 메서드 붙이고 클라이언트에게 공개할 포트 번호 및 포트 연결 완료 후 실행될 콜백 함수를 넣어줌 
- => 이 파일 실행 시 서버는 8080포트에서 요청이 오기를 대기

- 다른 방법

  - listen 메서드에 콜백 함수를 넣는 대신, 서버에 listening 이벤트 리스너를 붙여도 됨.

```javascript
    const http = require('http');

    const server = http.createServer((req,res)=>{
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');    
    });

    server.listen(8080);

    server.on('listening', ()=>{
        console.log('8080번 포트에서 서버 대기 중입니다!');
    });

    server.on('error',(error)=>{
        console.log(error);
    });
```

- res 객체에는 res.write와 res.end 메서드가 존재

  1. res.write : 클라이언트로 보낼 데이터 
       * 지금은 HTML의 문자열을 보냈지만, 버퍼를 보낼 수도 있음 + 여러 번 호출해서 데이터를 여러 개 보내도 됨.
  2. res.end : 응답을 종료하는 메서드 
       * 만약 인자가 있다면? => 그 데이터도 클라이언트로 보내고 응답을 종료함. 

- `localhost와 포트틑 책 참고`

- res.write 메서드로 한 줄 한 줄 HTML 코드를 적는 것은 너무 비효율적 

```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Node.js 웹 서버</title>
        </head>
        <body>
            <h1>Node.js 웹 서버<h1>
            <p>만들 준비되었냐?</p>
        </body>    
    </html>
```

```javascript
    const http = require('http');
    const fs = require('fs');

    http.createServer((req,res)=>{
        fs.readFile('./server2.html', (err,data)=>{
            if(err){
                throw err;
            }
            res.end(data);
        });
    }).listen(8081,()=>{
        console.log('8081번 포트에서 서버 대기 중');
    });
```

1. 요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽음 => data 변수에 저장된 버퍼를 그대로 클라이언트에 보내주면 됨.
2. 포트 번호를 8081로 바꿈 
    * Why? server1.js를 종료했다면 8080번 포트를 계속 사용해도 되지만, 종료하지 않았을 경우 
    * server2.js가 같은 8080번 포트를 사용하면 에러가 발생 
    * => 포트만 다르게 해서 동시에 여러 노드 서버를 실행할 수도 있음

- HTML 파일을 읽어와 클라이언트로 전송하는 데 성공 
- But, 현재 서버는 클라이언트가 누구인지 모름 ㅠㅠ => 그냥 요청이 올 때 모두 같은 응답을 보냄 

# 4.2 쿠키와 세션 이해하기

- 클라이언트에서 보내는 요청에는 한 가지 큰 단점 => 누가 요청을 보내는지 모른다는 것
- 요청을 보내는 IP 주소나 브라우저의 정보를 받아올 수는 있음 
- => But, 여러 컴퓨터가 공통으로 IP 주소를 가지거나, 한 컴퓨터를 여러 사람이 사용할 수도 있음

- => 그렇다면 로그인은? : 로그인을 구현하려면 쿠키, 세션을 알고 있어야 함.
- 웹 사이트 방문해서 로그인 시 내부적으로 쿠키, 세션을 사용하고 있음 
- 로그인한 후엔 새로고침(새로운 요청)해도 로그아웃 되지 않음 
- => 클라이언트가 서버에게 우리가 누구인지를 지속적으로 알려주기 때문

- 우리가 누구인지 기억하기 위해 => 서버 : 요청에 대한 응답을 할 때 쿠키라는 것을 같이 보내줌
- 쿠키 : 'name=zerocho' -> 단순한 키-값의 쌍

- 서버로부터 쿠키가 오면 웹 브라우저 : 쿠키를 저장해두었다가 요청할 때마다 쿠키를 동봉해서 보내줌
- 서버 : 요청에 들어있는 쿠키를 읽어서 사용자가 누구인지 파악

- 브라우저 : 쿠키가 있다면 -> 자동으로 동봉해서 보내줌 : 따로 처리할 필요가 없음 
- 서버 -> 브라우저 : 쿠키를 보낼 때만 여러분이 코드를 작성하여 처리하면 됨.

- `쿠키에 대한 설명은 책 참고`

- 즉, 서버 - 미리 클라이언트에 요청자를 추정할 만한 정보를 쿠키를 만들어 보내고
- => 그 다음엔 클라이언트로부터 쿠키를 받아 요청자를 파악 

- 쿠키가 우리가 누구인지를 추적하고 있는 것 => 개인정보 유출 방지를 위해 쿠키를 주기적으로 지우라는 말이 나온 것 

* 쿠키 : 요청, 응답의 헤더(header)에 저장됨. 
    * 요청과 응답 : 각각 헤더와 본문(body)을 가짐 
    * 서버에서 직접 쿠키를 만들어 요청자의 브라우저에 넣어보자.
    ```javascript
        const http = require('http');

        const parseCookies = (cookie = '') => 
            cookie
                .split(';')
                .map(v=>v.split('='))
                .map(([k, ... vs]) => [k, vs.join('=')])
                .reduce((acc, [k,v]) => {
                    acc[k.trim()] = decodeURIComponent(v);
                    return acc;
                },{});

        http.createServer((req, res)=>{
            const cookies = parseCookies(req.headers.cookie);
            console.log(req.url, cookies);
            res.writeHead(200, { 'Set-Cookie' : 'mycookie=test'});
            res.end('Hello Cookie');
        })
            .listen(8082,()=>{
                console.log('8082번 포트에서 서버 대기 중');
            });
    ```
- parseCookies라는 함수를 직접 제작함 
- 쿠키 : name=zerocho;year=1994처럼 문자열 형식으로 옴 => 이를 { name : 'zerocho', year:'1994'}와 같이 객체로 바꾸는 함수
- createServer 메서드의 콜백
  1. 제일 먼저 req 객체에 담겨 있는 쿠키를 분석 
  2. 쿠키는 req.headers.cookie에 들어 있음 
  3. req.headers : 요청의 헤더를 의미
    * 쿠키 : 요청과 응답의 헤더를 통해 오고 감
  4. 응답의 헤더에 쿠키를 기록해야 함 
    * res.writeHead 메서드를 사용하였음
    * 첫 번째 인자 : 200이라는 상태 코드를 넣어줌 => 200 : 성공이라는 의미 
    * 두 번째 인자 : 헤더의 내용 입력 
    * Set-Cookie : 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미 
        * 실제로 응답을 받은 브라우저 : mycookie=test라는 쿠키를 저장
1. localhost:8082에 접속 - req.url과 cookies 변수에 대한 정보를 로깅하도록 함
    * req.url - 주소의 path와 search 부분을 알려줌
    * 실행 결과가 다르다면 => 브라우저의 쿠키를 모두 제거한 후 다시 실행하자.
        * 다른 사이트나 프로그램이 미리 쿠키를 넣어두었을 수도 있기 때문
    * 요청은 분명 한 번만 보냈는데 두 개가 기록되어 있어
        * /favicon.ico : 요청한 적이 없는데, 첫 번째 요청('/')에선 쿠키에 대한 정보가 없다고 나오고,    
        * 두 번째 요청('/favicon.ico')에선 { mycookie:'test'}가 기록되었음

* favicon? : 웹 사이트 탭에 보이는 이미지
    * 브라우저 : 파비콘이 뭔지 HTML에서 유추할 수 없으면? 
        * 서버에 파비콘 정보에 대한 요청을 보냄 
            * 현재 예제에서 HTML에 파비콘에 대한 정보를 넣어두지 않아 브라우저가 추가로 favicon.ico를 요청한 것
    * 요청 두 개를 통해 서버가 제대로 쿠키를 심어 주었음을 확인 가능 
        * 첫 번째 요청(/)을 보내기 전엔 브라우저가 어떠한 쿠키 정보도 가지고 있지 않음
        * 서버는 응답 요청에 mycookie=test라는 쿠키를 심으라고 브라우저에게 명령 
            * 따라서 브라우저는 쿠키를 심었고, 두 번째 요청(/favicon.ico)의 헤더에 쿠키가 들어있음을 확인 가능
> 참고!

- `HTTP 상태 코드, 헤더와 본문에 대한 설명은 책 참고 & 쿠키도`

- 아직까지 단순한 쿠키만 심었을 뿐, 그 쿠키가 나인지를 식별해주지 못하고 있음

```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>쿠키&세션 이해하기</title>
    </head>
    <body>
        <form action="/login">
            <input id="name" name="name" placeholder="이름을 입력하세요"/>
            <button id="login">로그인</button>
        </form>
    <body>
    </html>
```

```javascript
    const http = require('http');
    const fs = require('fs');
    const url = require('url');
    const qs = require('querystring');

    const parseCookies = (cookie = '') =>
        cookie
            .split(";")
            .map(v=>v.split('='))
            .map(([k,...vs])=>[k,vs.join('=')])
            .reduce((acc,[k,v])=>{
                acc[k.trim()] = decodeURIComponent(v);
                return acc;
            },{});

    http.createServer((req,res)=>{
        const cookies = parseCookies(req.headers.cookie);
        if(req.url.startsWith('/login')){
                const { query }  = url.parse(req.url);
                const { name } = qs.parse(query);
                const expires = new Date(); 
                expires.setMinutes(expires.getMinutes() + 5);
                res.writeHead(302, {
                    Location : '/',
                    'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; path=/`,
                });
                res.end();
        }
        else if(cookies.name){
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
            res.end(`${cookies.name}님 안녕하세요`);
        }
        else {
            fs.readFile('./server4.html',(err,data)=>{
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }
    })
        .listen(8083, ()=>{
            console.log('8083번 포트에서 서버 대기 중');
        });
```

- 코드의 복잡 : 주소가 /login, /로 시작하는 것까지 두 개 => 주소 분기 처리됨.

```javascript
        // 위의 코드 일부분
         const cookies = parseCookies(req.headers.cookie);
        if(req.url.startsWith('/login')){
                const { query }  = url.parse(req.url);
                const { name } = qs.parse(query);
                const expires = new Date(); 
                expires.setMinutes(expires.getMinutes() + 5);
                res.writeHead(302, {
                    Location : '/',
                    'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; path=/`,
                });
                res.end();
```

1. 주소가 /login으로 시작할 경우 : url, querystring 모듈로 각각 주소와 주소에 딸려오는 query를 분석 
    * 쿠키의 만료 시간도 지금부터 5분 뒤로 설정 
    * => 그 후, 302 응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣음 
    * 브라우저 : 이 응답 코드를 보고 페이지를 해당 주소로 리다이렉트함
    * 헤더에는 한글을 설정할 수 없음 => name 변수를 encodeURIComponent 메서드로 인코딩함

```javascript
else if(cookies.name){
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
            res.end(`${cookies.name}님 안녕하세요`);
        }
        else {
            fs.readFile('./server4.html',(err,data)=>{
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }
```

2. 그 외의 경우(/로 접속했을 때 등), 먼저 쿠키가 있는지 없는지 확인 
    * 쿠키가 없다면 로그인할 수 있는 페이지를 보냄
    * 처음 방문한 경우 쿠키가 없음 => server4.html이 전송됨.
    * 쿠키가 있다면 로그인한 상태로 간주해 인사말을 보냄 
        * res.end 메서드에 한글이 들어가면 인코딩 문제가 발생 
        * res.writeHead에 Content-Type을 text/html;charset-utf-8로 설정해 인코딩을 명시하였음

* 쿠키 설정 시 만료 시간(Expires)과 HttpOnly, Path 같은 옵션을 부여했음
    * 쿠키 : 설정할 때 각종 옵션들을 넣을 수 있음 
    * 옵션 간에는 세미콜론(;)으로 구분하면 됨.

        + 쿠키명=쿠키값 : 기본적인 쿠키의 값 - mycookie=test 또는 name=zerocho 같이 설정
        + Expires=날짜 : 만료 기한 - 이 기한이 지나면 쿠키가 제거됨,
            + 기본값 - 클라이언트가 종료될 때까지임.
        + Max-age=초 : Expires와 비슷하지만 날짜 대신 초를 입력할 수 있음, 해당 초가 지나면 쿠키가 제거됨.
            + Expires보다 우선함
        + Domain=도메인 명 : 쿠키가 전송될 도메인을 특정할 수 있음, 기본값은 현재 도메인임
        + Path=URL : 쿠키가 전송될 URL을 특정할 수 있음, 기본값은 /이고 이 경우 모든 URL에서 쿠키를 전송할 수 있음
        + Secure : HTTPS일 경우에만 쿠키가 전송됨.
        + HttpOnly : 설정 시 자바스크립트에서 쿠키에 접근할 수 없음, 쿠키 조작을 방지하기 위해 설정하는 것이 좋음
    
![server4](https://user-images.githubusercontent.com/11308147/71481760-80147b80-2842-11ea-9403-cf8e2a9d43aa.PNG)

- 원하는 대로 동작하긴 하지만 => 이 방식은 상당히 위험 
- Application 탭에서 보는 것처럼 쿠키가 노출되어 있어 => 또한, 쿠키가 조작될 위험도 존재 
  - 따라서 이름 같은 민감한 개인정보를 쿠키에 넣어두는 것은 적절하지 못함 

- 코드 변경을 통해 서버가 사용자 정보를 관리하도록 하자.

```javascript
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const session = {};

http.createServer((req, res) => {
        const cookies = parseCookies(req.headers.cookie);
        if (req.url.startsWith('/login')) {
            const { query } = url.parse(req.url);
            const { name } = qs.parse(query);
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 5);
            const randomInt = +new Date();
            session[randomInt] = {
                name,
                expires,
            };
            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
            });
            res.end();
        } else if (cookies.session && session[cookies.session].expires > new Date()) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(`${session[cookies.session].name}님 안녕하세요`);
        } else {
            fs.readFile('./server4.html', (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        }
    })
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다.');
    });
```
- server4.js와는 달라진 부분 존재
- 쿠키에 이름을 담아서 보내는 대신 randomInt라는 임의의 숫자를 보냄 
- 사용자의 이름과 만료 시간은 session이라는 객체에 대신 저장함.

- 이제 cookie.session이 있고 만료 기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져와서 사용함. => 다른 부분은 동일 

![session](https://user-images.githubusercontent.com/11308147/71481905-37a98d80-2843-11ea-925a-35bbcfb1c3bc.PNG)

* 이 방식이 세션 => 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통 
    * 세션 아이디는 꼭 쿠키를 사용해서 주고 받지 않아도 됨.
    * But, 많은 웹 사이트가 쿠키를 사용함 => 쿠키를 사용하는 방법이 제일 간단해서 
    * 물론 실제 배포용 서버에선 세션을 위처럼 변수에 저장하지 않음 
        * 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되기 때문
        * 또한, 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생김 => 보통은 데이터베이스에 넣어둠

* 서비스를 새로 만들 때마다 쿠키와 세션을 직접 구현할 수는 없음 
    + 게다가 지금 코드로는 => 쿠키를 악용한 여러 가지 위협을 방어하지도 못함 
    + 위의 방식 역시 세션 아이디 값이 공개되어 있어 누출되면 다른 사람이 사용가능 
    
* 절대로 위의 코드를 실제 서비스에 사용해선 안 되고, 개념을 설명하기 위한 코드 => 보안 상 매우 취약

* => 다른 사람들이 만든 검증된 코드를 사용하는 것이 좋음 
    + 다른 사람의 코드(모듈)을 사용하는 방법은 나중에...
    
# 4.3 REST API와 라우팅 

- 서버에 요청을 보낼 때 : 주소를 통해 요청의 내용을 표현
- 주소가 /index.html -> 서버의 index.html을 보내달라는 뜻, /about.html -> about.html을 보내달라

- 요청이 항상 html을 요구할 필요가 없고, 지난 실습의 server5.js 에서도 /login이라는 주소를 통해 html을 요청하는 대신 세션 저장이라는 동작 취하기를 요청함.
- => 요청이 주소를 통해 들어와서 서버가 이해하기 쉬운 주소를 사용하는 것이 좋음 => REST API의 등장 

* REST API(REpresentational State Transfer) - 네트워크 구조의 한 형식 
    + 서버의 자원을 정의, 자원에 대한 주소를 지정하는 방법
    + 주소 : 의미를 명확히 전달하기 위해 명사로 구성됨.
        * ex) /user : 사용자 정보에 관련된 자원을 요청하는 것, /post : 게시글에 관련된 자원을 요청하는 것이라 추측 가능
    + 주소 외에도 HTTP 요청 메서드라는 것을 사용 
    + 폼 데이터를 전송할 때 GET 또는 POST 메서드를 지정해보았냐 => GET, POST가 바로 요청 메서드
        + 거기에 PUT, PATCH, DELETE까지 총 5개가 메서드로 많이 사용됨.
    1. GET : 서버 자원을 가져오고자 할 떄 사용함, 요청의 본문(body)에 데이터를 넣지 않음
        * 데이터를 서버로 보내야 한다면 쿼리스트링을 사용
    2. POST : 서버에 자원을 새로 등록하고자 할 떄 사용, 요청의 본문에 새로 등록할 데이터를 넣어 보냄
    3. PUT : 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용
        * 요청의 본문에 치환할 데이터를 넣어 보냄
    4. PATCH : 서버 자원의 일부만 수정하고자 할 때 사용함, 요청의 본문에 일부 수정할 데이터를 넣어 보냄 
    5. DELETE : 서버의 자원을 삭제하고자 할 때 사용함.

- 주소 하나가 요청 메서드를 여러 개 가질 수 있음
- GET 메서드의 /user 주소로 요청을 보내면 사용자 정보를 가져오는 요청이라는 것을 알 수 있음
- POST 메서드의 /user 주소로 요청을 보내면 새로운 사용자를 등록하려 한다는 것을 알 수 있음

- 주소와 메서드만 보고 요청의 내용을 명확하게 알아볼 수 있다는 것이 장점 

* GET 메서드 : 브라우저에서 캐싱할 수도 있어서 같은 주소의 GET 요청을 할 때 서버에서 가져오는 것이 아니라, 캐시에서 가져올 수도 있음
    * 이렇게 캐싱이 되면 성능이 좋아짐

- `REST API 정보는 책을 참고`

* HTTP 프로토콜을 사용 => 클라이언트가 누구든 상관없이 서버와 소통 가능 
    * iOS, 안드로이드, 웹이 모두 같은 주소로 요청을 보낼 수 있음 => 서버가 클라이언트와 분리되어 있다는 뜻
    * => 서버와 클라이언트를 분리 => 추후에 서버를 확장할 때 클라이언트에 구애되지 않아 좋음

* REST API를 따르는 서버를 RESTful하다고 표현 => 코드를 작성하기 전 대략적인 주소를 먼저 설계하는 것이 좋음 

- ex) 주소 구조를 미리 머릿속에 정리해둔 후 코딩을 시작하면 더욱 체계적으로 프로그래밍 가능

HTTP 메서드| 주소 | 역할
---|---|---
GET|/|restFront.html 파일 제공
GET|/about|about.html 파일 제공
GET|/users|사용자 목록 제공
GET|기타|기타 정적 파일 제공
POST|/users| 사용자 등록
PUT|/users/사용자id| 해당 id의 사용자 수정
DELETE|/users/사용자id| 해당 id의 사용자 제거


* restFront.js 
    1. 페이지가 로딩되면 GET /users로 사용자 목록을 가져옴.(getUser 함수)
    2. 수정 버튼, 삭제 버튼에 각각 PUT /users/사용자id와 DELETE /users/사용자id로 요청을 보내도록 지정하였음
    3. form을 제출할 때는 POST /users/로 데이터와 함꼐 요청을 보냄.


* restServer.js
    * 요청이 어떤 메서드를 사용했는지 req.method로 알 수 있음 => 따라서 req.method를 기준으로 if문을 분기 처리함
        1. GET 메서드에서 /,/about 요청 주소는 페이지를 요청하는 것 => HTML 파일을 읽어서 전송
            1. AJAX 요청을 처리하는 /users에선 users 데이터를 전송 
            2. JSON 형식으로 보내기 위해 JSON.stringify를 해주었음 
            3. 그 외의 GET 요청은 CSS나 JS 파일을 요청하는 것 => 찾아서 보내주고, 없다면 404 NOT FOUND 에러를 응답합니다.
        2. POST와 PUT 메서드 : 클라이언트로부터 데이터를 받기 때문에 특별한 처리가 필요
            1. req.on('data', 콜백)과 req.on('end', 콜백) 부분 
            2. 버퍼와 스트림에서 배웠던 readStream임 => readStream으로 요청과 같이 들어오는 요청 본문을 받을 수 있음
            3. 단, 문자열이므로 JSON으로 만드는 JSON.parse 과정이 한 번 필요함.
        3. DELETE 메서드로 요청이 오면 주소에 들어 있는 키에 해당하는 사용자를 제거 
        4. 해당하는 주소가 없을 경우 404 NOT FOUND 에러를 응답 

![restServer](https://user-images.githubusercontent.com/11308147/71481985-95d67080-2843-11ea-8e27-6bc44deee56e.PNG)
![restServer1](https://user-images.githubusercontent.com/11308147/71481986-95d67080-2843-11ea-999a-7eaa281015d8.PNG)
![restServer2](https://user-images.githubusercontent.com/11308147/71481987-95d67080-2843-11ea-851e-9145950be927.PNG)

- method 탭이 보이지 않으면 Name 탭을 마우스 오른쪽 클릭해 method에 체크하면 됨.

![restServer3](https://user-images.githubusercontent.com/11308147/71481999-a25ac900-2843-11ea-970a-9eb37b27aecd.PNG)


- Network 탭 - 네트워크 요청을 실시간으로 볼 수 있음 
- REST API 방식으로 주소를 만들었으므로 주소만 봐도 요청 내용을 유추가능 
- Name : 요청 주소, Method : 요청 메서드, Status : HTTP 응답 코드, Protocol : HTTP 프로토콜, Type : 요청의 종류를 의미 
- xhr은 AJAX 요청

- Network 탭 => POST /users : 사용자를 등록하는 요청임을 알 수 있음
- DELETE /users/키 : 해당 키를 가진 사용자를 제거하는 요청 
- 등록, 수정 및 삭제가 발생할 때마다 GET /users로 갱신된 사용자 정보를 가져오고 있음 

- 데이터 : 메모리상의 변수에 저장되어 있으므로 서버를 종료하기 전까지 유지됨.
- 만약 데이터가 계속 유지되려면 데이터베이스를 활용해야 함

# 4.4 https와 http2

- http 모듈 : 웹 서버에 SSL 암호화를 추가
- GET, POST 요청 시 오고 가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없게 해줌
- 로그인이나 결제가 필요한 창에서 https 적용이 필수가 되는 추세

- SSL이 적용된 웹 사이트 : 브라우저 주소창에 자물쇠 표시가 나옴



```javascript
// server1.js 
const http = require('http');

http.createServer((req,res)=>{
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중');
});
```

- 이 서버에 암호화를 적용하려면 https 모듈을 사용해야 함. => https는 아무나 사용할 수 있는 것이 아님
- 암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요 => 인증서는 인증 기관에서 구입해야 함

- 발급받은 인증서가 있다면?

```javascript
    const https = require('https');
    const fs = require('fs');

    http.createServer({
        cert: fs.readFileSync('도메인 인증서 경로'),
        key: fs.readFileSync('도메인 비밀키 경로'),
        ca:[
            fs.readFileSync('상위 인증서 경로'),
            fs.readFileSync('상위 인증서 경로'),
        ],
    },(req,res)=>{
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');
    })
        .listen(443,()=>{
            console.log('443 포트에서 서버 대기 중');
        });
```

* 다른 것은 거의 비슷 But, createServer 메서드 => 인자를 두 개 받음 
* 두 번째 인자는 http 모듈과 같이 서버 로직이고, 첫 번째 인자는 인증서에 관련된 옵션 객체
    * 인증서를 구입 => pem이나 crt 또는 key 확장자를 가진 파일들을 제공해줌 
    * 파일들을 fs.readFileSync 메서드로 읽어 cert,key,ca 옵션에 알맞게 넣어주자

* 노드의 http2 모듈 - SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 해줌
    * http/2 : 요청, 응답 방식이 기존 http/1.1보다 개선되어 훨씬 효율적으로 요처을 보냄
    * http/2를 사용하면 웹의 속도도 많이 개선

- `http1.1과 http2를 비교`

- 실제로는 http/1.1도 파이프라인이라는 기술을 적용해 이 정도 차이가 나지는 않음
- But, http/2가 훨씬 효율적인 것만은 분명


```javascript
    const https = require('http2');
    const fs = require('fs');

    http.createSecureServer({
        cert: fs.readFileSync('도메인 인증서 경로'),
        key: fs.readFileSync('도메인 비밀키 경로'),
        ca:[
            fs.readFileSync('상위 인증서 경로'),
            fs.readFileSync('상위 인증서 경로'),
        ],
    },(req,res)=>{
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');
    })
        .listen(443,()=>{
            console.log('443 포트에서 서버 대기 중');
        });
```
- http2를 적용한 server1-2.js
- https 모듈과 거의 유사, https => http2로, createServer 메서드를 createSecureServer 메서드로 바꾸어주면 됨.

# 4.5 cluster

- cluster 모듈 : 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈 
- 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있어 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있음
- => 서버에 무리가 덜 가게 되는 셈

- ex) 코어가 8개인 서버가 있을 때, 노드는 보통 코어를 하나만 활용 
- But, cluster 모듈을 설정하여 코어를 하나만 사용할 떄에 비해 성능이 개선됨. 

- But, 장점만 있는 것은 아니며, 세션을 공유하지 못하는 등의 단점도 있음
- => Redis 등의 서버를 도입해 해결 가능 


```javascript
    //  server1.js의 클러스터링
    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;

    if(cluster.isMaster){
        console.log(`마스터 프로세스 아이디: ${process.pid}`);
        // cpu 개수만큼 워커를 생산
        for(let i = 0;i < numCPUs; i+=1)
        {
            cluster.fork();
        }
        // 워커가 종료되었을 때 
        cluster.on('exit', (worker, code, signal)=>{
            console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
            cluster.fork();
        });
    }
    else{
        // 워커들이 포트에서 대기
        http.createServer((req,res)=>{
            res.write(`<h1>Hello Node!</h1>`);
            res.end('<p>Hello Cluster!</p>');
            setTimeout(()=>{
                process.exit(1);
            },1000)
        }).listen(8085);

        console.log(`${process.pid}번 워커 실행`);
    }
```

* 클러스터엔 마스터 프로세스와 워커 프로세스가 있음
    * 마스터 프로세스
        * CPU 개수만큼 워커 프로세스를 만들고
        * 8085번 포트에서 대기
        * 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배
    * 워커 프로세스
        * 실질적인 일을 하는 프로세스
        * 실험한 컴퓨터 CPU 코어의 개수가 8개라서 워커가 8개 생성됨
        * 
![worker](https://user-images.githubusercontent.com/11308147/71482308-30837f00-2845-11ea-8cf6-7a8d646d0102.PNG)

- 요청이 들어올 때마다 1초 후 서버가 종료되도록 했고,
이제 서버를 실행하면,
- process.pid는 매 실행 시 마다 달라지고, 각자 자신의 코어 개수에 맞게 워커가 실행되는지 확인해보자

- http://localhost:8085에 접속하면 1초 후 콘솔에 워커가 종료되었다는 메시지가 뜸
- 8번 새로고침을 하면 이제 모든 워커가 종료되어 서버가 응답하지 않음

- 즉, 8번까지는 오류가 발생해도 서버가 정상 작동할 수 있다는 뜻 
- 종료된 워커를 다시 켜면 오류가 발생해도 계속 버틸 수 있음 

- 워커 프로세스가 종료되었을 때 새로 하나를 생성해보면,

![cluster2](https://user-images.githubusercontent.com/11308147/71482337-54df5b80-2845-11ea-8902-4089e42ef14f.PNG)

- 워커가 죽을 떄마다 새로운 워커가 하나 더 생성됨. 
- But, 이러한 방식으론 오류를 막으려는 것은 좋지 않은 생각
- 오류 자체의 원인을 찾아 해결해야 함
- 그래도 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있어 클러스터링을 적용해두는 것이 좋음

- 직접 cluster 모듈로 클러스터링을 구현할 수도 있지만,
- 실무에선 pm2 등의 모듈로 cluster 기능을 사용하곤 함. => pm2 모듈은 나중에!

* Rest API와 라우팅으로 돌아가면 
    * 4.3절의 웹 서버 주소는 크게 HTML 또는 CSS 파일을 요청하는 주소와 서버의 users 자원을 요청하는 주소로 나뉘어져 있음
    * 만약 파일이나 자원의 수가 늘어나면 그에 따라 주소의 종류도 많아져야 함.

* But, 이미 코드가 상당히 길어 보기도 어렵고 관리하기도 어려움
    * 주소의 수가 많아질수록 코드는 계속 길어짐
    * 여기에 쿠키와 세션을 추가하게 되면 더 복잡해짐
        * 이를 편리하게 만들어주는 모듈이 존재 
        * 바로 Express 모듈 

* Express 모듈 : 다른 사람들이 만들어둔 모듈 => 설치하자

- `참고 자료는 책을 참고해서 알아보자`
