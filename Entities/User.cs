using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Repositories;

public partial class User
{
    public int UserId { get; set; }
    
    [EmailAddress]
    public string? Email { get; set; }
    [MaxLength(20)]
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Password { get; set; }

    //public List<int> OrderId { get; set; } = new List<int>();
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
