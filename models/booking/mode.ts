import { Booking } from "./@types";
import { externalRequest } from "resources/utils";
import AuthService from "models/auth";

class BookingModel {

    static createBooking = async (data: Partial<Booking>) => {
        const booking = await externalRequest<Booking>({
            url: data.id ? `bookings/${data.id}` : 'bookings',
            method: data.id ? 'patch' : 'post',
            data: { ...data, inDraft: false }
        }).catch(err => { throw err });
        return booking;
    }

    static saveToDraft = async (data: Partial<Booking>) => {
        const booking = await externalRequest<Booking>({
            url: data.id ? `bookings/${data.id}` : 'bookings',
            method: data.id ? 'patch' : 'post',
            data: { ...data, inDraft: true }
        }).catch(err => { throw err });
        return booking;
    }
}

export default BookingModel;