const svgNS = "http://www.w3.org/2000/svg";  
const paintBtn = document.querySelector("#paintBtn");
const scratchPad = document.querySelector("#scratchPad");
const realPad = document.getElementById("pad")
const deleteBtn = document.querySelector("#delete");
const undoBtn = document.querySelector("#undo");

//그리기 버튼 눌렀을 때 
paintBtn.onclick = () => {
    const buttonAudio = new Audio('./audio/door-6-close.mp3');
    buttonAudio.play();
    if(scratchPad.style.display === "none"){
        scratchPad.style.display = "";
        undoBtn.style.display = "";
        deleteBtn.style.display = "";
        realPad.style.display = "";
    }else if(scratchPad.style.display === "") {

        realPad.style.display = "none";
        scratchPad.style.display = "none";
        undoBtn.style.display = "none";
        deleteBtn.style.display = "none";
    }
}

//휴지통 버튼 눌렀을 때
deleteBtn.onclick = () => {
    const buttonAudio = new Audio('./audio/paper-throw-1.mp3');
    buttonAudio.play();
    while(realPad.hasChildNodes()){
        realPad.removeChild(realPad.firstChild)
    }
}

//되돌리기 버튼 눌렀을 때 
undoBtn.onclick = () => {
    const buttonAudio = new Audio('./audio/page-flip-02.mp3');
    buttonAudio.play();
    if(document.querySelector("#pad path") !== null){
        realPad.lastElementChild.remove();
    }
}

//마우스 동작
let dragging = false;
let startPoint;

let drawLine;
scratchPad.addEventListener("mousedown", (event) => {
    dragging = true;
    event.preventDefault();
    alert_coords(event);
    startPoint = "M "+ stX + ", " + stY + " ";
    drawLine = document.createElementNS(svgNS,"path");
    realPad.appendChild(drawLine);
});

scratchPad.addEventListener("mousemove", (event) => {
    if(dragging === true){
        alert_coords(event);
        currPath = "L" + stX + ", " + stY + " "; 
        drawing(currPath);
    }
});


document.addEventListener("mouseup", () => {
    dragging = false;

    //점만 찍어서 그림이 그려지지 않았을 떄
    if(realPad.lastElementChild.getAttribute("d") === null){
        realPad.lastElementChild.remove();
    }
});

//그리기
function drawing(currPath) {
    drawLine.setAttributeNS(null,"d", startPoint + currPath);
    drawLine.setAttributeNS(null,"fill", "none");
    drawLine.setAttributeNS(null,"stroke", "black");
    drawLine.setAttributeNS(null,"stroke-width", "2");

    let nowPath = startPoint + currPath;
    startPoint = nowPath;
}