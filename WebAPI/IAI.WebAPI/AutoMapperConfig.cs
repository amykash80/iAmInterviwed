namespace IAI.WebAPI
{
    using AutoMapper;
    using IAI.Models.Entities;
    using IAI.Models.Models;
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
