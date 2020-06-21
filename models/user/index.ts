import { externalRequest } from "resources/utils";
import { Booking } from "models/booking/@types";

class UserModel {
    static getName = <T extends { firstName?: string, lastName?: string, name?: string; }>(entity: T): string => {
        return entity.name || `${entity.firstName || ''} ${entity.lastName || ''}`;
    }

    static getUserCurrentHotelBookingDraft = async ({ hotelId, userId }: { userId: string, hotelId: string }) => externalRequest<Booking>({ url: `bookings/findOne`, params: { filter: { where: { userId, hotelId } } } });

}

export default UserModel;