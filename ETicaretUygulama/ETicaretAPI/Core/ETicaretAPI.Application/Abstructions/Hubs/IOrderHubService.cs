namespace ETicaretAPI.Application.Abstructions.Hubs
{
    public interface IOrderHubService
    {
         Task OrderAddedMessageAsync(string message);
    }
}
