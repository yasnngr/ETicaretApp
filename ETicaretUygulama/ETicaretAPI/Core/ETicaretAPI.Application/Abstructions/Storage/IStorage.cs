using Microsoft.AspNetCore.Http;

namespace ETicaretAPI.Application.Abstructions.Storage
{
    public interface IStorage
    {
        //Dosya transfer edildikten sonra (string fileName,string path) geri dönüyoruz çünkü veritabanına kaydedicez
        Task<List<(string fileName,string pathOrContainer)>> UploadAsnyc(string pathOrContainer, IFormFileCollection files);//azure de container olduğu için pathOrContainer isimlendirdik ve ikinci parametre dosya lazım
        Task DeleteAsync(string pathOrContainer,string fileName);//belirtilen pathden ya da containerdan ilgili fileName'e sahip dosyaları sil 
        List<string> GetFiles(string pathOrContainer);//belirtilen pathden dosyaları getir
        bool HasFile(string pathOrContainer,string fileName);
    }
}
