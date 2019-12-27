# 6. 익스프레스 웹 서버 제작

- 지금까지 웹 서버를 만들면서 코드가 보기 좋지 않고, 확장성도 떨어진다고 느꼈을 수 있어
- npm에는 서버 제작 시 불편함을 해서하고, 편의 기능을 추가한 웹 서버 프레임워크가 있음 => 익스프레스 써 보자

- 익스프레스?
  - http 모듈의 요청과 응답 객체에 추가 기능들을 부여함 
  - 기존 메서드들도 계속 사용할 수 있지만, 편리한 메서드들을 추가해 기능을 보완 
  - 코드를 분리하기 쉽게 만들어 관리하기도 용이 & 더 이상 if문으로 요청 메서드와 주소를 구별하지 않아도 됨.
  - koa, hapi 같은 웹 서버 프레임워크도 존재 => But, 많은 사람이 익스프레스를 사용함.
  - Why? 많은 사람이 사용할수록 버그도 적고, 기능 추가나 유지보수도 활발히 일어남 => 지속적인 인기를 얻는 이유

# 6.1 Express-generator로 빠르게 설치 

- 프레임워크에 필요한 package.json을 만들어주고 기본 폴더 구조까지 잡아주는 패키지가 있음 => Express-generator
- express-generator : 콘솔 명령어 -> npm 전역 설치가 필요!

![install](https://user-images.githubusercontent.com/11308147/71499479-0ad99280-28a4-11ea-8bf8-6e6ce81817c4.PNG)


- 설치가 완료되었다면 새 익스프레스 프로젝트틑 만들어보자 

![expressproject](https://user-images.githubusercontent.com/11308147/71499491-15942780-28a4-11ea-9672-aa91a39ddc67.PNG)

- 생성된 폴더 및 파일명과 함께 다음에 입력해야 할 명령어를 알려줌 

* Note! --view=pug란?
    * 템플릿 엔진? => Express-generator는 기본적으로 Jade를 템플릿 엔진으로 설치함
    * But, Jade는 Pug로 개명한지 오래됨. => express-generator에 옵션을 주었음 
    * ex) Pug 대신 EJS를 템플릿 엔진으로 사용하고 싶다면 => --view=ejs를 입력 ㄱㄱ

- learn-express라는 폴더가 생성됨.
- 폴더에 들어가서 npm 모듈들을 설치하자, 명령어 사이에 &&을 붙이면 됨.

![filemake](https://user-images.githubusercontent.com/11308147/71499503-247ada00-28a4-11ea-98f0-67734b24fc39.PNG)

* 폴더 구조

![folder](https://user-images.githubusercontent.com/11308147/71499509-2d6bab80-28a4-11ea-8b92-59fe46652195.PNG)

1. app.js 파일 - 핵심적인 서버 역할을 함 / bin 폴더의 www 파일 - 서버를 실행하는 스크립트
2. public 폴더 - 외부(브라우저 등의 클라이언트)에서 접근 가능한 파일들을 모아둔 곳
    * 이미지, 자바스크립트, css 파일들이 들어있음
3. routes 폴더 - 주소별 라우터들을 모아둔 곳 
4. views 폴더 - 템플릿 파일을 모아둔 곳

* 서버의 로직 - 모두 routes 폴더 안 파일에 작성할 것
* 화면 부분 - views 폴더 안에 작성할 것
* 데이터베이스 -> 데이터 부분 - models 폴더를 만들어 그 안에 작성하게 됨.
- 구조가 명확하게 구분되어 있어 서버 관리하기 용이 
- MVC(모델-뷰-컨트롤러) 패턴과도 비슷 (라우터를 컨트롤러라고 보면)

- 익스프레스를 먼저 실행 
  - package.json의 scripts에 start 속성 / 속성값으로 node./bin/www가 적혀 있음
  - npm run start 명령어로 서버를 실행할 수 있음 => npm start만으로도 서버를 실행가능(start 명령어는 특별?????)
![connect](https://user-images.githubusercontent.com/11308147/71499519-39576d80-28a4-11ea-9995-7b7cb707ffa9.PNG)

- http://localhost:3000으로 접속하면 이런 결과 나옴

![execute](https://user-images.githubusercontent.com/11308147/71499523-39f00400-28a4-11ea-9571-109a636c345e.PNG)

- 콘솔에 클라이언트가 보낸 요청에 관한 정보가 기록됨.

![request](https://user-images.githubusercontent.com/11308147/71499534-41171200-28a4-11ea-90be-7ebc12492a13.PNG)

- http://localhost:3000/users에도 접속해보자

![users](https://user-images.githubusercontent.com/11308147/71499536-42e0d580-28a4-11ea-947f-6891b2171455.PNG)

![user2](https://user-images.githubusercontent.com/11308147/71499565-673cb200-28a4-11ea-8926-562d7851c30c.PNG)

- 성공적으로 익스프레스 서버를 실행!

# 6.2 익스프레스 구조 이해하기

- Express : 코드가 여러 개의 파일로 분산되어 있음 => 각 부분마다 맡은 역할이 나누어져 보기, 관리에 좋음
- bin/www 파일을 살펴보자

* bin/www파일 - http 모듈에 express 모듈을 연결 & 포트를 지정하는 부분 
    * www파일에는 js 확장자가 붙어있지 X
    * #!/usr/bin/env node - 이 주석이 첫 줄에 달려 있음
    * www 파일을 콘솔 명령어로 만들 수 있음 => 이 때 이 주석이 사용됨.(전역 설치 후 rimraf와 같이 명령어로도 실행 가능)

```javascript

// 1
var app = require('../app');
var debug = require('debug')('learn-express:server');
var http = require('http');

// 2
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// 3
var server = http.createServer(app);

// 4
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
```

1. 먼저 app,debug,http 모듈들을 가져옴 => app 모듈은 나중에, debug 모듈은 콘솔에 로그를 남기는 모듈 
2. app.set('port','port')로 서버가 실행될 포트를 선언 
    1. process.env 객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 기본값으로 3000번 포트를 이용하도록 되어 잇음
    2. => app.set(키, 값)을 사용해서 데이터를 저장할 수 있음 => 나중에 데이터를 app.get(키)로 가져올 수 있음
3. http.createServer에 불러온 app 모듈을 넣어줌 => app 모듈이 createServer 메서드의 콜백 함수 역할을 함.
4. listen을 하는 부분은 http 웹 서버와 동일 => 서버를 구동했던 것과 동일하게 포트를 연결하고 서버를 실행함.
    1. 익스프레스는 그저 콜백 함수 부분을 조금 다르게 만든 것.

- app 모듈을 살펴보자
```javascript
// 1
var app = express();

// view engine setup
// 2
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 3
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 4
module.exports = app;
```

1. express 패키지를 호출해 app 변수 객체를 만듬 => 이제 이 변수에 각종 기능을 연결하자 
2. app.set 메서드로 익스프레스 앱을 설정할 수 있음 
3. 중간 부분에 app.user로 시작하는 코드가 많음 => 미들웨어를 연결하는 부분 
4. app 객체를 모듈로 만듬 => bin/www에서 사용된 app 모듈 

- `express 웹 서버의 기본 구조는 책을 참고`

- 클라이언트의 요청을 받아서 처리한 후, 다시 클라이언트에게 응답한다는 점 => http 서버와 같음 
- But, 중간에 미들웨어들을 거친다는 것이 다름 => 무슨 역할을 할까?


# 6.3.2 morgan

- GET / 200 51.267 ms - 1539 => 이러한 로그들은 모두 morgan 미들웨어에서 나오는 것

```javascript
    // morgan의 사용 예

    var logger = require('morgan');
    app.use(logger('dev'));

```
- 함수의 인자로 dev 대신 short, common, combined 등을 줄 수 있음 
- 인자에 따라 콘솔에 나오는 로그가 다름 
- dev 인 경우 - GET/ 200 51.267 ms - 1539의 의미 
* 순서대로 HTTP요청(GET) 주소(/) HTTP 상태 코드(200) 응답속도(51.267ms) - 응답바이트(1539)임
    * 개발 시 -> short, dev 인자를 많이 사용 
    * 배포 시 -> common, combined를 많이 사용 

* 콘솔뿐만 아니라 파일이나 데이터베이스에 로그를 남길 수도 있음 
    * 이러한 작업을 할 때 => winston 모듈을 더 많이 사용함 

* 함수의 인자로 short, common, combined 가 들어갔을 때 정보들 
   
![short](https://user-images.githubusercontent.com/11308147/71499579-7f143600-28a4-11ea-8d1e-66787934bdda.PNG)
![common](https://user-images.githubusercontent.com/11308147/71499580-7faccc80-28a4-11ea-8457-b7471263cda5.PNG)
![combined](https://user-images.githubusercontent.com/11308147/71499583-83405380-28a4-11ea-8bb2-9c6389deedd5.PNG)

# 6.3.3 body-parser

- 요청의 본문을 해석해주는 미들웨어 => 폼 데이터나 AJAX 요청의 데이터를 처리

```javascript
    var bodyparser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
```

- But, app.js에선 body-parser를 볼 수 없는데 => 4.16.0 버전 부터 body-parser의 일부 기능이 익스프레스에 내장되었기 때문 
- 그래서 설치하지 않고도 밑과 같이 사용가능 
```javascript
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
```
* body-parser가 필요한 경우도 존재 
    * body-parser : JSON과 URL-encoded 형식의 본문 외에도 Raw,Text 형식의 본문을 추가로 해석할 수 있음
    * Raw : 본문이 버퍼 데이터일 떄, Text : 본문이 텍스트 데이터일 대 해석하는 미들웨어 
    * 서비스에 적용하고 싶다면 body-parser를 설치한 후 밑 코드를 추가
    ```javascript
        app.use(bodyParser.raw());
        app.use(bodyParser.text());
    ```
    * JSON : JSON 형식의 데이터 전달 방식, URL-encoded : 주소 형식으로 데이터를 보내는 방식 
    * 일반적 
        1. 폼 전송 - URL-encoded 방식을 주로 사용 
            * urlencoded 메소드 - { extended: false } 라는 옵션이 들어 있음
            * 옵션이 false => 노드의 queryString 모듈을 사용해 쿼리스트링을 해석, 
            * true이면 qs 모듈을 사용해 쿼리스트링을 해석
                * qs 모듈? 내장 모둘이 아닌 npm 패키지, querystring 모듈의 기능을 조금 더 확장한 모듈 

* post, put 요청의 본문을 전달받으려면? => req.on('data'), req.on('end')로 스트림을 사용해야 했던 것
    * body-parser를 사용하면 그럴 필요가 없음 
        * => 내부적으로 본문을 해석해 req.body에 추가해 줌

* ex) JSON 형식으로 { name: 'zerocho' , book: 'nodejs'}를 본문으로 보낸다면 req.body에 그대로 들어감 
* ex) URL-encoded 형식으로 name=zerocho&book=nodejs를 본문으로 보낸다면 req.body에 {name: 'zerocho', book: 'nodejs'}가 들어감

* body-parser가 모든 본문을 해석해주는 것은 아니고, multipart/form-data 같은 폼을 통해 전송된 데이터는 해석하지 못함 => 다른 모듈 사용 필요

# 6.3.4 cookie-parser

- cookie-parser : 요청에 동봉된 쿠키를 해석해 줌 => 4.2절의 parseCookies 함수와 기능 비슷 
```javascript
    var cookieParser = require('cookie-parser');
    app.use(cookieParser);
```
- 해석된 쿠키들은 req.cookies 객체에 들어감 
- ex) name=zerocho 쿠키를 보냈다면 => req.cookies는 { name: 'zerocho'}가 됨.
```javascript
    app.use(cookieParser('secret code'));
```
- 첫 번째 인자로 문자열을 넣어줄 수 있음 => 쿠키들은 제공한 문자열로 서명된 쿠키가 됨.
- 서명된 쿠키 => 클라이언트에서 수정했을 때 에러가 발생 => 클라이언트에서 쿠키로 위험한 행동을 하는 것 방지 가능

# 6.3.5 static 

- static 미들웨어 : 정적인 파일들을 제공 => express를 설치하면 따라옴

```javascript
    app.use(express.static(path.join(__dirname, 'public')));
```
- 함수의 인자로 정적 파일들이 담겨 있는 폴더를 지정하면 됨. 
- 현재 public 폴더가 지정되어 있고 => public/stylesheets/styles.css => http://localhost:3000/stylesheets/style.css로 접근가능 

* 주의! 실제 서버의 폴더 경로엔 public이 들어 있지만, 요청 주소에는 public이 들어 있지 않다는 점!!!
    * 서버의 폴더 경로와 요청 경로가 다름!
        * => 외부인이 서버의 구조를 쉽게 파악할 수 없다는 장점 => 보안에 큰 도움

* 정적 파일들을 알아서 제공해주어 (fs.readFile로 파일을 직접 읽어서 전송할 필요가 없음)
```javascript
    app.use('/img',express.static(path.join(__dirname, 'public')));
```
* => 정적 파일을 제공할 주소를 지정할 수도 있음 
- ex) public 폴더 안 abc.png가 존재한다고 가정 
- 앞에 /img 경로를 붙인 http://localhost:3000/img/abc.png 주소로 접근할 수 있음 

- static 미들웨어 - 요청에 부합하는 정적 파일을 발견한 경우 응답으로 해당 파일을 전송!
- => 응답을 보냈음 -> 다음에 나올 라우터가 실행되지 않음 
- if 파일을 찾지 못했을 경우 -> 응답을 라우터로 넘김

- 자체적으로 정적 파일 라우터 기능을 수행 => 최대한 위쪽에 배치하는 것이 좋음 
- => 서버가 쓸데없는 미들웨어 작업 하는 것을 막을 수 있음 
- eX) 보통 morgan 다음에 배치(필자의 경우) -> why? static 미들웨어를 morgan보다도 더 위로 올리면 정적 파일 요청이 기록되지 않아서!

```javascript
// 원래 미들웨어 사용 부분
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 바뀐 부분
app.use(logger('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
```
* 아니 왜?
    * 기존 코드 : morgan, json, urlencoded, cookie-parser 미들웨어를 거쳐야 static 미들웨어에 도달
    * 요청을 기록하는 morgan 제외하고 정적 파일을 제공하는 데 영향을 끼치지 않는 json, urlencoded, cookie-parser를 거치는 것은 낭비!
    * => 순서를 바꾸어 주는 것이 좋음
    * 서비스에 따라 쿠키 같은 것이 정적 파일을 제공하는 데 영향을 끼칠 수도 있음 
    * => 자신의 서비스에 맞는 위치를 선택해야 함.

# 6.3.6 express-session

- 세션 관리용 미들웨어, 로그인 등의 이유로 세션을 구현할 때 매우 유용 => express-generator로는 설치되지 않음
- npm i express-session 으로 설치 ㄱㄱㄱ => app.js에 express-session을 연결하자.

```javascript
app.use(cookieParser('secret code'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'secret code',
    cookie: {
      httpOnly: true,
      secure: false,
    }
}));
```

- cookie-parser 미들웨어 뒤에 두는 것이 안전

- express-session : 인자로 세션에 대한 설정을 받음 
1. resave : 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정, 
2. saveUninitialized : 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정(방문자 추적시 사용됨)
 => 둘 다 필요 없으면 false로 설정 
3. secret : 필수 항목 => cookie-parser의 비밀키와 같은 역할을 함

- express-session : 세션 관리 시 클라이언트에 쿠키를 보냄 => 세션 쿠키
- 안전하게 쿠키 전송 - 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는 데 secret의 값이 필요함.
- cookie-parser의 secret과 같게 설정해야 함.

- cookie option : 세션 쿠키에 대한 설정!
- maxAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 옵션이 모두 제공됨.
- httpOnly => 클라이언트에서 쿠키를 확인하지 못하도록 위 코드에서!
- secure => false로 해서 https가 아닌 환경에서도 사용할 수 있게 함
- 배포 시엔! https를 적용하고 secure도 true로 설정하는 것이 좋음 

- 추가! store 옵션도 존재 => 현재 : 메모리에 세션을 저장하도록 되어 있음 
- 문제점 - 서버를 재시작하면 메모리가 초기화되어 세션이 모두 사라짐.
- => 배포 시 - store에 데이터베이스를 연결해 세션을 유지하는 것이 좋음 => Redis가 자주 쓰임??

- express-session : req 객체 안에 req.session 객체를 만듬 => 이 객체에 값을 대입 or 삭제해 세션을 변경할 수 있음 
- 나중에 세션을 한번에 삭제? => req.session.destroy() 메서드 호출 
- req.sessionID - 현재 세션의 아이디 확인 가능 

# 6.3.7 connect-flash

- 상대적으로 중요도가 떨어지는 미들웨어, 일회성 메시지들을 웹 브라우저에 나타낼 때 좋음 => npm i connect-flash로 직접 설치 ㄱㄱ
- connect-flash : cookie-parser와 express-session을 사용 => 이들보다는 뒤에 위치해야 함.
```javascript
var session = require('express-session'); // 2019-04-21 빠진 부분 추가
var flash = require('connect-flash');
    ...
app.use(cookieParser('secret code'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'secret code',
    cookie: {
      httpOnly: true,
      secure: false,
    }
}));
app.use(flash());
```
- flash 미들웨어 - req 객체에 req.flash 메서드를 추가 
* req.flash(키, 값)으로 해당 키에 값을 설정 
    * req.flash(키) : 해당 키에 대한 값을 불러옴 

```javascript
    // flash, 세션을 테스트하기 위해 임시로 라우터를 만듬 -> routes/users.js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/flash', function(req,res){
  req.session.message = '세션 메시지';
  req.flash('message', 'flash 메시지');
  res.redirect('/users/flash/result');
});

router.get('/flash/result', function(req,res){
  res.send(`${req.session.message} ${req.flash('message')}`);
});

module.exports = router;
```
1. /users/flash 라우터로 GET 요청을 보냄
2. 서버에선 세션과 flash에 메시지를 설정하고 /users/flash/result 메시지로 리다이렉트함

![userflash](https://user-images.githubusercontent.com/11308147/71499603-96ebba00-28a4-11ea-9fb5-9a1d169f20fd.PNG)

- => 세션 메시지와 flash 메시지가 모두 보임

![userflash2](https://user-images.githubusercontent.com/11308147/71499604-97845080-28a4-11ea-9dee-d26bd6cf5ba2.PNG)
- => 세션 메시지는 보이는데 flash 메시지는 보이지 않음 => why? flash 메시지는 일회용!

- 일회성 메시지 성질 -> 로그인 에러, 회원가입 에러 같은 일회성 경고 메시지를 flash 미들웨어로 보내면 좋음 

* 매 요청마다 연결한 모든 미들웨어가 실행됨 -> 웹에 너무 많은 미들웨어를 연결하면 응답이 느려질 수 있음 
    * => 꼭 필요한 미들웨어만 사용하자!

# 6.4. Router 객체로 라우팅 분리하기 

- 4.3 참고! -> 라우터를 만들 때 요청 메서드, 주소별로 분기 처리 => 코드가 매우 복잡!
- if문으로 분기해서 코딩해 보기에도 좋지 않고 확장하기도 어려움 
- Express 사용하는 이유 -> 라우팅을 깔끔하게 관리할 수 있다는 점!

```javascript
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

```
- Express 앱과는 app.use('/',indexRouter), app.use('/users',usersRouter)로 연결되어 있음 
- app.use를 사용 => 라우터도 일종의 미들웨어라고 볼 수 있음

* 차이점! 다른 미들웨어와는 다르게 앞에 주소가 붙음!
    * 라우팅 미들웨어 - 첫 번째 인자로 주소를 받아 특정 주소에 해당하는 요청이 왔을 때만 미들웨어가 동작하게 할 수 있음
    * 주소가 /로 시작하면 routes/index.js를, /users로 시작하면 routes/users.js를 호출하라는 의미
    * use 대신 get,post,put,patch, delete 같은 HTTP 메서드를 사용할 수도 있음 
    ```javascript
        app.use('/', function(req,res,next){
            console.log('/ 주소의 요청일 때 실행됨, HTTP 메서드는 상관없음');
            next();
        });
        app.get('/', function(){
            console.log('GET 메서드 / 주소의 요청일 때만 실행됨.');
            next();
        });
        app.post('/', function(){
            console.log('POST 메서드 /data 주소의 요청일 때만 실행됨');
            next();
        });
    ```
    * use 메소드 - 모든 HTTP 메서드에 대해 요청 주소만 일치하면 실행됨
    * get, post, put, patch, delete 같은 메서드 -> 주소뿐만 아니라 HTTP 메서드까지 일치하는 요청일 때만 실행됨.


- 라우터 => 라우터 파일들은 routes 폴더에 들어 있음

- router 객체 : express.Router()로 만듬 -> 마지막엔 module.exports = router;를 통해 라우터를 모듈로 만듬
- router에도 app처럼 use,get,post,put,patch,delete 같은 메서드를 붙일 수 있음 
- use를 제외하고는 각각 HTTP 요청 메서드와 상응
- app.use처럼 router 하나에 미들웨어를 여러 장착 가능 
- ex) 실제 라우터 로직이 실행되는 미들웨어 전에 로그인 여부 또는 관리자 여부를 체크하는 미들웨어를 중간에 넣어두기도 함.
```javascript
    router.get('/',middleware1, middleware2, middleware3);
```

```javascript
// /routes/index.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

- router.get('/')이면 / 주소로 GET 요청을 하는 것과 같음 
- res.render 메서드 - 클라이언트에 응답을 보냄 
- => Express가 응답 객체에 새로 추가한 메소드, 템플릿 엔진을 사용하는 부분 -> ?????

```javascript
// /routes/users.js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```

- user.js에서도 router.get('/') 부분이 있음, app.js에서 app.use('/users', usersRouter)로 연결했기 때문에,
- /users와 /이 합쳐져 /users/로 GET 요청을 했을 때 이 라우터의 콜백 함수가 실행됨.

- express.Router()(라우터)를 사용할 필요없이 app.js에서 app.get('/', 미들웨어), app.get('/users', 미들웨어)를 해도 기능은 동일 
- But, 코드 관리를 위해 라우터를 별도로 분리함!

* 라우터 - 반드시 요청에 대한 응답을 보내거나, 에러 핸들러로 요청을 넘겨야 함
    * 응답을 보내지 않으면 브라우저는 계속 응답을 기다림
    * 응답에 제한 시간이 있어 영원히 기다리지는 않지만, 기다리는 동안 다른 동작을 수행할 수 없을 수도 있음
    * res 객체에 들어 있는 메서드들로 응답을 보냄

* next 함수 - 라우터에서만 동작하는 특수 기능 존재 => next('route')
    * 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용함
    ```javascript
        router.get('/', function(req,res,next){
            next('route');
        }, function(req,res,next){
            console.log('실행되지 않습니다.');
            next();
        }, function(req,res,next){
            console.log('실행되지 않습니다.');
            next();
        });

        router.get('/', function(req, res){
            console.log('실행됩니다!');
            res.render('index',{ title: 'Express'});
        });
    ```
    * 같은 주소의 라우터를 두 개 만들었음, 첫 번째 라우터의 첫 번째 미들웨어에서 next('route')를 호출 
        * => 두 번쨰, 세 번째 미들웨어는 실행되지 않음 => 대신 주소와 일치하는 다음 라우터로 넘어감 
* Tip! 라우터 주소에는 특수한 패턴을 사용할 수 있음 
```javascript
        router.get('/users/:id', function(req,res){
            console.log(req.params, req.query);
        });
```
- 주소에 :id가 있음, 문자 그대로 :id를 의미하는 것이 아닌 => 이 부분엔 다른 값을 넣을 수 있음 
- /users/1 or /users/123 등의 요청도 이 라우터에 걸림
- 장점 -> :id에 해당하는 1이나 123을 조회할 수 있다는 점 
- req.params 객체 안에 들어 있음 -> :id면 req.params.id로, :type이면 req.params.type으로 조회할 수 있음

- 주소에 쿼리스트링을 쓸 때도 있음 => 쿼리스트링의 키-값 정보는 req.query 객체 안에 들어 있음 
- ex) /users/123?limit=5&skip=10이라는 주소의 요청이 들어왔을 때! => req.params와 req.query 객체는 

![routerUser](https://user-images.githubusercontent.com/11308147/71499625-aff46b00-28a4-11ea-8679-d0aa2e694656.PNG)

- 요청 주소에 대한 정보가 담겨 있어 요긴하게 활용할 수 있음 
- 주의! 이 패턴은 일반 라우터보다 뒤에 위치해야 한다는 것! => 다양한 라우터를 아우르는 와일드카드 역할을 함.
- => 일반 라우터보다는 뒤에 위치해야 다른 라우터를 방해하지 않음

- 에러가 발생하지 않았다? => 라우터는 요청을 보낸 클라이언트에게 응답을 보내주어야 함
- 응답 메서드는 여러 가지 But, 이 책에선 send, sendFile, json, redirect, render를 주로 사용함

- send : 만능 메서드 - 버퍼 데이터나 문자열을 전송 or HTML 코드를 전송하기도 함 or JSON 데이터도 전송할 수 있음 
- sendFile - 파일을 응답으로 보내주는 메소드
- json - JSON 데이터를 보내줌, redirect - 응답을 다른 라우터로 보내버림
- ex) 로그인 완료 후 다시 메인 화면으로 돌아갈 떄 => res.redirect(메인 화면 주소)를 하면?
```javascript
    res.send(버퍼 또는 문자열 또는 HTML 또는 JSON)
    res.sendFile(파일 경로);
    res.json(JSON 데이터);
    res.redirect(주소);
    res.render('템플릿 파일 경로', { 변수 });
```
- 기본적으로 200 HTTP 상태 코드를 응답(res.redirect는 302), 직접 바꿔줄 수도 있음 => status 메서드를 먼저 사용하면 됨.
```javascript
    res.status(404).send('Not Found')
```

- render 메서드 - 템플릿 엔진을 렌더링할 때 사용함 => views 폴더 안 pug 확장자를 가지고 있는 파일들 => 템플릿 엔진 

* 주의! 응답을 여러 번 보내는 경우
    * 하나의 요청에 대한 응답은 한 번만 보내야 함. 두 번 이상 보내면...
    * Error: Can`t set headers after they are sent 
    * 이와 같은 에러? => 라우터에서 res 객체의 응답 메서드가 두 번 이상 사용되지 않았는지 점검해보아야 함!

* 라우터가 요청을 처리하지 못할 때? 
    * 요청을 처리할 수 있는 라우터가 없다면 => 다음 미들웨어로 넘어감 
    * 404 HTTP 상태 코드를 보내주어야 하므로 
        * 다음 미들웨어에서 새로운 에러를 만들고 에러의 상태코드를 404로 설정한 뒤 에러 처리 미들웨어로 넘겨 버림 

```javascript
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); // => 404 처리 미들웨어

// error handler => 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

# 6.5 템플릿 엔진 사용하기 

- HTML - 정적인 언어, HTML로 1000개나 되는 데이터를 모두 표현하고 싶다면? 
- 일일이 직접 코딩해서 넣어주어야 함. why? 자바스크립트로 표현하면 반복문으로 간단히 가능!

- 템플릿 엔진 - 자바스크립트를 사용해 HTML을 렌더링할 수 있게 해줌 
- 기존 HTML과는 문법이 살짝 다를 수도 있고, 자바스크립트 문법이 들어 있기도 함.
- ex) Pug, EJS에 대해 살펴보자!

# 6.5.1 Pug(Jade)

- 꾸준한 인기 -> 문법이 간단해 코드 양이 감소
```javascript
//  app.js에 반드시 들어가야 할 내용
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
```
- views 폴더 - 템플릿 파일들이 위치한 폴더를 지정 
- res.render 메서드 - 이 폴더 기준으로 템플릿 엔진을 찾아서 렌더링함.
- ex) res.render('index') => views/index.pug를 렌더링 
- ex) res.render('admin/main') => views/admin/main.pug를 렌더링 

- view engine : 어떠한 종류의 템플릿 엔진을 사용할지를 나타냄 -> 현재 pug로 설정됨

# 6.5.1.1 HTML 표현 

- 기존 HTML와 다르게 화살괄호(<>)와 닫는 태그가 없음, 탭 or 스페이스로만 태그의 부모 자식 관계를 규정 
- 탭 한 번, 스페이스 두 번 또는 스페이스 네 번 모두 상관 X
- 모든 파일에 동일한 종류의 들여쓰기를 적용! => 자식 태그 : 부모 태그보다 들여쓰기 되어 있어야 함
- 들여쓰기에 오류? -> 제대로 렌더링되지 않으니 주의!

- `doctype html` == `<!DOCTYPE HTML>`과 같음  html, head, title 태그에선 자식 태그일수록 한 단계씩 더 들여쓰기 되어 있는 모습!

* 화살괄호가 없으므로 태그의 속성도 조금 다르게 표현함! 
    * 태그명 뒤에 소괄호로 묶어 적어줍니다!
```pug
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
```
```html
<!DOCTYPE HTML>
<html> 
    <head>
        <title>익스프레스</title>
        <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
</html>
```

* 속성 중 아이디와 클래스가 있는 경우(div 태그인 경우 div 문자는 생략할 수 있음)
```pug
    #login-button
    .post-image
    span#highlight
    p.hidden.full
```
```html
    <div id="login-button"></div>
    <div class="post-image"></div>
    <span id="hightlight"></span>
    <p class="hidden full"></p>
```

* HTML 텍스트 : 태그 또는 속성 뒤에 한 칸을 띄고 입력하면 됨.
```pug
    p Welcome to Express 
    button(type='submit') 전송
```
```html
    <p>Welcome to Express</p>
    <button type="submit">전송</button>
```

* 에디터에서 텍스트를 여러 줄 입력하고 싶다면? => |(파이프)를 넣어줌  => HTML에선 한 줄로 나옴
```pug
    p
        | 안녕하세요.
        | 여러 줄을 입력합니다.
    br
        | 태그도 중간에 넣을 수 있습니다.
```
```html
<p>안녕하세요, 여러 줄을 입력합니다. <br />태그도 중간에 넣을 수 있음</p>
```

* style이나 script 태그로 CSS 또는 자바스크립트 코드를 작성하고 싶다면 => 태그 뒤에 점(.)을 붙여줌
```pug
    style.
        h1{
            font-size: 30px;
        }
    script
        var message = 'Pug';
        alert(message);    
```
```HTML
    <style>
        h1{
            font-size: 30px;
        }
    </style>
    <script>
        var message = 'Pug';
        alert(message);
    </script>
```

# 6.5.1.2 변수 

- HTML과 다르게 자바스크립트 변수를 템플릿에 렌더링할 수 있음! => res.render 호출 시 보내는 변수를 Pug가 처리해 줌 
```javascript
    // routes/index.js
    router.get('/', function(req, res, next){
        res.render('index', {title: 'Express'});
    });
```
* res.render(템플릿, 변수 객체) - 익스프레스가 res 객체에 추가한 템플릿 렌더링을 위한 메서드!
    * index.pug를 HTML으로 렌더링하면서 { title : 'Express' }라는 객체를 변수로 집어넣음
    * layout.pug, index.pug의 title 부분이 모두 Express 부분으로 치환됨. => 즉 HTML에도 변수를 사용할 수 있게 됨.
    * res.render 메소드 - 두 번째 인자로 변수 객체를 넣을 수도 있고

* app.js의 에러 처리 미들웨어처럼 res.locals 객체를 사용해 변수를 넣을 수도 있음 
```javascript
    router.get('/',function(req, res, next){
        res.locals.title = 'Express';
        res.render('index');
    });
```
- 템플릿 엔진이 res.locals 객체를 읽어 변수에 집어 넣음 
- 장점 : 현재 라우터 뿐만 아닌 다른 미들웨어에서도 res.locals 객체에 접근할 수 있음 => 다른 미들웨어에서 템플릿 엔진용 변수를 미리 넣을 수도 있음 

- Pug에서 변수는?
```pug
    h1=title
    p welcome to #{title}
    button(class=title, type='submit') 전송
    input(placeholder=title + ' 연습')
```
```html
    <h1>Express</h1>
    <p>Welcome to Express</p>
    <button class="Express" type="submit">전송</button>
    <input placeholder="Express 연습"/>
```
- 서버로부터 받은 변수 - 다양한 방식으로 Pug에서 사용할 수 있음 
- 변수를 텍스트로 사용하고 싶다면? 태그 뒤에 =을 붙인 후 변수를 입력! & 속성에도 =을 붙인 후 변수를 사용할 수 있음
- 텍스트 중간에 변수를 넣으려면? #{변수}를 사용하면 됨. => 변수가 그 자리에 들어감 
- #{}의 내부와 = 기호 뒷부분은 javascript로 해석 -> input 태그의 경우 javascript 구문을 써도 됨.
- => 서버에서 데이터를 클라이언트로 내려보낼 때, #{}와 =를 매우 빈번하게 사용함!

- 내부에 직접 변수 선언 가능 
- -를 먼저 입력하면 뒤에 javascript 구문을 작성할 수 있음 -> 여기에 변수를 선언하면 다음 줄 부터 해당 변수 사용 가능

```pug
- var node = 'Node.js'
- var js = 'Javascript'
p #{node}와 #{js}
```
```html
    <p>Node.js와 Javascript</p>
```
- Pug - 기본적으로 변수의 특수문자를 HTML 엔티티로 이스케이프 함.
- 이스케이프를 원하지 않는다면 => = 대신 !=를 사용하면 됨.
```pug
p= '<strong>이스케이프</strong>'
p!='<strong>이스케이프 하지 않음</strong>'
```
```html
<p>&lt;strong&gt;,이스케이프&lt;/strong&gt;</p>
<p><strong>이스케이프 하지 않음</strong></p>
```

* HTTP 엔티티와 이스케이프 
    * 자바스크립트 문자열과 HTML 텍스트를 혼용할 때 특수문자 때문에 가끔 에러가 발생!
    * ex) <strong>강조</strong> 같은 자바스크립트 문자열이 있다면? -> 이것을 HTML에 사용했을 때 태그로 오해할 소지가 존재!
    * 이를 방지하기 위해 특수 문자를 HTML 엔티티라는 코드로 변환! 
    * 대표적인 HTML 엔티티의 예 
    * < : &lt;, > : &gt;, & : &amp;, 띄어쓰기: &nbsp; " : &quot;, ' : &apos;

# 6.5.1.3 반복문 

- HTML과 다르게 반복문도 사용할 수 있음, 반복 가능한 변수인 경우일 때만 해당됨.
- each로 반복문을 돌림
```pug 
ul 
    each fruit in ['사과', '배', '오렌지','바나나', '복숭아']
    li = fruit
```
```html
<ul>
    <li>사과</li>
    <li>배</li>
    <li>오렌지</li>
    <li>바나나</li>
    <li>복숭아</li>
</ul>
```

- 반복문 사용 시 인덱스도 가져올 수 있음 
```pug
ul  
    each fruit, index in ['사과', '배','오렌지','바나나', '복숭아']
    li= (index + 1) + "번째 " + fruit  
```
```html
<ul>
    <li>1번째 사과</li>
    <li>2번쨰 배</li>
    <li>3번째 오렌지</li>
    <li>4번째 바나나</li>
    <li>5번째 복숭아</li>
</ul>
```

# 6.5.1.4 조건문 

- 조건문으로 편하게 분기 처리 가능! => if, else if, else 를 사용할 수 있음 
```pug
    // isLoggedIn 변수로 로그인 여부에 따라 다르게 HTML을 렌더링하는 예시!
    if isLoggedIn
        div 로그인 되었습니다.
    else 
        div 로그인이 필요합니다.
```
```html
    <!-- isLoggedIn이 true일 떄 -->
    <div>로그인 되었습니다.</div>
    <!-- isLoggedIn이 false일 때 -->
    <div>로그인이 필요합니다.</div>
```

- case문도 가능함
```pug
case fruit
    when 'apple'
        p 사과입니다.
    when 'banana'
        p 바나나입니다.
    when 'orange'
        p 오렌지입니다.
    default
        p 사과도 바나나도 오렌지도 아닙니다.
```
```html
    <!-- fruit이 apple일 때 -->
    <p>사과입니다.</p>
    <!-- fruit이 banana일 때 -->
    <p>바나나입니다.</p>
    <!-- fruit이 orange일 때 -->
    <p>오렌지입니다.</p>
    <!-- 기본값 -->
    <p>사과도 바나나도 오렌지도 아닙니다.</p>
```

# 6.5.1.5 include 

- 다른 Pug나 HTML파일을 넣을 수 있음 
- 헤더, 푸터, 내비게이션처럼 웹 제작 시 공통되는 부분을 따로 관리할 수 있어 매 페이지마다 동일한 HTML을 넣어야 하는 번거로움을 없애줌 
- include 파일 경로로 사용함.
```pug
    //header.pug
    header
        a(href='/') Home
        a(href='/about') About
    //footer.pug
    footer
        div 푸터입니다.
    //main.pug
    include header
    main 
        h1 메인 파일
        p 다른 파일을 include할 수 있음 
    include footer
```
```html
<header>
    <a href="/">Home</a>
    <a href="/about">About</a>
</header>
<main>
    <h1>메인 파일</h1>
    <p>다른 파일을 include할 수 있음.</p>
</main>
<footer>
    <div>푸터입니다.</div>
</footer>
```

# 6.5.1.6 extends와 block 

- 레이아웃을 정할 수 있음, 공통되는 레이아웃 부분을 따로 관리할 수 있어 좋음 => include와도 함께 사용하곤 함.
```pug
    // layout.pug
    doctype html
    html
        head
            title= title
            link(rel='stylesheet', href='/stylesheets/style.css')
            block style
        body
            header 헤더입니다.
            block content
            footer 푸터입니다.
            block javascript
    
    // body.pug
    extends layout

    block content
        main 
            p 내용입니다.

    block javascript
        script(src="/javascripts/main.js")

```

```html
    <html>
        <head>
            <title>Express</title>
            <link rel="stylesheet" href="/stylesheets/style.css"/>
        </head>
        <body>
            <header>헤더입니다.</header>
            <main>
                <p>내용입니다.</p>
            </main>
            <footer>푸터입니다.</footer>
            <script src="/javascripts/main.js"></script>
        </body>
    </html>
```

- 레이아웃이 될 파일엔 공통된 마크업을 넣되, 페이지마다 달라지는 부분을 block으로 비워두자.
- block은 여러 개 만들어도 되고, block을 선언하는 방법 : block [블록명]

- block이 되는 파일에선 extends 키워드로 레이아웃 파일을 지정하고 block 부분을 넣어줌 
- block 선언보다 한 단계 더 들여쓰기 되어 있어야 함.
- 나중에 Express에서 res.render('body');를 사용해 하나의 HTML로 합쳐 렌더링할 수 있음 => Pug 확장자는 생략 가능 
- block 부분이 서로 합쳐짐 


* 기본적으로 만들어진 Pug 파일들은?

```pug
//index.pug
extends layout

block content
  h1= title
  p Welcome to #{title}

// layout.pug
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content

// error.png
extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}
```
- index.pug -> extends layout과 block content가 존재 
- layout.pug의 block content 부분에 index.pug, block content를 넣음 
- index.pug는 title이라는 변수를 받아 렌더링

- error.pug도 block content 부분이 layout.pug와 연결됨 
- 라우터로부터 message와 error 변수를 받아 렌더링

# 6.5.2 EJS

- EJS? Pug의 HTML 문법 변화에 적응하기 힘든 사람들을 위한 템플릿 엔진 
- HTML 문법을 그대로 사용하되, 추가로 자바스크립트 문법을 사용할 수 있음 => 자바와 JSP 문법이 상당히 유사

```javascript
    // app.js
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
```

- ejs 패키지도 설치해야 함. 
```javascript
    npm i ejs
```

# 6.5.2.1 변수

- EJS에서 변수는 <%= %>로 감쌈 
```ejs
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <button class="<%= title %>" type="submit">전송</button>
    <input placeholder="<%= title + '연습' %>" />
```
```html
    <h1>Express</h1>
    <p>Welcome to Express</p>
    <button class="Express" type="submit">전송</button>
    <input placeholder="Express 연습" />
```
- 내부에 변수를 사용할 수도 있음, 자바스크립트 코드는 <% %>안에 적어줌

```ejs
    <%
        var node = 'Node.js'
        var js = 'Javascript'
    %>
    <p><%= node %>와 <%= js %></p>
```
```html
    <p>Node.js와 Javascript</p>
```

- HTML을 이스케이프하고 싶지 않다면 <%- %>로 감싸줌 

```ejs
    <p><%= '<strong>이스케이프</strong>' %></p>
    <p><%- '<strong>이스케이프</strong>' %></p>
```
```html
    <p>&lt;strong&gt;이스케이프&lt;/strong&gt;</p>
    <p><strong>이스케이프하지 않음</strong></p>
```

# 6.5.2.2 반복문 

- EJS - 자바스크립트 코드를 <% %>안에 씀 => 반복문도 이 안에 됨. Pug처럼 다른 문법 존재 X => for, while 같은 반복문을 사용하자!
```ejs
<ul>
    <% var fruits = ['사과', '배', '오렌지', '바나나', '복숭아'] %>
    <% for (var i =0;i<fruits.length;i++) { %>
        <li><%= fruits[i] %></li>
    <% } %>
</ul>
```
```html
<ul>
    <li>사과</li>
    <li>배</li>
    <li>오렌지</li>
    <li>바나나</li>
    <li>복숭아</li>
</ul>
```

# 6.5.2.3 조건문 

- 조건문도 <% %> 안에 씁니다.
```ejs
<% if (isLoggedIn) { %>
    <div>로그인 되었습니다.</div>
<% } else { %>
    <div>로그인이 필요합니다.</div>
<% } %>

```
```html
<!-- isLoggedIn이 true일 때 -->
<div>로그인 되었습니다.</div>
<!-- isLoggedIn이 false일 때 -->
<div>로그인이 필요합니다</div>
```

- case 문도 사용 가능함.
```ejs
<% switch(fruit) { %>
<% case 'apple' : %>
    <p>사과입니다.</p>
<% case 'banana' : %>
    <p>바나나입니다.</p>
<% case 'orange' : %>
    <p>오렌지입니다.</p>
<% default : %>
    <p>사과도 바나나도 오렌지도 아닙니다. </p>    
<% } %>
```
```html
<!-- fruit이 apple일 때 -->
<p>사과입니다.</p>
<!-- fruit이 banana일 때 -->
<p>바나나입니다.</p>
<!-- fruit이 orange일 때 -->
<p>오렌지입니다.</p>
<!-- 기본값 -->
<p>사과도 바나나도 오렌지도 아닙니다.</p>
```

# 6.5.2.4 include 

- HTML 파일을 포함하려면 <%- include(파일 경로, 데이터) %>을 하면 됨.
```ejs
    <!-- body.ejs -->
    <!DOCTYPE html>
    <html>
        <head>
            <title><% = title %></title>
            <link rel='stylesheet' href='/stylesheets/style.css'/>
        </head>
        <body>
            <%- include('header')%>
            <div>내용입니다.</div>
            <%- include('footer', { category : 'Node.js' }) %>
        </body>
    </html>

    <!-- header.ejs -->
    <header>헤더입니다.</header>

    <!-- footer.js -->
    <footer>푸터입니다. 변수 : <%= category%></footer>
```
```html
<!DOCTYPE html>
<html>
<head>
    <title>Express</title>
    <link rel='stylesheet' href='/stylesheets/style/css' />
</head>
<body>
    <header>헤더입니다.</header>
    <div>내용입니다.</div>
    <footer>푸터입니다. 변수: Node.js</footer>
</body>
</html>
```

- 아쉽지만, EJS : Pug의 layout, block은 지원하지 않음 
- => include로 중복되는 부분을 집어넣는 방식을 사용해야 함.

- Express-generator가 기본적으로 생성한 Pug 파일을 EJS로 바꾸면?
```ejs
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
    <head>
        <title><%= title%></title>
        <link rel='stylesheet' href='/stylesheets/style.css'>
    </head>
    <body>
        <h1><%= title%></h1>
        <p>Welcome to <%= title%></p>
    </body>
</html>

<!-- views/error.ejs -->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel='stylesheet' href='/stylesheets/style.css' />
    </head>
    <body>
        <h1><%= message%></h1>
        <h2><%= error.status %></h2>
        <pre><%= error.stack %></pre> 
    </body>
</html>
```
- head 태그 같이 중복되는 부분은? => 나중에 별도의 파일로 분리하여 include로 넣으면 됨.

- Pug, EJS, Nunjucks, Hogan, Dust, Twig, Vash 등의 템플릿 엔진이 존재! -> 문법만 다르고 핵심 기능은 비슷!
- 깔끔한 문법이 좋은 거 같기도 한데 => 난 Pug 연습해야지

# 6.5.3 에러 처리 미들웨어 

```javascript
// app.js에서
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

1. error라는 템플릿 파일을 렌더링 
    * 렌더링 시, res.locals.message와 res.locals.error에 넣어준 값을 함께 렌더링
    * res.render에 변수를 대입하는 것 외에도, res.locals 속성에 값을 대입해 템플릿 엔진에 변수를 주입할 수 있음!

2. error 객체 - 시스템 환경이 development(개발 환경)이 아닌 경우에만 표시됨. 
    * 배포 환경인 경우 - 에러 메시지가 표시되지 않음
    * 에러 메시지가 노출되면 보안에 취약할 수 있기 때문에.

3. res.app.get(키)? - req.app을 통해 app 객체에 접근하는 것 
    * app.get(키)가 app.set(키)로 설정했던 것을 가져오는 코드 -> req.app.get(키)로도 가능
    * ex) app.set('view engine', 'pug')를 했다면 => app.get('view engine')으로 pug라는 값을 가져올 수 있음 

```javascript
// view/error.pug
extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}
```
- if 404 에러가 발생한다면? message는 Not Found가 됨. => 404 처리 미들웨어에서 넣어준 값을 사용함.
- error.status는 404가 되고, error.stack - 에러에 관한 상세한 메시지가 표시됨.
- 배포 환경에선 error 부분이 렌더링 되지 않을 것!

- `참고 자료는 책을 확인하자` 

















