using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace SnakeAPI.Models
{

public class Cage
{   
    [Key]
    [Column("name")]
    public string Name{get;set;}


    [Column("X")]
    public int X{get;set;}

    [Column("Y")]
    public int Y{get;set;}

    public virtual List<Snake> Snakes{get;set;}

    public virtual List<Node> Blocks{get; set;}

}





}

