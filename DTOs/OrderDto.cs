using System;
using System.Collections.Generic;

namespace DTOs;

public partial class OrderDto
{
    //public int? OrderSum { get; set; }
    public int UserId { get; set; }
    //public int OrderId { get; set; }
    //public DateOnly? OrderDate { get; set; }
    public int? OrderSum { get; set; }
    public ICollection<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
}
