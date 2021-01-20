using Microsoft.EntityFrameworkCore;
namespace SnakeAPI.Models
{

    public class SnakeContext:DbContext
    {


        public DbSet<Cage> Cages { get; set; }
        public DbSet<Snake> Snakes { get; set; }
        public DbSet<Node> Blocks{get; set;}
        public SnakeContext(DbContextOptions options) : base(options)
        {
            
        }   

    }
}


