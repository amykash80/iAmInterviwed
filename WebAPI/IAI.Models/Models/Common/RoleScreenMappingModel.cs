namespace IAI.Models.Models.Common
{
    public class RoleScreenMappingModel
    {
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public int ScreenId { get; set; }
        public string? ScreenName { get; set; }
        public string? DisplayName { get; set; }
        public string? RoutePath { get; set; }
        public string? Icon { get; set; }
        public int MenuLevel { get; set; }
        public int? ParentId { get; set; }
    }
}
