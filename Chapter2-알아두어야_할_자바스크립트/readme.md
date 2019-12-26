알아두어야 할 자바스크립트
========================
- 2.1 ES2015+
  - 2.1.1 const, let
```javascript
    if(true) {
        var x = 3;
    }
    console.log(x); // 3

    if(true) {
        const y = 3;
    }
    console.log(y); // Uncaught ReferenceError: y is not defined
```

- x는 정상적 출력, y는 에러 발생 Why?
- var - 함수 스코프를 가짐 => if 문의 블록과 관계없이 접근할 수 있음
- const,let - 블록 스코프를 가짐 => 블록 밖에서는 변수에 접근할 수 없음
- 블록의 범위? if, while, for, function 등의 중괄호
- 함수 스코프 대신 블록 스코프의 사용 => 호이스팅 같은 문제도 해결 & 코드 관리의 수월

- const - 한 번 대입하면 다른 값을 대입할 수 없음. 다른 값을 대입하려하면 에러 발생, 초기화 시 값을 대입하지 않아도 에러 발생
```javascript
    const a = 0;
    a = 1; // Uncaught TypeError : Assignment to constatn variable.
    let b = 0;
    b = 1; // 1

    const c; // Uncaught SyntaxError : Missing initializer in const declaration
```
- 자바스크립트를 사용할 때 한 번 초기화했던 변수에 다른 값을 대입하는 경우는 의외로 적음
- 기본적으로 변수 선언 시에는 const를 사용하고, 다른 값을 대입해야 하는 상황이 생겼을 때 let을 사용하면 됨.

# 2.1.2 템플릿 문자열

- 큰따옴표나 작은 따옴표로 감싸는 기존 문자열과는 다르게 `(백틱)으로 감쌈.
- 특이한 점 : 문자열 안에 변수를 넣을 수 있다.
```javascript
    // 기존 ES5 문법
    var num1 = 1;
    var num2 = 2l
    var result = 3;
    var string1 = num1 + ' 더하기 ' + num2 + ' 는 \'' + result + '\'';
    console.log(string1); // 1 더하기 2는 '3'
```

- 문자열 string1 : 띄어쓰기, 변수, 더하기 기호 때문에 가독성이 떨어짐 && 작은 따옴표를 이스케이프하느라 코드가 지저분

```javascript
    const num3 = 1;
    const num4 = 2;
    const result2 =3;
    const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
    console.log(string2); // 1 더하기 2는 '3'
```

- ${변수} 형식으로 변수를 더하기 기호 없이 문자열에 넣을 수 있음.
- 기존 따옴표 대신 백틱을 사용하기 때문에 큰따옴표나 작은따옴표와 함께 사용 가능

# 2.1.3 객체 리터털 

```javascript
    var sayNode = function(){
        console.log('Node');  
    };
    var es = 'ES';
    var oldObject = {
        sayJS: function(){
            console.log('JS');
        }, 
        sayNode:sayNode,
    };
    oldObject[es+6] = 'Fantastic';

    oldObject.sayNode(); // Node
    oldObject.sayJS();// JS
    console.log(oldObject.ES6); // Fantastic
```

- oldObject 객체에 동적으로 속성을 추가하고 있음 
- 이걸 다시 쓸 수 있는데, 
```javascript
    const newObject = {
        sayJS(){
            console.log('JS');
        },
        sayNode,
        [es+6]: 'Fantastic',
    };

    newObject.sayNode(); // Node
    newObject.sayJS(); // JS
    console.log(newObject.ES6); // Fantastic
```
- oldObject와 newObject를 비교해서 보면 됨. sayJS 같은 객체의 메서드에 함수를 연결할 때 더는 콜론(:)과 function을 붙이지 않아도 됨.
- sayNode: sayNode처럼 속성명과 변수명이 겹치는 경우에는 한 번만 쓸 수 있게 됨.
- 자바스크립트에서 이런 경우가 많은데, 
```javascript
    {name:name, age:age} // ES5
    {name,age} // ES2015
```
- 객체의 속성명을 동적으로 생성 가능
- 예전 문법에선 ES6라는 속성명을 만들려면 객체 리터털(oldObject) 바깥에서 [es+6]를 해야 했지만,
- 객체 리터럴 안에 선언해도 됨. ex) newObject 안에서 [es+6]가 속성명으로 바로 사용되고 있음

- 객체 리터럴에 추가된 문법은 코딩 시 편의를 위해 만들어진 것이라는 느낌 
- 익숙해지면 코드의 양을 많이 줄일 수 있음

# 2.1.4 화살표 함수

- arrow function이라는 새로운 함수 추가, 기존의 function() {}도 그대로 사용가능

```javascript
    function add1(x,y){
        return x+y;
    }

    const add2 = (x,y) =>{
       return x+y;  
    };

    const add3 = (x,y) => x+y;

    const add4 = (x,y) => (x+y);

    function not1(X)
    {
        return !x;
    }
    const not2 = x => !x;
```
- add1, add2, add3, add4는 같은 기능을 하는 함수 / 마찬가지로 not1, not2도 같은 기능을 하는 함수
- 화살표 함수에선 function 선언 대신 => 기호로 함수를 선언함. + 변수에 대입하면 나중에 재사용 가능

- 화살표 함수 : return문을 줄일 수 있음, 중괄호 대신 add3, add4처럼 return할 식을 바로 적어주면 됨.
- add4처럼 보기 좋게 소괄호로 감쌀 수도 있음
- not2처럼 매개변수가 한 개면 매개변수를 소괄호로 묶어주지 않아도 됨.

- 기존의 function과 다른 점은 this 바인드 방식!

```javascript
    var relationship1 = {
        name:'zero',
        friends:['nero','hero','xero'],
        logFriends: function(){
            var that = this; // relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function(friend){
            console.log(that.name, friend);
        });
        },
    };
    relationship1.logFriends();

    const relationship2 = {
        name:'zero',
        friends: ['nero','hero','xero'],
        logFriends(){
            this.friends.forEach(friend => {
                console.log(this.name, friend);
            };
        },
    };
    relationship2.logFriends();
```

- relationship1.logFriends() 안의 forEach문에서는 function 선언문을 사용함.
- 각자 다른 함수 스코프의 this를 가지므로 that이라는 변수를 사용해서 relationship1에 간접적으로 접근하고 있음

- 하지만, relationship2.logFriends() 안의 forEach문에서는 화살표 함수를 사용했음. 
- 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있음. => 상위 스코프의 this를 그대로 물려받는 것.
- 따라서 기본적으로 화살표 함수를 쓰되, this를 사용해야 하는 경우에는 화살표 함수와 함수 선언문(function) 둘 중에 하나를 고르면 됨.

# 2.1.5 비구조화 할당 

- 이름은 어색하지만 매우 유용한 기능, 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있음
```javascript
    var candyMachine = {
        status:{
            name: 'node',
            count: 5,
        },
        getCandy: function(){
            this.status.count--;
            return this.status.count;
        }
    };
    var getCandy = candyMachine.getCandyl
    var count = candyMachine.status.count;
    // 객체의 속성을 같은 이름의 변수에 대입하는 코드
```
```javascript
    const candyMachine={
        status: {
            name:'node',
            count:5,
        },
        getCandy(){
            this.status.count--;
            return this.status.count;
        }
    };
    const { getCandy, status: { count }} = candyMachine;
```

- 당황스럽겠지만, 위 문법은 유효함, candyMachine 객체 안의 속성을 찾아서 변수와 매칭해줌
- count 처럼 여러 단계 안의 속성도 찾을 수 있음.
- getCandy와 count 변수가 초기화된 것 

- 배열도 비구조화 가능 
```javascript
    var array = ['nodejs',{},10,true];
    var node = array[0];
    var obj = array[1];
    var bool = array[array.length-1];
    // array란 배열의 첫 번째, 두 번째 요소와 마지막 요소를 변수에 대입하는 코드입니다.
    // 다음과 같이 변경 가능
    const array = ['nodejs',{},10,true];
    const [node,obj, ,bool] = array;
```
- 어색해 보이지만, 나름대로 규칙이 존재 => node, obj와 bool의 위치를 보면 node는 배열의 첫 번째 요소,
- obj는 두 번째 요소, bool은 마지막 요소라는 것을 알 수 있음. obj와 bool 사이의 요소들은 무시

- 비구조화 할당 문법 : 코드 줄 수를 상당히 줄여주므로 유용
- 특히 노드는 모듈을 사용하므로 이러한 방식을 자주 사용 

# 2.1.6 프로미스 

- 자바스크립트, 노드에선 주로 비동기 프로그래밍을 함. 특히 이벤트 주도 방식 때문에 콜백 함수를 자주 사용함.
- ES2015부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성됨. 
- 콜백 헬(callback hell)을 극복했다는 평가 

```javascript
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) =>{
    if(condition)
    {
        resolve('성공');
    }
    else{
        reject('실패');
    }
});

promise
    .then((message) =>{
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error)=>{
        console.error(error); // 실패(reject)한 경우 실행 
    });
```

- 프로미스에는 규칙이 존재.
    1. 먼저 프로미스 객체를 생성해준다.
    2. new Promise로 프로미스를 생성할 수 있고, 안에 resolvce와 reject를 매개변수로 갖는 콜백 함수를 넣어줌.
    3. 이렇게 만든 promise 변수에 then, catch 메서드를 붙일 수 있음.
    4. 프로미스 내부에서 resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행됨.
    5. resolve와 reject에 넣어준 인자는 각각 then, catch의 매개변수에서 받을 수 있는데,
        즉, resolve('성공')가 호출되면 then의 message가 '성공'이 됩니다. 
        만약 reject('실패')가 호출되면 catch의 error가 '실패'가 되는 것입니다.
    6.  then이나 catch에서 다시 다른 then, catch를 붙일 수 있음. 이전 then의 return 값을 다음 then의 매개변수로 넘김
        프로미스를 return한 경우 프로미스가 수행된 후 다음 then이나 catch가 호출됨.

```javascript
    promise
        .then((message)=>{
            return new Promise((resolve, reject) => {
                resolve(message);
            });
        })
        .then((message2)=>{
            console.log(message2);
            return new Promise((resolve, reject)=>{
                resolve(message2);
            });
        })
        .then((message) =>{
            console.log(message3);
        })
        .catch((error)=>{
            console.error(error);
        });
```
- 처음 then에서 message를 resolve하면 다음 then에서 받을 수 있음.
- 여기서 다시 message2를 resolve했으므로 다음 then에서 message3를 받았음.
- 이것을 활용해 콜백을 Promise로 바꿀 수 있음

```javascript
    function findAndSaveUser(Users){
        Users.findOne({},(err,user)=>{ // 첫 번째 callback
            if(err){
                return console.error(err);
            }
            user.name = 'zero';
            user.save((err)=>{ // 두 번째 callback 
                if(err)
                {
                    return console.error(err);
                }
                Users.findOne({gender: 'm' },(err, user)=>{
                    // 세 번째 callback
                    // 생략 
                });
            });
        });
    }
```
- 콜백 함수가 세 번 중첩되어 있고, 콜백 함수가 나올 때마다 코드의 깊이가 깊어짐
- 각 콜백 함수마다 에러도 따로 처리해주어야 합니다. 

```javascript
    function findAndSaveUser(Users){
        Users.findOne({})
            .then((user)=>{
                user.name = 'zero';
                return user.save();
            })
            .then((user)=>{
                return Users.findOne({gender:'m'});
            })
            .then((user)=>{
                // 생략
            })
            .catch(err=>{
                console.error(err);
            });
    }
```

- 코드의 깊이가 더 이상 깊어지지 않음. then 메소드들은 순차적으로 실행됨.
- 콜백에서 매번 따로 처리해야 했던 에러도 마지막 catch에서 한번에 처리할 수 있음.
- But, 모든 콜백 함수를 위와 같이 바꿀 수 있는 것은 아님.
- 메소드가 프로미스 방식을 지원해야 함. 예제의 코드는 findOne과 save 메소드가 내부적으로 프로미스
- 객체를 가지고 있어서 가능했던 것.
- 지원하지 않는 경우도 바꿀 수 있긴 하다.

- 프로미스 여러 개를 한 번에 실행할 수 있는 방법 존재 
- 기존의 콜백 패턴처럼 콜백을 여러 번 중첩해서 사용해야 했을 거지만,
- Promise.all을 활용하면 간단히 할 수 있음.

```javascript
    const promise1 = Promise.resolve('성공1');
    const promise2 = Promise.resolve('성공2');
    Promise.all([promise1,promise2]);
        .then((result)=>{
            console.log(result); // ['성공1','성공2']
        })
        .catch((error)=>{
            console.log(error);
        });
```

- Promise.resolve : 즉시 resolve하는 프로미스를 만드는 방법
- 비슷한 것으로 즉시 reject하는 Promise.reject도 있음.
- 프로미스가 여러 개 있을 때 Promise.all에 넣으면 모두 resolve될 때까지 기다렸다가 then으로 넘어감
- Promise 중 하나라도 reject가 되면 catch로 넘어감.

# 2.1.7 async/await

- 노드 7.6 버전부터 지원되는 기능, 비동기 프로그래밍을 해야할 때 도움이 많이 됨.
- 프로미스가 콜백 지옥을 해결 => But, 코드가 장황, async/await 문법은 프로미스를 사용한 코드를 한 번 더 깔끔하게 줄여줌.

```javascript
    function findAndSaveUser(Users){
        Users.findOne({})
            .then((user)=>{
                user.name = 'zero';
                return user.save();
            })
            .then((user)=>{
                return Users.findOne({gender:'m'});
            })
            .then((user)=>{
                // 생략
            })
            .catch(err=>{
                console.error(err)
            }); 
    }
```
- 콜백과 다르게 코드의 깊이가 깊진 않지만, 코드 길이는 여전히 김
- async/await 문법을 사용한다면?

```javascript
    async function findAndSaveUser(Users)
    {
        let user = await Users.findOne({});
        user name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender:'m'});
        // 생략
    }
```
- 놀라울 정도로 코드가 짧아졌는데, 함수 선언부를 일반 함수 대신 async function으로 교체한 후,
- 프로미스 앞에 await을 붙여주었습니다. 
- 이제 함수는 해당 프로미스가 resolve될 떄까지 기다린 뒤 다음 로직으로 넘어감.
- ex) await Users.findOne({})이 resolve 될 때까지 기다린 뒤, user 변수를 초기화하는 것

- 위 코드는 에러를 처리하는 부분이 없어 추가 작업이 필요
```javascript
    async function findAndSaveUser(Users)
    {
        try{
            let user = await Users.findOne({});
            user.name = 'zero';
            user = await user.save();
            user = await Users.findOne({gender:'m'});
            
        }catch(error)
        {
            console.log(error);
        }
    }
```

- try catch문으로 로직을 감쌌는데, 프로미스의 catch 메서드처럼 try/catch문의 catch가 에러를 처리
- 화살표 함수도 async와 같이 사용할 수 있음.

```javascript
    const findAndSaveUser = async (Users) => {
        try {
            let user = await Users.findOne({});
            user.name = 'zero';
            user = await user.save();
            user = await Users.findOne({gender:'m'});

        }

        catch(error){
            console.error(error);
        }
    }
```
- for 문과 async/await을 같이 써서 Promise.all을 대체할 수 있음 
- 이것은 노드 10버전 부터 지원하는 ES2018문법 

```javascript
    const promise1 = Promise.resolve('성공1');
    const promise2 = Promise.resolve('성공2');
    (async ()=>{
        for await (promise of [promise1, promise2]){
            console.log(promise);
        }
    });
```

- Promise.all 대신 for await of 문을 사용해서 프로미스를 반복하는 모습 
- 앞으로 중첩되는 콜백 함수가 있다면 프로미스를 거쳐 async/await 문법으로 바꾸는 연습을 해보자
- 코드가 휠씬 간결해질 것 


프런트엔드 자바스크립트
=====================

# 2.2.1 AJAX

- AJAX(Asynchronous Javascript And XML) : 비동기적 웹 서비스를 개발하기 위한 기법 
- 이름에 XML이 들어가 있지만 꼭 XML을 사용해야 하는 것은 아님 => 요즘 JSON을 많이 사용
- 페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술
- 웹 사이트 중 페이지 전환 없이 새로운 데이터를 불러오는 사이트들 대부분 사용 

- 보통 AJAX 요청 : jQuery나 axios 같은 라이브러리를 이용해서 보냄 
- 이번에는 프론트엔드 라이브러리 사용을 최소화하고 있어 자바스크립트가 기본으로 제공하는 방식으로 요청 보냄 
- IE 때문에 ES5 문법 사용 

```html
    <script>
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){ // 요청에 대한 콜백
            if(xhr.readyState == xhr.DONE) // 요청이 완료되면
            {
                if(xhr.status === 200 || xhr.status === 201) // 응답 코드가 200이나 201이면
                { 
                    console.log(xhr.responseText); // 서버에서 보내주는 값
                }
                else{
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open('GET', 'https://www.zerocho.com/api/get'); // 메서드와 주소 설정 
        xhr.send();
    </script>
```

- XMLHttpRequest 생성자로 xhr 객체를 생성 xhr.open 메서드에 요청 메서드와 요청 주소를 넣고 xhr.send 메소드로 보내면 됨.
- xhr.onreadystatechange : 이벤트 리스터로 요청한 후 서버로부터 응답이 올 때 응답을 받을 수 있음.
- 응답 코드가 200번 대 숫자이면 성공 => xhr.responseText에는 성공한 내용이 담겨 있을 것이고,
- 그렇지 않다면 에러 메시지가 담겨 있음  
* 현재 설정된 주소 - 실제 동작하는 주소 => 콘솔에서 결과 확인 가능 

- onreadystatechange 대신 onload와 onerror로 성공과 실패를 구별해도 됨.
```javascript
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log(xhr.responseText);
    };  
    xhr.onerror = function(){
        console.error(xhr.responseText);
    };
    xhr.open('GET', 'https://www.zerocho.com/api/get'); // 메서드와 주소 설정
    xhr.send();
```

- 서버로 데이터를 같이 보내는 POST 요청의 경우, JSON 데이터를 보냅니다. 

```html
    <script>
        var xhr = new XMLHttpRequest();
        var data = {
            name: 'zerocho',
            birth: 1994,
        };
        xhr.onreadystatechange = function(){
            if(xhr.readyState === xhr.DONE)
            {
                if(xhr.status === 200 || xhr.status === 201)
                {
                    console.log(xhr.responseText);
                }
                else {
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open('GET','https://www.zerocho.com/api/post/json');
        xhr.setRequestHeader('Content-type','application/json'); // 콘텐츠 타입을 json으로 
        xhr.send(JSON.stringify(data); // 데이터를 동봉해 전송 
    </script>    
```

- 전체적인 구조는 비슷하지만, xhr.send 메서드에 데이터를 넣어 보내는 것이 다름.
- xhr.setRequestHeader 메소드 => 서버로 보내는 컨텐츠가 JSON 형식임을 알릴 수 있음.
- 현재 설정된 주소는 실제로 동작하는 주소라서 결괏값을 받을 수 있고, POST 요청의 경우 에러가 발생 
- 이 에러를 해결하는 방법은 10.7절 에서 배움.

- 서버에 폼 데이터는 어떻게 보내는가?

# 2.2.2 FormData

- HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능 => 주로 AJAX와 함께 사용 

```html
    <script>
    var formData = new FormData();
    formData.append('name', 'zerocho');
    formData.append('item','orange');
    formData.append('item','melon');
    formData.has('item'); // true
    formData.has('money'); // false
    formData.get('item'); // orange
    formData.getAll('item'); // ['orange','melon']
    formData.append('test',['h1','zero']); 
    formData.get('test'); // h1, zero
    formData.delete('test'); 
    formData.get('test'); // null
    formData.set('item','apple'); 
    formData.getAll('item'); // ['apple']
    </script>
```

- 먼저 FormData 생성자로 formData 객체를 만듬. 생성된 객체의 append 메서드로 키-값 형식의 데이터 저장 가능
- append 메서드를 여러 번 사용해서 키 하나에 여러 개의 값을 추가해도 됨.
- has 메서드 : 주어진 키에 해당하는 값이 있는지 여부를 알려줌. 
- get 메서드 : 주어진 키에 해당하는 값 하나를 가져오고, getAll 메서드는 해당하는 모든 값을 가져옴
- delete : 현재 키를 제거하는 메서드, set : 현재 키를 수정하는 메서드 

- 이제 AJAX로 폼 데이터를 서버에 보내면 됨.
```javascript
    var formData = new FormData();
    formData.append('name', 'zerocho');
    formData.append('birth', 1994);
    xhr.onReadystatechange = function(){
        if(xhr.readyState === xhr.DONE)
        {
            if(xhr.status === 200 || xhr.status === 201)
            {
                console.log(xhr.responseText);
            }
            else{
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('POST', 'https://www.zerocho.com/api/post/formdata');
    xhr.send(formData); // 폼 데이터 객체 전송 
```

- send 메서드에 데이터를 넣어 보냄, 현재 설정된 주소는 실제로 동작하는 주소라서 결괏값을 받을 수 있음

# 2.2.3 encodeURLComponent, decodeURLComponent 

- AJAX 요청을 보낼 때 'http://localhost:8003/search/노드'처럼 
- 주소에 한글이 들어가는 경우가 존재 
- 서버 종류에 따라 다르지만, 서버가 한글 주소를 이해하지 못하는 경우가 존재
- 이럴 때, window 객체의 메서드인 encodeURIComponent 메서드를 사용함. 노드에서도 사용할 수 있음

```html
    <script>
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){ // 요청에 대한 콜백
            if(xhr.readyState === xhr.DONE)
            {
                if(xhr.status === 200 || xhr.status === 201) // 응답 코드가 200이나 201이면
                {
                    console.log(xhr.responseText); // 서버에서 보내주는 값
                }
                else{
                    console.error(xhr.responseText);
                }
            }
        };
        xhr.open('GET','https://www.zerocho.com/api/search' + encodeURIComponent('노드')); // 한글 주소 인코딩 후 전송
        xhr.send(); // 요청 전송 
    </script>
```

- 한글 주소 부분만 encodeURIComponent 메서드로 감싸줌, 노드라는 한글 주소가 %EB%85%B8%EB%93%9C라는 문자열로 변환됨.
- 받는 쪽에서는 decodeURIComponent를 사용하면 됨. 역시 브라우저 뿐만 아니라 노드에서도 사용할 수 있음.

```javascript
    decodeURIComponent('%EB%85%B8%EB%93%9C'); // 노드 
```

- 한글이 다시 원래 상태로 복구됨. => 한글을 처리하기 위한 것이라고 보자.


# 2.2.4 data attribute와 dataset

- 노드를 웹 서버로 사용하는 경우, 클라이언트(프런트엔드)와 빈번하게 데이터를 주고받게 됨.
- 이때 서버에서 보내준 데이터를 프런트엔드 어디에 넣어야 할지 고민이 됨.

- 프런트엔드에 데이터를 내려보낼 때 첫 번째로 보안을 고려해야 함.
- 클라이언트를 믿지 말라는 말이 있을 정도로 프런트엔드에 민감한 데이터를 내려보내는 것은 실수 
- 비밀번호 같은 건 절대 내려보내지 않도록 하자.

- 보안과 관련이 없는 데이터들은 자유롭게 프런트엔드로 보내도 됨. 
- 자바스크립트 변수에 저장해도 되지만, HTML5에도 HTML과 관련된 데이터를 저장하는 공식적인 방법이 있음 
- => data attribute 

```html
    <ul>
        <li data-id="1" data-user-job="programmer">Zero</li>
        <li data-id="1" data-user-job="designer">Nero</li>
        <li data-id="1" data-user-job="programmer">Hero</li>
        <li data-id="1" data-user-job="ceo">Kero</li>    
    </ul>
    <script>
        console.log(document.querySelector('li').dataset); 
        // {id:'1', userJob:'programmer'}
    </script>
```

- 위 처럼 HTML 태그의 속성으로 data-로 시작하는 것들을 넣어주자 => 이들이 data attribute
- data-id와 data-user-job을 주었음, 화면에 나타나지는 않지만 웹 애플리케이션 구동에 필요한 데이터들 
- 나중에 이 데이터들을 사용해 서버에 요청을 보내게 됨.

- data attribute의 장점은 자바스크립트로 쉽게 접근할 수 있다는 점 
- script 태그를 보면 dataset 속성을 통해 첫 번째 li 태그의 data attribute에 접근하고 있음 
- 단, data attribute 이름이 조금씩 변형되었음.
- 앞의 data- 접두어는 사라지고, - 뒤에 위치한 글자는 대문자가 됨.
- ex) data-id => id, data-user-job은 userJob이 됨.

- 반대로 dataset에 데이터를 넣어도 HTML 태그에 반영됨.
- dataset.menthSalary = 10000;을 넣으면 data-month-salary="10000"이라는 속성이 생김

