let events = data.events

// TABLA 1
let firstTableContainer = document.getElementById('first-tbody')

let showAttendance = (event1, event2, event3, container) => {
    container.innerHTML = ""
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${event1.name} (${event1.percent}%)</td>
                    <td>${event2.name} (${event2.percent}%)</td>
                    <td>${event3.name} (${event3.capacity})</td>`
    container.appendChild(tr);
}

let calcAttendance = (array) => {
    return array.map(event => (
        {
            name: event.name,
            percent: Math.round(Number(event.assistance) * 100 / Number(event.capacity)),
            assistance: event.assistance,
            capacity: event.capacity
        }
    ))
}

let sortAttendance = (array) => {
    return array.filter(elem => elem.assistance).sort((a, b) => b.percent - a.percent)
}

let sortCapacity = (array) => {
    return array.sort((a, b) => b.capacity - a.capacity)
}

let newEvents = calcAttendance(events)
let maxAtt = sortAttendance(newEvents)[0]
let minAtt = sortAttendance(newEvents)[sortAttendance(newEvents).length -1]
let maxCap = sortCapacity(newEvents)[0]
showAttendance(maxAtt, minAtt, maxCap, firstTableContainer)


// TABLA 2
let secondTableContainer = document.getElementById('second-tbody')
let thirdTableContainer = document.getElementById('third-tbody')

let pastEvents = data.events.filter(element => new Date (element.date) < new Date (data.currentDate))
let upcomingEvents = data.events.filter(element => new Date (element.date) > new Date (data.currentDate))

let showStatistics = (array, container) => {
    container.innerHTML = ""
    array.forEach(element => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.name}</td>
                        <td>$${element.renueves}</td>
                        <td>${element.attendances}%</td>`
        container.appendChild(tr);
    })
}

let calcStatistics = (array, categories) => {
    let allStats = []
    for (let category of categories) {
        let sum = 0
        let totalAtt = 0
        let totalCap = 0
        for (let elem of array) {
            if (elem.category === category) {
                sum += elem.price * (elem.assistance ? elem.assistance : elem.estimate)
                totalAtt += elem.assistance ? elem.assistance : elem.estimate
                totalCap += elem.capacity
            }
        }
        let newObject = {
            name: category,
            renueves : sum,
            attendances : (totalAtt * 100 / totalCap).toFixed(2)
        }
        allStats.push(newObject)
    }
    return allStats
}

let categories = [...new Set(events.map(event => event.category))]
let pastTable = calcStatistics(pastEvents, categories)
let futureTable = calcStatistics(upcomingEvents, categories)
showStatistics(futureTable, secondTableContainer)
showStatistics(pastTable, thirdTableContainer)
