module List {
    import Gender = Main.Gender;
    import GroupUser = Main.GroupUser;
    import Status = Main.Status;

    "use strict";

    export class RoomType {
        Id: string;
        Name: string;
        FormulaByDay: string;
        FormulaByHour: string;
        FormulaByHalfDay: string;
        Status: Status;
    }

    export class User {
        UserName: string;
        Password: string;
        FullName: string;
        DOB: any;
        Gender: Gender;
        PhoneNumber: string;
        IdNumber: string;
        UrlImage: string;
        Group: GroupUser;
        LastLoginDate: any;
        Status: Status;
    }
    export interface IListModel {
        
    }

    export class ListModel implements IListModel {
        
    }
}