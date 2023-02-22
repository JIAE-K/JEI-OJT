const svgNS = "http://www.w3.org/2000/svg";  
const paintBtn = document.querySelector("#paintBtn");
const scratchPad = document.querySelector("#scratchPad");
const realPad = document.getElementById("pad")
const deleteBtn = document.querySelector("#delete");
const undoBtn = document.querySelector("#undo");

//그리기 버튼 눌렀을 때 
paintBtn.onclick = () => {
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
        console.log(document);
    }
}

//휴지통 버튼 눌렀을 때
deleteBtn.onclick = () => {
    while(realPad.hasChildNodes()){
        realPad.removeChild(realPad.firstChild)
    }
}

//되돌리기 버튼 눌렀을 때 
undoBtn.onclick = () => {
    realPad.lastElementChild.remove();
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
})

scratchPad.addEventListener("mousemove", (event) => {
    if(dragging === true){
        alert_coords(event);
        currPath = "L" + stX + "," + stY + " "; 
        drawing(currPath);
        console.log(dragging);
    }
})
document.addEventListener("mouseup", () => {
    dragging = false;
})

//그리기
function drawing(currPath) {
    drawLine.setAttributeNS(null,"d", startPoint + currPath);
    drawLine.setAttributeNS(null,"fill", "none");
    drawLine.setAttributeNS(null,"stroke", "black");
    drawLine.setAttributeNS(null,"stroke-width", "2");

    let nowPath = startPoint + currPath;
    startPoint = nowPath;
    
    
}