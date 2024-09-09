using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookLand
{
    public class TokenGenerator
    {

        private readonly IConfiguration _configuration;

        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(string username)
        {
            var jwtSettings = _configuration.GetSection("Jwt");

            var key = jwtSettings.GetValue<string>("Key");

            var claims = new List<Claim>{ new Claim(ClaimTypes.Name, username)  };  

            //claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var keyBytes = Encoding.UTF8.GetBytes(key);

            var signingKey = new SymmetricSecurityKey(keyBytes);

            var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"),
                audience: jwtSettings.GetValue<string>("Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
