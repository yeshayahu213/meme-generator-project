'use strict'

let gCircle



function getCircle() {
    return gCircle
}

//Check if the click is inside the circle

function isCircleClicked(clickedPos) {

    //console.log(clickedPos);

    //If its smaller then the radius of the circle we are inside
    return
}



// Move the circle by a delta from the pervious pos

function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy
}
'use strict'


let gStartPos



function onInitMove() {


    addListeners()


    //Calc the center of the canvas
    //const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    //Create the circle in the center

    //renderCanvas()
}





function addListeners() {
    addMouseListeners()

}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

var gIsmoving = false
function onDown(ev) {

    // Save the position we started from...
    // Get the event position from mouse or touch
    gStartPos = getEvPos(ev)
    var line = gMeme.lines[gMeme.selectedLineIdx]
    console.log(line.pos.x, line.pos.y, line.pos.w, line.pos.h, gStartPos);
    var width = line.pos.x + line.pos.w
    var height = line.pos.y + line.pos.h
    if (gStartPos.x > line.pos.x * 1.6 && gStartPos.x < width * 1.6 && gStartPos.y > line.pos.y * 3 && gStartPos.y < height * 3) {
        console.log('halloiyuh');
        gIsmoving = true
    }

    // if (!isCircleClicked(gStartPos)) return

    // setCircleDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // const { isDrag } = getCircle()
    if (!gIsmoving) return

    const pos = getEvPos(ev)
    //console.log(pos);

    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    // moveCircle(dx, dy)
    var line = gMeme.lines[gMeme.selectedLineIdx].pos
    line.x += (dx / 1.6)
    line.y += (dy / 3)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos

    // The canvas is rendered again after every move
    renderCanvas()
}

function onUp() {
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
    gIsmoving = false
}



function getEvPos(ev) {
    ev.preventDefault()
    return {
        x: ev.offsetX,
        y: ev.offsetY,
    }

}

