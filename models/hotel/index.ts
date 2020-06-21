import { Hotel } from "./@types";
import { localRequest } from "resources/utils";

class HotelModel {
    static getItemList = async (args?: { params?: any }) => await localRequest<Hotel[]>({ url: '/hotels', params: args?.params });
    static getItem = async ({ id, params }: { id: string, params?: any }) => await localRequest<Hotel>({ url: `/hotels/${id}`, params });
}

export default HotelModel;