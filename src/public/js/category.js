
const renderTable = (tCount, data) => {
    totalCount = tCount
    return new Promise((resolve, reject) => {
        let table = document.getElementById('category-table')
        let tblBody = table.querySelector('tbody')

        if (!tblBody) {
            tblBody = document.createElement('tbody')

        } else {
            tblBody.innerHTML = ''
        }


        for (var i = 0; i < data.length; i++) {
            let row = document.createElement('tr')
            row.setAttribute('data-row-key', data[i].category_id)
            //name, create_at , update_at

            let a = document.createElement('a')
            a.className = 'category-product'
            a.innerHTML = data[i].category_name


            let td = document.createElement('td')
            td.className = 'category-product-view'
            td.appendChild(a)

            let action = document.createElement('td')
            let detailBtn = document.createElement('button')
            let editBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')

            detailBtn.className = 'category-view'  // set className
            editBtn.className = 'category-edit'  // set className
            deleteBtn.className = 'category-delete'  // set className

            detailBtn.innerText = 'Detail'
            editBtn.innerText = 'Edit'
            deleteBtn.innerText = 'Delete'

            action.appendChild(detailBtn)
            action.appendChild(editBtn)
            action.appendChild(deleteBtn)


            row.appendChild(td)
            // row.appendChild(createAt)
            // row.appendChild(updateAt)
            row.appendChild(action)
            tblBody.appendChild(row);


        }
        // append the <tbody> inside the <table>
        table.appendChild(tblBody);
        // tbl border attribute to 
        table.setAttribute("border", "2");
        resolve()
    })

}

const handleViewBtn = () => {

    let viewBtns = document.querySelectorAll('.category-view')
    viewBtns.forEach((button) => {
        // button.addEventListener('click', async (e) => {
        //     await onView(e.target)
        // })
        button.onclick = async (e) => {
            await onView(e.target)
        }
    })


}
const handleEditBtn = () => {
    let editBtns = document.querySelectorAll('.category-edit')
    editBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            await onEdit(e.target)
            console.log(e.target.parentElement.parentElement)
        })
    })

}
const handleDeleteBtn = () => {
    let deleteBtns = document.querySelectorAll('.category-delete')
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            await onDelete(e.target)
        })
    })
}

const onView = async (target) => {
    let id = target.parentElement.parentElement.getAttribute('data-row-key')

    let response = await fetch('api/category/' + id, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }

    })
    let data = await response.json()

    let viewCategoryContent = document.getElementById('view-category-content')
    viewCategoryContent.innerHTML = ''

    let nameTxt = document.createElement('div')    // create element
    let createDate = document.createElement('div')
    let closeBtn = document.createElement('button')

    closeBtn.innerText = 'Close'    //asign value
    closeBtn.onclick = () => {
        viewCategory.hidden = true
    }
    nameTxt.innerText = data.category_name
    createDate.innerText = data.create_at

    viewCategoryContent.appendChild(nameTxt)    // use element in content
    viewCategoryContent.appendChild(createDate)
    viewCategoryContent.appendChild(closeBtn)

    let viewCategory = document.getElementById('viewCategory')
    viewCategory.hidden = false

}


const onCreate = (createCategoryBtn) => {

    createCategoryBtn.hidden = true

    let createContent = document.getElementById('create-category-content')
    createContent.innerHTML = ''

    let name = document.createElement('text')
    name.innerText = 'Category Name'
    let nameTxt = document.createElement('input')
    let createBtn = document.createElement('button')
    let closeBtn = document.createElement('button')

    createBtn.innerText = 'Save'
    closeBtn.innerText = 'Close'

    createContent.appendChild(name)
    createContent.appendChild(nameTxt)
    createContent.appendChild(createBtn)
    createContent.appendChild(closeBtn)

    let createCategory = document.getElementById('createCategory')

    createCategory.hidden = false

    closeBtn.onclick = () => {
        createCategory.hidden = true
        createCategoryBtn.hidden = false


    }
    createBtn.onclick = async () => {

        let payLoad = {
            category_name: nameTxt.value
        }
        let response = await fetch('api/category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(payLoad)
        })

        let res = await response.json()

        if (res.error) {
            alert(res.error)
            return
        } else {

            location.reload()
        }
    }
}
const onEdit = async (target) => {

    let editContent = document.getElementById('edit-category-content')
    let name = document.createElement('div')
    name.innerText = 'Category Name'
    let nameTxt = document.createElement('input')

    let id = target.parentElement.parentElement.getAttribute("data-row-key")
    let response = await fetch('api/category/' + id, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }

    })
    let data = await response.json()
    nameTxt.value = data.category_name
    editContent.innerHTML = ''
    editContent.appendChild(name)
    editContent.appendChild(nameTxt)

    let editBtn = document.createElement('button')
    let closeBtn = document.createElement('button')

    editBtn.innerText = 'Save'
    closeBtn.innerText = 'Close'

    editContent.appendChild(editBtn)
    editContent.appendChild(closeBtn)

    let editCategory = document.getElementById('editCategory')
    editCategory.hidden = false

    closeBtn.onclick = () => {
        editCategory.hidden = true

    }

    // closeBtn.addEventListener('click', () =>)
    editBtn.onclick = async () => {
        let payLoad = {
            category_name: nameTxt.value
        }
        let response = await fetch('api/category/' + id, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payLoad)
        })
        if (response.status == 200) {
            location.reload()
        }
    }

}
const onDelete = async (target) => {
    let id = target.parentElement.parentElement.getAttribute("data-row-key")
    let response = await fetch('api/category/' + id, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
    if (response.status == 200) {
        location.reload()
    }
}
const onSearch = () => {
    init(1).then(() => {
        page = 1
        renderPage()
    })
}
const init = async (page) => {

    let input = document.getElementById('category-search')
    let categoryName = input.value

    let query = '?page=' + page + '&perpage=' + perpage + '&category_name=' + categoryName

    let response = await fetch('api/categories' + query, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
    let res = await response.json()

    return renderTable(res.totalCount, res.data)

}
const categoryList = async () => {

    let query = '?page=' + 1 + '&perpage=' + 100
    let content = document.getElementById('category-list')
    let ul = document.createElement('ul')
    let response = await fetch('api/categories' + query, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
    let res = await response.json()
    let dataCategory = res.data

    for (let i = 0; i < dataCategory.length; i++) {
        let li = document.createElement('li')
        ul.appendChild(li)
        let alink = document.createElement('a')
        li.appendChild(alink)

        alink.innerText = dataCategory[i].category_name;
        alink.className = 'category-list'
        alink.href = '/category/product/' + dataCategory[i].category_id

    }

    content.appendChild(ul)

}




