import { request } from "resources/utils";
import { Hotel } from "./@types";

class HotelModel {
    static getItemList = async () => await request<Hotel[]>({ url: '/hotels' });
}

export default HotelModel;