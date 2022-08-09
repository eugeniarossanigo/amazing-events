let boxContainer;
let events;
let selectCheckboxes = []

const getData = async() => {
    try {
        const res = await fetch('http://amazing-events.herokuapp.com/api/events')
        let data = await res.json()
        if (document.getElementById('box-container-index')) {
            boxContainer = document.getElementById('box-container-index')
            events = data.events
        } else if (document.getElementById('box-container-past')) {
            boxContainer = document.getElementById('box-container-past')
            events = data.events.filter(element => new Date (element.date) < new Date (data.currentDate))
        } else {
            boxContainer = document.getElementById('box-container-upcoming')
            events = data.events.filter(element => new Date (element.date) > new Date (data.currentDate))
        }
        showCards(events)
        createCategories()
        
        let checkboxes = document.querySelectorAll('input[type="checkbox"]')
        let inputForm = document.getElementById('input-form')
        let resetBtn = document.getElementById("btn-reset")

        inputForm.addEventListener("keyup", (e)=> {
            e.preventDefault()
            filterNamesAndCategories()
        })
        
        checkboxes.forEach(checkbox => checkbox.addEventListener("change", ()=>{
            selectCheckboxes = Array.from(checkboxes).filter(check => check.checked).map(element => element.value)
            filterNamesAndCategories()
        }))
        
        resetBtn.addEventListener("click", () => {
            inputForm.value = ""
            selectCheckboxes = []
            filterNamesAndCategories()
        })

        let filterNamesAndCategories = () => {
            let cardsNamesFiltered = filterNames(events, inputForm.value.toLowerCase())
            let cardsCategoriesFiltered = filterCategories(cardsNamesFiltered, selectCheckboxes)
            showCards(cardsCategoriesFiltered)
        }
        filterNamesAndCategories()
        
    } catch(err) {
        console.log(err)
        alert('Error')
    }
}
getData()

///// CREATE CARDS AND APPEND TO MAIN CONTAINER
let showCards = (array) => {
    boxContainer.innerHTML = ""
    if (array.length > 0) {
        array.forEach(element => {
            let box = document.createElement('div');
            box.className = 'box';
            box.id = `${element._id}`
            box.style.flex = 'flex-column';
            box.innerHTML = `<img src=${element.image} alt="event">
                            <div class="box-text d-flex flex-column justify-content-between gap-4 p-2">
                                <h5 class="text-uppercase fw-semibold">${element.name}</h5>
                                <p class="fs-6">${element.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>Price: <span class="fs-6 fw-bold">$${element.price}</span></p>
                                    <a lang="en" href="details.html?id=${element._id}" class="text-decoration-none px-3 py-1">Read more ▹</a>
                                </div>
                            </div>`
            boxContainer.appendChild(box);
        })
    } else {
        boxContainer.innerHTML = `<h6>No results. Adjust your search parameters.</h6>`
    }
}

///// CREATE CATEGORIES CHECKBOX
let createCategories = () => {
    let checkContainer = document.getElementById('check-container')
    let checkCategories = [...(new Set(events.map(check => check.category)))]

    checkCategories.forEach(category => {
        let div = document.createElement('div')
        div.className = 'form-check'
        div.innerHTML = `<label class="form-check-label" for="${category}-check">
                        <input class="form-check-input" type="checkbox" value="${category}" id="${category}-check">
                        ${category}</label>`
        checkContainer.append(div)
    })
}

///// AUXILIAR FUNCTIONS FOR FILTERS
let filterCategories = (arrayEvents, arrayCategories) => {
    return arrayCategories.length > 0 ? arrayEvents.filter(event => arrayCategories.includes(event.category)) : arrayEvents
}

let filterNames = (arrayEvents, userInput) => {
    return arrayEvents.filter(event => event.name.toLowerCase().indexOf(userInput) != -1 ? true : false)
}
