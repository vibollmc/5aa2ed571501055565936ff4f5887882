module Hotel {
    export enum Status {
        Undefined = 0,
        Active = 1,
        Inactive = 2,
    }
    export enum ServiceType {
        Undefined = 0,
        Sale = 1,
        Rent = 2
    }
    export enum RoomStatus {
        Undefined = 0,
        RoomOff = 1,
        VacantReady = 2,
        VacantClean = 3,
        VacantDirty = 4,
        Booking = 5,
        CheckIn = 6,
        CheckOut = 7
    }
    export enum GroupUser {
        Undefined = 0,
        Administrator = 1,
        Manager = 2,
        Receptionist = 3
    }
    export enum Gender {
        Undefined = 0,
        Male = 1,
        Female = 2,
    }
    export enum ResultCode {
        Undefined = 0,
        Error = 1,
        Success = 2,
        Warning = 3
    }
}