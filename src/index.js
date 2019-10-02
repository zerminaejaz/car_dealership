//urls
let carsUrl = "http://localhost:3000/cars"
let clientsUrl = "http://localhost:3000/clients"
let appointmentIndexUrl = "http://localhost:3000/appointments"

let username = document.querySelector("#username") 

let mainContainer = document.querySelector("#car-posts")
let navBar = document.querySelector(".navbar-right")
let header = document.querySelector(".jumbotron")


// CLIENTS INDEX

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

//GRAB CLIENT OBJECT
function getClientName(id){
    let name = 
        fetch(clientsUrl+`/${id}`)
        .then(res=>res.json())
        .then(client => {username.innerText = `${client.name}`})
    return name;
}



///// CAR INVENTORY ////
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

mainContainer.addEventListener("click", function(e){
    e.preventDefault()
    if(e.target.classList.contains("login")){
        let clientId = e.target.dataset.id
        getClientName(clientId)
        
        mainContainer.innerHTML = ""
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


    if(e.target.className === "submit"){
        
        let form = document.querySelector(".apt-form")
        form.addEventListener('submit', event => {
            event.preventDefault()
            createAppointment(event.target)
          })
    }

})

header.addEventListener("click", function(e){

    if(e.target.classList.contains('create-apt')){
        header.innerHTML = "<h1>Schedule an Appointment </h1>"
        //how to insert car_id
        mainContainer.innerHTML = 
        `<div class="col-lg-8 col-md-6 mb-4">
        <form class="apt-form">
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
          <label for="name">Full Name</label>
          <input type="text" class="form-control" name="name" placeholder="John Doe">
        </div>
        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input type="text" class="form-control" name="dob" placeholder="12/10/1997">
        </div>
        <div class="form-group">
            <input class="submit" type="submit" class="form-control">
        </div>
      </form>
      </div>`
    }
})
///// Car Show

function carShow(car){
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
            <form class="apt-form">
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="text" class="form-control" id="date" placeholder="12/10/1997">
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <input type="text" class="form-control" id="time" placeholder="12:00pm">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Test drive">
                </div>
                <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" class="form-control" id="name" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label for="dob">Date of Birth</label>
                    <input type="text" class="form-control" id="dob" placeholder="12/10/1997">
                </div>
                <div class="form-group">
                    <input class="submit" type="submit" class="form-control">
                </div>
            </form>
        </div>
    </div>
    `

}

function clearAllCars(){
    mainContainer.innerHTML = ""
}


///////////  APPOINTMENT FUNCTIONS

// function createAppointment(aptData){
//     let aptBody = {
//         date: ,
//         time:,
//         description:,
//         car_id: ,
//         client_id:
//     }
  
// }


