class UserModel {
    static getName = <T extends { firstName?: string, lastName?: string, name?: string; }>(entity: T): string => {
        return entity.name || `${entity.firstName || ''} ${entity.lastName || ''}`;
    }
}

export default UserModel;