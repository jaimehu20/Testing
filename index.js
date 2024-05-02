function rangeDates(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end)
    let range = []
    for(let day=startDate; day<endDate; day.setDate(day.getDate()+1)) {
        range.push(day.toISOString().slice(0,10));
    }
    return range
}

class Room  {
    constructor({name, bookings, rate, discount}){
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount
    }
    addBooking({checkIn, checkOut, guestName, room}){
        this.bookings.push({checkIn : checkIn, checkOut: checkOut, guestName: guestName, room: room});
    }
    isOcuppied(date){
        for (let i = 0; i < this.bookings.length; i++){
            if (date >= this.bookings[i].checkIn && date < this.bookings[i].checkOut)
            return true
        }
        return false
    }
    occupancyPercentage(startDate, endDate){
        let daysOccupied = 0;
        let dateRange = rangeDates(startDate, endDate);
        let percent;
        let prueba = [];
        let newArray;
        this.bookings.map((date) => {
            prueba.push(rangeDates(date.checkIn, date.checkOut));
        })
        newArray = prueba.flat()
        newArray.map((date) => {if (dateRange.includes(date)) daysOccupied++})
        percent = ((daysOccupied / dateRange.length) * 100);
        return percent 
    }
    static totalOccupancyPercentage(rooms, startDate, endDate){
        let totalPercentage = 0;
        rooms.forEach(room => {totalPercentage += room.occupancyPercentage(startDate, endDate)});
        return Math.round((totalPercentage) / rooms.length);
    }
    static availableRooms(rooms, startDate, endDate){
        let availableRooms = rooms.filter((room) => room.occupancyPercentage(startDate, endDate) === 0);
        return availableRooms;
    }

}

class Booking {
    constructor({name, email, checkin, checkout, discount, room}){
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }
    getFee(){
        
    }
};


module.exports = {Room, Booking};