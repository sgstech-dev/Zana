using System.Text.Json.Serialization;
using Server;
using Server.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebSocketsSample.MoonSocket;
using Server.ScenarioManager;
using Server.DecisionService;
using Server.SensorManager;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
//JWT Authentication configuration
var key = Encoding.ASCII.GetBytes("kjdfhsdjkf489jkfhsd894854jfd8^jhn#45jhgjG8kjhjkhhjgkgdgtytdyt&^%jhghfjhf"); // Use a secure key
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true; // Set to true in production
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
//cross origin policy
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          string[] origins = configuration.GetSection("Appsettings:AllowClients").Get<string[]>()!;
                          policy.WithOrigins(origins).AllowAnyHeader()
                                                  // policy.WithOrigins("*").AllowAnyHeader()
                                                  .AllowAnyMethod()
                                                  .AllowCredentials();
                      });
});
// Add signalR Service
builder.Services.AddSignalR();
builder.Services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.AddNpgsqlDbContext<WGDBContext>("WGDBConnection");
builder.Services.AddSingleton<SensorService>();

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add MoonSocket Service
builder.Services.AddScoped<IMoonContext, MoonContext<ClientHub>>();
builder.Services.AddSingleton<IMoonContext, MoonContext<ClientHub>>(provider =>
{
    var hubContext = provider.GetRequiredService<IHubContext<ServerHub>>();
    return new MoonContext<ClientHub>(hubContext);
});


builder.Services.AddSingleton<WGDBContextFactory>();
builder.Services.AddScoped<IScenarioService,ScenarioService>();
builder.Services.AddSingleton<ScenarioService>();
builder.Services.AddSingleton<DecisionBuilder>();


var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};
builder.WebHost.UseUrls(configuration["Appsettings:AppURL"]!);
var app = builder.Build();
// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    
    app.UseSwagger();
    app.UseSwaggerUI();
//}
app.UseWebSockets(webSocketOptions);
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<ServerHub>("/serverHub");
app.Run();