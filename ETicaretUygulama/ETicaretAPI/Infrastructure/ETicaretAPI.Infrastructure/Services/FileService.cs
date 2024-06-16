namespace ETicaretAPI.Infrastructure.Services
{
    public class FileService
    {
        //public async Task<bool> CopyFileAsync(string path, IFormFile file)
        //{
        //    try
        //    {
        //        await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
        //        await file.CopyToAsync(fileStream);
        //        await fileStream.FlushAsync();

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public Task<string> FileRemaneAsync(string fileName)
        {
            
                string originalFileName = Path.GetFileNameWithoutExtension(fileName).Replace(" ", "-");//boşlukları kaldırıp - ekledik
                string fileExtension = Path.GetExtension(fileName);
                string dateTimePath = DateTime.UtcNow.ToString("ddMMyyyy-HHmmss");

                string newFileName =  $"{originalFileName}-{dateTimePath}{fileExtension}";  // Yeni dosya adı oluştur
                return Task.FromResult(newFileName);
        }

        //public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        //    {
        //        string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

        //        if (!File.Exists(uploadPath))
        //            Directory.CreateDirectory(uploadPath);

        //        List<(string fileName, string path)> datas = new();
        //        List<bool> results = new();

        //        foreach (IFormFile file in files)
        //        {
        //            string fileNewName = await FileRemaneAsync(file.FileName);

        //            bool result = await CopyFileAsync($"{uploadPath}\\{fileNewName}", file);
        //            datas.Add((fileNewName, $"{path}\\{fileNewName}"));
        //            results.Add(result);

        //        }
        //        if (results.TrueForAll(r => r.Equals(true)))
        //        {
        //            return datas;
        //        }
        //        return null;
        //}
    }
} 
