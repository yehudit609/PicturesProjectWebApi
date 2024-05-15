using System;
using System.Collections.Generic;

namespace Repositories;

public partial class Product
{
    public int ProductId { get; set; }

    public string? ProductName { get; set; }

    public double Price { get; set; }

    public int CategoryId { get; set; }

    public string? Description { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
