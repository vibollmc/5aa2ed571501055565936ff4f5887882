module Hotel {
    "use strict";

    export interface IRoomTypeService {
        loadRoomType(): RoomType[];
        saveRoomType(roomType: RoomType): boolean;
        deleteRoomType(id: string): boolean;
    }

    export class RoomTypeService implements IRoomTypeService {
        $q: any;
        $http: any;
        apiAddresses: any;

        static $inject = ["$http", "$q", "ApiAddresses"];

        constructor($http: any, $q: any, apiAddresses: any) {
            this.$http = $http;
            this.$q = $q;
            this.apiAddresses = apiAddresses;
        }

        public loadRoomType(): RoomType[] {
            return this.$http.get(this.apiAddresses.LOAD_ROOMTYPE).success((response: any) => {
                    return response;
                })
                .error((data, status) => {
                    
                    return null;
                });
        }

        public saveRoomType(roomType: RoomType): boolean {
            return this.$http.post(this.apiAddresses.SAVE_ROOMTYPE, roomType).success((response: any) => {
                    return true;
                })
                .error((data, status) => {
                    return false;
                });
        }

        public deleteRoomType(id: string): boolean {
            return this.$http.post(this.apiAddresses.DELETE_ROOMTYPE, { id: id }).success((response: any) => {
                    return true;
                })
                .error((data, status) => {
                    
                    return false;
                });
        }
    }
}