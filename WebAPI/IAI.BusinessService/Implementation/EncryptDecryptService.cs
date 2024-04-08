using IAI.BusinessService.Interface;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace IAI.BusinessService.Implementation
{
    public class EncryptDecryptService : IEncryptDecryptService
    {
        private readonly IConfiguration configuration;
        public EncryptDecryptService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string Encrypt(string plainText)
        {
            string EncryptionKey = configuration.GetValue<string>("EncryptSettings:EncryptionKey");
            byte[] clearBytes = Encoding.Unicode.GetBytes(plainText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    plainText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return plainText;
        }

        public string Decrypt(string encryptedText)
        {
            string EncryptionKey = configuration.GetValue<string>("EncryptSettings:EncryptionKey");
            encryptedText = encryptedText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(encryptedText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    encryptedText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return encryptedText;
        }

        public string EncryptBase64(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
            //return plainText;
        }
        public string DecryptBase64(string encryptedText)
        {
            byte[] data = Convert.FromBase64String(encryptedText);
            string decodedString = Encoding.UTF8.GetString(data);
            return decodedString;
        }

        public string GeneratePassword()
        {
            var randomGenerator = RandomNumberGenerator.Create();
            var data = new byte[8];
            randomGenerator.GetBytes(data);
            return BitConverter.ToString(data);
        }
    }
}
