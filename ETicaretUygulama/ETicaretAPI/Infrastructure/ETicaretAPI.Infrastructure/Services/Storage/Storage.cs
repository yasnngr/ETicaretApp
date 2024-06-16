namespace ETicaretAPI.Infrastructure.Services.Storage
{
    public class Storage
    {
        //protected delegate bool HasFile(string pathOrContainerName,string fileName);
        protected Task<string> FileRemaneAsync(string fileName)
        {

            string originalFileName = Path.GetFileNameWithoutExtension(fileName).Replace(" ", "-");//boşlukları kaldırıp - ekledik
            string fileExtension = Path.GetExtension(fileName);
            string dateTimePath = DateTime.UtcNow.ToString("ddMMyyyy-HHmmss");

            string newFileName = $"{originalFileName}-{dateTimePath}{fileExtension}";  // Yeni dosya adı oluştur
            return Task.FromResult(newFileName);
        }
    }
}
