# 7. MySQL 

- 지금까지 모든 데이터를 변수에 저장 => 변수에 저장 -> 컴퓨터 메모리에 저장 
- 서버가 종료되면 메모리가 정리되면서 저장했던 데이터도 사라져 버림 => 방지! => 그래서 DB를 쓴다

- 다양한 DB 중, MySQL과 MongoDB 두 가지를 사용할 예정 

# 7.1 데이터베이스란?

- 데이터베이스 : 관련성을 가지며 중복이 없는 데이터들의 집합 
    - 이러한 데이터베이스를 관리하는 시스템을 DBMS(데이터베이스 관리 시스템)라고 부름

- 보통 서버의 하드 디스크, SSD 등의 저장 매체에 데이터를 저장 
- 저장 매체가 고장 or 사용자가 직접 데이터를 지우지 않는 이상 계속 데이터가 보존됨. 
- => 서버 종료 여부와 상관없이 데이터를 계속 사용할 수 있음


* 서버에 데이터베이스를 올리면 여러 사람이 동시에 사용할 수 있음 
    * 사람들에게 각각 다른 권한을 주어 어떤 사람은 읽기만 가능하고, 어떤 사람은 모든 작업을 가능하게 할 수 있음 

* 데이터베이스를 관리하는 DBMS 중엔 RDBMS(Relational DBMS)인 관계형 DBMS가 많이 사용됨.
    * 대표적으론 Oracle, MySQL, MSSQL 등이 존재 
    * SQL이라는 언어를 사용해 데이터를 관리 => But, RDBMS 별로 SQL문이 조금씩 다름 
    * 실습은 MySQL로 할 듯

# 7.2 MySQL 설치 

- 이제부터는 리눅스에서 진행하겠습니다.

- 우분투에선 GVI를 사용하지 않음 => 순서대로 입력하여 MySQL을 설치!
<!-- 우분투 설치 버전 -->
```console
$ sudo apt-get update 
$ sudo apt-get install -y mysql-server 
$ mysql_secure_installation
```
- 설치만 하면 에러가 ㄷㄷㄷ

- MySQL 못하겠다 여기선 ..... 너무 오류가 ㄷㄷ

- 일단 진도는 맞추어야 하니까 => 윈도우에서 진행하다가 리눅스는 오류 찾으면 바로 진행하겠습니다.

![start](https://user-images.githubusercontent.com/11308147/71500652-3f9c1880-28a9-11ea-9f5c-ad4f5e2f1b34.PNG)

```console
$ mysql -h localhost -u root -p
```
![start2](https://user-images.githubusercontent.com/11308147/71500661-47f45380-28a9-11ea-83cc-7ed835efc884.PNG)

```console
$ mysql -u root -p --port 3307 
```
- port 옵션을 넣어주고 Enter를 입력

* mysql -h 뒤에는 접속할 주소를, -u 뒤에는 사용자명을 입력 
    * 각각 localhost와 root를 넣어줌 
    * -p : 비밀번호를 사용하겠다라는 뜻 => 명령어 창에 설정 비번 입력 ㄱㄱㄱ
    * 콘솔로 다시 돌아가려면 exit 명령어 입력
    * => MySQL Connection으로 커넥션 생성가능 
    
* In Linux, 
```console
$ sudo apt-cache search mysql-server
<!-- 설치 가능한 버전 확인 -->
```
[mysql-community-server 삭제 안 되는 에러 해결](https://askubuntu.com/questions/640899/how-do-i-uninstall-mysql-completely)

- 설치 과정에 이상한 부분이 생겨서 비밀번호 설정이 안 뜨고 넘어가는데, 실습을 해야하니 
- => root 권한에서 새로운 사용자를 만들고 그것으로 mysql에 접속해서 공부해야겠다는 Think! (그냥 오류 피하는 느낌? ㅠㅠㅠ)

- 어쨋든 

![makeUser](https://user-images.githubusercontent.com/11308147/71502766-4761ba00-28b5-11ea-8aa5-5e573dccdb09.png)

1. MySQL 서버 로그인 
```console
<!-- 사용자를 추가하기 위해 로그인 필요 -->
$ sudo -i
$ mysql -u root -p
```
2. 로컬에서 접속 가능한 사용자 추가
```console
$ create user 'ghwjd'@'localhost' idetified by '비밀번호';
```

3. DB 권한 부여하기 
```console
$ grant all privileges on *.* to 'ghwjd'@'localhost';
$ grant all privileges on DB이름.* to '사용자'@'localhost';
```

4. 사용자 계정 삭제 & 원격에서 접속 가능한 사용자
    * 원격에서 접속 가능한 사용자 만드는 것은 위에서 localhost대신 IP로 바꾸어서 해주면 가능!!!!
```console
$ drop user '사용자'@'localhost';
```
    
[사용자 추가 참조](https://cjh5414.github.io/mysql-create-user/)

- God Google, 글 남겨주신 분들 모두 정말 큰 도움이 되었습니다.

# 7.4 데이터베이스 및 테이블 생성하기 

# 7.4.1 데이터베이스 생성하기

* MySQl 명령 프롬프트 접속!
```sql   
create schema [데이터베이스 이름] 
```
- schema라고 되어있지만, MySQL에선 DB와 Schema는 동일한 개념 

```sql
create schema nodejs;
use nodejs;
```
1. nodejs라는 이름의 데이터베이스 생성 
2. use nodejs; 
    * 앞으로 nodejs 데이터베이스를 사용하겠다는 것을 MySQL에 알림

* sql 구문 -> 입력할 때 마지막에 ;를 붙여야 실행됨.
    * 붙이지 않으면 프롬프트가 다음 줄로 넘어가 다른 입력이 들어오기를 계속 기다림 

* 예약어 - MySQL이 기본적으로 알고 있는 구문 
    * ex) create schema 
    * 대문자로 쓰는 것이 좋음 => 사용자 정의 이름과 구분하기 위해!

# 7.4.2 테이블 생성하기 

- 데이터베이스를 생성했다면? 테이블을 만들어주자

- 테이블? 데이터가 들어가기 위한 틀 =>  테이블에 맞는 데이터만 들어가는 게 가능

- 오타가 나지 않도록 주의, 한 줄로 적어도 되지만,
- => 보기 불편해서 Enter키를 누른 후 줄을 바꾸어서 입력하는 것이 좋음 
```sql
CREATE TABLE nodejs.users(
-> id INT NOT NULL AUTO_INCREMENT,
-> name VARCHAR(20) NOT NULL,
-> age INT UNSIGNED NOT NULL,
-> married TINYINT NOT NULL,
-> comment TEXT NULL,
-> created_at DATETIME NOT NULL DEFAULT now(),
-> PRIMARY KEY(id),
-> UNIQUE INDEX name_UNIQUE(name ASC))
-> COMMENT = '사용자 정보'
-> DEFAULT CHARSET=utf8
-> ENGINE=InnoDB;

```
* CREATE TABLE [데이터베이스명.테이블 명] => 테이블을 생성하는 명령어
```sql
CREATE TABLE nodejs.users 
-- nodejs 데이터베이스 내에 users 테이블을 생성하는 것 
-- 아까 use nodejs; 명령어 실행 -> 데이터베이스명은 생략해도 됨.
```

- 그 후, 한 줄에 하나씩 콤마(,)로 구분해 컬럼들을 만듬 
- 순서대로 id(고유 식별자), name(이름), age(나이), married(결혼 여부), comment(자기 소개),created_at(로우 생성일)
- PRIMARY KEY부터는 다른 옵션

- 컬럼을 정의해두면 => 데이터를 넣을 때 컬럼 규칙에 맞는 정보들만 넣을 수 있음 
- ex) 생년월일, 몸무게 처럼 컬럼으로 만들어두지 않은 정보들은 저장할 수 없음!
- `column과 row는 책을 참고`

* column 이름 옆 INT, VARCHAR, TINYINT, TEXT, DATETIME 등이 있음 => 컬럼의 자료형
    * INT - 정수 의미, 소수까지 저장하고 싶다면 FLOAT이나 DOUBLE 자료형을 사용하면 됨.
    * VARCHAR(자릿수), CHAR(자릿수) : CHAR - 고정 길이, VARCHAR - 가변 길이 
        * ex) CHAR(10) - 반드시 길이가 10인 문자열만 넣어야 하고,
        * ex) VARCHAR(10) - 0~10 길이의 문자열을 넣을 수 있음 
        * CHAR에 주어진 길이보다 짧은 문자열을 넣는다???? -> 부족한 자릿수만큼 스페이스가 채워짐 
    * TEXT - 긴 글을 저장할 때 사용, VARCHAR와 혼동가능 
        * 몇 백자 이내의 문자열은 보통 VARCHAR로 많이 처리 => 그보다 길면 TEXT로 처리하곤 함.
    * TINYINT - -127부터 128까지의 정수를 저장할 때 사용
        * 1 또는 0만 저장한다면 Boolean과 비슷한 역할을 할 수 있음 
    * DATETIME - 날짜와 time에 대한 정보를 담고 있음 
        * 날짜 정보만 담는 DATE와 time 정보만 담는 Time 자료형도 존재 
    * 이외에도 많은 자료형 존재!

* NOT,NULL, UNSIGNED, AUTO_INCREMENT, DEFAULT 등의 옵션 
    * NULL, NOT NULL - 빈칸을 허용할지 여부를 묻는 옵션 
        * comment 컬럼만 NULL, 나머지는 모두 NOT NULL 
        * => 자기 소개를 제외한 나머지 컬럼은 반드시 로우를 생성할 때 데이터를 입력해주어야 함.
    * id 컬럼 - 추가로 AUTO_INCREMENT
        * 숫자를 저절로 올리겠다는 의미 
        * ex) 처음에 Zero라는 사람의 데이터를 넣으면???? -> MySQL은 알아서 id로 1번을 부여함
        * ex) 다음에 Nero라는 사람의 데이터를 넣으면 자동으로 id 2번을 부여함 
        * => 가능하게 하는 옵션이 AUTO_INCREMENT
    * UNSIGNED - 숫자 자료형에 적용되는 옵션 -> 숫자 자료형 : 기본적으로 음수 범위를 지원
        * ex) INT --2147483648 ~ 2147483647까지의 숫자를 저장할 수 있음 
        * 만약 UNSIGNED 적용시 -> 음수는 무시되고 0~4294967295까지 저장할 수 있음
        * FLOAT, DOUBLE에는 UN 적용이 불가 
        * 나이처럼 음수가 나올 수 없는 컬럼은 체크해두는 것이 좋음 
    * ZEROFILL - 숫자의 자릿수가 고정되어 있을 떄 사용할 수 있음 
        * ex) 자료형으로 INT 대신 INT(자릿수)처럼 표현하는 경우 존재
            * 이 때 ZEROFILL을 설정해둔다면 비어 있는 자리에 모두 0을 넣음 
            * ex) INT(4)인데 숫자 1을 넣었다면 0001이 되는 식 
    * created_at => DEFAULT now()라는 옵션이 붙음 
        * 데이터베이스 저장 시 해당 컬럼에 value가 없을때 MySQL이 기본 value를 대신 넣어줌 
        * now() : 현재 time을 넣으라는 뜻, now() 대신 CURRENT_TIMESTAMP를 적어도 동일한 뜻이 됨.
        * ex) 사용자 정보를 넣으면 created_at 컬럼엔 넣는 잠깐의 time이 자동으로 기록됨.
    * 해당 컬럼이 기본 키인 경우 => PRIMARY KEY 옵션을 설정 
        * 기본 키? - 로우를 대표하는 고유한 value
            * 데이터베이스에 데이터를 넣을 때 로우 단위로 넣음 
            * 이 때, 로우들을 구별할 고유한 식별자가 필요!
            * 이름, 나이, 결혼 여부 칼럼은 다른 사람과 내용이 겹칠 수 있어 
            * 자기소개 - 내용을 입력하지 않아도 되어 고유하지 않음 
            * => id라는 새로운 컬럼을 하나 만들어 고유한 번호를 부여한 것
            * => 주민등록번호, 학번과 비슷한 개념 
        * MySQL에는 PRIMARY KEY(id)라는 옵션으로 id 컬럼이 기본키임을 알림
    * UNIQUE INDEX - 해당 value가 고유해야 하는지에 대한 옵션 
        * ex) name 컬럼이 해당됨.
        * 인덱스의 이름은 name_UNIQUE로, name 컬럼을 오름차순(ASC)으로 기억하겠다는 것 
        * 내림차순은 DESC 
        * PRIMARY KEY or UNIQUE INDEX의 경우 -> 데이터베이스가 별도로 컬럼을 관리
        * => 조회 시 속도가 빨라짐
        * 기본 키인 id도 사실 고유해야 하지만, PRIMARY KEY는 자동으로 UNIQUE INDEX를 포함 
            * => 따로 적을 필요가 없음    

* COMMENT, DEFAULT CHARSET, ENGINE???
    * 테이블 자체에 대한 설정
    * COMMENT : 테이블에 대한 보충 설명을 의미, 이 테이블이 무슨 역할을 하는가?
        * 필수는 아님
    * DEFAULT CHARSET을 utf8로 설정하지 않으면 한글이 입력되지 않아 => 반드시 필수!
    * ENGINE - 여러가지 존재 => MyISAM or InnoDB가 제일 많이 사용됨
        * 우린 InnoDB를 사용함

* DESC 테이블명 - 만들어진 테이블을 확인하는 명령어 
```console
$ DESC users;
```
![desc](https://user-images.githubusercontent.com/11308147/71546362-7bce9680-29d9-11ea-8f5b-2eeddc0232ce.png)

- 테이블을 잘못 만들었을 경우 DROP TABLE 테이블명 명령어를 입력하면 제거됨. => 제거 후 다시 만들어도 OK
```console
$ DROP TABLE users; 
```

![drop](https://user-images.githubusercontent.com/11308147/71546369-85f09500-29d9-11ea-9aba-37757b2c67eb.png)


* 주의! 워크 벤치는 책 캡처 파일로 설명을 대신할 것 입니다. 
    * 직접 윈도우에서 이미 했던 과정들이라...

- ex) 사용자의 댓글을 저장하는 테이블 생성 
```sql
$ CREATE TABLE nodejs.comments (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> commenter INT NOT NULL,
    -> comment VARCHAR(100) NOT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> INDEX commenter_idx (commenter ASC),
    -> CONSTRAINT commenter 
    -> FOREIGN KEY (commenter)
    -> REFERENCES nodejs.users (id)
    -> ON DELETE CASCADE
    -> ON UPDATE CASCADE)
    -> COMMENT = '댓글'
    -> DEFAULT CHARSET=utf8
    -> ENGINE=InnoDB;
```

![test](https://user-images.githubusercontent.com/11308147/71546370-8e48d000-29d9-11ea-964d-faa6fd311764.png)

- comment table에선 id, commenter(댓글을 쓴 사용자 ID), comment(댓글 내용), created_at(로우 생성일) 컬럼이 있음 

- commenter 컬럼엔 댓글을 작성한 사용자의 id를 저장할 것 
- 외래 키(foreign key) : 다른 테이블의 기본 키를 저장하는 컬럼 
    ```sql
    CONSTRAINT 제약조건명 FOREIGN KEY 컬럼명 REFERENCES 참고하는 컬럼명 
    ```
- => 외래 키를 지정할 수 있음 
- commenter 컬럼과 users 테이블의 id 컬럼을 연결하였습니다. 
- 다른 테이블의 기본 키이므로 commenter 컬럼에 인덱스도 걸어 본 것.

- ON UPDATE와 ON DELETE => 모두 CASCADE로 설정했음 
- 사용자 정보가 수정되거나 삭제되면 그것과 연결된 댓글 정보 처럼 수정하거나 삭제한다는 뜻 
- => 데이터가 불일치하는 현상을 막기 위해서 
```sql
SHOW TABLES;
```
![showtable](https://user-images.githubusercontent.com/11308147/71546385-a7ea1780-29d9-11ea-9824-681af6c99e0c.png)

* 워크벤치로는???

  - `테이블 생성 및 테이블 자료형 체크`

  - `테이블 삭제 메뉴 & 테이블 생성 및 외래키 사용`

  - `외래키 관계` 는 책을 참고

# 7.5 CRUD 작업하기

- CRUD : Create, Read, Update, Delete의 두문자어 => 데이터베이스에서 많이 하는 작업 네가지

- `CRUD는 책을 참고`

# 7.5.1 Create(생성)

- 데이터를 생성해서 데이터베이스에 넣는 작업 
```sql
$ INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24,0, '자기소개1');
$ INSERT INTO nodejs.users (name, age, married, comment) VALUES
('nero', 32, 1, '자기소개2' )
```
![create](https://user-images.githubusercontent.com/11308147/71546433-2a72d700-29da-11ea-8adb-3d4b14f9cffc.png)

- use nodejs; 명령어를 사용했다면? => 테이블 명으로 nodejs.users 대신 users만 해도 됨.

* 데이터를 넣는 명령어
```sql
INSERT INTO 테이블명 ([컬럼1], [컬럼2], ...) VALUES ([value1], [value2], ...)
```
- name에 zero, age에 24, married에 0, comment에 자기소개1이 들어가는 것
- id : AUTO_INCREMENT에 의해, created_at은 DEFAULT value에 의해 자동으로 삽입

- comments 테이블에도 데이터를 넣어보자
```sql
$ INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '안녕하세요. zero의 댓글입니다.');
```
- 이전 실습 조금의 문제로 조금 변경하였습니다.

![commentscreate](https://user-images.githubusercontent.com/11308147/71546449-41192e00-29da-11ea-9698-e006acd2bbb4.png)

* `워크벤치에선 -> 책을 참고`

# 7.5.2 Read(조회)

- Read : 데이터베이스에 있는 데이터를 조회하는 작업 
```sql
$ SELECT * FROM nodejs.users;
```
- => users 테이블의 모든 데이터를 조회하는 SQL문
```sql
-- 기본 형식
$ SELECT * FROM [테이블명]
```

![Read](https://user-images.githubusercontent.com/11308147/71546467-6b6aeb80-29da-11ea-8094-d81d4de565c9.png)

- 위 SQL문을 mysql 프롬프트에 입력하면 됨. => comments 비슷한 SQL문으로 조회할 수 있음.

* 특정 컬럼만 조회할 수도 있습니다. => 조회를 원하는 컬럼을 SELECT 다음에 넣어주면 됨.

* WHERE 절을 사용하면 특정 조건을 가진 데이터만 조회할 수도 있음 
    * ex) 결혼을 했고 나이가 30세 이상인 사용자를 조회하는 SQL
    * AND 문으로 여러 조건을 묶어줄 수도 있음
```sql
$ SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
```

![selectwhere](https://user-images.githubusercontent.com/11308147/71546474-7a519e00-29da-11ea-9d61-a6271bb6ccb9.png)


* AND - 조건들을 모두 만족하는 데이터를 찾는다?
    * OR - 조건들 중 어느 하나라도 만족하는 데이터를 찾음
```sql
$ SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;
```
![selectWhereor](https://user-images.githubusercontent.com/11308147/71546473-7a519e00-29da-11ea-8773-a2c0101553a4.png)

* ORDER BY 컬럼명 ASC|DESC -> 정렬도 가능 
    * ex) 나이가 많은 순서대로 정렬
    * DESC - 내림차순, ASC - 오름차순
```sql
$ SELECT id, name FROM nodejs.users ORDER BY age DESC;
```
![orderby](https://user-images.githubusercontent.com/11308147/71546484-8ccbd780-29da-11ea-9fff-19e08d07ffff.png)

* 조회할 로우 개수를 설정할 수도 있음 
    * LIMIT 숫자 - 이것을 사용하자!
    * ex) LIMIT 1을 SQL문 끝에 붙이면 하나만 조회 가능 
```sql
$ SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;
```
![ORDERBYLIMIT](https://user-images.githubusercontent.com/11308147/71546485-8d646e00-29da-11ea-9a6d-55092556b563.png)

* 로우 개수를 설정하면서 몇 개를 건너뛸지 설정할 수도 있음 
    * ex) 게시판 등 페이지네이션 기능을 구현할 때 유용!!!
    * ex) 첫 번째 페이지에 1~20번 게시물 조회 시, 두 번째 페이지엔 21~40번 게시물을 조회해야 함.
        * 이 때, 처음 20개를 건너뛰고 다음 20개 게시물을 조회하라는 식의 명령이 가능!
        * OFFSET 건너뛸 숫자 키워드를 사용!
    ```sql
    $ SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
    ```
    
![offset](https://user-images.githubusercontent.com/11308147/71546493-9ead7a80-29da-11ea-9fd1-6d490c962a33.png)

* `워크벤치에선 - 데이터 확인 & 쿼리 실행은 책을 참고`

# 7.5.3 Update(수정)

- 데이터베이스에 있는 데이터를 수정하는 작업
```sql
$ UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
-- Where id = 2로 id가 2인 로우의 컬럼을 수정할 수 잇음 
-- users 테이블에서 id가 2인 로우의 comment를 주어진 내용으로 바꾸라는 뜻! 
```
![update](https://user-images.githubusercontent.com/11308147/71546500-bdac0c80-29da-11ea-90c8-c78d889df865.png)

* 수정 명령어 
    * 조건도 AND나 OR로 여러 개를 동시에 사용할 수 있음
```sql
UPDATE 테이블명 SET 컬럼명=바꿀value where 조건 
```

# 7.5.4 DELETE(삭제)

- 데이터베이스에 있는 데이터를 삭제하는 작업 -> 직접 로우 제거
```sql
$ DELETE FROM nodejs.users WHERE id = 2;
-- 조건이 WHERE id = 2 -> users 테이블에서 id가 2인 로우를 제거하라는 뜻
```
* 삭제 명령어 
    * 삭제 조건 역시 AND, OR로 여러 개를 동시에 사용 가능 
```sql
DELETE FROM 테이블명 WHERE 조건 
```
![delete](https://user-images.githubusercontent.com/11308147/71546503-bf75d000-29da-11ea-87b8-10281d4d2eef.png)

- => 기본적인 과정 익힘 
- -> MySQL을 노드와 연동해 서버에서 데이터베이스를 조작할 수 있게 하자!

- 노드와 MySQL을 연동해줄 뿐만 아니라 SQL문을 작성하는 것을 도와주는 라이브러리가 존재 
- => JAVASCRIPT로 코드를 작성하면 SQL문을 만들어줌.

* `워크벤치 에선 - update & delete는 책을 참고`

# 7.6 시퀄라이즈 사용하기 

- 노드에서 MySQL 데이터베이스에 접속 ㄱㄱ
- MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리가 존재! => Sequelize

- ORM(Object-relational Mapping)으로 분류됨.
- ORM? 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구!

- 시퀄라이즈를 MySQL 뿐만이 아닌, MariaDB, PostgresSQL, SQLite, MSSQL 등 다른 데이터베이스도 함께 사용 가능
- 문법이 어느 정도 호환되므로 다른 SQL 데이터베이스로 전환할 떄도 편리!

- 왜 시퀄라이즈를 쓰는가? 
  - 자바스크립트 구문을 알아서 SQL로 바꾸어주기 때문에!
  - SQL 언어를 직접 사용하지 않아도 자바스크립트만으로 MySQL을 조작할 수 있음 
- SQL을 몰라도 MySQL을 어느정도 다룰 수 있게 되지만, SQL을 모르는 채로 시퀄라이즈를 사용하는 것을 추천 X

1. Express-generator로 새 프로젝트 생성 & 시퀄라이즈 설치
2. 
![installexpressgenerator](https://user-images.githubusercontent.com/11308147/71546531-25faee00-29db-11ea-88cd-e701a39693e8.png)

![express-generator](https://user-images.githubusercontent.com/11308147/71546530-25faee00-29db-11ea-99a2-41086bde75ff.png)

2. 완료 후 learn-sequelize 폴더로 이동해 npm 패키지 설치
![npm_i](https://user-images.githubusercontent.com/11308147/71546535-36ab6400-29db-11ea-8f6a-c14810fa4cb6.png)

3. 시퀄라이즈에 필요한 sequelize와 mysql2 패키지를 설치 
    * ![npm_i_sequelize_mysql2](https://user-images.githubusercontent.com/11308147/71546543-4dea5180-29db-11ea-912a-b41939426c14.png)
    * 그 후 sequelize 커맨드를 사용하기 위해 sequelize-cli를 전역 설치함.
        * ![npm_i_g_sequelize_cli](https://user-images.githubusercontent.com/11308147/71546545-4e82e800-29db-11ea-8d78-4abdd0929a6b.png)
    * 설치 완료 후 sequelize init 명령어를 호출하면 됨.
        * ![sequelize_init](https://user-images.githubusercontent.com/11308147/71546544-4dea5180-29db-11ea-9ffe-ed69be277eb5.png)
        * 명령어 호출 시 나오는 Warning은 무시해도 되고 
        * config, models, migrations, seeders 폴더가 생성됨.
        * models 폴더 안 index.js를 확인해보자.
        * 왜? sequelize-cli가 자동으로 생성해주는 코드는 그대로 사용했을 때 에러가 발생 & 필요 없는 부분도 많음

```javascript
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```
# 7.6.1 MySQL 연결하기

- 시퀄라이즈를 통해 익스프레스 앱과 MySQL을 연결해야 함.
- app.js에서 추가해주자.
![mysqladd](https://user-images.githubusercontent.com/11308147/71546566-82f6a400-29db-11ea-82c0-0587d842e853.png)
- require('./models') : require('./models/index.js')
- 폴더 내의 index.js 파일은 require 시 이름을 생략할 수 있음 
  - sync 메서드를 사용하면 서버 실행 시 알아서 MySQL과 연동됨.

# 7.6.2 모델 정의하기 

- MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야 함.
- MySQL의 테이블은 시퀄라이즈의 모델과 대응됨.
- 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 함.
- User와 Comment 모델을 만들어 users 테이블과 comments 테이블에 연결해보면...
- 시퀄라이즈 - 기본적으로 모델 이름을 단수형, 테이블 이름을 복수형으로 사용
```javascript
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGEND,
            allowNull: false,
        },
        married:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    },
    {
        timestamps: false,
    });
};
```
- Sequelize - 알아서 id를 기본 키로 연결함 => id 컬럼은 적어줄 필요가 없음 
- sequelize, define 메서드로 테이블명, 컬럼의 스펙을 입력
- MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응됨.

* 시퀄라이즈의 자료형 != MySQL의 자료형
    * VARCHAR는 STRING으로, INT는 INTEGER로,
    * TINYINT는 BOOLEAN으로, DATETIME은 DATE로 적음 
    * INTEGER.UNSIGNED는
        * UNSIGNED 옵션이 적용된 INT를 의미 
        * ZEROFILL 옵션도 사용하고 싶다면,
        * INTEGER.UNSIGNED.ZEROFILL을 적음 
    * allowNull은 NOT NULL 옵션과 동일 
    * unique는 UNIQUE 옵션임. 
    * defaultValue - 기본 value(DEFAULT)
    * now()를 사용해야 하므로 sequelize.literal 메서드 안
        * 여기에 넣어 입력함.
        * 이 메서드는 인자로 넣은 문자를 그대로 사용하는 역할을 함.
    * define 메서드의 세 번째인자는 테이블 옵션 
        * timestamps 속성의 value가 false로 되어 있음
        * timestamps 속성이 true이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가함.
        * 로우가 생성될 때와 수정될 때의 time이 자동으로 입력됨.
            * But, 예제에선 직접 created_at 컬럼을 만들었기 때문에 timestamps 속성이 필요하지 않음!
            * => 속성 value를 false로 하여 자동으로 날짜 컬럼을 추가하는 기능을 해제!

- Note! 기타 테이블 옵션!!!
- paranoid, underscored, tableName 옵션도 자주 사용됨. 
- 실무에선 -> timestamps: true와 함깨 paranoid: true를 자주 사용함 => paranoid 옵션은 timestamps가 true가 설정할 수 있음 
- paranoid를 true로 설정하면 deletedAt에 제거된 날짜를 입력함. 
- 로우를 조회하는 명령을 내렸을 땐, deletedAt의 value가 null인 로우(삭제되지 않았다는 뜻)를 조회.

- why? 완전히 삭제하지 않고 deletedAt 컬럼을 따로 만들어 지운 날짜를 기록할까? => 데이터 복구를 염두
- 백업 데이터베이스가 없다면 로우를 지운 후 복구할 수가 없음, 고객이 삭제된 데이터를 다시 복구해달라고 요청 시 복구할 수가 없는 것
- => 데이터에 삭제되었다는 표시를 deletedAt 컬럼에 남겨두고 조회할 때는 deletedAt 컬럼이 null인 로우에서 찾음 

- underscore 옵션 : createdAt, updatedAt, deletedAt 컬럼 & 시퀄라이즈가 자동으로 생성해주는 관계 컬럼들의 이름을 스네이크케이스 형식으로 바꾸어줌 
- 스네이크케이스라는 변수 이름이 (대문자 대신) => _를 사용하는 방식 -> createdAt, updatedAt, deletedAt 컬럼은 개개 created_at, updated_at, deleted_at이 됨.

- tableName 옵션 - 테이블 이름을 다른 것으로 설정하고 싶을 때 사용함! 
- 시퀄라이즈 - 자동으로 define 메서드의 첫 번째 인자를 복수형으로 만들어 테이블 이름으로 사용함.
- 현재는 user, comment가 첫 번째 인자로 설정됨.
- 시퀄라이즈 - 이를 사용해 users와 comments 테이블을 만듬
  -  자동 변환을 막고 싶다면 tableName 옵션에 value를 주어 해당 value로 테이블 이름을 만들 수 있음

- Comments 모델도 만들어 보면,

```javascript
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        comment: {
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type:DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('now()'),
        },
    }, {
        timestamps: false;
    });
};
```

- comment 모델이 조금 이상! -> users 테이블과 연결된 commenter 컬럼이 없음 => 모델을 정의할 때 넣어주어도 되지만,
- 시퀄라이즈 자체에서 관계를 따로 정의할 수 있음 

- 모델을 생성했다면 models/index.js와 연결!
```javascript
// model/index.js안에서...
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User =require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

module.exports = db;
```
- db라는 객체에 User와 Comment 모델을 담아둠 => db 객체를 require하여 User와 Comment 모델에 접근할 수 있음 

- config 폴더 안 config.json을 수정 => development.password와 development.database를 현재 MySQL 커넥션과 일치하게 수정하면 됨.
- test와 production 쪽은 개개 테스트 용도와 배포 용도로 사용되는 것 -> 나중에 사용하자!
- 나의 경우 원래 username은 root에서 ghwjd으로 바꿈
```json
{
  "development": {
    "username": "ghwjd",
    "password": "95dlfwls",
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases":false
},
```
- password 속성 - 우리의 MySQL 번호 입력 & database 속성 - nodejs를 입력, operatorAliases - 보안에 취약한 연산자를 사용할지 여부를 설정하는 옵션 => false를 입력하자.
- 이 설정은 process.env.NODE_ENV가 development일 때 적용됨. => 배포할 때는 process.env.NODE_ENV를 production으로 설정해 둠.
- 따라서 배포 환경을 위해 데이터베이스를 설정할 땐 config/config.json의 production 속성을 수정하면 됨. 
- 테스트 환경일 땐(process.env.NODE_ENV가 test) => test 속성을 수정

# 7.6.3 관계 정의하기 

- users 테이블과 comments 테이블 사이의 관계를 정의해보자. 
- 사용자 한 명은 댓글을 여러 개 작성할 수 있음 But, 댓글 하나에 사용자(작성자)가 여러 명일 수는 없음 
  - => 일대다(1:N) 관계라고 함
- ex) 1:N 관계에선 사용자가 1이고, 댓글이 N 

- 일대일, 다대다 관계도 존재
- 일대일 - 사용자와 사용자에 대한 정보 테이블 
- 사용자 한 명 => 자신의 정보를 담고 있는 테이블과만 관계가 있고 정보 테이블도 한 사람만을 가리킴 => 이러한 관계 : 1대1 관계

- 다대다 - 게시글 테이블과 해시태그(#) 테이블 관계
- 한 게시글에는 해시태그가 여러 개 달릴 수 있고, 한 해시태그도 여러 게시글에 달릴 수 있음 => 다대다 관계 

- MySQL - JOIN이라는 기능 => 여러 테이블 사이 관계를 파악해 결과를 도출! => 시퀄라이즈 : JOIN 기능도 알아서 구현! 
- 대신! 시퀼라이즈에게 테이블 사이 어떤 관계가 있는지 알려주어야 함!

# 7.6.3.1 1:N

- 시퀄라이즈 - 1:N 관계를 hasMany 메서드로 표시! 
- users 테이블의 로우 하나를 불러올 때 연결된 comments 테이블의 로우들도 함께 불러올 수 있음 

- belongsTo 메서드도 존재! 
- comments 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져옴

- `1대다는 책을 참고`

- models/index.js에서 모델들을 연결해준 곳 밑에 추가로 넣어줌

```javascript
db.User =require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});

module.exports = db;
```
- 시퀄라이즈 - 테이블 사이 관계를 파악해서 commenter 컬럼을 추가하고, 외래 키도 추가함!
- 외래 키 컬럼 - commenter / users의 id 컬럼을 가리키고 있음 
- foreignKey 속성에 commenter를 넣어줌
- hasMany 메소드 - targetKey 속성에 id를 넣어줌 => User 모델의 id가 Comment 모델의 commenter 컬럼에 들어가게 됨!

![sequelizeSQL](https://user-images.githubusercontent.com/11308147/71546597-fbf5fb80-29db-11ea-9e7f-ac5ef38a541a.png)
- 근데 boolean value는 지원안하는듯 이제??

- 이전에서 워크벤치가 실행했던 구문과 비슷한 SQL문을 만들어줌 
  - CREATE TABLE 뒤에 IF NOT EXISTS라고 되어 있는데, 이 부분은 테이블이 존재하지 않을 시 실행된다는 의미!

- 이미 워크벤치 or 콘솔로 테이블을 만들어두었으므로 구문은 실행되지 않음! => 대신 실수로 테이블을 삭제했을 땐 이 구문으로 인해 다시 테이블이 생성됨.

# 7.6.3.2 1:1

- 1:1 => hasOne 메서드를 사용함. 사용자 정보를 담고 있는 가상의 모델이 있다고 하면?
```javascript
    db.User.hasOne(db.Info, { foreignKey : 'user_id', sourceKey : 'id'});
    db.Info.belongsTo(db.User, { foreignKey : 'user_id', targetKey: 'id'});
    // belongsTO와 hasOne이 반대여도 상관없음! => 일대일이라서!
```

# 7.6.3.3 N:M 

- `n대 m 관계는 책을 참고`

- 시퀄라이즈 - N:M 관계 => belongsToMany 메소드가 존재 
```javascript
 //게시글 정보를 담고 있는 가상의 Post 모델과 해시태그 정보를 담고 있는 가상의 Hashtag 모델이 있다고 하면???
 db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag' });
 db.Hashtag.belongsToMany(db.Post, { through : 'PostHashtag' });
```

- N:M 관계 특성상 새로운 모델이 생성, through 속성에 그 이름을 적어주면 됨!
- 새로 생성된 PostHashtag 모델엔 게시글과 해시태그의 아이디가 저장됨!

- `N:M 관계 테이블은 책을 참고`

- N:M => 데이터를 조회할 때 여러 단계를 거쳐야 함. 
- ex) 노드 해시 태그를 사용한 게시물을 조회하는 경우를 think!
1. 노드 해시태그 - Hashtag 모델에서 조회함. 

2. 가져온 태그의 아이디(1)를 바탕으로 PostHashtag 모델에서 hashtagId가 1인 postId들을 찾아 Post 모델에서 정보를 가져옴

- 시퀄라이즈 - 편하게 할 수 있도록 몇 가지 메서드를 지원 
```javascript 
async(req,res,next) =>{
    const tag = await Hashtag.find({ where: { title: '노드' }});
    const posts = await tag.getPosts();
}

// 1) 해시태그를 찾으면 그 해시태그에서 바로 getPost 메서드를 사용할 수 있음, get + 모델 이름의 복수형 
```

* add + 모델 이름의 복수형 메서드도 존재 => 두 테이블 사이 N:M 관계를 추가해줌 
```javascript
    // title이 노드인 해시태그와 게시글 아이디가 3인 게시글을 연결하는 코드
    async (req,res,next) => {
        const tag = await Hashtag.find({ where: { title: '노드' }});
        await tag.setPosts(3);
    };
```

- PostHashtag 모델에 postId가 3이고 hashtagId가 1인 로우가 생성됨.

# 7.6.4 쿼리 알아보기 

- Sequelize로 CRUD 작업을 하기 위해선 먼저 Sequelize 쿼리에 대해 알아야 함. => SQL문을 Javascript로 생성하는 것(시퀄라이즈만의 방식이 존재)
- 쿼리 -> 프로미스를 반환 => then을 붙여 결과value를 받을 수 있음, async/await 문법과 함께 사용 가능

```sql
-- 로우를 생성하는 쿼리 
-- sql문
INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24,0,'자기소개1');

-- Sequelize 쿼리 
const { User } = require('../models')
User.create({
    name: 'zero',
    age: 24,
    married : false,
    comment : '자기소개1',
}); 
```
- models 모듈에서 User 모델을 불러와 create 메서드를 사용하면 됨. ex) User 모델을 불러왔다는 전제하에 수행해야 함.

- 주의! 데이터를 넣을 때 MySQL의 자료형이 아니라 Sequelize 모델에 정의한 자료형대로 넣어야 한다는 것 (married가 0이 아니라 false인 이유)
- 시퀄라이즈가 알아서 MySQL 자료형으로 바꿔줌. 자료형이나 옵션에 부합하지 않는 데이터를 넣었을 때는 시퀄라이즈가 에러를 발생시킴!

```sql
-- 로우를 조회하는 쿼리 
-- users 테이블의 모든 데이터를 조회하는 SQL문, findAll 메서드 사용
SELECT * FROM nodejs.users;
User.findAll({});

-- Users 테이블의 데이터 하나만 가져오는 SQL문
-- 데이터를 하나만 가져올 때는 find 메서드, 여러 개 가져올 때는 findAll 메서드를 사용한다고 알면 됨.
SELECT * FROM nodejs.users LIMIT 1;
User.find({});

-- attributes 옵션을 사용해서 원하는 컬럼만 가져올 수 있음 
SELECT name, married FROM nodejs.users;
User.findAll({
    attributes: ['name','married'],
});

-- where 옵션이 조건들을 나열하는 옵션, age 부분이 특이 
-- 시퀄라이즈 => 자바스크립트 객체를 사용해 쿼리를 생성해야 함 => Op.gt 처럼 특수한 연산자들이 사용됨. 
-- Sequelize 객체 내부의 Op 객체를 불러와 사용  ex) { [Op.gt] : 30 } -> ES2015 문법 

SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const { User, Sequelize: { Op } } = require('../models');
User.findAll({
    attributes: ['name','age'],
    where: {
        married: 1,
        age: { [Op.gt] : 30 },
    },
});

```
- 자주 쓰이는 연산자 -> Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하), Op.ne(same하지 않음), Op.or(또는), Op.in(배열 요소 중 하나), 
- Op.notIn(배열 요소와 모두 다름) 

```sql
SELECT id, name FROM users WHERE married = 0 OR age > 30;
-- Op.or 속성에 OR 연산을 적용할 쿼리들을 배열로 나열하면 됨.
const { User, Sequelize : { Op } } = require('../models');
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or]: [{married: 0}, {age: {[Op.gt]: 30}}],
    }
});

-- 시퀄라이즈의 정렬방식, order 옵션으로 가능, 배열 안에 배열이 있따는 점에 주의!
-- 정렬은 꼭 컬럼 하나로 하는 게 아닌 컬럼 2개 이상으로도 할 수 있어서!
SELECT id, name FROM users ORDER BY age DESC;
User.findAll({
    attributes: ['id','name'],
    order:[['age','DESC']],
});

-- 조회할 로우 개수를 설정하는 방법(LIMIT 1인 경우엔, findAll 대신 find 메서드를 사용해도 되지만...)
SELECT id, name FROM users ORDER BY age DESC LIMIT 1;
User.findAll({
    attributes: ['id', 'name'],
    order:['age', 'DESC'],
    limit: 1,
});
```
- limit 옵션으로도 가능 => OFFSET도 역시 offset 속성으로 구현 가능 
```console
$ SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
User.findAll({
    attributes: ['id', 'name'],
    order: ['age', 'DESC'],
    limit: 1,
    offset: 1,
});
```
- 로우를 수정하는 쿼리 -> Update 메서드로 수정 가능, 첫 번째 인자 : 수정할 내용, 두 번째 인자 : 수정 대상 로우를 찾는 조건, where 옵션에 조건들을 적어줌
```sql
UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
    comment: '바꿀 내용'
}, {
    where: {id:2},
});

-- 로우를 삭제하는 쿼리
DELETE FROM nodejs.users WHERE id = 2;
User.destroy({
    where: {id:2},
});
-- destroy 메서드로 삭제하며 where 옵션에 조건들을 적어줌
```
# 7.6.5 쿼리 수행하기 

- 쿼리로 CRUD 작업을 해보면...=> 모델에서 데이터를 받아 페이지를 렌더링하는 방법, JSON 형식으로 데이터를 가져오는 방법

- 사용자가 등록한 댓글을 가져오는 서버
* AJAX를 사용해 서버와 통신!
    1. views 폴더에 sequelize.pug 파일 만듬
    2. public 폴더 안 sequelize.js 파일 만듬 -> 서버 코드 위주의 집중 필요 => script 태그 - 버튼들을 눌렀을 대 서버의 라우터로 AJAX 요청을 보내는 코드가 들어있음 
    3. 만들 라우터들을 미리 app.js에 연결해주자 => express.static의 순서도 위로 올려주고..
```javascript
// app.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var sequelize = require('./models').sequelize;


var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
```
* 그 후, 라우터를 만들어주자(GET, POST, PUT, DELETE) 개개 요청에 해당하는 라우터를 만듬!
```javascript
// routes/index.js
var express = require('express');
var User = require('../models').User;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  User.findAll()
    .then((users) => {
      res.render('sequelize', { users });
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

module.exports = router;
```
* GET /로 접속했을 때의 라우터
    * User.findAll 메서드로 모든 사용자를 찾은 후 => sequelize.pug를 렌더링할 때 결과value인 users를 넣어줌 
    * 시퀄라이즈 - 프로미스를 기본적으로 지원 => then, catch를 사용해 개개 조회 성공 시와 실패 시의 정보를 얻을 수 있음
        * 미리 데이터베이스에서 데이터를 조회한 후 템플릿 렌더링에 사용할 수 있음 
```javascript
    // 위의 예시를 async/await 문법으로 표시하면
    router.get('/', async(req,res,next)=>{
        try{
            const users = await User.findAll();
            res.render('sequelize', { users });
        }   
        catch (error){
            console.error(error);
            next(error);
        }
    });

```
* users.js 만들어보면 => 프로미스를 -> async/await 형식으로 직접 바꾸어봐도 됨.
* GET /users와 POST /users 주소로 요청이 들어올 때의 라우터 
    * 개개 사용자를 조회하는 요청 & 사용자를 등록하는 요청을 처리
    * GET /에서도 사용자 데이터를 조회했지만, GET /users에선 데이터를 JSON 형식으로 반환한다는 것의 차이
```javascript
// routes/users.js
var express = require('express');
var User = require('../models').User;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.findAll()
    .then((users)=>{
      res.json(users);
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
});

router.post('/',function(req,res,next){
  User.create({
    name: req.body.name,
    age : req.body.age,
    married: req.body.married,
  })
  .then((result)=>{
    console.log(result);
    res.status(201).json(result);
  })
  .catch((err)=>{
    console.error(err);
    next(err);
  });
});


module.exports = router;
```

* comments.js를 바꾼다.
* 댓글에 관련된 CRUD 작업을 하는 라우터 
    * GET /comments, POST /comments, PATCH /comments/:id, DELETE /comments/:id를 등록함
```javascript
// routes/comments.js
var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();
router.get('/:id',function(req,res,next){
    Comment.findAll({
        include : {
            model : User,
            where : {id: req.params.id},
        },
    })
    .then((comments) =>{
        console.log(comments);
        res.json(comments);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
router.post('/', function(req,res,next){
    Comment.create({
        commenter: req.body.id,
        comment: req.body.comment,
    })
    .then((result)=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

router.patch('/:id', function(req,res, next){
    Comment.update({ comment: req.body.comment } , { where : {id:req.params.id}})
    .then((result) =>{
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

router.delete('/:id',function(req,res,next){
    Comment.destroy({ where: {id: req.params.id}})
    .then((result) => {
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

module.exports =router;
```

* 코드를 나누어서 보면,
* findAll 메서드에 옵션이 추가되어 있음 => include 옵션으로 관련 있는 모델을 불러올 수 있음 
    * hasMany, belongsTo로 연결해두어야 include 옵션을 사용할 수 있음 
    * include 옵션에서 models 속성에는 User 모델을, where 속성에는 :id로 받은 아이디 value을 넣어주었음
    * :id - 와일드카드 라우터 
    * GET /comments/1이라면 -> 사용자 id가 1인 댓글을 불러옴
    * 조회된 댓글 객체에는 include로 넣어준 사용자 정보도 들어 있음 => 작성자의 이름, 나이 등을 조회할 수 있음
```javascript
router.get('/:id',function(req,res,next){
    Comment.findAll({
        include : {
            model : User,
            where : {id: req.params.id},
        },
    })
    .then((comments) =>{
        console.log(comments);
        res.json(comments);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
```

* 댓글을 생성하는 라우터 
    * commenter 속성에 사용자 아이디를 넣어 사용자와 댓글을 연결해줌
```javascript
router.post('/', function(req,res,next){
    Comment.create({
        commenter: req.body.id,
        comment: req.body.comment,
    })
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

* 수정과 삭제에는 update, destroy 메서드를 사용 
    * update 메서드 - 첫 번째 인자로 수정할 칼럼, value가 들어 있는 객체를 제공하고, 두 번째 인자론 어떤 로우를 수정할 것인지에 대한 조건을 제시
    * where 옵션으로 id가 :id에 해당하는 value인 댓글을 수정하도록 함
    * destroy 메서드에도 update 메서드와 유사하게 where 옵션으로 어떤 로우를 삭제할지 지정!
```javascript
router.patch('/:id', function(req,res, next){
    Comment.update({ comment: req.body.comment } , { where : {id:req.params.id}})
    .then((result) =>{
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

router.delete('/:id',function(req,res,next){
    Comment.destroy({ where: {id: req.params.id}})
    .then((result) => {
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
```

* 서버를 재실행하고 http://localhost:3000으로 접속 ㄱㄱ => 재실행하지 않으면 수정사항이 반영되지 않음
* 콘솔에는 시퀄라이즈가 수행하는 SQL문이 나옴 => 어떤 동작을 하는지 확인 가능
    * SQL문을 보고 싶지 않다? => config/config.json의 operatorsAliases 속성 밑 "logging":false를 추가하면 됨.
    * 접속 시 GET / 라우터 User.findAll 메서드를 호출함 => 그에 따른 SQL문이 실행됨. 

- MySQL과 시퀄라이즈에 대해 알아봄 => SQL문을 따로 배우지 않으면 정밀한 데이터베이스 작업을 하기엔 무리!
  - SQL은 따로 배워두자!(Sequelize로 모든 데이터베이스 작업을 할 수는 없으므로 나중에는 직접 SQL을 사용해야 하는 경우가 생길 수 있기 때문)

* MySQL과는 다른 유형의 데이터베이스인 몽고디비에서도 알아보자!








