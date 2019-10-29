
Appointment.destroy_all
Client.destroy_all
Car.destroy_all

carArray = [
    "https://static.carsdn.co/cldstatic/wp-content/uploads/img-133087403-1499718672365.jpg",
    "https://fs2.ebait.biz/b0BrU7hFd/2014fordexplorersport.jpg",
    "https://pictures.dealer.com/b/blueknobautosales/0347/bb94ce6d155c702a38025834b167c346x.jpg?impolicy=resize&w=640",
    "https://274ea2957309fdba7396-692c78ed4b4b9a6d27e52e3b63613274.ssl.cf1.rackcdn.com/thumbnails/4T3ZF19C53U511888/e6c5a0775360bcefb925b5f968da056b.jpg",
    "https://pictures.dealer.com/h/hertzcarsalessantaclara/0625/f6b04041d0df107dfc0f9f27f1cb94aax.jpg?impolicy=downsize&w=500",
    "https://cmsimages-alt.kbb.com/content/dam/kbb-editorial/10-best-lists/best-used-cars-under-$5,000/01-2003-toyota-avalon.jpg",
    "https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202019/Cars/February/CR-Cars-InlineHero-Best-Used-Under-twentythousand-Honda-CRV-2015-2-19",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT777-OnOIn3JOXWt22C2GEVg6LseMxdVfqUOBQL1PJO2d3zay7tQ",
    "https://cnet2.cbsistatic.com/img/bh3_El_2WoAjQ_0jxFEJkTu84sQ=/1092x0/2015/09/04/4764b360-c781-42ef-a6e9-d6cd16962e29/09-2016jaguarxfpaukert.jpg",
    "https://images.drivetime.com/stockitems/1630015400/aa23dc4e-7e07-437e-8dee-0c64833c273a_Medium.jpg",
    "https://pictures.dealer.com/t/toyotaraleigh/0133/5cac5fcb7bc0325c1fca8156e200d55cx.jpg?impolicy=resize&w=640",
    "https://previews.123rf.com/images/anetlanda/anetlanda1710/anetlanda171001369/88113746-closeup-old-rotten-piece-of-lemon-bad-unhealthy-food.jpg"
]


40.times do
    makeModel = Faker::Vehicle.make_and_model #=> "Honda CR-V"
    array = makeModel.split(" ")
    make = array[0]
    model = array[1]
    car = Car.create(vin: Faker::Vehicle.vin,year: Faker::Vehicle.year, make: make, model: model, 
            price: Faker::Commerce.price(range: 30000..100000, as_string: true), 
            availability: true, mileage: Faker::Vehicle.mileage, color: Faker::Vehicle.color, image: carArray.sample)
    car2 = Car.create(vin: Faker::Vehicle.vin,year: Faker::Vehicle.year, 
            make: make, model: model, price: Faker::Commerce.price(range: 30000..100000, as_string: true), 
            availability: true, mileage: Faker::Vehicle.mileage, color: Faker::Vehicle.color, image: carArray.sample)
    client = Client.create(name: Faker::Name.name , dob: Faker::Date.birthday, email_address: Faker::Internet.email)
    
    2.times do
        appt = Appointment.create(date: Faker::Date.between(from: 50.days.ago, to: Date.today), time: "11:00am", 
                description: "Signing Contract", car: car, client: client)
        appt2 = Appointment.create(date: Faker::Date.between(from: 50.days.ago, to: Date.today), time: "3:30pm", 
                description: "Test Drive", car: car2, client: client)
    end

end


puts("Seeded!")

