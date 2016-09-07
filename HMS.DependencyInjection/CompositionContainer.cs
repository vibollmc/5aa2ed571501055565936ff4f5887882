using SimpleInjector;
using System;

namespace HMS.DependencyInjection
{
    public class CompositionContainer : ICompositionContainer
    {
        private readonly Container _container;

        public ICompositionContainer Parent { get; set; }

        public CompositionContainer()
        {
            _container = new Container();
        }

        public ICompositionContainer CreateChildContainer()
        {
            return this;
            //TODO: create big container to adapt with current codebase for now.
            //create child containers later.
            //ICompositionContainer container = new CompositionContainer(_kernel);
            //container.Register<ICompositionContainer>(container);
            //container.Parent = this;
            //return container;
        }

        public ICompositionContainer RootContainer
        {
            get
            {
                ICompositionContainer currentContainer = this;

                while (currentContainer.Parent != null)
                {
                    currentContainer = currentContainer.Parent;
                }

                return currentContainer;
            }
        }

        public void Register<T>(T instance) where T : class
        {
            _container.Register<T>(() => instance, Lifestyle.Transient);
        }

        public void Register<T>(ObjectLifetime lifetime = ObjectLifetime.Transient) where T : class
        {
            switch (lifetime)
            {
                case ObjectLifetime.Transient:
                    _container.Register<T>(Lifestyle.Transient);
                    break;
                case ObjectLifetime.Singleton:
                    _container.Register<T>(Lifestyle.Singleton);
                    break;
                default:
                    throw new InvalidOperationException("Object lifetime is not supported");
            }
        }

        public void Register<T, TK>(ObjectLifetime lifetime = ObjectLifetime.Transient)
            where TK : class, T
            where T : class
        {
            switch (lifetime)
            {
                case ObjectLifetime.Transient:
                    _container.Register<T, TK>(Lifestyle.Transient);
                    break;
                case ObjectLifetime.Singleton:
                    _container.Register<T, TK>(Lifestyle.Singleton);
                    break;
                default:
                    throw new InvalidOperationException("Object lifetime is not supported");
            }
        }

        public T Resolve<T>() where T : class
        {
            return _container.GetInstance<T>();
        }
    }
}
