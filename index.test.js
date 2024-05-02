const { Room, Booking } = require('./index')

function rangeDates(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end)
    for(let day=startDate; day<=endDate; day.setDate(day.getDate()+1)) {
        console.log(day.toLocaleDateString());
    }
}

describe("Is Occupied Method - Room test", () => {
    test("Is not occupied, looking before first check in", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2023/04/09")).toBe(false);
    })
    
    test("Is not occupied, looking between two bookings, different day", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/04/17")).toBe(false);
    })
    
    test("Is not occupied, looking between two bookings, same day", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/04/15")).toBe(false);
    })
    
    test("Is occupied, first day of first booking", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/04/10")).toBe(true);
    })
    
    test("Is occupied, first day of last booking", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/05/01")).toBe(true);
    })
    
    test("Is occupied, middle day of first booking", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/04/13")).toBe(true);
    })
    
    test("Is occupied, middle day of last booking", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando"})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro"})
        expect(Room1.isOcuppied("2024/05/10")).toBe(true);
    })
})

describe("Occupancy Percentage Method - Room Test", () => {
    test("Occupancy 100%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan", Room: Room1})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando", Room: Room1})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro", Room: Room1})
        expect(Room1.occupancyPercentage("2024/04/10", "2024/04/15")).toBe(100);
    });
    
    test("Occupancy 0%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan", Room: Room1})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando", Room: Room1})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro", Room: Room1})
        expect(Room1.occupancyPercentage("2023/04/10", "2023/04/15")).toBe(0);
    })
    
    test("Occupancy 50%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan", Room: Room1})
        Room1.addBooking({checkIn: "2024/04/20", checkOut: "2024/04/23", guestName: "Fernando", Room: Room1})
        Room1.addBooking({checkIn: "2024/05/01", checkOut: "2024/05/20", guestName: "Alejandro", Room: Room1})
        expect(Room1.occupancyPercentage("2024/04/10", "2024/04/20")).toBe(50);
    })
})

 describe("Total Occupancy Percentage Method - Room Test", () => {
    test("Return total occupancy percentage for all rooms is 0%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room2 = new Room({
            name: "Habitacion 113",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room3 = new Room({
            name: "Habitacion 114",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({ checkIn: "2024/01/01", checkOut: "2024/01/15", guestName: "Juan" });
        Room1.addBooking({ checkIn: "2024/01/21", checkOut: "2024/01/26", guestName: "Jose" });
        Room2.addBooking({ checkIn: "2024/03/07", checkOut: "2024/03/19", guestName: "Maria" });
        Room2.addBooking({ checkIn: "2024/03/19", checkOut: "2024/03/30", guestName: "Alejandra" });
        Room3.addBooking({ checkIn: "2024/05/05", checkOut: "2024/05/10", guestName: "Ernesto" });
        Room3.addBooking({ checkIn: "2024/05/15", checkOut: "2024/05/21", guestName: "Estela" }); 
        const rooms = [Room1, Room2, Room3]
        expect(Room.totalOccupancyPercentage(rooms, "2024/09/01", "2024/09/30")).toBe(0)
    })

    test("Return total occupancy percentage for all rooms is 30%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room2 = new Room({
            name: "Habitacion 113",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room3 = new Room({
            name: "Habitacion 114",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({ checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan" });
        Room1.addBooking({ checkIn: "2024/04/15", checkOut: "2024/04/20", guestName: "Jose" });
        Room2.addBooking({ checkIn: "2024/05/01", checkOut: "2024/05/12", guestName: "Maria" });
        Room2.addBooking({ checkIn: "2024/05/12", checkOut: "2024/05/26", guestName: "Alejandra" });
        Room3.addBooking({ checkIn: "2024/07/01", checkOut: "2024/07/12", guestName: "Ernesto" });
        Room3.addBooking({ checkIn: "2024/07/12", checkOut: "2024/08/01", guestName: "Estela" }); 
        const rooms = [Room1, Room2, Room3]
        expect(Room.totalOccupancyPercentage(rooms, "2024/04/09", "2024/04/20")).toBe(30)
    })

    test("Return total occupancy percentage for all rooms is 50%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room2 = new Room({
            name: "Habitacion 113",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room3 = new Room({
            name: "Habitacion 114",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({ checkIn: "2024/08/01", checkOut: "2024/08/15", guestName: "Juan" });
        Room1.addBooking({ checkIn: "2024/08/15", checkOut: "2024/08/31", guestName: "Jose" });
        Room2.addBooking({ checkIn: "2024/08/01", checkOut: "2024/08/16", guestName: "Maria" });
        Room2.addBooking({ checkIn: "2024/10/12", checkOut: "2024/10/26", guestName: "Alejandra" });
        Room3.addBooking({ checkIn: "2024/05/27", checkOut: "2024/05/30", guestName: "Ernesto" });
        Room3.addBooking({ checkIn: "2024/10/15", checkOut: "2024/10/30", guestName: "Estela" }); 
        const rooms = [Room1, Room2, Room3]
        expect(Room.totalOccupancyPercentage(rooms, "2024/08/01", "2024/08/31")).toBe(50)
    })

    test("Return total occupancy percentage for all rooms is 100%", () => {
        const Room1 = new Room({
            name: "Habitacion 112",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room2 = new Room({
            name: "Habitacion 113",
            bookings: [],
            rate: 100,
            discount: 20
        })
        const Room3 = new Room({
            name: "Habitacion 114",
            bookings: [],
            rate: 100,
            discount: 20
        })
        Room1.addBooking({ checkIn: "2024/08/01", checkOut: "2024/08/15", guestName: "Juan" });
        Room1.addBooking({ checkIn: "2024/08/15", checkOut: "2024/08/31", guestName: "Jose" });
        Room2.addBooking({ checkIn: "2024/08/01", checkOut: "2024/08/15", guestName: "Maria" });
        Room2.addBooking({ checkIn: "2024/08/15", checkOut: "2024/08/31", guestName: "Alejandra" });
        Room3.addBooking({ checkIn: "2024/08/01", checkOut: "2024/08/15", guestName: "Ernesto" });
        Room3.addBooking({ checkIn: "2024/08/15", checkOut: "2024/08/31", guestName: "Estela" }); 
        const rooms = [Room1, Room2, Room3]
        expect(Room.totalOccupancyPercentage(rooms, "2024/08/01", "2024/08/30")).toBe(100)
    })
}) 





