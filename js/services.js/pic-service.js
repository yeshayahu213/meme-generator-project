
var gaPics = [
    { id: 1, url: './pictures/1.jpg', keywords: 'sad' },
    { id: 2, url: './pictures/2.jpg', keywords: 'h' },
    { id: 3, url: './pictures/3.jpg', keywords: 'c' },
    { id: 4, url: './pictures/4.jpg', keywords: 'sad' },
    { id: 5, url: './pictures/5.jpg', keywords: 'h' },
    { id: 6, url: './pictures/6.jpg', keywords: 'c' },
    { id: 7, url: './pictures/7.jpg', keywords: '' },
    { id: 8, url: './pictures/8.jpg', keywords: '' },
    { id: 9, url: './pictures/9.jpg', keywords: '' },
    { id: 10, url: './pictures/10.jpg', keywords: '' },
    { id: 11, url: './pictures/11.jpg', keywords: '' },
    { id: 12, url: './pictures/12.jpg', keywords: '' },
    { id: 13, url: './pictures/13.jpg', keywords: '' },
    { id: 14, url: './pictures/14.jpg', keywords: '' },
    { id: 15, url: './pictures/15.jpg', keywords: '' },
    { id: 16, url: './pictures/16.jpg', keywords: '' },
    { id: 17, url: './pictures/17.jpg', keywords: '' },
    { id: 18, url: './pictures/18.jpg', keywords: '' }

]

function getPics() {
    return gaPics
}
function returnFilterArr(value) {
    console.log(value);
    var idx = gPics.findIndex((key) => key.keywords === value)
    console.log(idx);
    var arr = gPics.filter((key) => key.keywords === value)
    return arr
}