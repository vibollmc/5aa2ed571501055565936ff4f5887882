using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;
using Hotel.Domain.Services.Interface;
using Hotel.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Hotel.Domain.Services.Implement
{
    public class RoomTypeService : IRoomTypeService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;

        public RoomTypeService(IRoomTypeRepository roomTypeRepository)
        {
            this._roomTypeRepository = roomTypeRepository;
        }

        public async Task<IEnumerable<RoomType>> GetRoomType(string filter)
        {
            return await this._roomTypeRepository.GetRoomType(filter);
        }

        public async Task<bool> SaveRoomType(RoomType roomType)
        {
            return await this._roomTypeRepository.SaveRoomType(roomType);
        }

        public async Task<bool> UpdateStatus(string id, Status status)
        {
            return await this._roomTypeRepository.UpdateStatus(id, status);
        }
    }
}
