import { TimeStamp } from "resources/globalTypes";

export interface Hotel extends TimeStamp {
    id: string;
    name: string;
    location: string;
    about: string;
    phone: string;
    address: string;
    price: string;
    picture: string;
    thumbnail: string;
}