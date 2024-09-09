using System.Text;

namespace Project_7.DTO
{
    public static class PasswordHasher
    {
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var h = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = h.Key;
                passwordHash = h.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
        public static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var h = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = h.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }
    }
}
