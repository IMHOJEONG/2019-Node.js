# 5. 패키지 매니저 

- 세상에는 무수히 많은 자바스크립트 프로그래머가 있음 
- 그들이 우리와 같은 길을 먼저 걸으며 많은 코드를 미리 작성해둠
 => 그 코드를 다른 사람이 볼 수 있게 공개하기도 함. => 이러한 코드들이 공개되어 있는 서버인 npm 패키지 매니저 공부 

- 5.1 npm 알아보기

  - npm : Node Package Manager
 노드가 자바스크립트 프로그램을 컴퓨터에서도 실행할 수 있게 해줌 
   - 대부분의 자바스크립트 프로그램 : 패키지라는 이름으로 npm에 등록됨. 
   - 특정 기능을 하는 패키지가 필요? npm에서 찾아 설치 ㄱ
  - 패키지 : npm에 업로드된 노드 모듈 

  - 모듈이 다른 모듈을 사용할 수 있는 것처럼, 패키지가 다른 패키지를 사용할 수도 있음 => 의존 관계

  * yarn - npm의 대체자로 yarn이 존재 
      * 페이스북이 내놓은 패키지 
      * React, React Native 같은 페이스북 진영의 프레임워크를 사용할 때 종종 볼 수 있음.
    * npm 서버가 너무 느릴 경우 => yarn으로 패키지를 대신 설치 가능 

# 5.2 package.json으로 패키지 관리하기 

- 서비스에 필요한 패키지를 하나씩 추가하다 보면 패키지 수가 100개를 훌쩍 넘어버리게 됨.
  - & 사용할 패키지는 고유한 버전이 존재 => 기록의 필요성 
  - 같은 패키지라도 버전별로 기능이 다를 수 있어 동일한 버전을 설치하지 않으면 문제 발생 
- => 설치한 패키지의 버전을 관리하는 파일 => package.json

- => 프로젝트를 시작하기 전 package.json부터 만들고 시작하는 게 좋음 
- npm : package.json을 만드는 명령어를 제공 

![init](https://user-images.githubusercontent.com/11308147/71500249-812bc400-28a7-11ea-9235-87d5862e05f2.PNG)

* package name : 패키지의 이름, package.json의 name 속성에 저장됨

* version : 패키지의 버전, npm의 버전은 다소 엄격히 관리됨 

* entry point : 자바스크립트 실행 파일 진입점, 보통 마지막으로 module.exports하는 파일을 지정, package.json의 main 속성에 저장

* test command : 코드를 테스트할 때 입력할 명령어를 의미, package.json scripts 속 속성 안의 test 속성에 저장됨.

* git repository : 코드를 저장해 둔 Git 주소를 의미, 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도
    * 코드 수정본을 올릴 수도 있음 => package.json의 repository 속성에 저장됨.
* keywords : 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해줌 => package.json의 keywords 속성에 저장됨.

* license : 해당 패키지의 라이선스를 넣어주면 됨.

* 라이선스 
    * 오픈 소스라고 해서 모든 패키지를 아무런 제약 없이 사용할 수 있는 것은 아님 
    * 라이선스(license)별로 제한 사항이 있으므로 설치 전에 반드시 라이선스를 확인해야 함
    * ISC, MIT, BSD 라이선스를 가진 패키지 => 사용한 패키지와 라이선스만 밝혀주면 자유롭게 사용할 수 있음
    * Apache 라이선스 패키지 => 사용은 자유롭지만 특허권에 대한 제한이 포함
    * GPL 라이선스 패키지 => 조심!, GPL 계열의 패키지를 사용한 패키지를 배포 시 자신의 패키지도 GPL로 배포하고 소스 코드도 공개해야 함
    * 라이선스 별로 특징이 다름 => 오픈 소스를 사용하기 전 반드시 라이선스를 확인하고 세부 내용을 읽어보자 
        * 나중에 상용 프로그램을 개발했을 때 법적 문제가 생길 수 있음

- npm init 실행이 완료되면, 폴더에 생성

```json
{
  "name": "npmtest",
  "version": "0.0.1",
  "description": "hello package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ImHoJeong",
  "license": "ISC"
}
```
- scripts : npm 명령어를 저장해두는 부분, 콘솔에서 npm run 스크립트 명령어를 입력하면 해당 스크립트가 실행됨.
- ex) npm run test를 하면 echo "Error: no test specified" && exit 1 이 실행됨.
- echo "Error: no test specified" : 콘솔에 해당 문자열을 출력 , exit 1 : 에러와 함께 종료하라는 뜻 

![runtest](https://user-images.githubusercontent.com/11308147/71500256-8c7eef80-28a7-11ea-89c1-aba2675da5c6.PNG)

- test 스크립트 외에도 scripts 속성에 명령어 여러 개를 등록해두고 사용할 수 있음 
- 보통 start 명령어에 node 파일명을 저장해두고 npm start로 실행함. 
- start나 test 같은 스크립트는 run을 붙이지 않아도 실행됨. 

- 패키지를 설치해 보면 

* npm install 패키지 이름을 package.json이 있는 폴더의 콘솔에서 입력하면 됨.
    * 설치한 패키지가 package.json에 기록됨.
        * ![package](https://user-images.githubusercontent.com/11308147/71500265-9acd0b80-28a7-11ea-9679-a5a60793a6fa.PNG)

    * dependencies라는 속성이 새로 생겼고, express라는 이름과 함께 설치된 버전이 저장됨.

* npm WARN npmtest@0.01 No repository field
    * package.json에 repository 속성이 없어서 발생한 것 
    * 나중에 소스 코드를 GitHub이나 Gitlab 등과 같은 저장소에 저장한 후, 
    * repository 속성을 만들고 GitHub나 Gitlab 주소를 적어주면 됨.
* --save 옵션
    * 패키지를 설치할 때, npm install 명령어에 --save 옵션을 붙이는 책이나 블로그를 많이 볼 수 있음
    * dependencies에 패키지 이름을 추가하는 옵션 But, npm@5부터는 기본값으로 설정되어 있어 따로 붙이지 않아도 됨.

* 추가로 node_modules라는 폴더도 생성 
    * 그 안에 설치한 패키지들이 들어 있음
    * 분명 Express 하나만 설치했는데 패키지가 여러개 들어있어 
    * 이는 Express가 의존하는 패키지들
    * 패키지 하나가 다른 여러 패키지에 의존하고 그 패키지들은 또 다른 패키지에 의존 
    * => 의존 관계가 복잡하게 얽혀 있어 package.json이 필요한 것

![package2](https://user-images.githubusercontent.com/11308147/71500277-a7516400-28a7-11ea-851d-1962e2b6f77e.PNG)

- `의존 관계는 책을 참고`

* package-lock.json이라는 파일도 생성 
    * 직접 설치한 express 외에도 node_modules에 들어 있는 패키지들의 정보가 담겨짐 
    * npm으로 패키지를 설치, 수정, 삭제할 때마다 내부 의존 관계를 이 파일에 저장

- 모듈 여러 개는 동시에 어떻게 설치하는가?
- npm install 패키지1 패키지2 ...와 같이 패키지들을 나열하면 됨.
  
![install2](https://user-images.githubusercontent.com/11308147/71500286-b0dacc00-28a7-11ea-966b-eb7c6af3c8c7.PNG)


- 위에서 설치한 패키지들이 dependencies 속성에 기록됨.

![package3](https://user-images.githubusercontent.com/11308147/71500293-b9330700-28a7-11ea-97ce-0b819ae9de77.PNG)

- 개발용 패키지를 설치할 수도 있음 => 실제 배포 시에는 사용되지 않고, 개발 중에만 사용되는 패키지들
- npm install --save-dev 패키지 ...으로 설치함
- nodemon 패키지를 설치해보면(nodemon? - 소스 코드가 바뀔 때마다 자동으로 노드를 재실행해주는 패키지)

![nodemon](https://user-images.githubusercontent.com/11308147/71500304-c819b980-28a7-11ea-82c9-138f830c2079.PNG)

- package.json에 새로운 속성이 생김
- 새로 생긴 devDependencies 속성에서는 개발용 패키지들만 따로 관리

![nodemon2](https://user-images.githubusercontent.com/11308147/71500306-c8b25000-28a7-11ea-921e-b5640981197f.PNG)

- npm : 전역 설치라는 옵션도 존재 
- 패키지를 현재 폴더의 node_modules에 설치하는 것이 아니라 npm이 설치되어 있는 폴더에 설치
- => Window 기본 경로 : C:\Users\사용자이름\AppData\Roamng\npm 
- => macOS 기본 경로 : /usr/local/lib/node_modules
- 이 폴더의 경로는 보통 시스템 환경 변수에 등록되어 있어 전역 설치한 패키지는 콘솔의 커맨드로 사용 가능 

![rimraf](https://user-images.githubusercontent.com/11308147/71500324-d8319900-28a7-11ea-92e7-f143bf500d86.PNG)

- 리눅스, macOs에선 전역 설치 시 관리자 권한이 필요 => sudo를 앞에 붙여주셈
- rimraf? 리눅스나 macOs의 rm -rf 명령어를 윈도에서도 사용할 수 있게 해주는 패키지 
- rm -rf : 지정한 파일이나 폴더를 지우는 명령어 
- 전역 설치했음 => rimraf 명령어를 콘솔에서 사용 가능 
- 전역 설치한 패키지는 package.json에 기록되지 않음
 
![rimraf2](https://user-images.githubusercontent.com/11308147/71500352-f5666780-28a7-11ea-85bd-4411048107e9.PNG)

- 현재 폴더 내 => package.json, package-lock.json 밖에 없는 상태
- 설치한 패키지들을 지워버렸지만, package.json에 설치한 패키지 내역이 들어있음 => 걱정 ㄴㄴ
- npm install만 하면 알아서 다시 설치됨.

- 즉, node_modules => 언제든지 npm install로 설치 가능 => 보관할 필요가 없다는 의미
- Git 같은 버전 관리 프로그램과 같이 사용할 때도 node_modules는 커밋하지 않는다. 
- 중요한 파일은 package.json

* npx 명령어 
    * 전역 설치를 기피하는 개발자들도 존재 
    * 전역 설치한 패키지 -> package.json에 기록되지 않아 다시 설치할 때 어려움 존재
    * => npx 명령어가 존재
    ![npx](https://user-images.githubusercontent.com/11308147/71500370-0ca55500-28a8-11ea-9326-827d9bf18e64.PNG)

    * => rimraf 모듈은 package.json의 devDependencies 속성에 기록한 후, 앞에 npx 명령어를 붙여 실행하면 됨.
    * => 패키지를 전역 설치한 것과 같은 효과를 얻을 수 있어

* npm에 등록되지 않은 패키지 
    * 모든 패키지가 npm에 등록되어 있는 것 X
    * 일부 패키지 -> Open Source X or 개발 중인 패키지 
        * GitHub나 nexus 등의 저장소에 보관되어 있을 수도 있음 
        * => npm install 저장소 주소 명령어를 통해 설치 가능 

* 명령어 줄여쓰기 
    * npm install 명령어 => npm i로 줄여쓸 수있음 
    * --save-dev 옵션은 -D로, --global 옵션은 -g로 줄여서 써도 됨.
        
# 5.3 패키지 버전 이해하기

- 노드 패키지들의 버전은 항상 세 자리로 이루어져 있음
- 심지어 노드의 버전도 세 자리입니다.
- 버전이 세 자리인 이유는 SemVer 방식의 버전 넘버링을 따라서!

- SemVer : Semantic Versioning(유의적 버전)의 약어 
- 버전을 구성하는 세 자리가 모두 의미를 가지고 있다는 뜻 

- 각각 패키지는 모두 버전이 다르고 패키지 간의 의존 관계도 복잡!
- 만약 어떤 패키지의 버전을 업그레이드했는데, 그것을 사용하는 다른 패키지에서 에러가 발생한다면 문제가 됨.

- 많은 패키지가 서로 얽히다 보면 이 문제는 점점 더 심각해짐  
- => 버전 번호를 어떻게 정하고 올려야 하는지 명시하는 규칙의 등장 => SemVer

* 버전의 첫 번째 자리는 major 버전
    * 주 버전이 0이면 초기 개발 중이라는 뜻 
    * 1은 정식 버전, major 버전은 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 올림 

    * ex) 1.5.0 -> 2.0.0으로 올렸다는 것
    * 1.5.0 버전 패키지를 사용하고 있던 사람들이 2.0.0으로 업데이트했을 때 에러가 발생할 확률이 크다는 뜻

* 두 번째 자리는 minor 버전 
    * minor 버전 - 하위 호환이 되는 기능 업데이트 
    * 버전을 1.5.0에서 1.6.0으로 올렸다면, 1.5.0 사용자가 1.6.0으로 업데이트했을 때 아무 문제가 없어야 함.

* 세 번째 자리는 patch 버전 
    * 새로운 기능이 추가되었다기보다는 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 patch 버전을 올림.
    * ex) 1.5.0 => 1.5.1 , 당연히 업데이트 후 아무 문제가 없어야 함

- `SemVar 규칙은 책을 참고`

- 새 버전을 배포한 후 -> 그 버전의 내용을 절대 수정하면 안 됌.
- if 수정 사항 생기면, major, minor, patch 버전 중 하나를 의미에 맞게 올려서 새로운 버전으로 배포해야 함
- 배포된 버전 내용이 바뀌지 않기 때문에 패키지 간 의존 관계에 큰 도움!

- 특정 버전이 정상적으로 동작하고, 같은 버전을 사용한다면 어떠한 경우라도 정상적으로 동작할 것이라 믿을 수 있음

- 버전의 숫자마다 의미가 부여되어 있으므로 다른 패키지를 사용할 때도 버전만 보고 에러 발생 여부를 가늠할 수 있음

- 의존하는 패키지의 major 버전이 업데이트되었다면 기존 코드와 호환이 되지 않을 확률이 크기 때문 -> 주의!
- => minor나 patch 버전 업데이트는 비교적 안심하고 버전을 올릴 수 있음!

- package.json에는 SemVer 식 세 자리 버전 외에도 버전 앞에 ^나 ~ 또는 >, < 같은 문자가 붙어 있음 
- 이 문자는? 버전에는 포함되지 않지만 설치 또는 업데이트 시 어떤 버전을 설치해야 하는지 알려줌!

- 가장 많이 보는 기호 : ^ => minor 버전까지만 설치 or 업데이트 함
  - npm i express@^1.1.1이라면 1.1.1 <= 버전 < 2.0.0까지 설치됨. (2.0.0은 설치되지 않음) => 1.x.x와 같이 표현할 수도 있음

- ~ 기호를 사용한다면 patch 버전까지만 설치 또는 업데이트함 
 npm i express@~1.1.1이라면 1.1.1 <= 버전 < 1.2.0까지 설치됨.
  - 1.1.x와 같은 표현도 가능함. ~보다 ^가 많이 사용되는 이유 : minor 버전까지는 하위 호환이 보장되기 때문

- <, >, >=, <=, = : 알기 쉽게 미만, 초과, 이상, 이하, 동일을 뜻함
  - npm i express@>1.1.1처럼 사용함 => 반드시 1.1.1 버전보다 높은 버전이 설치됨.

- 추가로 @latest도 사용하는데, 항상 최신 버전의 패키지를 설치함. => x로도 표현할 수 있음 
  - => npm i express@latest or npm i express@x 
  
# 5.4 기타 npm 명령어 

- npm으로 설치한 패키지를 사용하다 보면 새로운 기능이 추가되거나 버그를 고친 새로운 버전이 나올 때가 있음
- npm outdated 명령어로 업데이트할 수 있는 패키지가 있는지 확인 ㄱㄱ
![npmoudated](https://user-images.githubusercontent.com/11308147/71500381-1a5ada80-28a8-11ea-8388-49f714e99626.PNG)

- Current와 Wanted가 다르면 업데이트가 필요한 경우 => npm update 패키지명 
- npm update => 업데이트 가능한 모든 패키지가 Wanted에 적힌 버전으로 업데이트 됨.

- npm uninstall 패키지명 : 해당 패키지를 제거하는 명령어 
- 패키지가 node_modules 폴더와 package.json에서 사라짐 ( npm rm 패키지명 으로 줄여쓸 수도 있음 )

- npm search 검색어 : npm의 패키지 검색 가능 
- 윈도나 macOS에선 브라우저를 통해 npm 공식 사이트(https://npmjs.com)에서 검색하는 것이 편리할 것 
- But, GUI가 없는 리눅스에선 이 명령어를 사용해 콘솔로 검색할 수 있음 

- npm search express 명령어로 express 를 검색 => package.json에 넣어둔 keywords가 이 때 사용됨.

![npmsearch](https://user-images.githubusercontent.com/11308147/71500390-23e44280-28a8-11ea-8767-91234256e578.PNG)


- npm info 패키지명 : 패키지의 세부 정보를 파악하고자 할 때 사용하는 명령어 
- package.json의 내용과 의존 관계, 설치 가능한 버전 정보 등이 표시됨.

- npm adduser : npm 로그인을 위한 명령어 - npm 공식 사이트에서 가입한 계정으로 로그인하면 됨.
- 나중에 패키지를 배포할 때 로그인 필요
- 패키지를 배포하지 않을 것이라면 npm에 가입할 필요 X
   
![npmadduser](https://user-images.githubusercontent.com/11308147/71500417-3d858a00-28a8-11ea-9100-9bd725dda442.PNG)

- npm whoami : 로그인한 사용자가 누구인지 알려줌, 로그인된 상태가 아니라면 에러가 발생!
- npm logout : npm adduser로 로그인한 계쩡을 로그아웃할 때 사용함.
- npm version 버전 : package.json의 버전을 올려줌(원하는 버전의 숫자를 넣으면 됨.)
- or major, minor, patch라는 문자열을 넣어서 해당 부분의 숫자를 1 올릴 수도 있음
```javascript
    npm version 5.3.2, npm version minor // 이렇게
```

- npm deprecate 패키지명 버전 메시지 : 해당 패키지를 설치할 때 경고 메시지를 띄우게 하는 명령어
- 자신의 패키지에만 이 명령어를 적용할 수 있음 
- deprecated 처리를 해두면 다른 사용자들이 버그가 있는 버전의 패키지를 설치할 때 => 경고 메시지가 출력됨.

- npm publish : 자신이 만든 패키지를 배포할 때 사용함

- npm unpublish : 배포한 패키지를 제거할 때 사용 
- 24시간 이내에 배포한 패키지만 제거할 수 있음 => 왜? 의존성 관계 때문에!
- 다른 사람이 사용하고 있는 패키지를 제거하는 경우를 막기 위해서 

- 자세한 내용은 npm 공식 문서의 CLI Commands에서 확인 가능 

# 5.5 패키지 배포하기

- 코딩에 앞에서 npm 계정을 만들어야 함, 패키지로 만들 코드 작성해 보면.
- package.json의 main 부분의 파일명과 일치해야 함 => npm에서 이 파일이 패키지의 진입점인 것을 알 수 있음.
```javascript
    module.exports = () => {
    return 'hello package';
};
```
- npm publish 명령어를 사용해 이 패키지를 배포 
![npmpublish](https://user-images.githubusercontent.com/11308147/71500429-4ece9680-28a8-11ea-898b-9d8202decb4d.PNG)

- 왜? npmtest라는 이름을 누군가가 이미 사용하고 있어 오류가 발생 
- npm은 패키지의 이름이 겹치는 것을 허용하지 않음 => 패키지의 이름을 바꾸어서 배포해야 함
- 굳이 남이 사용하는 패키지 이름 => 네임스페이스를 이용!

* 원하는 이름이 이미 사용 중이라면?
    * 해당 패키지가 활발하게 유지된다면 아쉽지만 다른 이름을 사용해야 함.
    * But, 그 패키지가 아무 의미 없이 이름만 차지하고 있다? 
    * npm owner is 패키지명 : 해당 패키지의 제작자의 이메일을 확인하고 패키지를 유지 중인지 메일을 보내 보자
    * 이 때 CC(참조)로 support@npmjs.com을 지정하면 npm 지원팀에게도 메일이 보내짐
    * 몇 주간 당사자 간 이름 분쟁이 해결되지 않는다면 => npm 팀에서 해결해 줌

- 누군가 이름을 사용하고 있는지 확인 - npm info 패키지명 
- 패키지 정보가 나온다? 누군가가 이미 사용하고 있는 이름 / npm ERR! code E404 Registry returned 404 for ~ 에러가 발생하면 사용해도 좋은 이름

- package.json에서 원하는 이름으로 name을 바꾸고, 다시 npm publish 명령어를 입력 
- => 연습용, 의미 없는 패키지 이름 써서 피해주지 말자!

![npmghwjd](https://user-images.githubusercontent.com/11308147/71500440-5db54900-28a8-11ea-91b4-1259ee3360e1.PNG)


- npm info로 패키지에 대한 정보가 나오는지 확인해보자 

![npmghwjdinfo](https://user-images.githubusercontent.com/11308147/71500437-5d1cb280-28a8-11ea-876c-97c7b225cb75.PNG)

- 배포 패키지 삭제 ㄱㄱ => 24시간이 지나면 삭제할 수 없다는 점 주의!
- npm unpublish 패키지명 --force : 패키지명에 우리가 배포한 패키지 이름을 넣어줘

![npmunpublish](https://user-images.githubusercontent.com/11308147/71500439-5db54900-28a8-11ea-91be-1f6ebf1b84a6.PNG)


- 삭제 후 npm info 명령어를 사용해 제대로 지워졌나 확인 => 404 에러가 발생한다면? 제대로 지워진 것!

![npminfo](https://user-images.githubusercontent.com/11308147/71500438-5d1cb280-28a8-11ea-958a-4a443a071685.PNG)


* npm 배포 시 주의! => 항상 신중해야 함
    * 우리 코드가 세상에 공개되는 것, 배포 전에 개인 정보가 코드에 들어 있지 않은지 꼭 확인!
    * 특히 다른 서비스와 연동하다가 실수로 서비스의 비밀키를 넣어두는 경우가 많아!
    * 다른 사람들이 그 키를 사용해 과금 유발 가능 => 배포 전 반드시 확인!

    * 실제로 사용할 패키지가 아님에도 이름 선점하는 행위는 삼가!
    * 인터넷 도메인 주소를 판매 목적으로 선점하는 행위와 다를 게 없어 
    * 기존에 있는 패키지와 비슷한 이름으로 새 패키지를 배포하거나 다른 패키지의 코드를 살짝 수정해서 새로 배포하는 경우 => 꼭 원작자의 허락을 받기 바람!

- `참고 자료는 책을 보세요`








