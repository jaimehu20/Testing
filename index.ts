function rangeDates(start: string, end: string): string[] {
    let startDate = new Date(start);
    let endDate = new Date(end)
    let range : string[] = []
    for(let day=startDate; day<endDate; day.setDate(day.getDate()+1)) {
        range.push(day.toISOString().slice(0,10));
    }
    return range
};

function roomDiscount(rate: number, discount: number): number{
    const thisDiscount = discount ? Math.min(100, discount): 0 ? Math.max(0, discount) : 0
    return (rate - ((rate * thisDiscount) / 100)) * 100
}

interface RoomInterface {
    name: string
    bookings: Booking[]
    rate: number
    discount: number
}


interface BookingInterface {
    guestName: string
    email: string
    checkin: string
    checkout: string
    discount: number
    room: Room
}

export class Room implements RoomInterface  {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;

    constructor({name, bookings, rate, discount}: RoomInterface){
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount
    }
    
    isOcuppied(date){
        for (let i = 0; i < this.bookings.length; i++){
            if (date >= this.bookings[i].checkin && date < this.bookings[i].checkout)
            return true
        }
        return false
    }
    occupancyPercentage(startDate, endDate){
        let daysOccupied = 0;
        let dateRange = rangeDates(startDate, endDate);
        let percent;
        let prueba : object[] = [];
        let newArray;
        this.bookings.map((date) => {
            prueba.push(rangeDates(date.checkin, date.checkout));
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

export class Booking implements BookingInterface {
    guestName: string;
    email: string;
    checkin: string;
    checkout: string;
    discount: number;
    room: Room;

    constructor({guestName, email, checkin, checkout, discount, room}: BookingInterface){
        this.guestName = guestName;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }
    getFee():number{
        const room = this.room;
        const roomPrice = roomDiscount(room.rate, room.discount)
        const thisDiscount = this.discount ? Math.max(0, this.discount) : 0
        return Math.round(roomPrice - (roomPrice * thisDiscount / 100)) / 100;
    }
};