document.body.ontouchstart = function (e) {
  e.preventDefault()
}

var canvas = document.getElementById('xxx')
var context = canvas.getContext('2d')

let dpr = window.devicePixelRatio; // 假设dpr为2
// 获取css的宽高
let { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
// 根据dpr，扩大canvas画布的像素，使1个canvas像素和1个物理像素相等
canvas.width = dpr * cssWidth;
canvas.height = dpr * cssHeight;
// 由于画布扩大，canvas的坐标系也跟着扩大，如果按照原先的坐标系绘图内容会缩小
// 所以需要将绘制比例放大
context.scale(dpr, dpr);

autoSetCanvasSize(canvas)

listenToUser(canvas)

var eraserEnabled = false
var eraser = document.getElementById('eraser')
var pen = document.getElementById('pen')
pen.onclick = function () {
  eraserEnabled = false
  eraser.classList.remove('active')
  pen.classList.add('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  pen.classList.remove('active')
  eraser.classList.add('active')
}

// 利用事件委托，对颜色选择器进行监听
var colors = document.getElementById('colors')
colors.addEventListener('click', function (e) {
  console.log(e.target.parentNode.children.length)

  let length = e.target.parentNode.children.length
  for (let i = 0; i < length; i++) {
    e.target.parentNode.children[i].classList.remove('active')
  }
  context.fillStyle = e.target.className
  context.strokeStyle = e.target.className
  e.target.classList.add('active')
}, false)


function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function listenToUser(canvas) {

  var using = false
  var lastPoint = { x: undefined, y: undefined }

  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (aaa) {
      console.log('kkkk')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x, y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.ontouchmove = function (aaa) {
      console.log('jjjj')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) { return; }
      if (eraserEnabled) {
        console.log(1111)
        context.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        // drawCircle(x, y, 1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      console.log('llll')
      using = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (aaa) {

      var x = aaa.clientX
      var y = aaa.clientY

      using = true
      if (eraserEnabled) {
        context.clearRect(x, y, 10, 10)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) { return; }
      if (eraserEnabled) {
        console.log(1111)
        context.clearRect(x, y, 10, 10)
      } else {
        var newPoint = { "x": x, "y": y }
        // drawCircle(x, y, 1)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (aaa) {
      using = false
    }
  }



  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    // context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
  }
}