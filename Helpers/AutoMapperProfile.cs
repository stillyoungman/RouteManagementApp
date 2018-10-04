using AutoMapper;
using RouteManagementApp.Entities;

namespace RouteManagementApp.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterUserDto,User>();
            CreateMap<Marker, MarkerDto>();
            CreateMap<MarkerDto, Marker>();
            CreateMap<SectionDto, Section>();
            CreateMap<Section, SectionDto>();
            CreateMap<SegmentDto, Segment>();
            CreateMap<Segment, SegmentDto>();
            CreateMap<RouteDto, Route>();
            CreateMap<Route, RouteDto>();
        }
    }
}