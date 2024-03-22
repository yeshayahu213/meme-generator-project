var gPics

function onInit() {
    gPics = getPics()
    renderGallery()
    //renderMemes()
}
function renderGallery() {
    console.log(gPics.length);
    var strHtml = gPics.map(function (pic) {

        return `  
        <div class="pic-box">
        <img class="pic" src="${pic.url}" id="${pic.id}" onclick="onEditeMeme('${pic.id}')">   
          </div>
      `
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('');
}
function onSelectMeme(value) {
    gPics = returnFilterArr(value)
    renderGallery()
    gPics = getPics()
}
function onSearchMeme(value, ev) {

    ev.preventDefault()
    var elText = document.querySelector('.search-text')

    elText.addEventListener("input", function (event) { event.preventDefault() })

    if (!value) {

        console.log(value);
        gPics = getPics()
        renderGallery()
        //renderGallery()

    }
    else if (value !== null) {
        console.log(value);

        var elGallery = document.querySelector('.gallery')


        var filterArr = returnFilterArr(value)
        console.log(filterArr);
        if (filterArr.length === 0) {
            elGallery.innerHTML = '<p class="dontFind"> sorry we couldnt find anything </p>'
            gPics = getPics()
        }
        else {
            gPics = returnFilterArr(value)
            renderGallery()
            gPics = getPics()
        }
    }
}




var pagesObj = {
    elGallery: document.querySelector('.gallery'),
    elEditor: document.querySelector('.editorcontainer'),
    elMmeme: document.querySelector('.mymemes'),
    elSearch: document.querySelector('.search-box')
}
function onEditeMeme(id) {
    updateCurrImg(id)
    moveToEdit()
}


function moveToEdit() {
    loadCanvas()
    // renderCanvas()
    pagesObj.elGallery.classList.add('none')
    pagesObj.elMmeme.classList.add('none')
    pagesObj.elEditor.classList.remove('none')
    pagesObj.elSearch.classList.add('none')
}
function moveToGallery() {
    pagesObj.elGallery.classList.remove('none')
    pagesObj.elSearch.classList.remove('none')
    pagesObj.elMmeme.classList.add('none')
    pagesObj.elEditor.classList.add('none')
}
function moveToSavedMemes() {
    pagesObj.elGallery.classList.add('none')
    pagesObj.elSearch.classList.add('none')
    pagesObj.elMmeme.classList.remove('none')
    pagesObj.elEditor.classList.add('none')
}

function onToggleGalery() {
    document.querySelector('body').classList.toggle('menu-open')
}
