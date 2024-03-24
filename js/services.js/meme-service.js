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
    var line = meme.lines[0]
    line.pos = calculatePos(line.location, line.align, line.width, line.size)
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
    console.log(id);
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
        width: 40,

    }

    line.pos = calculatePos(line.location, line.align, line.width, line.size)
    gTempMeme.lines.push(line);
    gTempMeme.selectedLineIdx = gTempMeme.lines.length - 1;
}

function editTxt(txt) {

    gTempMeme.lines[gTempMeme.selectedLineIdx].txt = txt
}

function enlargeTxt() {
    var line = gTempMeme.lines[gTempMeme.selectedLineIdx]
    line.size += 10
    line.pos.h = calculatePos(line.location, line.align, line.width, line.size).h
}
function reduceTxt() {
    var line = gTempMeme.lines[gTempMeme.selectedLineIdx]

    line.size -= 10
    line.pos.h = calculatePos(line.location, line.align, line.width, line.size).h
}

function moveSelectedLine() {
    if (gTempMeme.selectedLineIdx === gTempMeme.lines.length - 1) gTempMeme.selectedLineIdx = 0
    else gTempMeme.selectedLineIdx++
}

function alignTxt(dir) {
    var line = gTempMeme.lines[gTempMeme.selectedLineIdx]
    line.align = dir
    line.pos.x = calculatePos(line.location, line.align, line.width, line.size).x

}

function areseTxt() {
    gTempMeme.lines.splice(gTempMeme.selectedLineIdx, 1)


    gTempMeme.selectedLineIdx = 0

    if (!gTempMeme.lines[0]) {
        addLine()
    }
}

function saveCurrMeme() {
    console.log(gTempMeme);
    var imgAsDataUrl = gElCanvas.toDataURL("image/png")
    gSavedImages.push({ gTempMeme, imgAsDataUrl })

    window.localStorage.clear()
    saveToStorage('images', gSavedImages)

    gSavedMemes.push(gTempMeme)

    saveToStorage('memes', gSavedMemes)
    //gTempMeme = {}

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

    var line = gTempMeme.lines[gTempMeme.selectedLineIdx]
    line.width = width

    var pos = calculatePos(line.location, line.align, line.width, line.size)

    line.pos.w = pos.w
}

function calculatePos(location, align, width, size) {

    var startPoint
    if (align === 'right') startPoint = 130 - (width + (size / 6))
    if (align === 'left') startPoint = 130 - (size / 6)
    if (align === 'center') startPoint = 130 - (width / 2)
    return {
        x: startPoint,
        y: location * 28 - (size / 2),
        w: width + (size / 3),
        h: size + 5
    }
}