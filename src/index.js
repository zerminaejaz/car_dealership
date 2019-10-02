//urls
let carsUrl = "http://localhost:3000/cars"
let clientsUrl = "http://localhost:3000/clients"
let appointmentsUrl = "http://localhost:3000/appointments"

//linktags
let inventoryLink = document.querySelector("#inventory-link")
let aptLink = document.querySelector("#apt-link")
let username = document.querySelector("#username") 

//containers
let mainContainer = document.querySelector("#car-posts")
let navBar = document.querySelector(".navbar-right")
let header = document.querySelector(".jumbotron")
var clientId;

function clearMainContainer(){
    mainContainer.innerHTML = ""
}

/////////////// CAR ACCESSORS ///////////////

///////////// GRAB CAR NAME
function getCarName(id){
    let name = 
        fetch(carsUrl`/${id}`)
        .then(res=>res.json())
        .then(car => {car.name})
    return name;
}



/////////////// CLIENT ACCESSORS //////////////////

///////////// GRAB CLIENT NAME
function getClientName(id){
    let name = 
        fetch(clientsUrl+`/${id}`)
        .then(res=>res.json())
        .then(client => {
            username.innerText = `${client.name}`
            username.style.color = "white"
        })
    return name;
}

function addDataSetToNavBarLinks(clientId){
    inventoryLink.dataset.id = clientId
    aptLink.dataset.id = clientId
}
///////////// GRAB CLIENT APPOINTMENTS
function getClientApts(){
    fetch(clientsUrl+`/${clientId}`)
        .then(res=>res.json())
        .then(client=>client.appointments.forEach(apt=>{
            clearMainContainer()
            // let carName = getCarName(apt.car_id)
            mainContainer.innerHTML +=
            `<div class="col-lg-3 col-md-2 mb-2">
                    <div class="card h-100" data-id="${client.id}">
                    <div class="card-body">
                        <h6 class="card-title">${apt.date}<br>----<br>${apt.time} </h6>
                        <p class="card-text" align="left">${apt.description}<br>Car:${apt.car_id}</p>
                    </div>
                    <div id="new-user" class="card-footer">
                        <button data-id="${apt.id}" class="btn btn-primary edit-apt">EDIT</button><br><br>
                        <button data-id="${apt.id}" class="btn btn-primary delete-apt">DELETE</button>
                    </div>
                    </div>
                </div>`

        })) 
}

///////////// CLIENTS INDEX

fetch(clientsUrl)
    .then(res=>res.json())
    .then(clientsArray =>clientsArray.forEach(client => displayClient(client)))

function displayClient(client){
    mainContainer.innerHTML +=
    `<div class="col-lg-2 col-md-3 mb-2">
            <div class="card h-100" data-id="${client.id}">
                <img class="card-img-top" src="https://www.stopford.co.uk/wp-content/uploads/2015/03/Anon-male-768x548.jpg" alt="">
              <div class="card-body">
                <h4 class="card-title">${(client.name).toUpperCase()}</h4>
                <p class="card-text">${client.dob}<br>${client.email_address}</p>
              </div>
              <div id="new-user" class="card-footer">
                <button data-id="${client.id}" class="btn btn-primary login">Log In</button>
              </div>
            </div>
          </div>`

}


///////////// CAR INVENTORY
function showInventory(){

    fetch(carsUrl)
        .then(res=>res.json())
        .then(carArray => carArray.forEach((car) => {
            displayCar(car);
        }))
    
    function displayCar(car){
        mainContainer.innerHTML += 
        `<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
            <img class="card-img-top" src="${car.image}" alt="">
            <div class="card-body">
                <h4 class="card-title">${car.year} ${car.make.toUpperCase()} ${car.model.toUpperCase()}</h4>
                <p class="card-text">COLOR:${(car.color).toUpperCase()}<br>MILEAGE: ${car.mileage}<br>$${car.price}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary car-show" data-id="${car.id}">Find Out More!</button>
            </div>
            </div>
        </div>`

    }
}  

///////////// NAVBAR LINK LISTENERS

inventoryLink.addEventListener("click", function(e){
    clearMainContainer()
    showInventory()
})

aptLink.addEventListener("click", function(e){
    clearMainContainer()
    getClientApts(clientId)
})



///////////// MAIN CONTAINER LISTENERS

mainContainer.addEventListener("click", function(e){
  
    if(e.target.classList.contains("login")){
        clientId = e.target.dataset.id
    
        addDataSetToNavBarLinks(clientId)
        getClientName(clientId)
        
        clearMainContainer()
        showInventory()
        
    }

    if(e.target.classList.contains('client')){
        let id = parseInt(e.target.dataset.id)
        fetch(clientsUrl+`/${id}`)
            .then(res => res.json())
            .then(client=>showInventory(client))
    }
   
    if(e.target.classList.contains('car-show')){
        let id = parseInt(e.target.dataset.id)
      
        fetch(`http://localhost:3000/cars/${id}`)
            .then(res=>res.json())
            .then(car=>carShow(car))
     
    }

    

})

///////////// CAR FUNCTIONS 

///// Car Show

function carShow(car){
    // <input type="hidden" name="clientId" value="${clientId}"> took this out of the form
    clearAllCars()
    let id = car.id
    mainContainer.innerHTML += 
    `<div class="col-lg-6">
        <div class="card h-100">
            <img class="card-img-top" src="${car.image}" alt="">
            <div class="card-body">
                <h4 class="card-title">${car.year} ${car.make.toUpperCase()} ${car.model.toUpperCase()}</h4>
                <p class="card-text">COLOR:${(car.color).toUpperCase()}<br>VIN#: ${car.vin}<br>MILEAGE: ${car.mileage}<br>$${car.price}</p>
            </div>
            <div class="card-footer">
            </div>
        </div>
        </div>
        <div class="col-lg-6">
            <form id="apt-form">
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="text" class="form-control" name="date" placeholder="12/10/1997">
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <input type="text" class="form-control" name="time" placeholder="12:00pm">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" name="description" placeholder="Test drive">
                </div>
                <div class="form-group">
                    <input type="hidden" name="carId" value="${car.id}">
                </div>
                <input class="submit-apt" type="submit">
            </form>
        </div>
    </div>`
    
    let form = mainContainer.querySelector("#apt-form")
    form.addEventListener('submit', event => {
        event.preventDefault()
        // debugger
        postApt(event.target)
      })

}

function clearAllCars(){
    mainContainer.innerHTML = ""
}


///////////  APPOINTMENT FUNCTIONS

function postApt(e){
//     let body = {
//         date = e.date.value,
//         time = e.time.value,
//         description = e.time.value,
//         carId = e.carId.value,
//         client_id: clientId
//     }

//     let fetchdata = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: "application/json"
//         },
//         body: JSON.stringify(body)
//         }

//     fetch(appointmentsUrl, fetchData)
//         .then(res => res.json())
//         .then((obj_toy) => {
//             console.log
//             })
}


