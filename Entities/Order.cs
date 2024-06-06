
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Repositories;

public partial class Order
{
    public int OrderId { get; set; }

    public DateOnly? OrderDate { get; set; }

    public int OrderSum { get; set; }

    public int UserId { get; set; }
    
    
    //public List<int> orderItemId { get; set; } = new List<int>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
   

    public virtual User User { get; set; } = null!;
}
