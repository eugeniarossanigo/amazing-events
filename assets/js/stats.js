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
let allTableContainer = document.getElementById('all-tbody')

let pastEvents = data.events.filter(element => new Date (element.date) < new Date (data.currentDate))
let upcomingEvents = data.events.filter(element => new Date (element.date) > new Date (data.currentDate))

// let showStatistics = (array, container) => {
//     container.innerHTML = ""
//     array.forEach(element => {
//         let tr = document.createElement('tr');
//         tr.innerHTML = `<td>${element.name}</td>
//                         <td>$${element.renueves}</td>
//                         <td>${element.attendances}%</td>`
//         container.appendChild(tr);
//     })
// }

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
let futureTable = calcStatistics(upcomingEvents, categories)
let pastTable = calcStatistics(pastEvents, categories)
let allTable = calcStatistics(events, categories)

// showStatistics(futureTable, secondTableContainer)
// showStatistics(pastTable, thirdTableContainer)
// showStatistics(allTable, allTableContainer)


let showCalcs = (array, container) => {
    container.innerHTML = ""
    array.forEach(element => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.name}</td>
                        <td>$${element.revenues}</td>
                        <td>${element.attendance}%</td>`
        container.appendChild(tr);
    })
}

let filterValue = (array, value) => {
    return array.filter(elem => elem.category.toLowerCase() === value.toLowerCase())
}

let calcs = (array, categories) => {
    let allStats = categories.reduce((acc, cur) => {
        let filterEvents = filterValue(array, cur)
        let revenues = filterEvents.map(e => e.price * (e.assistance ? e.assistance : e.estimate))
                    .reduce((acc, cur) => acc + cur, 0)
        let auxAtt = filterEvents.map(e => (e.assistance ? e.assistance : e.estimate) * 100 / e.capacity)
        let attendance = auxAtt.reduce((a, b) => a + b, 0) / filterEvents.length
        return [...acc, {name: cur, attendance: attendance.toFixed(2), revenues: revenues}]
    }, [])
    return allStats
}

showCalcs(calcs(upcomingEvents, categories), secondTableContainer)
showCalcs(calcs(pastEvents, categories), thirdTableContainer)
showCalcs(calcs(events, categories), allTableContainer)


console.log(calcs(upcomingEvents, categories))
console.log(calcs(pastEvents, categories))
console.log(calcs(events, categories))


// let auxAtt = filterEvents.map(e => [e.assistance ? e.assistance : e.estimate, e.capacity])
//             .reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0])
// let attendance = auxAtt[0] * 100 / auxAtt[1]

// function sumarGanancias(elemento1,elemento2) {
//     let sumaDeGanancias = elemento1.ganancia+elemento2.ganancia
//     let subTotal = {
//         ganancia: sumaDeGanancias }
//     return subTotal
// } 
//     let zero = {ganancia: 0}
//     let gananciasTotales = past.reduce((elemento1,elemento2) => sumarGanancias(elemento1,elemento2), zero )




// att: 74092, cap:90200  museum 90,17
//   costume 83,33
//   book 75,71

// let stats = [
//     {
//     name: category1,
//     attendace : 0,
//     reneuves : 0,
//     },
//    {
//     name: category1,
//     attendace : 0,
//     reneuves : 0,
//     }
//     


// let stats = {
//     category1 : {
//         past : {
//             att : 0,
//             rev : 0
//         },
//         upcoming : {
//             att : 0,
//             rev : 0
//         }
//     },
//     category2 : {
//         past : {
//             att : 0,
//             rev : 0
//         },
//         upcoming : {
//             att : 0,
//             rev : 0
//         }
//     }
// }











// console.log(mentores.reduce( (acumulador, valor,indice) => {
//     let frase;
//     console.log(valor)
//     console.log(indice)
//     if(indice > 0){
//         frase = ` - ${valor.nombre}`
//     }else{
//         frase = valor.nombre
//     }  
//     return acumulador + frase
//     },'Mentores: ' ))

// let stats = [
//     {
//     name: category1,
//     attendace : 0,
//     reneuves : 0,
//     },
//    {
//     name: category1,
//     attendace : 0,
//     reneuves : 0,
//     }
//     


// let stats = {
//     category1 : {
//         past : {
//             att : 0,
//             rev : 0
//         },
//         upcoming : {
//             att : 0,
//             rev : 0
//         }
//     },
//     category2 : {
//         past : {
//             att : 0,
//             rev : 0
//         },
//         upcoming : {
//             att : 0,
//             rev : 0
//         }
//     }
// }
// var integrado = [[0,1], [2,3], [4,5]].reduce(function(a,b) {
// return a.concat(b);});
// // integrado es [0, 1, 2, 3, 4, 5]

// console.log([[0,1], [2,3], [4,5]].reduce(function(a,b) {
//     return [...a, a[0]+b[0], a[1]+b[1]]}, [0,0]))


// const numerosReduce = [10, 3, 2, 4, 5, 1, 23, 11, 27, 4, 1, 8];
// const numeros2 = [5,4,3,2,1]
// suma
// factorial

// const resultado = numerosReduce.reduce( (acumulador, valor) => {
//     // console.log(`acumulador = ${acumulador}`)
//     // console.log(`valor = ${valor}`)
//     // console.log('----------')
//     return acumulador + valor
// },0)

// console.log(resultadoReduce)

// const nombres = ["Edu", "Cami", "Lucas", "Lucre", "Kevin", "Nico"];
// const mentores = [
//   {rol : 'Mentor', nombre : 'Edu', genero : 'Masculino'},
//   {rol : 'Mentor', nombre : 'Cami', genero : 'Femenino'},
//   {rol : 'Mentor', nombre : 'Lucas', genero : 'Masculino'},
//   {rol : 'Mentor', nombre : 'Kevin', genero : 'Masculino'},
//   {rol : 'Mentor', nombre : 'Lucre', genero : 'Femenino'},
//   {rol : 'Mentor', nombre : 'Nico', genero : 'Masculino'},
// ];

// console.log(numeros2.reduce( (acumulador, valor) => acumulador * valor))
// console.log(mentores)
// console.log(mentores.reduce( (acumulador, valor,indice) => {
// let frase;
// console.log(valor)
// console.log(indice)
// if(indice > 0){
//     frase = ` - ${valor.nombre}`
// }else{
//     frase = valor.nombre
// }  
// return acumulador + frase
// },'Mentores: ' ))