using HMS.DependencyInjection;

namespace Hotel.Api
{
    public class CompositionBootstrapper : CompositionModule
    {
        public override void RegisterGlobalServices(ICompositionContainer container)
        {
            //container.Register<IDLTDApi, DLTDApi>();
        }

        public override void RegisterModuleServices(ICompositionContainer container)
        {
            RegisterRepositories(container);
            RegisterServices(container);
        }

        private static void RegisterServices(ICompositionContainer container)
        {
        }

        private static void RegisterRepositories(ICompositionContainer container)
        {
        }
    }
}
