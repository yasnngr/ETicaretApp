namespace ETicaretAPI.Application.Abstructions.Storage
{
    public interface IStorageService : IStorage
    {
        public string StorageName { get; }
    }
}
