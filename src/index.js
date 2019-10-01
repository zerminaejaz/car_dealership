//urls
let carsUrl = "http://localhost:3000/cars"

let mainContainer = document.querySelector("#car-posts")
let navBar = document.querySelector(".navbar-right")
let header = document.querySelector(".jumbotron")


///// INDEX ////
fetch(carsUrl)
    .then(res=>res.json())
    .then(carArray => carArray.forEach((car) => {
        displayCar(car);
    }))

function displayCar(car){
    
    mainContainer.innerHTML += 
    `<div class="col-lg-3 col-md-6 mb-4">
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

/////////// Car Show

mainContainer.addEventListener("click", function(e){
   
    if(e.target.classList.contains('car-show')){
        let id = parseInt(e.target.dataset.id)
      
        fetch(`http://localhost:3000/cars/${id}`)
            .then(res=>res.json())
            .then(car=>carShow(car))
     
    }

    if(e.target.classList.contains('create-apt')){
        let carId = parseInt(e.target.dataset.id)
        header.innerHTML = "<h1>Schedule an Appointment </h1>"
        //how to insert car_id
        mainContainer.innerHTML = 
        `<form>
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
      </form>`
    
    }
})

///// Car Show

function carShow(car){
    clearAllCars()
    mainContainer.innerHTML += 
    `<div class="col-lg-12">
    <div class="card h-100">
      <img class="card-img-top" src="${car.image}" alt="">
      <div class="card-body">
        <h4 class="card-title">${car.year} ${car.make.toUpperCase()} ${car.model.toUpperCase()}</h4>
        <p class="card-text">COLOR:${(car.color).toUpperCase()}<br>MILEAGE: ${car.mileage}<br>$${car.price}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary create-apt" data-id="${car.id}">Book A Test Drive!</button>
      </div>
    </div>
  </div>`

}

function clearAllCars(){
    mainContainer.innerHTML = ""
}

// function addSideBar(){

// }


