let username = prompt("아이디를 입력하세요");
let roomNum = prompt("입장할 방 숫자를 입력하세요");

const eventSource = new EventSource(
  `http://localhost:8080/chat/roomNum/${roomNum}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (username === data.sender) initMyMessage(data);
  else initOtherMessage(data);
};

function getSendMsgBox(data) {
  return `<div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date">${data.sender} </span>
    </div>`;
}

function getReceivedMsgBox(data) {
  return `<div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date">${data.sender} </span>
    </div>`;
}

function initMyMessage(data) {
  let chatBox = document.querySelector("#chat-box"); //특정 내용을 chat-box안에 넣을건데
  let chatOutgoingBox = document.createElement("div"); //<div></div>하나 만들고
  chatOutgoingBox.className = "outgoing_msg"; //<div class="outgoing_msg"></div> 이렇게 해줌

  //let md = history.createdAt.substring(5, 10);
  //let hm = history.createdAt.substring(11, 16);
  //let convertTime = hm + "|" + md;

  chatOutgoingBox.innerHTML = getSendMsgBox(data); //내부에 입력한 메세지 값을 넘기고 메세지 박스에 잘 포장해서 <div class="outgoing_msg"></div>안에 넣는다.

  chatBox.append(chatOutgoingBox); //그걸 챗박스안에 넣어준다.
  inputMsg.value = "";
}

function initOtherMessage(data) {
  let chatBox = document.querySelector("#chat-box"); //특정 내용을 chat-box안에 넣을건데
  let chatOutgoingBox = document.createElement("div"); //<div></div>하나 만들고
  chatOutgoingBox.className = "received_msg"; //<div class="outgoing_msg"></div> 이렇게 해줌

  //let md = history.createdAt.substring(5, 10);
  //let hm = history.createdAt.substring(11, 16);
  //let convertTime = hm + "|" + md;

  chatOutgoingBox.innerHTML = getReceivedMsgBox(data); //내부에 입력한 메세지 값을 넘기고 메세지 박스에 잘 포장해서 <div class="outgoing_msg"></div>안에 넣는다.

  chatBox.append(chatOutgoingBox); //그걸 챗박스안에 넣어준다.
  inputMsg.value = "";
}

async function addMessage() {
  let inputMsg = document.querySelector("#chat-outgoing-msg");
  //let date = new Date();
  //let nowhm = date.getHours() + ":" + date.getMinutes();
  //let nowmd = "0" + (date.getMonth() + 1) + "-" + date.getDate();
  //let now = nowhm + "|" + nowmd;

  let chat = {
    sender: username,
    //receiver: "areum2",
    roomNum: roomNum,
    msg: inputMsg.value,
  };

  await fetch("http://localhost:8080/chat", {
    method: "post",
    body: JSON.stringify(chat),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  inputMsg.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
  addMessage();
});

document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  });
