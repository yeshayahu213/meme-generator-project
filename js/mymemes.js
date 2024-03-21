var ctx
var elCanvas
function renderCanvasMy() {

    var memes = loadFromStorage('images')
    console.log(memes);

    /*  var strHtml = memes.map(function (meme) {
          var id = meme.gTempMeme.id
          console.log(id);
  
          return `  
              <div class="pic-box">
              <img class="pic" src="${meme.imgAsDataUrl}" onclick="onEditYourMeme('${id}')"> 
              <div>${id} </div> 
                </div>
            `
      })*/
    var strHtml = ''
    for (var i = 0; i < memes.length; i++) {
        var id = memes[i].gTempMeme.id
        console.log(id);

        strHtml += `  
            <div class="pic-box">
            <img class="pic" src="${memes[i].imgAsDataUrl}" onclick="onEditYourMeme('${id}')"> 
           
              </div>
          `

    }


    document.querySelector('.mymemes').innerHTML = strHtml

}
function onEditYourMeme(id) {
    console.log(id);
    var memes = loadFromStorage('memes')
    updateMemes(memes)
    var images = loadFromStorage('images')


    updateCurrMeme(id)
    updateCurrImg()
    updateImages(images)
    moveToEdit()
    renderCanvas()

}

