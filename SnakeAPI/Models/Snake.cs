using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SnakeAPI.Models
{
    public class Snake
    {

        [Key]
        [Column("ID")]
        public int ID{get;set;}

         [Column("Length")]
         public int Length{get;set;}

         [Column("Color")]  
         public string Color { get; set; }

        [Column("CageRef")]
        public string CageRef { get; set; }


        [JsonIgnore]
         public Cage Parent { get; set; }

        

    }
}