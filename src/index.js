//urls
let carsUrl = "http://localhost:3000/cars"

let mainContainer = document.querySelector("#main_container")
let navBar = document.querySelector(".navbar-right")


///// INDEX ////
fetch(carsUrl)
    .then(res=>res.json())
    .then(carArray => carArray.forEach((car) => {
        displayCar(car);
    }))

function displayCar(car){
    mainContainer.innerHTML += 
    `<div class="col-md-4 car text-center" data-id="${car.id}">$${car.price}
    <p>${car.year}</p>
    <p>${car.make} ${car.model} (${(car.color).toUpperCase()})</p>
    <p>Mileage: ${car.mileage}</p>
    <img src="${car.image}" height="50%" width="50%">
    </div>`
}

/////////// Click a SalesPerson

mainContainer.addEventListener("click", function(e){

    if(e.target.parentElement.classList.contains('car')){
       
        let id = parseInt(e.target.parentElement.dataset.id)
        // debugger
        fetch(`http://localhost:3000/cars/${id}`)
            .then(res=>res.json())
            .then(car=>carShow(car))
     
    }
})

///// Car Show

function carShow(car){
    // let name = person.name
    // navBar.innerText = `Logged In As ${name}`

    clearAllCars()
    // addSideBar()

}

function clearAllCars(){
    mainContainer.innerHTML = ""
}

// function addSideBar(){

// }


