const $ = document;
const canvas = $.querySelector('canvas');
const ctx = canvas.getContext('2d');
const brushWidth = $.getElementById('brush-width');
const brushColor = $.getElementById('color-picker');

const eraser = $.querySelector('#eraser');
const brush = $.querySelector('#brush');

const saveBtn = $.getElementById('Save');
const clearBtn = $.getElementById('Clear');

let isDrawing = false;
let currentWidth = 5;
let currentColor = '';
let eraserIcon = false;

window.addEventListener('load',()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
})

eraser.addEventListener('click',()=>{
    eraser.classList.add('active')
    brush.classList.remove('active')
    currentColor = "white";
    eraserIcon = true;
})
brush.addEventListener('click',()=>{
    brush.classList.add('active')
    eraser.classList.remove('active')
    currentColor = brushColor.value;
    eraserIcon = false;
})




function startDraw() {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = currentWidth;
    ctx.strokeStyle = currentColor;
    if(eraserIcon){
        // .style.cursor = 'url("../icon/eraser-solid.svg")'
    }
  }
function stopDraw() {
    isDrawing = false;
  }
let drawing = (e)=>{
    if(isDrawing){
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
}

canvas.addEventListener('mousedown',startDraw)
canvas.addEventListener('mouseup',stopDraw)
canvas.addEventListener('mousemove',drawing)

brushWidth.addEventListener('change',()=>{
    currentWidth = brushWidth.value;
})
brushColor.addEventListener('change',()=>{
    currentColor = brushColor.value;
})


clearBtn.addEventListener('click',()=>{
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width,canvas.height)
})
saveBtn.addEventListener('click',()=>{
    let link = $.createElement('a')
    link.download = "Nima-Sohrabi-paint.jpg";
    link.href = canvas.toDataURL();
    link.click()
})