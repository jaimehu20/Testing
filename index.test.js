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
        expect(Room1.occupancyPercentage("2024/04/10", "2024/04/15")).toBe("100");
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
        expect(Room1.occupancyPercentage("2023/04/10", "2023/04/15")).toBe("0");
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
        expect(Room1.occupancyPercentage("2024/04/10", "2024/04/20")).toBe("50");
    })
})
