using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers;

public class MappingProfiles: Profile
{
    public MappingProfiles()
    {
        CreateMap<Basket, BasketDto>();
        CreateMap<BasketItem, BasketItemDto>()
            .ForMember(opt => opt.ProductId, opt => opt.MapFrom(src => src.Product.Id))
            .ForMember(opt => opt.Type, opt => opt.MapFrom(src => src.Product.Type))
            .ForMember(opt => opt.Brand, opt => opt.MapFrom(src => src.Product.Brand))
            .ForMember(opt => opt.Price, opt => opt.MapFrom(src => src.Product.Price))
            .ForMember(opt => opt.PictureUrl, opt => opt.MapFrom(src => src.Product.PictureUrl))
            .ForMember(opt => opt.Name, opt => opt.MapFrom(src => src.Product.Name));
    }
}