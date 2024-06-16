
using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                   .WithMessage("Product name must not be empty.")
                .MaximumLength(150)
                .MinimumLength(3)
                    .WithMessage("Product name must be between 3 and 150 characters.");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Stock information cannot be empty.")
                .Must(s => s >= 0)
                    .WithMessage("Stock information cannot be a negative value.");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Price information cannot be empty.")
                .Must(s => s >= 0)
                    .WithMessage("Price information cannot be a negative value.");
        }
    }
}
