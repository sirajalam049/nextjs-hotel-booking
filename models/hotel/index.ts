import { request } from "resources/utils";
import { Hotel } from "./@types";

class HotelModel {
    static getItemList = async (args?: { params?: any }) => await request<Hotel[]>({ url: '/hotels', params: args?.params });
    static getItem = async ({ id, params }: { id: string, params?: any }) => await request<Hotel>({ url: `/hotels/${id}`, params });
}

export default HotelModel;