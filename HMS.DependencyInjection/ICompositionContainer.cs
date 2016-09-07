namespace HMS.DependencyInjection
{
    public enum ObjectLifetime
    {
        Singleton,
        Transient
    }

    public interface ICompositionContainer
    {
        ICompositionContainer Parent { get; set; }

        ICompositionContainer CreateChildContainer();

        ICompositionContainer RootContainer { get; }

        void Register<T>(T instance) where T : class;

        void Register<T>(ObjectLifetime lifetime = ObjectLifetime.Transient) where T : class;

        void Register<T, TK>(ObjectLifetime lifetime = ObjectLifetime.Transient)
            where TK : class, T
            where T : class;

        T Resolve<T>() where T : class;
    }
}
