using ETicaretAPI.Application.Abstructions.Storage;
using Microsoft.AspNetCore.Http;

namespace ETicaretAPI.Infrastructure.Services
{
    public class StorageService : IStorageService
    {
        readonly IStorage _storage;
        public StorageService(IStorage storage)
        {
            _storage = storage;
        }

        public string StorageName { get => _storage.GetType().Name;}

        public async Task DeleteAsync(string pathOrContainer, string fileName)
             =>await _storage.DeleteAsync(pathOrContainer, fileName);
        

        public List<string> GetFiles(string pathOrContainer)
            =>_storage.GetFiles(pathOrContainer);

        public bool HasFile(string pathOrContainer, string fileName)
            =>_storage.HasFile(pathOrContainer, fileName);

        public async Task<List<(string fileName, string pathOrContainer)>> UploadAsnyc(string pathOrContainer, IFormFileCollection files)
             =>await _storage.UploadAsnyc(pathOrContainer, files);
    }
}
