var Hotel;
(function (Hotel) {
    var RoomType = (function () {
        function RoomType() {
            this.Id = null;
            this.Name = null;
            this.FormulaByDay = null;
            this.FormulaByHalfDay = null;
            this.FormulaByHour = null;
            this.Status = Hotel.Status.Active;
        }
        return RoomType;
    }());
    Hotel.RoomType = RoomType;
    var User = (function () {
        function User() {
        }
        return User;
    }());
    Hotel.User = User;
    var Results = (function () {
        function Results() {
        }
        return Results;
    }());
    Hotel.Results = Results;
})(Hotel || (Hotel = {}));
