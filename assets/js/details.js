const events = data.events;

const id = parseInt(new URLSearchParams(location.search).get("id"))

let eventDetail = events.find(element => element._id === id)

let boxCardContainer = document.getElementById('box-card-container');
let boxCard = document.createElement('div');
boxCard.className = 'box-card d-flex flex-column flex-lg-row justify-content-between gap-3';
boxCard.style.flex = 'flex-column';
boxCard.innerHTML = `<img src=${eventDetail.image} alt="event">
                    <div class="card-details d-flex flex-column gap-3">
                        <h5 class="text-uppercase fw-bold">${eventDetail.name}</h5>
                        <ul class="list-unstyled d-flex flex-column gap-2">
                            <li class="fs-6"><span class="fw-semibold">Date:</span> ${eventDetail.date}</li>
                            <li class="fs-6"><span class="fw-semibold">Description:</span> ${eventDetail.description}</li>
                            <li class="fs-6"><span class="fw-semibold">Category:</span> ${eventDetail.category}</li>
                            <li class="fs-6"><span class="fw-semibold">Place:</span> ${eventDetail.place}</li>
                            <li class="fs-6"><span class="fw-semibold">Capacity:</span> ${eventDetail.capacity}</li>
                            <li class="fs-6"><span class="fw-semibold">Assistance or estimate:</span> ${eventDetail.assistance? eventDetail.assistance : "Missing info."}</li>
                            <li class="fs-6"><span class="fw-semibold">Price:</span> $${eventDetail.price}</li>
                        </ul>
                    </div>`
boxCardContainer.appendChild(boxCard);
