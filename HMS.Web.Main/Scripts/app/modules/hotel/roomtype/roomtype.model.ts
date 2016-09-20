module Hotel {
    "use strict";

    export class RoomTypeModel {
        $q: any;
        idRoomType: string;
        roomType: RoomType;
        listRoomType: RoomType[];
        roomtypeService: IRoomTypeService;
        static $inject = ["$q", "RoomTypeService"];
        constructor($q: any, roomtypeService: IRoomTypeService) {
            this.roomtypeService = roomtypeService;
            this.listRoomType = new Array<RoomType>();
            this.roomType = new RoomType();
            this.idRoomType = null;
            this.$q = $q;
        }

        public loadRoomType(): void {
            this.listRoomType = this.roomtypeService.loadRoomType();
        }
        public saveRoomType(): boolean {
            return this.roomtypeService.saveRoomType(this.roomType);
        }
        public deleteRoomType(): boolean {
            return this.roomtypeService.deleteRoomType(this.idRoomType);
        }
    }
}