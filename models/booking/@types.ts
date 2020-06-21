import { TimeStamp } from "resources/globalTypes";

export interface Booking extends TimeStamp {
    id: string;
    userId: string;
    hotelId: string;
    inDraft: boolean;
    date: string;
}