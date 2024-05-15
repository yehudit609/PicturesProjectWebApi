using System;
using System.Collections.Generic;

namespace Repositories;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public List<int> productId { get; set; } = new List<int>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
