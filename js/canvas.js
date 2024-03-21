let gElCanvas
let gCtx
var gTxtSize = 45
var gStrockeColor = 'white'
var gFillStyleColor = 'white'
var gIsDrawRect = true






var meme
function loadCanvas() {
    meme = getMeme()
    gElCanvas = document.querySelector('canvas')

    gCtx = gElCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    var currImg = getCurrImg()
    const pic = new Image()


    pic.src = `./pictures/${currImg}.jpg`

    pic.onload = () => { gCtx.drawImage(pic, 0, 0, gElCanvas.width, gElCanvas.height) }

}
function renderCanvas() {

    meme = getMeme()
    console.log(meme);
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d');
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    var currImg = getCurrImg()
    const pic = new Image()
    pic.src = `./pictures/${currImg}.jpg`


    var elEditorTxt = document.querySelector('.memetxteditor')


    elEditorTxt.value = meme.lines[meme.selectedLineIdx].txt
    pic.onload = () => {

        //elEditorTxt.value = meme.lines[meme.selectedLineIdx].txt

        var txt = meme.lines[meme.selectedLineIdx].txt
        var align = meme.lines[meme.selectedLineIdx].align
        var location = meme.lines[meme.selectedLineIdx].location
        var widthTxt = gCtx.measureText(txt).width
        changeLineWidth(widthTxt)
        gCtx.drawImage(pic, 0, 0, gElCanvas.width, gElCanvas.height)

        if (gIsDrawRect) {

            drawRect(align, location, widthTxt, meme.lines[meme.selectedLineIdx].size)
        }
        else gIsDrawRect = true


        meme.lines.forEach(line => {


            drawText(line.txt, 130, 30 * line.location, line.fillColor, line.stroke,
                line.size, line.align, line.font)
        });


    }

}

function onAddLine() {
    if (meme.lines.length <= 3) addLine()
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
    align = "center", font) {
    gCtx.lineWidth = 2

    gCtx.strokeStyle = strockeColor

    gCtx.fillStyle = fillStyleColor

    gCtx.font = `${fontSize}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
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

function drawRect(align, location, width, size) {
    var startPoint = 130

    console.log(align);
    console.log(width / 2);
    if (align === 'right') startPoint = 130 - (width + (size / 6))
    if (align === 'left') startPoint = 130 - (size / 6)
    if (align === 'center') startPoint = 130 - (width / 2)
    gCtx.strokeStyle = 'gray'
    gCtx.lineWidth = 1.5
    gCtx.strokeRect(startPoint, location * 28 - (size / 2), width + (size / 3), size + 5)


}

function shareOnFacebook() {
    onUploadImg()
}
function onchangeFont(value) {
    console.log(value);
    changeLineFont(value)
    renderCanvas()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}