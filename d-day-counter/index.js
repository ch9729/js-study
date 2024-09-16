const messageContainer = document.getElementById("d-day-message");
const container = document.getElementById("d-day-container");
const savedDate = localStorage.getItem('saved-date');
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>"    //textContent는 해당 태그 내부에 직접 텍스트를 추가해주는 기능
//innerHTML은 태그의 안쪽에 직접 html 자체를 입력해주는것
container.style.display = "none";
const intervalIdArr = [];   //함수 안의 89번쨰 줄 변수를 밖에서 사용하기 위해



// 현재 input에 입력한 연도, 월, 일을 나타내게 하는 함수
const dateFormMaker = function () {
    const inputYear = document.getElementById("target-year-input").value;
    const inputMonth = document.getElementById("target-month-input").value;
    const inputDate = document.getElementById("target-date-input").value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

//nowDate로 현재 시간을 표현 이후 dateFormMaker로 뺀 시간 표현
const counterMaker = function (data) {
    if (data !== savedDate) {
        localStorage.setItem("saved-date", data) //끄더라도 localStorage로 인해 입력한 key:value값이 남아있다.
    }

    const nowDate = new Date();
    const targetDate = new Date(data).setHours(0, 0, 0, 0);  //한국 시간 기준 9시로 표현되는걸 없애기 위해 .setHours(0,0,0,0)작성
    const remaining = (targetDate - nowDate) / 1000; //뺀 날짜는 0.001초까지 표현되는데 그걸 없애기 위해 1000으로 나누기

    if (remaining <= 0) {       //입력한 날짜가 음수거나 시간이 다지나면 
        messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>"
        messageContainer.style.display = 'flex';
        container.style.display = 'none';
        setClearInterval();     //종료가 되어도 불필요한 시간은 계속 돌아가므로
        return;
    } else if (isNaN(remaining)) {     //잘못된 날짜를 입력했을때
        messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>"
        container.style.display = 'none';
        messageContainer.style.display = 'flex';
        setClearInterval();     //종료가 되어도 불필요한 시간은 계속 돌아가므로
        return;
    }
    //Math.floor = 소수점 이하 버림
    // const remainingDate = Math.floor(remaining / 3600 / 24); //일 표현
    // const remainingHours = Math.floor(remaining / 3600) % 24; //시간 표현
    // const remainingMin = Math.floor(remaining / 60) % 60; //분 표현
    // const remainingSec = Math.floor(remaining) % 60; //초 표현

    const remainingObj = {  //객체로 만들어서 저장(45~48번째 줄 참조)
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    };

    // const days = document.getElementById("days");
    // const hours = document.getElementById("hours");
    // const min = document.getElementById("min");
    // const sec = document.getElementById("sec");

    const documentObj = {   //객체로 저장(57~60번째 줄 참조)
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        min: document.getElementById("min"),
        sec: document.getElementById("sec")
    };

    const documentArr = ['days', 'hours', 'min', 'sec']

    const timeKeys = Object.keys(remainingObj); //배열로 반환
    const docKeys = Object.keys(documentObj);   //배열로 반환

    const format = function (time) {    //남은 시간 분 초가 10보다 작으면 앞에 0을 넣고 뒤에 숫자가 나오도록 출력
        if (time < 10) {
            return '0' + time;
        } else {
            return time
        }
    }

    let i = 0;  //89~91, 93~97, 99~102번째로도 사용가능
    for (let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i]])
        document.getElementById(tag).textContent = remainingTime
        i++;
    }

    // for (let i = 0; i < timeKeys.length; i++) {
    //     documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
    // }  

    // let i = 0;
    // for (let key in documentObj) {
    //     documentObj[key].textContent = remainingObj[timeKeys[i]]
    //     i++;
    // }

    // documentObj.days.textContent = remainingObj.remainingDate;       //id=days의 값을 remainingDate로 텍스트를 변경
    // documentObj.hours.textContent = remainingObj.remainingHours;     //remainingHours 텍스트 변경
    // documentObj.min.textContent = remainingObj.remainingMin;         //remainingMin  텍스트 변경
    // documentObj.sec.textContent = remainingObj.remainingSec;         //remainingSec 텍스트 변경
};

const starter = function (targetDateInput) {
    if (!targetDateInput) {
        targetDateInput = dateFormMaker();
    }
    container.style.display = 'flex'
    messageContainer.style.display = 'none'
    setClearInterval();
    counterMaker(targetDateInput); //1초뒤 실행이라 먼저 함수 실행 후  setInterval 실행
    const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);    //1초 후에 카운트 시키는것
    intervalIdArr.push(intervalId)  //strarer 버튼을 입력했을때 카운트 배열이 누적될수 있도록(버튼 한번에 초기화 시키기 위해 작성)
}

const setClearInterval = function () {
    localStorage.removeItem("saved-date")
    for (let i = 0; i < intervalIdArr.length; i++) {    //배열에 담으므로 시작 버튼을 여러번 눌러도 초기화 한번만 누르면 멈춘다.
        clearInterval(intervalIdArr[i])
    }
}

const resetTimer = function () {
    container.style.display = 'none';
    messageContainer.style.display = 'flex'
    messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>"
    setClearInterval();
}

if (savedDate) {
    starter(savedDate);
} else {
    container.style.display = 'none';
    messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>"
}