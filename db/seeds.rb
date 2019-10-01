Appointment.destroy_all
Client.destroy_all
Car.destroy_all


prius = Car.create(year: 2013, make: "Toyota", model: "Prius", price: 11000, availability: true, mileage: 15000, color: "grey", image: "http://24carshop.com/wp-content/uploads/2017/12/AwesomeAmazingGreat-2009-Acura-MDX-TechEntertainment-Pkg-2009-Acura-MDX-TechEntertainment-Pkg-Formal-Black-SUV-Financing-Available-2017-20182018-201920172018.jpg")
acura = Car.create(year: 2009, make: "Acura", model: "MDX", price: 11000, availability: true, mileage: 26000, color: "black", image: "https://carcostcanada.com/ResearchPhoto/10263/Gallery_13_toyota_prius_c_00400.jpg")

mina = Client.create(name: "Mina", dob: "1/31/1997", email_address: "zermina@fake.com")
maya = Client.create(name: "Mavia", dob: "09/12/2000", email_address: "maya@fake.com")

mina_appt = Appointment.create(date: "10/23/19" , time: "3:00pm" ,description: "Signing Contract", car: prius, client: mina, status: "Test Drive")
maya_appt = Appointment.create(date: "3/25/19", time: "11:00am", description: "Wants to Test Drive acura with Daughter Kim", car: acura, client: maya, status: "Test Drive")

puts("Seeded!")

