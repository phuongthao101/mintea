

const renderProductTable = (count, data) => {
    totalCount = count
    return new Promise((resolve, reject) => {
        //create element 

        let table = document.getElementById('product-table')
        let tbody = table.querySelector('tbody')

        if (!tbody) {
            tbody = document.createElement('tbody')
        } else {
            tbody.innerHTML = ''
        }


        for (let i = 0; i < data.length; i++) {

            let row = document.createElement('tr')
            row.setAttribute('data-row-key', data[i].product_id)

            //name,description
            let categoryName = document.createElement('td')
            categoryName.innerText = data[i].category_name

            let productName = document.createElement('td')
            productName.innerText = data[i].product_name

            let description = document.createElement('td')
            description.innerText = data[i].description
            let actions = document.createElement('td')

            let detailBtn = document.createElement('button')
            let updateBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')

            detailBtn.innerText = 'Detail'
            updateBtn.innerText = 'Update'
            deleteBtn.innerText = 'Delete'

            detailBtn.className = 'view-btns'
            updateBtn.className = 'update-btns'
            deleteBtn.className = 'delete-btns'

            actions.appendChild(detailBtn)
            actions.appendChild(updateBtn)
            actions.appendChild(deleteBtn)

            row.appendChild(productName)
            row.appendChild(categoryName)
            row.appendChild(description)
            row.appendChild(actions)

            tbody.appendChild(row)

        }
        table.appendChild(tbody);

        table.setAttribute("border", "2");
        resolve()
    })
}

const initProduct = async () => {
    let input = document.getElementById('product-search')
    let productName = input.value

    let query = '?page=' + page + '&perpage=' + perpage + '&product_name=' + productName

    let response = await fetch('api/products/' + query, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }

    })
    let res = await response.json()


    return renderProductTable(res.totalCount, res.data)

}
const onProductSearch = () => {
    initProduct(1).then(() => {
        page = 1
        renderProductPage()
    })
}


const handleProductViewBtn = () => {
    let viewBtns = document.querySelectorAll('.view-btns')
    viewBtns.forEach((button) => {
        button.onclick = async (e) => {
            await onViewProduct(e.target)
        }
    })
}
const handleProductUpdateBtn = () => {
    let updateBtns = document.querySelectorAll('.update-btns')
    updateBtns.forEach((button) => {
        button.addEventListener('click', async (event) => {

            await onEditProduct(event.target)
        })
    })
}
const handleProductDeleteBtn = () => {
    let deleteBtns = document.querySelectorAll('.delete-btns')
    deleteBtns.forEach((button) => {
        button.addEventListener('click', async (event) => {
            await onDeleteProduct(event.target)
        })
    })
}

const onViewProduct = async (target) => {

    let id = target.parentElement.parentElement.getAttribute('data-row-key')

    let reponse = await fetch('api/product/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await reponse.json()

    let viewContent = document.getElementById('view-content')
    viewContent.innerHTML = ''
    let categoryName = document.createElement('div')
    let productName = document.createElement('div')
    let description = document.createElement('div')
    let price = document.createElement('div')
    let quantity = document.createElement('div')
    let closeBtn = document.createElement('button')

    categoryName.innerText = 'Category Name:' + data.category_name
    productName.innerText = 'Product Name: ' + data.product_name
    description.innerText = 'Desciption: ' + data.description
    price.innerText = 'Price: ' + data.price
    quantity.innerText = 'Quantity: ' + data.quantity
    closeBtn.innerText = 'Close'

    closeBtn.onclick = () => {
        productModal.hidden = true
    }

    viewContent.appendChild(categoryName)
    viewContent.appendChild(description)
    viewContent.appendChild(price)
    viewContent.appendChild(quantity)
    viewContent.appendChild(productName)
    viewContent.appendChild(closeBtn)

    let productModal = document.getElementById('modal-detail')
    productModal.hidden = false
}

const onEditProduct = async (target) => {
    let id = target.parentElement.parentElement.getAttribute('data-row-key')
    let updateContent = document.getElementById('update-content')
    updateContent.innerHTML = ''

    let response = await fetch('api/product/' + id,
        { method: 'GET' }, {
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await response.json()

    let productNameTxt = document.createElement('div')
    let descriptionTxt = document.createElement('div')
    let priceTxt = document.createElement('div')
    let quantityTxt = document.createElement('div')

    productNameTxt.innerText = 'Product Name: '
    descriptionTxt.innerText = 'Description'
    priceTxt.innerText = 'Price'
    quantityTxt.innerText = 'Quantity'

    let productName = document.createElement('input')
    let description = document.createElement('input')
    let price = document.createElement('input')
    let quantity = document.createElement('input')
    let editBtn = document.createElement('button')
    let closeBtn = document.createElement('button')

    productName.value = data.product_name
    description.value = data.description
    price.value = data.price
    quantity.value = data.quantity
    editBtn.innerText = 'Edit'
    closeBtn.innerText = 'Close'

    updateContent.appendChild(productNameTxt)
    updateContent.appendChild(productName)
    updateContent.appendChild(descriptionTxt)
    updateContent.appendChild(description)
    updateContent.appendChild(priceTxt)
    updateContent.appendChild(price)
    updateContent.appendChild(quantityTxt)
    updateContent.appendChild(quantity)

    updateContent.appendChild(editBtn)
    updateContent.appendChild(closeBtn)

    let updateModal = document.getElementById('modal-update')
    updateModal.hidden = false
    closeBtn.onclick = () => {
        updateModal.hidden = true
    }
    editBtn.onclick = async () => {
        let payLoad = {
            product_name: productName.value,
            description: description.value,
            price: price.value,
            quantity: quantity.value
        }
        let response = await fetch('api/product/' + id, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payLoad)
        })
        if (response.status == 200) {
            location.reload()
        }
    }

}


const onCreateProduct = async () => {
    let query = '?page=' + 1 + '&perpage=' + 100
    let response = await fetch('api/categories' + query, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }

    })

    let res = await response.json()
    let dataSelect = res.data
    let selectId = document.getElementById('select-id')
    let selectList = document.createElement('select')

    selectId.appendChild(selectList)
    for (let i = 0; i < dataSelect.length; i++) {
        let option = document.createElement('option')
        option.value = dataSelect[i].category_id
        option.innerText = dataSelect[i].category_name
        selectList.appendChild(option)
    }


    let content = document.getElementById('content')
    let productNameTxt = document.createElement('div')
    let descriptionTxt = document.createElement('div')
    let priceTxt = document.createElement('div')
    let quantityTxt = document.createElement('div')
    let categoryTxt = document.createElement('div')

    let productName = document.createElement('input')
    let description = document.createElement('input')
    let price = document.createElement('input')
    let quantity = document.createElement('input')
    let createBtn = document.createElement('button')
    let closeBtn = document.createElement('button')

    productNameTxt.innerText = 'Product Name: '
    descriptionTxt.innerText = 'Description'
    priceTxt.innerText = 'Price'
    quantityTxt.innerText = 'Quantity'
    categoryTxt.innerText = 'Category Name'

    closeBtn.innerText = 'Close'
    createBtn.innerText = 'Submit'

    content.appendChild(productNameTxt)
    content.appendChild(productName)
    content.appendChild(descriptionTxt)
    content.appendChild(description)
    content.appendChild(priceTxt)
    content.appendChild(price)
    content.appendChild(quantityTxt)
    content.appendChild(quantity)

    content.appendChild(createBtn)
    content.appendChild(closeBtn)
    content.appendChild(categoryTxt)

    closeBtn.onclick = () => {
        modal.hidden = true
    }
    createBtn.onclick = async () => {
        let payLoad = {
            // // categoryId: 0,
            categoryId: selectList.value,
            productName: productName.value,
            description: description.value,
            price: price.value,
            quantity: quantity.value
        }
        let response = await fetch('api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payLoad)
        })
        if (response.status == 200 && response.error) {
            alert(response.error)
            return
        }
        if (response.status == 200) {
            location.reload()
        }

    }


    let modal = document.getElementById('modal-create')
    modal.hidden = false
}
const onDeleteProduct = async (target) => {
    let id = target.parentElement.parentElement.getAttribute("data-row-key")
    let response = await fetch('api/product/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/' }
    })

    if (response.status == 200) {
        location.reload()
    }
}



