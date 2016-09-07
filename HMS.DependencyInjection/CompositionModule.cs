namespace HMS.DependencyInjection
{
    public abstract class CompositionModule
    {
        public ICompositionContainer Container { get; private set; }

        public void Compose(ICompositionContainer parentContainer)
        {
            //TODO: not support child containers yet
            Container = parentContainer.CreateChildContainer();
            RegisterGlobalServices(Container);
            RegisterModuleServices(Container);
            Initialize();
        }

        public virtual void Initialize()
        {
        }

        public virtual void RegisterGlobalServices(ICompositionContainer container)
        {
        }

        public virtual void RegisterModuleServices(ICompositionContainer container)
        {
        }
    }
}
