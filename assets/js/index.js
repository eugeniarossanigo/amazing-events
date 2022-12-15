// let boxContainer;
// let events;
// fetch("./data.json")
//     .then(res => res.json())
//     .then(data => {
//         if (document.getElementById('box-container-index')) {
//             boxContainer = document.getElementById('box-container-index')
//             events = data
//         } else if (document.getElementById('box-container-past')) {
//             boxContainer = document.getElementById('box-container-past')
//             events = data.filter(element => element.date < data.currentDate)
//         } else {
//             boxContainer = document.getElementById('box-container-upcoming')
//             events = data.filter(element => element.date > data.currentDate)
//         }
        
//     })


let events = data.events
if (document.getElementById('box-container-index')) {
    boxContainer = document.getElementById('box-container-index')
    events = data.events
} else if (document.getElementById('box-container-past')) {
    boxContainer = document.getElementById('box-container-past')
    events = data.events.filter(element => element.date < data.currentDate)
} else {
    boxContainer = document.getElementById('box-container-upcoming')
    events = data.events.filter(element => element.date > data.currentDate)
}

let showCards = (array, container) => {
    container.innerHTML = ""
    if (array.length > 0) {
        array.forEach(elem => {
            let box = document.createElement('div')
            box.className = 'box'
            box.id = `${elem.id}`
            box.style.flex = 'flex-column';
            box.innerHTML = `
                    <img src=${elem.image} alt="event">
                    <div class="box-text d-flex flex-column justify-content-between gap-4 p-2">
                        <h5 class="text-uppercase fw-semibold">${elem.name}</h5>
                        <p class="fs-6">${elem.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p>Price: <span class="fs-6 fw-bold">$${elem.price}</span></p>
                            <a lang="en" href="details.html?id=${elem._id}" class="text-decoration-none px-3 py-1">Read more ▹</a>
                        </div>
                    </div>`
            container.appendChild(box)
        })
    } else {
        container.innerHTML = `<h6>No results. Adjust your search parameters.</h6>`
    }
}
showCards(events, boxContainer)

let createCategories = (array) => {
    let checkContainer = document.getElementById('check-container')
    let categories = [...(new Set(events.map(elem => elem.category)))]
    categories.forEach(category => {
        let div = document.createElement('div')
        div.className = 'form-check'
        div.innerHTML = `<label class="form-check-label" for="${category}-check">
                        <input class="form-check-input" type="checkbox" value="${category}" id="${category}-check">
                        ${category}</label>`
        checkContainer.append(div)
    })
}
createCategories(events)

let checkboxes = document.querySelectorAll('input[type="checkbox"]')
let inputForm = document.getElementById('input-form')
let resetBtn = document.getElementById("btn-reset")
let selectCheckboxes = []

checkboxes.forEach(check => check.addEventListener("change", () => {
    selectCheckboxes = Array.from(checkboxes).filter(check => check.checked).map(elem => elem.value)
    filterNamesAndCategories()
}))

inputForm.addEventListener("keyup", (e) => {
    e.preventDefault()
    filterNamesAndCategories()
})

let filterNamesAndCategories = () => {
    let cardsNamesFiltered = filterInput(events, inputForm.value)
    let cardsCategoriesFiltered = filterArray(cardsNamesFiltered, selectCheckboxes)
    showCards(cardsCategoriesFiltered, boxContainer)
}

let filterArray = (array1, array2) => {
    return array2.length > 0 ? array1.filter(elem => array2.includes(elem.category)) : array1
}

let filterInput = (array, userInput) => {
    return array.filter(elem => elem.name.toLowerCase().includes(userInput.toLowerCase().trim()))
}

