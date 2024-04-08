using IAI.BusinessService.Interface;
using IAI.BusinessService.Implementation;
using IAI.Repositories.Interface;
using IAI.Repositories.Implementation;
using IAI.Repositories;
using Microsoft.EntityFrameworkCore;
using NLog.Web;
using IAI.WebAPI.Extensions;
using IAI.Repositories.Interface.Candidate;
using IAI.Repositories.Implementation.Candidate;
using IAI.BusinessService.Interface.Candidate;
using IAI.BusinessService.Implementation.Candidate;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddJWTTokenServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddDbContext<IAIDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IAIDBConnection")));
builder.Services.AddDbContext<IAILOBDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IAILOBDBConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            Id = "Bearer"
                    }
                },
                new string[] {}
        }
    });
});
//var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
             builder.WithOrigins("http://localhost:3000", "https://qacore.iaminterviewed.com", "http://localhost:6100").AllowAnyHeader().AllowAnyMethod();
        });
});
//Services Depedency Resolver
builder.Services.AddScoped<IPrimarySkillService, PrimarySkillService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IEmailHelperService, EmailHelperService>();
builder.Services.AddScoped<IEncryptDecryptService, EncryptDecryptService>();
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
builder.Services.AddScoped<IMasterDataService, MasterDataService>();
builder.Services.AddScoped<IRoleMappingService, RoleMappingService>();
builder.Services.AddScoped<ICandidateDashboardService, CandidateDashboardService>();
builder.Services.AddScoped<ICandidateProfileService, CandidateProfileService>();
builder.Services.AddScoped<IScheduleInterviewService, ScheduleInterviewService>();

//Repository Depedency Resolver
builder.Services.AddScoped<IPrimarySkillRepository, PrimarySkillRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IFileUploadRepository, FileUploadRepository>();
builder.Services.AddScoped<IMasterDataRepository, MasterDataRepository>();
builder.Services.AddScoped<IRoleMappingRepository, RoleMappingRepository>();
builder.Services.AddScoped<ICandidateDashboardRepository, CandidateDashboardRepository>();
builder.Services.AddScoped<ICandidateProfileRepository, CandidateProfileRepository>();
builder.Services.AddScoped<IScheduleInterviewRepository, ScheduleInterviewRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Logging.ClearProviders();
builder.Host.UseNLog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();