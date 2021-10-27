using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmpresaWithAngular.Models
{
    public class Company
    {
        [Key]
        public int CompanyId { get; set; }


        [Required]
        [Column(TypeName="nvarchar(100)")]
        [DisplayName("Nome")]
        public string CompanyName { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        [DisplayName("CNPJ")]
        public string CompanyENI { get; set; }

        [Column(TypeName = "varchar(100)")]
        [DisplayName("Endereço")]
        public string CompanyAdress { get; set; }

        [Column(TypeName = "varchar(100)")]
        [DisplayName("Email")]
        public string CompanyEmail { get; set; }

    }
}
