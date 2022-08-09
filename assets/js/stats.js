let tableContainer;
let events;
let upcomingEvents;
let pastEvents;

const getData = async() => {
    try {
        const res = await fetch('http://amazing-events.herokuapp.com/api/events')
        let data = await res.json()
        events = data.events
        pastEvents = data.events.filter(element => new Date (element.date) < new Date (data.currentDate))
        upcomingEvents = data.events.filter(element => new Date (element.date) > new Date (data.currentDate))
        
        //////// TABLA 1
        let firstTableContainer = document.getElementById('first-tbody')
        let statsarray = statisticsArray(events)
        
        let maxAtt = maxAttendance(statsarray)
        let minAtt = minAttendance(statsarray)
        let maxCap = maxCapacity(statsarray)
        showTableAttendance(maxAtt, minAtt, maxCap, firstTableContainer)

         /////// TABLA 2 y 3
        let categories = [...(new Set(events.map(elem => elem.category)))]
        let upcomStatistics = statsCalcule(upcomingEvents, categories)
        let upcomTableContainer = document.getElementById('second-tbody')
        showTableCategories(upcomStatistics, upcomTableContainer)
        
        let pastStatistics = statsCalcule(pastEvents, categories)
        let pastTableContainer = document.getElementById('third-tbody')
        showTableCategories(pastStatistics, pastTableContainer)
        
    } catch(err) {
        alert('Error')
    }
}
getData()

// ///////////////// TABLA 1
let showTableAttendance = (array1, array2, array3, tbodyContainer) => {
    tbodyContainer.innerHTML = ""
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${array1[0].name} (${array1[0].percent}%)</td>
                    <td>${array2[0].name} (${array2[0].percent}%)</td>
                    <td>${array3[0].name} (${array3[0].capacity})</td>`
    tbodyContainer.appendChild(tr);
}

let statisticsArray = (array) => {
    let newArray = array.map(element => {
                    let percent = Math.round(Number(element.assistance) * 100 / Number(element.capacity))
                    let newElement = {
                        name: element.name,
                        percent: percent,
                        assistance: element.assistance,
                        capacity: element.capacity,
                    }
                    return newElement
                })
    return newArray
}

let maxAttendance = (array) => {
    return array.filter(element => element.assistance).sort((a, b) => b.percent - a.percent).slice(0,1)
}

let minAttendance = (array) => {
    return array.filter(element => element.assistance).sort((a, b) => a.percent - b.percent).slice(0,1)
}

let maxCapacity = (array) => {
    return array.sort((a, b) => b.capacity - a.capacity).slice(0,1)
}


/////////////////// TABLA 2 y 3
let showTableCategories = (array, tbodyContainer) => {
    tbodyContainer.innerHTML = ""
    array.forEach(element => {
        if (element.renueves) {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.category}</td>
                            <td>$${element.renueves}</td>
                            <td>${element.attendance}%</td>`
            tbodyContainer.appendChild(tr);
        }
    })
}

let statsCalcule = (array, categories) => {
    let allCategoriesStats = []
    for (let category of categories) {
        let cant = 0
        let sum = 0
        let attendance = 0
        for (let element of array) {
            if (element.category === category) {
                sum += element.price * Number(element.assistance? element.assistance: element.estimate)
                attendance += Number(element.assistance? element.assistance: element.estimate) / Number(element.capacity)
                cant += 1
            }
        }
        let objectCategory = {
            category: category,
            renueves: sum,
            attendance: (attendance * 100 / cant).toFixed(2)
        }
        allCategoriesStats.push(objectCategory)

    }
    return allCategoriesStats
}
