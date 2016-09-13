module List {
    export class RoomTypeModel {
        idRoomType: string;
        roomType: RoomType;
        listRoomType: RoomType[];
        listService: IListService;
        static $inject = ["ListService"];
        constructor(listService: IListService) {
            this.listService = listService;
            this.listRoomType = new Array<RoomType>();
        }

        public loadRoomType(): void {
            this.listRoomType = this.listService.loadRoomType();
        }
        public saveRoomType(): boolean {
            return this.listService.saveRoomType(this.roomType);
        }
        public deleteRoomType(): boolean {
            return this.listService.deleteRoomType(this.idRoomType);
        }
    }
}