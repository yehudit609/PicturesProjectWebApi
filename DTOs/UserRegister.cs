using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DTOs;

public partial class UserRegister
{
    //public int UserId { get; set; }
    
    [EmailAddress]
    public string? Email { get; set; }
    [MaxLength(20)]
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Password { get; set; }

    //public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
