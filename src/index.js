//urls
let carsUrl = "http://localhost:3000/cars"
let clientsUrl = "http://localhost:3000/clients"
let appointmentsUrl = "http://localhost:3000/appointments"

//linktags
let inventoryLink = document.querySelector("#inventory-link")
// let aptLink = document.querySelector("#apt-link")
let navUl = document.querySelector("#nav-ul")
let username = document.querySelector("#username") 
let createAccountBtn = document.querySelector(".create-account")

//containers
let mainContainer = document.querySelector("#car-posts")
let navBar = document.querySelector(".navigation")
let header = document.querySelector(".jumbotron")
let aptSideBar = document.querySelector("#all-client-apts")

var clientId;
var clientName;
var clientDOB;
var clientEmail;



//index page
showHomePage()

///////////////////////////////////////////////////////////////////////////////////

function clearMainContainer(){
    mainContainer.innerHTML = ""
}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);

}

function addDataSetToNavBarLinks(){
    navUl.innerHTML = `
    <li class="nav-item">
  <p class="nav-link" id="inventory-link">Inventory</p> 
</li>
<li class="nav-item" id="apt-link-li">
  <p class="nav-link" data-id="${clientId}" id="apt-link">Appointments</p>
</li>
    <li class="nav-item">
      <p class="nav-link" id="edit-account">Edit Account</p>
    </li>
    <li class="nav-item">
    <p class="nav-link" data-id="${clientId}" id="logout">Log Out</p>
  </li>`

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

///////////// GRAB CAR IMAGE
function getClientAptsP2(apt){
    let image = 
        fetch(carsUrl+`/${apt.car_id}`)
        .then(res=>res.json())
        .then(car => {
             mainContainer.innerHTML +=
            `<div class="col-lg-3 col-md-2 mb-2">
                    <div class="card h-100" data-id="${clientId}">
                        <img class="card-img-top" src="${car.image}" alt="">
                    <div class="card-body">
                        <h6 class="card-title">${apt.date}<br>----<br>${apt.time} </h6>
                        <p class="card-text text-center" align="left">${apt.description}</p>
                    </div>
                    <div id="new-user" class="card-footer">
                        <button data-id="${apt.id}" class="btn btn-primary" id="edit-apt">EDIT</button><br><br>
                        <button data-id="${apt.id}" class="btn btn-primary" id="delete-apt">DELETE</button>
                    </div>
                    </div>
                </div>`
        })
    return image;
}


/////////////// CLIENT ACCESSORS //////////////////

///////////// GRAB CLIENT NAME
function putClientNameOnNavBar(){  
    username.innerText = `${clientName}`
    username.style.color = "white"
}
function getClientInfo(client){
    clientName = client.name;
    clientDOB  = client.dob;
    clientEmail = client.email_address;
    clientId = client.id //added 1:45

}


///////////// GRAB CLIENT APPOINTMENTS
function getClientApts(){
    clearMainContainer()
    fetch(clientsUrl+`/${clientId}`)
        .then(res=>res.json())
        .then(client=>client.appointments.forEach(apt=>{
            getClientAptsP2(apt)

        })) 
}

///////////// CREATE CLIENT ACCOUNT
function createAccount(){
    clearMainContainer()
    mainContainer.innerHTML = `
    <div class="col-lg-6">
            <form id="client-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" placeholder="Micky Xu">
                </div>
                <div class="form-group">
                    <label for="dob">Date of Birth</label>
                    <input type="date" class="form-control" name="dob">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" name="email" placeholder="somewhere@fake.com">
                </div>
                <input class="submit-apt" type="submit">
            </form>
        </div>
    `
   let form = mainContainer.querySelector("#client-form")
   form.addEventListener("submit", function(e){
        e.preventDefault()
        clientName = form.name.value,
        clientDOB = form.dob.value,
        clientEmail = form.email.value
    
       let clientBody = {
            name : form.name.value,
            dob : form.dob.value,
            email_address : form.email.value
       }
       let fetchData = {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(clientBody) 
        }
        fetch(clientsUrl, fetchData)
            .then(res => res.json())
            .then(client => {
                clientId = client.id
                createAccountBtn.remove()
              
                navUl.innerHTML = `
                <li class="nav-item">
              <p class="nav-link" id="inventory-link">Inventory</p> 
            </li>
            <li class="nav-item" id="apt-link-li">
              <p class="nav-link" id="apt-link">Appointments</p>
            </li>
                <li class="nav-item">
                  <p class="nav-link" id="edit-account">Edit Account</p>
                </li>
                <li class="nav-item">
                <p class="nav-link" id="logout">Log Out</p>
              </li>`
            
                addDataSetToNavBarLinks(clientId)
                putClientNameOnNavBar() 
                

                clearMainContainer()
                showInventory()
    
            })
    })

}

///////////// UPDATE CLIENT ACCOUNT
function editAccount(){

    clearMainContainer()
    mainContainer.innerHTML = `
    <div class="col-lg-8">
            <form id="edit-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" value ="${clientName}" placeholder="${clientName}">
                </div>
                <div class="form-group">
                    <label for="dob">Date of Birth</label>
                    <input type="text" class="form-control" name="dob" value ="${clientDOB}" placeholder="${clientDOB}">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" name="email" value ="${clientEmail}" placeholder="${clientEmail}">
                </div>
                <input class="btn btn-primary submit-apt" type="submit">
            </form>
        </div>
        <div class="col-lg-4">
            <button class="btn btn-primary" id="delete-account-btn">Delete Account</button>
        </div>
    `

    
    let deleteBtn = mainContainer.querySelector("#delete-account-btn")
    deleteBtn.addEventListener("click", function(e){
   
        let fetchData = {
            method: "DELETE"
        }
        fetch(clientsUrl+`/${clientId}`, 
            fetchData
        )
            .then(res=>{
                
                showHomePage()
                navUl.innerHTML = `<li class="nav-item">
                <p class="nav-link" id="inventory-link">Inventory</p> 
              </li>`
              username.innerText = ""
              header.append(createAccountBtn)
            })

    }) 

   let form = mainContainer.querySelector("#edit-form")
   form.addEventListener("submit", function(e){
       e.preventDefault()
       clientName = form.name.value
       clientDOB = form.dob.value
       clientEmail = form.email.value

       let clientBody = {
            name : form.name.value,
            dob : form.dob.value,
            email_address : form.email.value
       }
       let fetchData = {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(clientBody) 
        }
        fetch(clientsUrl+`/${clientId}`, fetchData)
            .then(res => res.json())
            .then(client => {
                username.innerText = `${client.name}`
                clearMainContainer()
                showInventory()
    
            })

            
    })
    
}

///////////// CLIENTS INDEX

function showHomePage(){
    clearMainContainer()
    fetch(clientsUrl)
        .then(res=>res.json())
        .then(clientsArray =>clientsArray.forEach(client => displayClient(client)))

}

function displayClient(client){

    mainContainer.innerHTML +=
    `<div class="col-lg-3 col-md-3 mb-2">
            <div class="card h-100" data-id="${client.id}">
                <img class="card-img-top" src="https://www.stopford.co.uk/wp-content/uploads/2015/03/Anon-male-768x548.jpg" alt="">
              <div class="card-body">
                <h4 id="client-name-${client.id}" class="card-title">${(client.name).toUpperCase()}</h4>
                <p class="card-text">${client.dob}</p>
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
            <img class="card-img-top car-show" src="${car.image}" alt="">
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
navBar.addEventListener("click", function(e){

    if(event.target.id === "logout"){
        clearMainContainer()
        fetch(clientsUrl)
            .then(res=>res.json())
            .then(clientsArray =>clientsArray.forEach(client => displayClient(client)))
        clientId = null
        header.append(createAccountBtn)
        
    }

    if(event.target.id === "edit-account"){
        clearMainContainer()
        editAccount() 
    }

    if(e.target.id === "inventory-link"){
        clearMainContainer()
        showInventory()
    }
    if(e.target.id === "apt-link"){
        clearMainContainer()
        if(!clientId){
            mainContainer.innerText = "Sign In To View Appointments"
        }
       else{
           getClientApts(clientId)
       }
    }
})

header.addEventListener("click", function(e){
    if(e.target.classList.contains("create-account")){
        createAccount()
    }
})



///////////// MAIN CONTAINER LISTENERS

mainContainer.addEventListener("click", function(e){

  
    if(e.target.classList.contains("login")){

        clientId = e.target.dataset.id
        createAccountBtn.remove()
        navUl.innerHTML = `
                <li class="nav-item">
              <p class="nav-link" id="inventory-link">Inventory</p> 
            </li>
            <li class="nav-item" id="apt-link-li">
              <p class="nav-link" id="apt-link">Appointments</p>
            </li>
                <li class="nav-item">
                  <p class="nav-link" id="edit-account">Edit Account</p>
                </li>
                <li class="nav-item">
                <p class="nav-link" id="logout">Log Out</p>
              </li>`
        
    
        addDataSetToNavBarLinks(clientId)

        fetch(clientsUrl+`/${clientId}`)
            .then(res=>res.json())
            .then(client => {
                getClientInfo(client)
                putClientNameOnNavBar()
            })
        
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
    if(e.target.id === "delete-apt"){
        deleteApt(e.target)
    }
})

///////////// CAR FUNCTIONS 

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
            <form id="apt-form">
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" class="form-control" name="date" placeholder="12/10/1997">
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <input type="time" class="form-control" name="time" placeholder="12:00pm">
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
       
        postApt(event.target)
      })

}

function clearAllCars(){
    mainContainer.innerHTML = ""
}


///////////  APPOINTMENT FUNCTIONS

function postApt(e){
    // debugger
    let body = {
        date: e.date.value,
        time: e.time.value,
        description: e.description.value,
        car_id: parseInt(e.carId.value),
        client_id: parseInt(clientId)
    }

    let fetchData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(body)
    }

    fetch(appointmentsUrl, fetchData)
        .then(res => res.json())
        .then(apt =>getClientApts(clientId)
            )
}

function deleteApt(e){
    let aptId = e.dataset.id
    let card = e.parentElement.parentElement
    
        
        fetch(appointmentsUrl+`/${aptId}`, {
        method: "DELETE"})
            .then(res => {
                card.remove()
            })
        
    

}

