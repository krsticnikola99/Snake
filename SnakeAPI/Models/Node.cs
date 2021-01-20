using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SnakeAPI.Models
{

    public class Node{


        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        [Column("CageRef")]
        public string CageRef { get; set; }

        [Column("Cage")]
        [JsonIgnore]
        public Cage cage { get; set; }



    }


}