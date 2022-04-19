
let renderProductPage = () => {

    totalProductPage = Math.ceil(totalCount / perpage)
    let a = document.getElementById('pagination-product')
    a.innerHTML = ''
    a.innerHTML += '<li class="pagePrevious disabled" onclick="onPreviousPage(this)">' + 'Previous' + '</li>'
    for (let i = 1; i <= totalProductPage; i++) {

        if (page == 1 & i == 1) {
            a.innerHTML += '<li title="' + i + '"class="active" onclick="handleProductPage(' + i + ', this)">' + i + '</li>'

        } else {
            a.innerHTML += '<li title="' + i + '" onclick="handleProductPage(' + i + ', this)">' + i + '</li>'
        }

    }
    a.innerHTML += '<li class="pageNext" onclick="onNextPage(this)">' + 'Next' + '</li>'

}
let handleProductPage = (number, target) => {
    if (page === number) {
        return
    }
    page = number
    initProduct(page).then((ok) => {

        handleProductViewBtn()
        handleProductUpdateBtn()
        handleProductDeleteBtn()

    })
}

const removeProductActive = () => {
    let active = document.querySelectorAll('.pagination-product li')
    active.forEach((btn) => {
        btn.classList.remove('active')
    })
}
const onNextPage = (target) => {
    totalPage = Math.ceil(totalCount / perpage)
    let temp = page + 1
    if (temp == totalPage) {
        target.classList.add('disabled')
    }

    if (temp > totalPage) {
        return
    }
    let previousBtn = document.getElementsByClassName('pagePrevious')[0] // ask
    previousBtn.classList.remove('disabled')
    page = temp
    let a = document.querySelector('li.active')

    removeProductActive()
    a.nextElementSibling.className = 'active' //find next element

    initProduct(page).then((ok) => {

        handleProductViewBtn()
        handleProductUpdateBtn()
        handleProductDeleteBtn()

    })
}
const onPreviousPage = (target) => {
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
    removeProductActive()
    a.previousElementSibling.className = 'active'
    initProduct(page).then(() => {
        handleViewBtn()
        handleEditBtn()
        handleDeleteBtn()
    })
}