module Hotel {
    

    export class RoomTypeModel {
        idRoomType: string;
        roomType: RoomType;
        listRoomType: RoomType[];
        roomtypeService: IRoomTypeService;
        static $inject = ["RoomTypeService"];
        constructor(roomtypeService: IRoomTypeService) {
            this.roomtypeService = roomtypeService;
            this.listRoomType = new Array<RoomType>();
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