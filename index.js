var canvas = document.getElementById('xxx')
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToMouse(canvas)


var eraserEnabled = false
var eraser = document.getElementById('eraser')
var brush = document.getElementById('brush')
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'

}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'

}


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

function listenToMouse(canvas) {

  var using = false
  var lastPoint = { x: undefined, y: undefined }
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

  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
  }
}