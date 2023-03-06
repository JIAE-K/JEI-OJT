const canvas = new fabric.Canvas('canvas');

//Triangle로 도형 그리기
const triangle1 = new fabric.Triangle({
    left: 400,
    top: 200,
    stroke: 'red',
    fill: 'rgba(0,0,0,0)',
    width: 60,
    height: 60,
    selectable: false
});

const triangle2 = new fabric.Triangle({
    left: 200,
    top: 80,
    stroke: 'green',
    fill: 'rgba(0,0,0,0)',
    angle: 50,
    width: 150,
    height: 40,
    selectable: false
});

//Path로 도형 그리기 
const triangle3 = new fabric.Path('M 0 0 L 130 80 L 120 130 z');
triangle3.set({ left: 500, top: 80 });
triangle3.set({ fill:'rgba(0,0,0,0)', stroke: 'blue'});
triangle3.set('selectable', false);

const path1 = new fabric.Path('M 0 0 L 20 80 L 70 7 L 60 100');
path1.set({ left: 300, top: 100});
path1.set({ fill:'rgba(0,0,0,0)', stroke: 'orange'});
path1.set('selectable', false);


const path2 = new fabric.Path('M 0 50 L 70, 0 L 70, 50 L 0, 60 ')
path2.set({ left: 280, top: 250});
path2.set({ fill:'rgba(0,0,0,0)', stroke: 'yellowgreen'});
path2.set('selectable', false);

const path3 = new fabric.Path('M 0 50 L 70, 70 L 70, 10 L 0, 40 z')
path3.set({ left: 500, top: 250});
path3.set({ fill:'rgba(0,0,0,0)', stroke: 'pink'});
path3.set('selectable', false);


//rect로 도형 그리기
const rect = new fabric.Rect({
    left: 450,
    top: 120,
    stroke: 'violet',
    fill: 'rgba(0,0,0,0)',
    width: 40,
    height: 40,
    selectable: false
});

//circle로 도형 그리기 
const circle = new fabric.Circle({
    angle: 30,
    stroke: 'lightblue',
    fill: 'rgba(0,0,0,0)',
    radius: 30,
    left: 170,
    top: 200,
    selectable: false
})

//text 작성하기
const guide = new fabric.Text('삼각형을 모두 찾아 고르세요',{
    fontSize: 28,
    left: 130,
    top: 30,
    selectable: false
});

//이미지 사용하기
const speakerImg = new Image();
speakerImg.src = "./img/speaker.png"

let waitting = false;

const speaker = fabric.Image.fromURL(speakerImg.src, function(oImg) {
    oImg.scale(0.07);
    oImg.set({left: 85, top: 27});
    oImg.selectable = false;
    oImg.on('mousedown', function (){
        if(!waitting){
            //음성파일 넣기
            audio.play('fall.wav');
            waitting = true;
        }
        setTimeout(() => {
            waitting = false;
        }, 3000);
        
    })
    canvas.add(oImg);
});




//커서 스타일 설정
canvas.hoverCursor = 'pointer'

//캔버스에 넣기
canvas.add(triangle1, triangle2, triangle3, path1, path2, path3, rect, circle, guide);

//정답 선택 시 애니메이션
let a = true, b= true, c= true;
let correct = 0;

canvas.on('mouse:down', function(option) {
    if(option.target === triangle1 && a){
        triangle1.animate('top', '+=200', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000,
        }); 
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);
        audio.play('magic.mp3');
        checkImg(380, 190, 1);
        a = false; 
        correct++;

      } else if(option.target === triangle2 && b){
        triangle2.animate('top', '+=340', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        });
        triangle2.animate('angle', '-=50', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        });
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);

        audio.play('magic.mp3')
        checkImg(150, 100, 1);
        b = false; 
        correct++;

    } else if(option.target === triangle3 && c){
        triangle3.animate('top', '+=380', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        });
        triangle3.animate('angle', '-=48', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        });
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);

        audio.play('magic.mp3')
        checkImg(480, 70, 1);
        c = false; 
        correct++;
    }
    if(!a && !b && !c){
        setTimeout(() =>{
            //애니메이션 효과
        }, 2000);
    }
  });

//오답 선택 시 애니메이션
canvas.on('mouse:down', function(option) {
    if(option.target === path1 && (a || b || c)){
        audio.play('beep.mp3');
        checkImg(280, 90, 0);
    } else if(option.target === path2 && (a || b || c)){
        audio.play('beep.mp3');
        checkImg(260, 270, 0);
    } else if(option.target === path3 && (a || b || c)){
        audio.play('beep.mp3');
        checkImg(480, 260, 0);
    } else if(option.target === circle && (a || b || c)){
        audio.play('beep.mp3');
        checkImg(130, 200, 0);
    } else if(option.target === rect && (a || b || c)){
        audio.play('beep.mp3');
        checkImg(430, 110, 0);
    }
});


//정답 개수에 따른 애니메이션
let d = true, e= true, f= true;
canvas.on('mouse:down', () => {
    if(correct === 1 && d){
        animation('+=200');
        d = false;
    } else if(correct === 2 && e){
        e = false;
    } else if(correct === 3 && f){
        f = false;
    }
});


//audio
const audio = {
    play: (fileName) => {
        const myAudio = new Audio('./audio/' + fileName);
        myAudio.play();
    }
}