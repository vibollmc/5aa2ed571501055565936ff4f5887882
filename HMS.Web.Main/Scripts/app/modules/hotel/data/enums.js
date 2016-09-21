var Hotel;
(function (Hotel) {
    (function (Status) {
        Status[Status["Undefined"] = 0] = "Undefined";
        Status[Status["Active"] = 1] = "Active";
        Status[Status["Inactive"] = 2] = "Inactive";
    })(Hotel.Status || (Hotel.Status = {}));
    var Status = Hotel.Status;
    (function (ServiceType) {
        ServiceType[ServiceType["Undefined"] = 0] = "Undefined";
        ServiceType[ServiceType["Sale"] = 1] = "Sale";
        ServiceType[ServiceType["Rent"] = 2] = "Rent";
    })(Hotel.ServiceType || (Hotel.ServiceType = {}));
    var ServiceType = Hotel.ServiceType;
    (function (RoomStatus) {
        RoomStatus[RoomStatus["Undefined"] = 0] = "Undefined";
        RoomStatus[RoomStatus["RoomOff"] = 1] = "RoomOff";
        RoomStatus[RoomStatus["VacantReady"] = 2] = "VacantReady";
        RoomStatus[RoomStatus["VacantClean"] = 3] = "VacantClean";
        RoomStatus[RoomStatus["VacantDirty"] = 4] = "VacantDirty";
        RoomStatus[RoomStatus["Booking"] = 5] = "Booking";
        RoomStatus[RoomStatus["CheckIn"] = 6] = "CheckIn";
        RoomStatus[RoomStatus["CheckOut"] = 7] = "CheckOut";
    })(Hotel.RoomStatus || (Hotel.RoomStatus = {}));
    var RoomStatus = Hotel.RoomStatus;
    (function (GroupUser) {
        GroupUser[GroupUser["Undefined"] = 0] = "Undefined";
        GroupUser[GroupUser["Administrator"] = 1] = "Administrator";
        GroupUser[GroupUser["Manager"] = 2] = "Manager";
        GroupUser[GroupUser["Receptionist"] = 3] = "Receptionist";
    })(Hotel.GroupUser || (Hotel.GroupUser = {}));
    var GroupUser = Hotel.GroupUser;
    (function (Gender) {
        Gender[Gender["Undefined"] = 0] = "Undefined";
        Gender[Gender["Male"] = 1] = "Male";
        Gender[Gender["Female"] = 2] = "Female";
    })(Hotel.Gender || (Hotel.Gender = {}));
    var Gender = Hotel.Gender;
    (function (ResultCode) {
        ResultCode[ResultCode["Undefined"] = 0] = "Undefined";
        ResultCode[ResultCode["Error"] = 1] = "Error";
        ResultCode[ResultCode["Success"] = 2] = "Success";
        ResultCode[ResultCode["Warning"] = 3] = "Warning";
    })(Hotel.ResultCode || (Hotel.ResultCode = {}));
    var ResultCode = Hotel.ResultCode;
})(Hotel || (Hotel = {}));
