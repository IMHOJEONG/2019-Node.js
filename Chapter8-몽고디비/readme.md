# 8 - 몽고디비 

- MySQL만 알고 있어도 많은 곳에서 사용할 수 있지만, 다른 유형의 데이터베이스인 몽고디비(mongoDB)를 알아보자 -> 더욱 많은 프로그램에서 확인 가능!
* 특징 - 자바스크립트 문법을 사용한다! 
    * 노드도 자바스크립트를 사용 -> 데이터베이스마저 몽고디비를 사용한다면 Javascript만 사용해 웹 애플리케이션을 만들 수 있음 
    * 하나의 언어만 사용하면 됨 -> 생산성도 매우 높음 
    * 몽고디비 - 특색이 뚜렷한 NoSQL => 특징을 잘 알 필요가 있음 

# 8.1 NoSQL vs SQL

- MySQL - SQL을 사용하는 대표적인 데이터베이스 / NoSQL(Not only SQL) - 몽고디비가 대표 주자

SQL(MySQL)|NoSQL(몽고디비)
----------|-------------
규칙에 맞는 데이터 입력 | 자유로운 데이터 입력
테이블 사이의 JOIN 지원 | 컬렉션 사이의 JOIN 미지원
트랜잭션 지원 | 트랜잭션 미지원
안정성, 일관성 | 확장성, 가용성 
용어(테이블, 로우, 컬럼) | 용어(컬렉션, 다큐먼트, 필드)

- NoSQL - 고정된 테이블이 없음  => 컬렉션이라는 개념이 있지만 컬럼을 따로 정의하지 않음 
- ex) MySQL - users 테이블 만들 때 -> name, age, married 등의 컬럼과 자료형, 옵션 등을 정의 
- ex) 몽고디비 - 그냥 users 컬렉션을 만들고 끝 => users 컬렉션에는 어떠한 데이터라도 다 포함될 수 있음 
- 어떤 다큐먼트(MySQL의 로우에 해당하는 개념)에는 name, age, married 데이터가, 다른 다큐먼트에는 name, comment, createdAt, updatedAt 등의 데이터가 포함될 수 있음

* 몽고디비 - MySQL과 달리 JOIN 기능이 없음 
    * JOIN을 흉내낼 수 있지만, 하나의 쿼리로 여러 테이블을 합치는 작업이 항상 가능하지는 않음   
    * 트랜잭션을 지원하지 않는 것!(트랜잭션 - 여러 쿼리가 모두 정상적으로 수행되거나 아예 하나도 수행되지 않음을 보장하는 기능)
        * 아예 없지는 않지만, MySQL 처럼의 수준의 트랜잭션은 없음 -> 데이터 일관성에 문제가 생길 수 있음 
        * Note! - 대중적으로 사용되는 몽고디비 버전은 3! -> 4부터 트랜잭션을 지원하겠다고 발표함 => 데이터의 일관성을 유지하는 데 큰 도움이 될 듯
    * 사용하는 이유 - 확장성과 가용성 때문 => 데이터의 일관성을 보장해주는 기능이 약한 대신 데이터를 빠르게 넣을 수 있고, 쉽게 여러 서버에 데이터를 분산할 수 있음 
    * MySQL의 테이블, 로우, 컬럼 => 몽고디비에선 컬렉션, 다큐먼트, 필드라고 부름

* Application을 만들 때 꼭 한 가지 Database만 사용해야 하는 것 아님!
    * SQL과 NoSQL을 동시에 사용을 많이 함 => 개개 특징이 달라 알맞은 곳에 사용하면 됨.
    * ex) 항공사 예약 시스템의 경우 비행기 표에 관한 정보가 모든 항공사에 일관성있게 전달되어야 함 -> 예약 처리 부분에선 MySQL 사용
    * => 대신 핵심 기능 외의 빅데이터, 메시징, 세션 관리 등엔 확장성, 가용성을 위해 몽고디비를 사용할 수도 있음 

# 8.2 몽고디비 설치 

[몽고디비 설치 매뉴얼](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```console
<!-- 실행 -->
$ sudo service mongod start

<!-- 종료 -->
$ sudo service mongod stop

<!-- 재시작 -->
$ sudo service mongod restart

$ mongo
```
- 콘솔에 mongo 명령어 입력하면 접속 => 프롬프트가 >로 바뀌었다면 성공 -> 현재는 누구나 몽고디비에 접속할 수 있으므로 관리자 계정을 추가!
```mongo
use admin
```

![adduser](https://user-images.githubusercontent.com/11308147/71546835-8d19a200-29dd-11ea-8023-632dffbfef4b.png)

- db.createUser 메서드로 계정을 생성할 수 있음 - user에 사용자 이름을 넣고, pwd 자리에 사용할 비번을 입력 => 이 비번은 기억하고 있어야 함
- roles로는 현재 모든 권한이 있는 root를 부여 -> 나중에 실무에선 상황에 맞는 역할을 부여하면 됨.

![prompt](https://user-images.githubusercontent.com/11308147/71546838-960a7380-29dd-11ea-90ab-862ac80376a1.png)
![security](https://user-images.githubusercontent.com/11308147/71546841-999dfa80-29dd-11ea-9a20-569e97f1dbf9.png)

- vi를 통해 /etc/mongod.conf의 주석 처리된 security를 수정 후 :wq로 저장 
- 다시 mongod를 실행 후, mongo admin -u 이름 -p 비밀번호 명령어로 접속하자.

![test](https://user-images.githubusercontent.com/11308147/71546848-a3bff900-29dd-11ea-8782-48c3b152a8da.png)

- 윈도우, macOS에서는 따로 진행하지 않았습니다.
  - 윈도우는 이미 설치되어 있고, 맥은 사용하질 않아서 ㅠㅠ

# 8.3 컴퍼스 설치
 - 윈도우에는 이미 되어있어서 리눅스로만 진행하겠습니다.

- 몽고디비 - 관리도구로 컴퍼스를 제공, 몽고디비 공식 사이트에서 받을 수 있음 => GUI를 통해 데이터를 눈으로 관리할 수 있어 편리함 => 필수적인 것은 아님!

# 8.4 데이터베이스 및 컬렉션 생성하기

- nodejs라는 이름의 데이터베이스와 MySQL의 테이블과 상응하는 컬렉션들을 만들어보자! => 몽고디비 프롬프트에 접속한 후 진행하면 됨.

* 데이터베이스를 만드는 명령어 - use 데이터베이스명 
```console
> use nodejs
```
* 데이터베이스 목록 확인 명령어 - show dbs
```console
> show dbs
```
![showdbs](https://user-images.githubusercontent.com/11308147/71546856-be926d80-29dd-11ea-86cc-deba3f53c581.png)

- 왜 방금 생성한 nodejs가 없지? => 데이터를 최소 한 개 이상 넣어야 목록에 표시됨 

* 현재 사용중인 데이터베이스를 확인하는 명령어 - db
    * 비록 데이터베이스 목록에는 없지만 현재 nodejs 데이터베이스를 사용하고 있음을 확인할 수 있음 
    * 컬렉션은 따로 생성할 필요가 없음 -> 다큐먼트를 넣으면 컬렉션도 자동으로 생성됨 => 직접 컬렉션을 생성하는 명령어가 있긴 함
```console
> db
> db.createCollection('users')
> db.createCollection('comments')
```
* 생성한 컬렉션 목록을 확인 - show collections
```console
> show collections
```
![db](https://user-images.githubusercontent.com/11308147/71546865-c4884e80-29dd-11ea-848d-f6f88f336804.png)

- 컴퍼스 활용해서 하는 것은 쉽기 때문에 생략하였습니다.

# 8.5 CRUD 작업하기(in 몽고디비)

- 8.5.1 Create(생성)

- 컬렉션에 컬럼을 정의하지 않아도 됨 => 컬렉션에는 아무 데이터나 넣을 수 있음 => 이러한 자유로움(몽고디비의 장점) But, 무엇이 들어올지 모른다는 단점도 존재
- 몽고디비의 자료형 - MySQL과는 조금 다름 => 기본적으로 몽고디비는 자바스크립트 문법을 사용함 => 자바스크립트의 자료형을 따름 + 추가로 몇가지 자료형이 더 있음 

* Date, 정규표현식 처럼 자바스크립트 객체를 자료형으로 사용 가능 & Binary Data, ObjectId, Int, Long, Decimal, Timestamp, JavaScript 등의 추가적인 자료형이 있음 
    * Undefined, Symbol은 몽고디비에서 자료형으로 사용하지 않음!
    * 추가적인 자료형 중 ObjectId, Binary Data, Timestamp 외에는 잘 사용되지 않음 
    * ObjectId? =>  MySQL에서 기본키로 쓰이는 value와 비슷한 역할을 한다고 알면 됨. => 고유한 value를 가지므로 다큐먼트를 조회할 때 사용할 수 있음 
![documentmake](https://user-images.githubusercontent.com/11308147/71546869-d0741080-29dd-11ea-8c4f-32df0bbc0830.png)

- 이전 실습에서 몽고디비의 관리자만 편집가능하게 바꾸어 로그인도 관리자로 해주어야 함.

* db.컬렉션명.save(다큐먼트) - 다큐먼트 생성 => 자바스크립트 객체처럼 생성하면 됨.
    * new Date() - 현재 time을 입력하라는 뜻 => 명령이 성공적으로 수행되었다면 WriteResult({ "nInserted":1})이라는 응답 => 다큐먼트 한 개가 생성되었다는 뜻(실패하면 에러 내용이 응답으로 뜸)

- comments 컬렉션에도 데이터를 넣어보자 => zero의 댓글을 넣을 것 -> zero의 아이디를 알아야 함.
- db.users.find를 통해 zero의 ID를 알고 => 사용자마다 이 문자의 value가 다름 
- db.comments.save(다큐먼트)를 통해 저장
![commentsmake](https://user-images.githubusercontent.com/11308147/71546872-db2ea580-29dd-11ea-967c-50b75558c23b.png)

# 8.5.2 Read(조회)

- 생성한 다큐먼트들을 조회해보자!
* find({}) - 컬렉션 내 모든 다큐먼트를 조회하라는 뜻 
```console
> mongo
> db.users.find({})
> db.comments.find({})
```
![documentsearch](https://user-images.githubusercontent.com/11308147/71546878-eb468500-29dd-11ea-922a-8d64a126768a.png)

* 특정 필드만 가져오고 싶다면 find 메서드의 두 번째 인자로 조회할 필드를 넣으면 됨. 
    * 1 또는 true로 표시한 필드만 가져옴 
    * _id는 기본적으로 가져오게 되어 있음 => 0 또는 false를 입력해 가져오지 않도록 해야함.
    * => 조회 시 조건을 주려면 첫 번째 인자 객체에 기입하면 됨 
```console
> mongo
> db.users.find({},{ _id: 0, name: 1, married: 1});
> db.users.find({ age: { $gt : 30 }, married: true}, { _id:0, name:1, age:1})
```
![find](https://user-images.githubusercontent.com/11308147/71546882-f26d9300-29dd-11ea-9fe6-52c0b4c18f9e.png)

* $gt라는 속성? - 시퀄라이즈 쿼리와 비슷 => 몽고디비 - 자바스크립트 객체를 사용해서 명령어 쿼리를 생성해야 함 => $gt 처럼 특수한 연산자가 사용됨.
    * $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(same하지 않음), $or(또는), $in(배열 요소 중 하나) 등이 존재
    * 몽고디비 - OR 연산 - $or를 사용함 
        * age가 30 초과이거나 married가 false인 다큐먼트 조회
        * $or에 주어진 배열 안의 조건들을 하나라도 만족하는 다큐먼트를 모두 찾음 
```console
> db.users.find({ $or: [{$age: {$gt:30}}, {married: false}]}, {_id:0,name:1,age:1});
```
![find2](https://user-images.githubusercontent.com/11308147/71546888-fbf6fb00-29dd-11ea-8928-e7a0ec51a39c.png)

* 정렬도 가능함 => sort 메서드를 사용하면 됨.  
    * -1 : 내림차순, 1은 오름차순 => -1을 사용해보자
```console
> db.users.find({},{ _id: 0, name: 1, age:1}).sort({ age: -1 })
```
![sort](https://user-images.githubusercontent.com/11308147/71546891-07e2bd00-29de-11ea-9813-c7ea33e6c0ba.png)

* 조회할 다큐먼트 개수를 설정 => limit 메서드를 사용!
```console
> db.users.find({},{_id:0, name:1, age:1}).sort({age:-1}).limit(1)
```
* 다큐먼트 개수를 설정하면서 몇 개를 건너뛸지 설정 => skip 메서드를 사용
```console
> db.users.find({}, {_id:0, name:1, age:1}).sort({age:-1}).limit(1).skip(1)
```
![limitAndSkip](https://user-images.githubusercontent.com/11308147/71546907-25b02200-29de-11ea-90df-c087394db6d4.png)

- 이외에도 많은 쿼리가 있음 -> 이 정도면 앞으로의 실습으론 충분

# 8.5.3 Update(수정)

```console
$ mongo
> db.users.update({ name: 'nero'},{ $set: { comment: '안녕하세요. 이 필드를 바꾸어보겠습니다!'}});
```
![update](https://user-images.githubusercontent.com/11308147/71546916-395b8880-29de-11ea-98cb-a074fc6b4f71.png)
* 첫 번째 객체 - 수정할 다큐먼트를 지정하는 객체 / 두 번째 객체 - 수정할 내용을 입력하는 객체 
    * $set이라는 연산자가 사용됨 - 어떤 필드를 수정할지 정하는 연산자 
    * 이 연산자를 사용하지 않고 일반 객체를 넣는다? => 다큐먼트가 통째로 두 번째 인자로 주어진 객체로 수정되어 버림
    * => 일부 필드만 수정하고 싶을 때는 반드시 $set 연산자를 지정해주어야 함. -> 수정 성공 시, 첫 번째 객체에 해당하는 다큐먼트 수(nMatched), 수정된 다큐먼트 수(nModified)가 나옴

# 8.5.4 Delete(삭제)

* 삭제할 다큐먼트에 대한 정보가 담긴 객체를 첫 번째 인자로 제공하면 됨. => 성공 시 삭제된 개수가 반환됨.
```console
$ mongo
> db.users.remove({ name: 'nero'});
```

- 다음 작업! -> 몽고디비를 노드와 연동해 서버에서 데이터베이스를 조작할 수 있게 해야 함.
- 노드와 몽고디비를 연동 & 쿼리까지 만들어주는 라이브러리가 존재 => 몽고디비 자체로도 자바스크립트 쿼리를 사용함 But => 이 라이브러리 쓰면 더 쉽게 만들 수 있음 

> 8.6 몽구스 사용하기

- MySQL에 시퀄라이즈 => 몽고디비에는 몽구스(Mongoose)가 있음 

- 몽구스 : ODM(Object Document Mapping) - why? 몽고디비는 릴레이션이 아니라 다큐먼트를 사용하기 때문에 
- 몽고디비 자체가 이미 자바스크립트 => 근데 왜 자바스크립트 객체와 매핑??? - why? 몽고디비에 없어서 불편한 기능들을 몽구스가 보완해주기 때문

* 스키마가 생김 - 몽고디비 : 테이블이 없어 자유롭게 데이터를 넣을 수 있음(자유로움이 불편함을 줄 때가 존재) 
    * ex) 실수로 잘못된 자료형의 데이터를 넣을 수도 있고 다른 다큐먼트에는 없는 필드의 데이터를 넣을 수도 있음
    * 몽구스 - 몽고디비에 데이터를 넣기 전 노드 서버 단에서 데이터를 한 번 필터링하는 역할을 함.
    * MySQL에 있는 JOIN기능을 populate라는 메서드로 어느 정도 보완해줌! => 관계가 있는 데이터를 쉽게 가져올 수 있어 
        * 쿼리 한 번에 데이터를 합쳐서 가져오는 것은 아님 -> 작업을 직접하지 않아도 되므로 편리..
    * ES2015 프로미스, 쿼리 빌더(가독성, strong)를 지원
```console
$ express learn-mongoose --view=pug
```

![mongoose](https://user-images.githubusercontent.com/11308147/71546929-44aeb400-29de-11ea-8458-d568e267fff4.png)


```console
<!-- learn-mongoose 폴더 이동 및 npm 패키지를 설치 -->
$ cd learn-mongoose && npm i

<!-- 몽구스 설치 -->
$ npm i mongoose
```

> 8.6.1 몽고디비 연결하기 

- 노드와 몽고디비를 몽구스를 통해 연결 -> 몽고디비는 주소를 사용해 연결!

* 주소 형식 
```console
mongodb://[username:password@]host:[:port][/[database]][?options]
<!-- 이 형식으로 연결 => [] 부분 - 있어도 되고 없어도 됨. -->
```
- username, password => 몽고디비 계정 이름, 비밀번호를 넣어줌 => host : localhost, port : 27017, 계정이 있는 database가 admin 
- 주소는 mongodb://이름:비밀번호@localhost:27017/admin이 될 것

1. schemas 폴더를 루트 리텍터리에 생성 -> 그 안에 index.js 파일 생성 
```javascript
// schema => index.js
const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {

        // 1) 개발 환경이 아닐 때 몽구스가 생성하는 쿼리 내용을 콘솔을 통해 확인할 수 있는 부분 
        if(process.env.NODE_ENV !== 'production')
        {
            mongoose.set('debug', true);
        }

        // 2) 몽구스, 몽고디비를 연결하는 부분 => 몽고디비 주소로 접속을 시도 => 접속을 시도하는 주소의 데이터베이스는 admin이지만, 
        // 실제로 사용할 데이터베이스는 nodejs이므로 두 번째 인자로 dbName 옵션을 주어 nodejs 데이터베이스를 사용하게 함.
        // 마지막 인자로 주어진 콜백 함수를 통해 연결 여부 확인
        mongoose.connect('mongodb://root:root@localhost:27017/admin', {
            dbName: 'nodejs'
        }, (error)=>{
            if(error){
                console.log('몽고디비 연결 에러', error);
            }
            else{
                console.log('몽고디비 연결 성공');
            }
        });
    };

    // 3) 몽구스 커넥션에 이벤트 리스너를 달아둠 => 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도함
    connect();
    mongoose.connection.on('error', (error)=>{
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', ()=>{
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
        connect();
    });

    // 4) 다음에 정의할 User 스키마와 Comment 스키마를 연결하는 부분
    require('./user');
    require('./comment');
};
```

2. schemas/index.js를 app.js와 연결해 노드 실행 시 mongoose.connect 부분도 실행하도록 하자.
```javascript
// app.js
var usersRouter = require('./routes/users');
var connect = require('./schemas');

var app = express();
connect();
```

# 8.6.2 스키마 정의하기 

- 시퀄라이즈에서 테이블을 만들었던 것처럼 => 몽구스 스키마(schema)를 만들어보자 

1. schemas 폴더에 user.js와 comment.js를 만들자
```javascript
// schemas/user.js
const mongoose = require('mongoose');

const { Schema } = mongoose;
// 1) 몽구스 모듈에서 Schema 생성자를 사용해 스키마를 만듬 
// 시퀄라이즈에서 모델을 정의하는 것과 비슷 => 필드를 개개로 정의!
const userSchema = new Schema({
    name: {
        type: String,
        required : true,
        unique : true,
    },
    age :{
        type: Number,
        required: true,
    },
    married : {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
```

* 몽구스 스키마에서 특이한 점 - String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array를 value로 가질 수 있다는 점! 
    * name 필드의 자료형 - String이고 필수이며 고유한 value이어야 함
    * age 필드 - Number 자료형, 필수 / married - Boolean 자료형이고 필수
    * comment - String 자료형
    * required나 default 등의 옵션이 필요하지 않다면 쉽게 자료형만 명시하면 됨.
    * createdAt 필드 - Data 자료형이고 기본 value는 Date.now(데이터 생성 당시의 time)
    * 마지막에 => 몽구스의 model 메서드로 스키마와 몽고디비 컬렉션을 연결하는 모델을 만들자.

```javascript
// schemas/comment.js
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        require: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);
```
* commeter 속성만 보면, 자료형이 ObjectId, 옵션으로 ref 속성의 value가 User로 주어져 있음 
    * => commenter필드에 User 스키마의 사용자 ObjectId가 포함된다는 뜻 
    * 나중에 몽구스가 JOIN과 비슷한 기능을 할 때 사용됨.

* Note! 컬렉션 이름 바꾸기 
    * 몽구스 - model 메서드의 첫 번째 인자로 컬렉션 이름을 만듬
    * 첫 번째 인자가 User이면 첫 글자를 소문자로 만든 뒤 복수형으로 바꿔서 users 컬렉션을 생성 
    * Comment라면 => comments 컬렉션이 됨 
    * 이러한 임의대로 바꾸어지는 게 싫다면, 세 번째 인자로 컬렉션 이름을 줄 수 있음 
```javascript
    mongoose.model('User', userSchema, 'user_table');
```
- => users 컬렉션 대신 user_table 컬렉션이 생성됨.

# 8.6.3 쿼리 수행하기 

- 몽구스 사용한 쿼리 수행 

1. views 폴더 안 mongoose.pug 파일을 만듬 

2. routes/index.js -> 라우터를 작성 
```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({})
    .then((users)=>{
      res.render('mongoose',{ users });
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

module.exports = router;
```
* GET /로 접속했을 때의 라우터 => User.find({}) 메서드로 모든 사용자를 찾은 뒤, mongoose.pug를 렌더링할 때 users 변수로 넣어줌 
    * find 메서드는 User 스키마를 require한 뒤 사용할 수 있음 => 몽고디비의 db.users.find({}) 쿼리
    * 몽구스 - 기본적으로 프로미스를 지원하므로 then, catch를 사용해서 개개 조회 성공 시와 실패 시 정보를 얻을 수 있음 
        * 미리 데이터베이스에서 데이터를 조회한 후 템플릿 렌더링에 사용할 수 있음 
    * async/await 문법으로 표현하면...
```javascript
 router.get('/', async (req,res,next)=>{
     try {
         const users = await User.find();
         res.render('mongoose', { users });
     } 
     catch (error){
         console.error(error);
         next(error);
     }
 });
```

3. users.js의 수정 -> 프로미스 형식으로 추가!
```javascript
router.get('/', function(req, res, next) {
  User.find({})
    .then((users)=>{
      res.json(users);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});


router.post('/', function(req, res, next){
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });
  user.save()
    .then((result)=>{
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});
```
* GET /users와 POST /users 주소로 요청이 들어올 때의 라우터 => 개개 사용자를 조회하는 요청, 사용자를 등록하는 요청을 처리 
    * GET /에서도 사용자 데이터를 조회했지만, GET /users에서는 데이터를 JSON 형식으로 반환한다는 것에 차이가 있음 
    * 사용자를 등록할 때는 먼저 모델로 user 객체를 만든 후, 객체 안에 다큐먼트에 포함될 내용들을 넣어줌 => 그 후 save 메서드로 저장
    * 정의한 스키마에 부합하지 않는 데이터를 넣었을 때 -> 몽구스가 에러를 발생시킴 

4. comments.js 작성 
    * 댓글에 관련된 CRUD 작업을 하는 라우터 -> GET /comments, POST /comments, PATCH /comments/:id, DELETE /comments/:id를 등록
```javascript
router.get('/:id', function(req,res,next){
    Comment.find({ commenter: req.params.id }).populate('commenter')
        .then((comments) =>{
            console.log(comments);
            res.json(comments);
        })
        .catch((err)=>{
            console.error(err);
            next(err);(
        });
}); 
```
* => 게시글 다큐먼트를 조회하는 라우터 -> find 메서드에 옵션이 추가됨 
    1. 먼저 댓글을 쓴 사용자의 아이디로 댓글을 조회한 뒤 populate 메서드로 관련 있는 컬렉션의 다큐먼트를 불러올 수 있음 
        * Comment 스키마 commenter 필드의 ref가 User로 되어 있음 -> 알아서 users 컬렉션에서 사용자 다큐먼트를 찾아서 합침! 
        * commenter 필드가 사용자 다큐먼트로 치환됨! 
            * commenter 필드는 ObjectId가 아니라 그 ObjectId를 가진 사용자 다큐먼트가 됨.

```javascript
router.post('/', function(req, res, next){
    const comment = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    });
    comment.save()
        .then((result)=>{
            return Comment.populate(result, { path: 'commenter' });
        })
        .then((result)=>{
            res.status(201).json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});
```
* 다큐먼트를 등록하는 라우터 -> Comment 스키마로 comment 객체를 만들어 안에 다큐먼트 내용을 넣은 뒤 save 메서드로 저장함.
    * 프로미스의 결과로 반환된 result 객체를 populate 메서드로 User 스키마와 합침 
    * path 옵션으로 어떤 필드를 합칠지 설정해주면 됨! => save한 뒤에 populate를 하는 방법!

```javascript
router.patch('/:id', function(req, res, next){
    Comment.update({ _id: req.params.id} , {comment: req.body.comment})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});
```
* 다큐먼트를 수정하는 라우터 -> 수정에는 update 메서드를 사용함, 시퀄라이즈와는 반대로 update 메서드에는 어떤 다큐먼트를 수정할지에 대한 쿼리 객체를 첫 번째 인자로 제공!
    * 두 번째 인자로는 수정할 필드와 value가 들어있는 객체를 제공! => 몽고디비와 다르게 $set 연산자를 사용하지 않아도 기입한 필드만 바꿔줌
    * 실수로 다큐먼트를 통째로 수정할 일이 없어 안전!

```javascript
router.delete('/:id', function( req, res,next){
    Comment.remove({ _id: req.params.id })
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});
```
* 다큐먼트를 삭제하는 라우터 -> remove 메서드를 사용하여 삭제함! => remove 메서드에도 update 메서드와 유사하게 어떤 다큐먼트를 삭제할지 첫 번째 객체에 조건을 넣어줌 

5. 라우터를 서버에 연결! => app.js에서
    * express.static의 순서를 위로 올림
```javascript

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var connect = require('./schemas');

var app = express();
connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

```

* 서버 실행 전 몽고디비 서버를 먼저 실행! => 몽고디비 서버가 켜졌다면? 콘솔을 하나 더 열어 웹 서버를 실행해보자!

```console
$ sudo service mongod start
$ npm start 
```
![result](https://user-images.githubusercontent.com/11308147/71546995-79bb0680-29de-11ea-92b1-64eee1d090f4.png)


