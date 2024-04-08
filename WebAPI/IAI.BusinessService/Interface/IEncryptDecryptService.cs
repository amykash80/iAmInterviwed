
namespace IAI.BusinessService.Interface
{
    public interface IEncryptDecryptService
    {
        string Encrypt(string plainText);
        string Decrypt(string encryptedText);
        string EncryptBase64(string plainText);
        string DecryptBase64(string encryptedText);
        string GeneratePassword();
    }
}
