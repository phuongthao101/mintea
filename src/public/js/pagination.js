
let page = 1
let perpage = 2
let totalCount = 0
const handlePage = (num, target) => {
    totalPage = Math.ceil(totalCount / perpage)

    if (page === num) {
        return
    }

    page = num

    init(page).then(() => {
        handleViewBtn()
        handleEditBtn()
        handleDeleteBtn()
        removeActive()
        target.className = 'active'

    })

}

const renderPage = () => {

    totalPage = Math.ceil(totalCount / perpage)
    let a = document.getElementById('pagination')
    a.innerHTML = ''
    a.innerHTML += '<li  class="pagePrevious disabled " onclick="onPrevious(this)">' + 'Prerious' + '</li>'
    for (let i = 1; i <= totalPage; i++) {

        if (page == 1 & i == 1) {
            a.innerHTML += '<li title="' + i + '"class="active" onclick="handlePage(' + i + ', this)">' + i + '</li>'

        } else {
            a.innerHTML += '<li title="' + i + '" onclick="handlePage(' + i + ', this)">' + i + '</li>'
        }

    }
    a.innerHTML += '<li class="pageNext" onclick="onNext(this)">' + 'Next' + '</li>'

}
const onPrevious = (target) => {
    totalPage = Math.ceil(totalCount / perpage)
    let temp = page - 1
    if (temp < 0 || temp == 0) {
        return
    }

    if (temp < totalPage) {
        let nextBtn = document.getElementsByClassName('pageNext')[0]
        nextBtn.classList.remove('disabled')
    }

    if (temp == 1) {
        target.classList.add('disabled')
    }

    page = temp
    let a = document.querySelector('li.active')
    removeActive()
    a.previousElementSibling.className = 'active'
    init(page).then(() => {
        handleViewBtn()
        handleEditBtn()
        handleDeleteBtn()
    })


}
const onNext = (target) => {
    totalPage = Math.ceil(totalCount / perpage)
    let temp = page + 1
    if (temp == totalPage) {
        target.classList.add('disabled')
    }

    if (temp > totalPage) {
        return
    }

    let previousBtn = document.getElementsByClassName('pagePrevious')[0]
    previousBtn.classList.remove('disabled')

    page = temp
    let a = document.querySelector('li.active')

    removeActive()
    a.nextElementSibling.className = 'active' //find next element


    init(page).then(() => {
        handleViewBtn()
        handleEditBtn()
        handleDeleteBtn()
    })

}

let removeActive = () => {

    let pages = document.querySelectorAll('.pagination li')
    pages.forEach((li) => {
        li.classList.remove('active')

    })

}




// let page = 1
// let perpage = 2
// let totalCount = 0

// const handlePage = () => {

// }
// const renderPage = () => {
// let totalPage = Math.ceil(totalCount / perpage)
// let a = doc
// for(let i=0; i<totalCount.length; i++){
    
// }
// }


