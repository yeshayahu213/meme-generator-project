var gTempMeme = {};
var gCurrImg = 1
var gSavedMemes = []
var gSavedImages = []

function createMeme() {
    var meme = {
        img: gCurrImg,
        selectedLineIdx: 0,
        id: makeId(),
        lines: [
            {
                width: 40,
                font: 'Arial',
                location: 1,
                size: 35,
                txt: '',
                fillColor: 'white',
                stroke: 'white',
                align: 'center',

            }
        ]
    }
    gTempMeme = meme;

}


function getCurrImg() {

    return gCurrImg
}
function getMeme() {
    if (!gTempMeme.id) createMeme()
    return gTempMeme
}
function updateCurrImg(id = gTempMeme.img) {

    gCurrImg = id
}

function addLine() {
    if (gTempMeme.lines.length > 3) return
    var line = {
        font: 'Arial',
        location: 1 + gTempMeme.lines.length,
        txt: '',
        size: 35,
        fillColor: 'white',
        stroke: 'white',
        align: 'center',
        width: 40

    }
    gTempMeme.lines.push(line);
    gTempMeme.selectedLineIdx = gTempMeme.lines.length - 1;
}

function editTxt(txt) {

    gTempMeme.lines[gTempMeme.selectedLineIdx].txt = txt
}

function enlargeTxt() {
    gTempMeme.lines[gTempMeme.selectedLineIdx].size += 10
}
function reduceTxt() {
    gTempMeme.lines[gTempMeme.selectedLineIdx].size -= 10
}

function moveSelectedLine() {
    if (gTempMeme.selectedLineIdx === gTempMeme.lines.length - 1) gTempMeme.selectedLineIdx = 0
    else gTempMeme.selectedLineIdx++
}

function alignTxt(dir) {

    gTempMeme.lines[gTempMeme.selectedLineIdx].align = dir
}

function areseTxt() {
    gTempMeme.lines.splice(gTempMeme.selectedLineIdx, 1)


    gTempMeme.selectedLineIdx = 0

    if (!gTempMeme.lines[0]) {
        addLine()
    }
}

function saveCurrMeme() {

    var imgAsDataUrl = gElCanvas.toDataURL("image/png")
    gSavedImages.push({ gTempMeme, imgAsDataUrl })

    window.localStorage.clear()
    saveToStorage('images', gSavedImages)

    gSavedMemes.push(gTempMeme)

    saveToStorage('memes', gSavedMemes)
    gTempMeme = {}

}

function makeId(length = 6) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

function updateCurrMeme(id) {

    var idx = gSavedMemes.findIndex(meme => meme.id === id)
    var c = gSavedMemes[idx]
    gTempMeme = c
    console.log(gSavedMemes[idx], gTempMeme);

    gSavedMemes.splice(idx, 1)
    var imgAsDataUrl = gElCanvas.toDataURL("image/png")



}

function updateMemes(memes) {
    gSavedMemes = memes

    localStorage.removeItem('memes');
}
function updateImages(images) {
    gSavedImages = images
    var idxImg = gSavedImages.findIndex(img => img.gTempMeme.id === gTempMeme.id)
    gSavedImages.splice(idxImg, 1)
    console.log(gSavedImages.length);
    localStorage.removeItem('images')
    var images = loadFromStorage('images')

}

function updateColor(color) {
    gTempMeme.lines[gTempMeme.selectedLineIdx].stroke = color
}
function updateFillColor(color) {
    gTempMeme.lines[gTempMeme.selectedLineIdx].fillColor = color
}

function changeLineFont(font) {
    gTempMeme.lines[gTempMeme.selectedLineIdx].font = font
}

function changeLineWidth(width) {
    gTempMeme.lines[gTempMeme.selectedLineIdx].width = width
}