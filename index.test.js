const { Room, Booking } = require('./index')

function rangeDates(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end)
    for(let day=startDate; day<=endDate; day.setDate(day.getDate()+1)) {
        console.log(day.toLocaleDateString());
    }
}

test("nombre del cliente es Juan", () => {
    const Room1 = new Room({
        name: "Habitacion 112",
        bookings: [],
        rate: 100,
        discount: 20
    })
    Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Juan"})
    expect(Room1.bookings[0].guestName === "Juan").toBeTruthy();
})

test("nombre del cliente es Juan", () => {
    const Room1 = new Room({
        name: "Habitacion 112",
        bookings: [],
        rate: 100,
        discount: 20
    })
    Room1.addBooking({checkIn: "2024/04/10", checkOut: "2024/04/15", guestName: "Alberto"})
    expect(Room1.bookings[0].guestName === "Juan").toBeFalsy();
})