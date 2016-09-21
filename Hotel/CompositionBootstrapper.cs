using HMS.DependencyInjection;
using Hotel.Api;
using Hotel.Domain.Services.Interface;
using Hotel.Domain.Services.Implement;
using Hotel.Domain.Repositories;
using Hotel.Persistence;
namespace Hotel
{
    public class CompositionBootstrapper : CompositionModule
    {
        public override void RegisterGlobalServices(ICompositionContainer container)
        {
            container.Register<IHotelApi, HotelApi>();
        }

        public override void RegisterModuleServices(ICompositionContainer container)
        {
            RegisterRepositories(container);
            RegisterServices(container);
        }

        private static void RegisterServices(ICompositionContainer container)
        {
            container.Register<IUserService, UserService>();
            container.Register<IRoomTypeService, RoomTypeService>();
        }

        private static void RegisterRepositories(ICompositionContainer container)
        {
            container.Register<IUserRepository, UserRepository>();
            container.Register<IRoomTypeRepository, RoomTypeRepository>();
        }
    }
}
