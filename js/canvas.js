let gElCanvas
let gCtx
var gTxtSize = 45
var gStrockeColor = 'white'
var gFillStyleColor = 'white'
var gIsDrawRect = true






var gMeme = getMeme()

function loadCanvas() {

    gElCanvas = document.querySelector('canvas')

    gCtx = gElCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    var currImg = getCurrImg()
    const pic = new Image()


    pic.src = `./pictures/${currImg}.jpg`

    pic.onload = () => { gCtx.drawImage(pic, 0, 0, gElCanvas.width, gElCanvas.height) }

}
function renderCanvas() {

    var gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)



    var currImg = getCurrImg()
    const pic = new Image()
    pic.src = `./pictures/${currImg}.jpg`
    onInitMove()

    var elEditorTxt = document.querySelector('.memetxteditor')


    elEditorTxt.value = gCurrLine.txt
    pic.onload = () => {

        //elEditorTxt.value = meme.lines[meme.selectedLineIdx].txt

        var txt = gCurrLine.txt
        var align = gCurrLine.align
        var location = gCurrLine.location
        var widthTxt = gCtx.measureText(txt).width
        changeLineWidth(widthTxt)
        var pos = gCurrLine.pos
        gCtx.drawImage(pic, 0, 0, gElCanvas.width, gElCanvas.height)

        if (gIsDrawRect) {

            drawRect(pos.x, pos.y, pos.w, pos.h)
        }
        else gIsDrawRect = true



        for (var i = 0; i < gMeme.lines.length; i++) {
            var line = gMeme.lines[i]
            drawText(line.txt, line.pos.x, line.pos.y, line.fillColor, line.stroke,
                line.size, line.align, line.font, i)

        }


    }

}

function onAddLine() {
    if (gMeme.lines.length <= 3) addLine()

    else return

    renderCanvas()

}

function onEditTxt(val) {

    var value = val.value
    changeTxt(value)

}
function changeTxt(txt) {

    editTxt(txt)
    renderCanvas()
}

function drawText(text, x = 0, y = 10, strockeColor = "white", fillStyleColor = "white", fontSize = 25,
    align = "center", font, idx = 99) {
    console.log(idx);
    gCtx.lineWidth = 2

    gCtx.strokeStyle = strockeColor

    gCtx.fillStyle = fillStyleColor
    var width = 0
    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    var gCurrLine
    if (idx === 99) gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    else gCurrLine = gMeme.lines[idx]
    if (gCurrLine.align === 'center') width = gCurrLine.width / 2
    else if (gCurrLine.align === 'right') width = gCurrLine.width
    gCtx.fillText(text, x + width, y + (fontSize / 2))
    gCtx.strokeText(text, x + width, y + (fontSize / 2))
}

function onEnlargeTxt() {
    enlargeTxt()
    renderCanvas()
}

function onReduceTxt() {
    reduceTxt()
    renderCanvas()
}

function onChangeLine() {
    moveSelectedLine()
    renderCanvas()
}

function onAlignTxt(dir) {
    alignTxt(dir)
    renderCanvas()
}

function onAreseTxt() {
    areseTxt()
    renderCanvas()
}

function onSaveMeme() {

    gIsDrawRect = false
    renderCanvas()

    setTimeout(() => save(), 100)




}
function save() {
    saveCurrMeme()
    var elEditorTxt = document.querySelector('.memetxteditor')
    elEditorTxt.value = ''
    moveToSavedMemes()
    renderCanvasMy()
}
function onSetColor(value) {

    updateColor(value)
    renderCanvas()
}
function onSetFillColor(value) {

    updateFillColor(value)
    renderCanvas()
}

function drawRect(x, y, w, h) {





    gCtx.strokeStyle = 'gray'
    gCtx.lineWidth = 1.5
    gCtx.strokeRect(x, y, w, h)


}

function shareOnFacebook() {
    onUploadImg()
}
function onchangeFont(value) {

    changeLineFont(value)
    renderCanvas()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}