using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using HMS.Web.Main.Common;
using HMS.Web.Main.Models;
using Hotel.Api;
using Hotel.Domain.Data;
using Hotel.Domain.Data.Enum;

namespace HMS.Web.Main.Controllers
{
    public class ListController : Controller
    {
        public async Task<ActionResult> LoadRoomType()
        {
            try
            {
                var hotelApi = Bootstrapper.Resolve<IHotelApi>();

                var roomtypes = await hotelApi.GetRoomType(null);

                return Json(new Results<IEnumerable<RoomType>>(roomtypes), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new Results<IEnumerable<RoomType>>(ex.Message), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<ActionResult> SaveRoomType(RoomType roomType)
        {
            try
            {
                var hotelApi = Bootstrapper.Resolve<IHotelApi>();

                var result = await hotelApi.SaveRoomType(roomType);

                return Json(new Results<bool>(result), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new Results<bool>(ex.Message, false), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<ActionResult> DeleteRoomType(string id)
        {
            try
            {
                var hotelApi = Bootstrapper.Resolve<IHotelApi>();

                var result = await hotelApi.UpdateRoomTypeStatus(id, Status.Inactive);

                return Json(new Results<bool>(result), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new Results<bool>(ex.Message, false), JsonRequestBehavior.AllowGet);
            }
        }
    }
}