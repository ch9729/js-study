const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list")   // ul테이블

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

const createTodo = function (storageData) {
    let todoContents = todoInput.value;
    if (storageData) {
        todoContents = storageData.contents;
    }

    const newLi = document.createElement('li');     //li태그를 자바스크립트로 생성
    const newSpan = document.createElement('span'); //span태그 자바스크립트로 생성
    const newBtn = document.createElement('button');

    newBtn.addEventListener("click", () => {
        newLi.classList.toggle("complete"); //클릭시 complete 클래스 생성
        saveItemsFn();
    })

    newLi.addEventListener("dblclick", () => {
        newLi.remove(); //더블 클릭했을때 해당 li태그 삭제
        saveItemsFn();
    })

    if (storageData?.complete === true) {
        newLi.classList.add('complete')
    }

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);     //newLi 태그 내부의 하위 속성으로 newSpan태그 하나 추가
    todoList.appendChild(newLi);    //태그 안에 하위 태그 생성
    todoInput.value = '';         //input박스 내용을 공백으로 다시 만들기 위해
    saveItemsFn();
}

const keyCodeCheck = function () {
    if (window.event.keyCode === 13 && todoInput.value !== '') {    //엔터(keycode값 13)를 누르거나 공백이 아니면
        createTodo();
    }
}

const deleteAll = function () { //전체 삭제
    const liList = document.querySelectorAll('li'); //li태그 전부를 선택
    for (let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
    saveItemsFn();
}

const saveItemsFn = function () {
    const saveItems = [];
    for (let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete')
        };
        saveItems.push(todoObj)
    }

    //65~69줄 참조
    (saveItems.length == 0) ? localStorage.removeItem("saved-items") : localStorage.setItem('saved-items', JSON.stringify(saveItems));

    //if (saveItems.length == 0) {
    //    localStorage.removeItem("saved-items");
    //} else {
    //    localStorage.setItem('saved-items', JSON.stringify(saveItems));
    //}
}

if (savedTodoList) {
    for (let i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}