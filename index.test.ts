import { Room, Booking } from "."

const roomTemplate = {name: "Habitación 112", bookings: [], rate: 100};
const bookingTemplate = {guestName: "Jaime", email: "prueba@prueba.com"};

const room = new Room({...roomTemplate, discount: 25})
const room2 = new Room({...roomTemplate, discount: 50})
const room3 = new Room({...roomTemplate, discount: 15})

const booking1 = new Booking({...bookingTemplate, checkin: "2024/04/10", checkout: "2024/04/15", discount: 33, room: room })
const booking2 = new Booking({...bookingTemplate, checkin: "2024/04/20", checkout: "2024/04/23", discount: 37, room: room })
const booking3 = new Booking({...bookingTemplate, checkin: "2024/03/07", checkout: "2024/03/19", discount: 50, room: room2 })
const booking4 = new Booking({...bookingTemplate, checkin: "2024/03/19", checkout: "2024/03/30", discount: 37, room: room2 })
const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/05", checkout: "2024/05/10", discount: 12, room: room3 })
const booking6 = new Booking({...bookingTemplate, checkin: "2024/05/15", checkout: "2024/05/21", discount: 37, room: room })

room.bookings = [booking1, booking2]
room2.bookings = [booking3, booking4]
room3.bookings = [booking5, booking6]


describe("Is Occupied Method - Room test", () => {
    test("Is not occupied, looking before first check in", () => {
        expect(room.isOcuppied("2023/04/09")).toBe(false);
    })
    
    test("Is not occupied, looking between two bookings, different day", () => {
        expect(room.isOcuppied("2024/04/17")).toBe(false);
    })
    
    test("Is not occupied, looking between two bookings, same day", () => {
        expect(room.isOcuppied("2024/04/15")).toBe(false);
    })
    
    test("Is occupied, first day of first booking", () => {
        expect(room.isOcuppied("2024/04/10")).toBe(true);
    })
    
    test("Is occupied, first day of last booking", () => {
        expect(room.isOcuppied("2024/04/20")).toBe(true);
    })
    
    test("Is occupied, middle day of first booking", () => {
        expect(room.isOcuppied("2024/04/13")).toBe(true);
    })
    
    test("Is occupied, middle day of last booking", () => {
        expect(room.isOcuppied("2024/04/22")).toBe(true);
    })
})

describe("Occupancy Percentage Method - Room Test", () => {
    test("Occupancy 100%", () => {
        expect(room.occupancyPercentage("2024/04/10", "2024/04/15")).toBe(100);
    });
    
    test("Occupancy 0%", () => {
        expect(room.occupancyPercentage("2023/04/10", "2023/04/15")).toBe(0);
    })
    
    test("Occupancy 50%", () => {
        expect(room.occupancyPercentage("2024/04/10", "2024/04/20")).toBe(50);
    })
})

 describe("Total Occupancy Percentage Static Method - Room Test", () => {
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/01/01", checkout: "2024/01/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/01/21", checkout: "2024/01/26", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/03/07", checkout: "2024/03/19", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/03/19", checkout: "2024/03/30", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/05", checkout: "2024/05/10", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/05/15", checkout: "2024/05/21", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/04/10", checkout: "2024/04/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/04/15", checkout: "2024/04/20", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/05/01", checkout: "2024/05/12", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/05/12", checkout: "2024/05/26", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/07/01", checkout: "2024/07/12", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/07/12", checkout: "2024/08/01", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/08/01", checkout: "2024/08/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/08/15", checkout: "2024/08/31", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/08/01", checkout: "2024/08/16", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/10/12", checkout: "2024/10/26", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/27", checkout: "2024/05/30", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/10/15", checkout: "2024/10/30", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/08/01", checkout: "2024/08/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/08/15", checkout: "2024/08/31", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/08/01", checkout: "2024/08/15", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/08/15", checkout: "2024/08/31", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/08/01", checkout: "2024/08/15", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/08/15", checkout: "2024/08/31", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
        const rooms = [Room1, Room2, Room3]
        expect(Room.totalOccupancyPercentage(rooms, "2024/08/01", "2024/08/30")).toBe(100)
    })
}) 

describe("Available Room Static Method - Room Test", () => {
    test("No available Room", () => {
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/01/01", checkout: "2024/01/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/01/21", checkout: "2024/01/26", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/03/07", checkout: "2024/03/19", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/03/19", checkout: "2024/03/30", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/05", checkout: "2024/05/10", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/05/15", checkout: "2024/05/21", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
        const rooms = [Room1, Room2, Room3]
        expect(Room.availableRooms(rooms, "2024/01/01", "2024/05/21")).toEqual(expect.arrayContaining([]));
    })

    test("Some rooms available", () => {
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/01/01", checkout: "2024/01/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/01/21", checkout: "2024/01/26", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/03/07", checkout: "2024/03/19", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/03/19", checkout: "2024/03/30", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/05", checkout: "2024/05/10", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/05/15", checkout: "2024/05/21", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
        const rooms = [Room1, Room2, Room3]

        expect(Room.availableRooms(rooms, "2024/01/01", "2024/01/26")).not.toEqual(expect.arrayContaining(rooms));
    })

    test("All rooms available", () => {
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
        const booking1 = new Booking({...bookingTemplate, checkin: "2024/01/01", checkout: "2024/01/15", discount: 37, room: room })
        const booking2 = new Booking({...bookingTemplate, checkin: "2024/01/21", checkout: "2024/01/26", discount: 37, room: room })
        const booking3 = new Booking({...bookingTemplate, checkin: "2024/03/07", checkout: "2024/03/19", discount: 37, room: room })
        const booking4 = new Booking({...bookingTemplate, checkin: "2024/03/19", checkout: "2024/03/30", discount: 37, room: room })
        const booking5 = new Booking({...bookingTemplate, checkin: "2024/05/05", checkout: "2024/05/10", discount: 37, room: room })
        const booking6 = new Booking({...bookingTemplate, checkin: "2024/05/15", checkout: "2024/05/21", discount: 37, room: room })
        
        Room1.bookings = [booking1, booking2]
        Room2.bookings = [booking3, booking4]
        Room3.bookings = [booking5, booking6]
        const rooms = [Room1, Room2, Room3]
        expect(Room.availableRooms(rooms, "2025/01/01", "2025/01/15")).toEqual(expect.arrayContaining(rooms));
    })
})

describe("GetFee Booking Method - Booking Test", () => {
    test("Returns 50% of initial price", () => {
        expect(booking1.getFee()).toBeCloseTo(50 , 0.25);
    })
    test("Returns 75% of initial price", () => {
        expect(booking3.getFee()).toBe(25);
    })
    test("Returns 25% of initial price", () => {
        expect(booking5.getFee()).toBeCloseTo(75, 0.20);
    })
})




