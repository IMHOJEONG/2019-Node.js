const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);
const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다.');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다.');
});

clearImmediate(immediate2);


/*
    1) immediate => immediate2는 바로 clearImmediatee를 사용해 취소함(실행x)
    2) 코드 실행 1초 후 interval의 콜백 실행 
    3) 코드 실행 1.5초 후에는 timeout의 콜백의 실행됨
    4) interval의 콜백은 1초마다 실행 => 코드 실행 후 2초가 지났을 때도 콜백이 실행됨.
    5) 2.5초가 지났을 때 clearTimeout과 clearInterval이 각각 timeout2와 interval을 취소
    6) 코드 실행 3초 후에는 아무 것도 남지 않음.
*/