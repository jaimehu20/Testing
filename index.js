class Room  {
    constructor({name, bookings, rate, discount}){
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount
    }
    addBooking({checkIn, checkOut, guestName}){
        this.bookings.push({checkIn : checkIn, checkOut: checkOut, guestName: guestName});
    }
};


class Booking {
    constructor({name, email, checkin, checkout, discount, room}){
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }
};

module.exports = {Room, Booking};