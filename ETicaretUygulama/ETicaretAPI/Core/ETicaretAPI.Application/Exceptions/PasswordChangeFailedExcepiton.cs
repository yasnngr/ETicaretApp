namespace ETicaretAPI.Application.Exceptions
{
    public class PasswordChangeFailedExcepiton : Exception
    {
        public PasswordChangeFailedExcepiton() : base("An error occurred while updating the password.")
        {
        }

        public PasswordChangeFailedExcepiton(string? message) : base(message)
        {
        }

        public PasswordChangeFailedExcepiton(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
