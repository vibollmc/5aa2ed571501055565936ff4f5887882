using System;
using System.Collections.Generic;
using HMS.Core.DataAccess.Implement;
using HMS.Core.DataAccess.Interface;
using HMS.DependencyInjection;

namespace HMS.Web.Main.Common
{
    public class Bootstrapper
    {
        public static void Go()
        {
            LoadModules();
            RegisterGlobalServices();
        }

        public static T Resolve<T>() where T: class 
        {
            return CompositionRoot.Container.Resolve<T>();
        }

        private static void LoadModules()
        {
            var container = CompositionRoot.Compose(new List<Type> {
                typeof(Hotel.CompositionBootstrapper)
            });
        }

        private static void RegisterGlobalServices()
        {
            CompositionRoot.Container.Register<IReadDataContextFactory, ReadDataContextFactory>();
            CompositionRoot.Container.Register<IWriteDataContextFactory, WriteDataContextFactory>();
        }
    }
}