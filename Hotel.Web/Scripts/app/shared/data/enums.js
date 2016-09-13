var Main;
(function (Main) {
    (function (Status) {
        Status[Status["Undefined"] = 0] = "Undefined";
        Status[Status["Active"] = 1] = "Active";
        Status[Status["Inactive"] = 2] = "Inactive";
    })(Main.Status || (Main.Status = {}));
    var Status = Main.Status;
    (function (ServiceType) {
        ServiceType[ServiceType["Undefined"] = 0] = "Undefined";
        ServiceType[ServiceType["Sale"] = 1] = "Sale";
        ServiceType[ServiceType["Rent"] = 2] = "Rent";
    })(Main.ServiceType || (Main.ServiceType = {}));
    var ServiceType = Main.ServiceType;
    (function (RoomStatus) {
        RoomStatus[RoomStatus["Undefined"] = 0] = "Undefined";
        RoomStatus[RoomStatus["RoomOff"] = 1] = "RoomOff";
        RoomStatus[RoomStatus["VacantReady"] = 2] = "VacantReady";
        RoomStatus[RoomStatus["VacantClean"] = 3] = "VacantClean";
        RoomStatus[RoomStatus["VacantDirty"] = 4] = "VacantDirty";
        RoomStatus[RoomStatus["Booking"] = 5] = "Booking";
        RoomStatus[RoomStatus["CheckIn"] = 6] = "CheckIn";
        RoomStatus[RoomStatus["CheckOut"] = 7] = "CheckOut";
    })(Main.RoomStatus || (Main.RoomStatus = {}));
    var RoomStatus = Main.RoomStatus;
    (function (GroupUser) {
        GroupUser[GroupUser["Undefined"] = 0] = "Undefined";
        GroupUser[GroupUser["Administrator"] = 1] = "Administrator";
        GroupUser[GroupUser["Manager"] = 2] = "Manager";
        GroupUser[GroupUser["Receptionist"] = 3] = "Receptionist";
    })(Main.GroupUser || (Main.GroupUser = {}));
    var GroupUser = Main.GroupUser;
    (function (Gender) {
        Gender[Gender["Undefined"] = 0] = "Undefined";
        Gender[Gender["Male"] = 1] = "Male";
        Gender[Gender["Female"] = 2] = "Female";
    })(Main.Gender || (Main.Gender = {}));
    var Gender = Main.Gender;
})(Main || (Main = {}));
