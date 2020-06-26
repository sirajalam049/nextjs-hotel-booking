import { TimeStamp } from "resources/globalTypes";
import { Hotel } from "models/hotel/@types";

export interface Booking extends TimeStamp {
    id: string;
    userId: string;
    hotelId: string;
    inDraft: boolean;
    date: string;
    hotel?: Hotel;
    numberOfNights?: number;
    numberOfRooms?: number;
}