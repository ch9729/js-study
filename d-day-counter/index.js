const messageContainer = document.getElementById("d-day-message");
const container = document.getElementById("d-day-container");
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>"    //textContent는 해당 태그 내부에 직접 텍스트를 추가해주는 기능
//innerHTML은 태그의 안쪽에 직접 html 자체를 입력해주는것
//container.style.display = "none";   //


// 현재 input에 입력한 연도, 월, 일을 나타내게 하는 함수
const dateFormMaker = function () {
    const inputYear = document.getElementById("target-year-input").value;
    const inputMonth = document.getElementById("target-month-input").value;
    const inputDate = document.getElementById("target-date-input").value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

//nowDate로 현재 시간을 표현 이후 dateFormMaker로 뺀 시간 표현
const counterMaker = function () {
    document.getElementById("d-day-container").style.display = "flex";
    const targetDateInput = dateFormMaker();
    const nowDate = new Date();
    const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);  //한국 시간 기준 9시로 표현되는걸 없애기 위해 .setHours(0,0,0,0)작성
    const remaining = (targetDate - nowDate) / 1000; //뺀 날짜는 0.001초까지 표현되는데 그걸 없애기 위해 1000으로 나누기

    if (remaining <= 0) {       //입력한 날짜가 음수거나 시간이 다지나면 
        messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>"
    } else if (isNaN(remaining)) {     //잘못된 날짜를 입력했을때
        messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>"
    }
    //Math.floor = 소수점 이하 버림
    // const remainingDate = Math.floor(remaining / 3600 / 24); //일 표현
    // const remainingHours = Math.floor(remaining / 3600) % 24; //시간 표현
    // const remainingMin = Math.floor(remaining / 60) % 60; //분 표현
    // const remainingSec = Math.floor(remaining) % 60; //초 표현

    const remainingObj = {  //객체로 만들어서 저장(32~35번째 줄 참조)
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    };

    // const days = document.getElementById("days");
    // const hours = document.getElementById("hours");
    // const min = document.getElementById("min");
    // const sec = document.getElementById("sec");

    const documentObj = {   //객체로 저장(44~47번째 줄 참조)
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        min: document.getElementById("min"),
        sec: document.getElementById("sec")
    };

    documentObj.days.textContent = remainingObj.remainingDate;       //id=days의 값을 remainingDate로 텍스트를 변경
    documentObj.hours.textContent = remainingObj.remainingHours;     //remainingHours 텍스트 변경
    documentObj.min.textContent = remainingObj.remainingMin;         //remainingMin  텍스트 변경
    documentObj.sec.textContent = remainingObj.remainingSec;         //remainingSec 텍스트 변경
};