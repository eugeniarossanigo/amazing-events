
let events;

const getData = async() => {
    try {
        const res = await fetch('http://amazing-events.herokuapp.com/api/events')
        let data = await res.json()
        events = data.events
        const id = new URLSearchParams(location.search).get("id")
        let  eventDetail = events.find(element => element._id == id)
        createCard(eventDetail)
    } catch(err) {
        alert('Error')
    }
}
getData()

let createCard = (event) => {
    let boxCardContainer = document.getElementById('box-card-container');
    let boxCard = document.createElement('div');
    boxCard.className = 'box-card d-flex flex-column flex-lg-row justify-content-between gap-3';
    boxCard.style.flex = 'flex-column';
    boxCard.innerHTML = `<img src=${event.image} alt="event">
                        <div class="card-details d-flex flex-column gap-3">
                            <h5 class="text-uppercase fw-bold">${event.name}</h5>
                            <ul class="list-unstyled d-flex flex-column gap-2">
                                <li class="fs-6"><span class="fw-semibold">Date:</span> ${event.date}</li>
                                <li class="fs-6"><span class="fw-semibold">Description:</span> ${event.description}</li>
                                <li class="fs-6"><span class="fw-semibold">Category:</span> ${event.category}</li>
                                <li class="fs-6"><span class="fw-semibold">Place:</span> ${event.place}</li>
                                <li class="fs-6"><span class="fw-semibold">Capacity:</span> ${event.capacity}</li>
                                <li class="fs-6"><span class="fw-semibold">Assistance or estimate:</span> ${event.assistance? event.assistance : "Missing info."}</li>
                                <li class="fs-6"><span class="fw-semibold">Price:</span> $${event.price}</li>
                            </ul>
                        </div>`
    boxCardContainer.appendChild(boxCard);
}