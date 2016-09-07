using System;
using System.Collections.Generic;
using System.Linq;

namespace HMS.DependencyInjection
{
    public class CompositionRoot
    {
        private static readonly IDictionary<string, CompositionModule> Modules = new Dictionary<string, CompositionModule>();

        public static ICompositionContainer Container { get; private set; }

        public static ICompositionContainer Compose(IList<Type> modules)
        {
            if (Container != null) return Container;

            Container = new CompositionContainer();
            Container.Register<ICompositionContainer>(Container);
            Compose(Container, modules);

            return Container;
        }

        public static ICompositionContainer Compose(ICompositionContainer parentContainer, IList<Type> modules)
        {
            foreach (var module in modules.Select(type => Activator.CreateInstance(type) as CompositionModule))
            {
                module.Compose(parentContainer);
                //__modules.Add(module.Name, module);
                Modules.Add(Guid.NewGuid().ToString(), module);
            }

            return parentContainer;
        }

        public static CompositionModule GetModule(string name)
        {
            if (Modules.ContainsKey(name))
            {
                return Modules[name];
            }

            throw new InvalidOperationException(string.Format("Not found composition module with name {0}", name));
        }
    }
}
