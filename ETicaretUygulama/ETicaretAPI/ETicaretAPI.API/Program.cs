using ETicaretAPI.API.Configuration.ColumnWriters;
using ETicaretAPI.API.Extensions;
using ETicaretAPI.Application;
using ETicaretAPI.Application.Validators.Products;
using ETicaretAPI.Infrastructure;
using ETicaretAPI.Infrastructure.Filters;
using ETicaretAPI.Infrastructure.Services.Storage.Azure;
using ETicaretAPI.Persistence;
using ETicaretAPI.SignalR;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Context;
using Serilog.Core;
using Serilog.Sinks.PostgreSQL;
using System.Security.Claims;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationService();
builder.Services.AddSignalRServices();

builder.Services.AddStorage<AzureStorage>();
builder.Services.AddCors(option => option.AddDefaultPolicy(policy =>
    policy.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials()
));
//policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin() tüm headerlara tüm metotlara ve originlere izin ver demek kullanýlmamalýdýr

//loglama iþlemi
Logger log = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt")
    .WriteTo.Seq(builder.Configuration["Seq:ServerURL"])
    .WriteTo.PostgreSQL(builder.Configuration.GetConnectionString("PostgreSQL"), "logs", needAutoCreateTable: true,
        columnOptions: new Dictionary<string, ColumnWriterBase>
        {
            {"message", new RenderedMessageColumnWriter() },
            {"message_template", new MessageTemplateColumnWriter() },
            {"level", new LevelColumnWriter() },
            {"time_stamp", new TimestampColumnWriter() },
            {"exception",new ExceptionColumnWriter() },
            {"log_event", new LogEventSerializedColumnWriter() },
            {"user_name", new UsernameColumnWriter()}
        })
    .Enrich.FromLogContext()
    .MinimumLevel.Information()
    .CreateLogger();

builder.Host.UseSerilog(log);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

builder.Services.AddControllers(option=>option.Filters.Add<ValidationFilter>())
    .ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();


builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Admin",opt =>
    {
        opt.TokenValidationParameters = new()
        {
            ValidateAudience = true,//Hangi sitelerin kullanabileceðini belirtiyoruz www.Bilmemne.com
            ValidateIssuer = true,//Oluþturacak token deðerinin kimin daðýttýðýný söylüyoruz www.myApi.com
            ValidateLifetime = true,//oluþturulan token deðerinin süresini kontrol et
            ValidateIssuerSigningKey = true,//oluþturulan token deðerinin bizim uygulamamýza ait olan security keydir

            ValidAudience = builder.Configuration["Token:Audience"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"])),
            LifetimeValidator = (notBefore, expires, securityToken, validationParameters) => expires != null ? expires > DateTime.UtcNow:false,
            NameClaimType = ClaimTypes.Name //jwt üzeride Name parametresine gelen deðeri User.Identity.Name propertysinden elde edebilmekteyiz
        };
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.ConfigureExceptionHandler<Program>(app.Services.GetRequiredService<ILogger<Program>>());
app.UseStaticFiles();
app.UseSerilogRequestLogging();
app.UseHttpLogging();

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.Use(async(context, next) =>
{
    var username = context.User?.Identity?.IsAuthenticated != null || true ? context.User.Identity.Name : null;
    LogContext.PushProperty("user_name",username);
    await next();
});

app.MapControllers();
app.MapHubs();

app.Run();
