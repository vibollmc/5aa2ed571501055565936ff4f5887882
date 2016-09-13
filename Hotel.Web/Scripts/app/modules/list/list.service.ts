module List {
    "use strict";
    declare var angular: any;

    export interface IListService {
        loadRoomType(): RoomType[];
        saveRoomType(roomType: RoomType): boolean;
        deleteRoomType(id: string): boolean;
    }

    export class ListService implements IListService {
        $timeout: any;
        $http: any;
        $log: any;
        apiAddresses: any;

        static $inject = ["$http", "$log", "$timeout", "ApiAddresses"];

        constructor($http: any, $log: any, $timeout: any, apiAddresses: any) {
            this.$http = $http;
            this.$log = $log;
            this.apiAddresses = apiAddresses;
        }

        public loadRoomType(): RoomType[] {
            return this.$http.get(this.apiAddresses.LOAD_ROOMTYPE).success((response: any) => {
                    return response;
                })
                .error((data, status) => {
                    this.logError(data, status);
                    return null;
                });
        }

        public saveRoomType(roomType: RoomType): boolean {
            return this.$http.post(this.apiAddresses.SAVE_ROOMTYPE, roomType).success((response: any) => {
                    return true;
                })
                .error((data, status) => {
                    this.logError(data, status);
                    return false;
                });
        }

        public deleteRoomType(id: string): boolean {
            return this.$http.post(this.apiAddresses.DELETE_ROOMTYPE, { id: id }).success((response: any) => {
                    return true;
                })
                .error((data, status) => {
                    this.logError(data, status);
                    return false;
                });
        }

        private logError(data: any, status: any): void {
            this.$log.error(data);
        }
    }
}