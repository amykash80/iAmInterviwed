using AutoMapper;
using IAI.Models.Entities;
using IAI.Models.Models;

namespace IAI.BusinessService
{
    public static class Mapping
    {
        private static readonly Lazy<IMapper> Lazy = new Lazy<IMapper>(() =>
        {
            var config = new MapperConfiguration(cfg => {
                // This line ensures that internal properties are also mapped over.
                cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsAssembly;
                cfg.AddProfile<AutoMapperConfig>();
            });
            var mapper = config.CreateMapper();
            return mapper;
        });

        public static IMapper Mapper => Lazy.Value;
    }
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<PrimarySkill, PrimarySkillModel>().ReverseMap();
            CreateMap<Role, RoleModel>().ReverseMap();
            CreateMap<UserMaster, UserMasterModel>().ReverseMap();
            CreateMap<UserRole, UserRoleModel>().ReverseMap();
        }
    }
}
