import { Booking } from "models/booking/@types";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bookings?: Booking[];
}