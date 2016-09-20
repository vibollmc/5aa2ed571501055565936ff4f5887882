module Hotel {
    export class RoomType {
        constructor() {
            this.Id = null;
            this.Name = null;
            this.FormulaByDay = null;
            this.FormulaByHalfDay = null;
            this.FormulaByHour = null;
            this.Status = Status.Active;
        }
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
}