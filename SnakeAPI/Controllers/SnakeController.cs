using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SnakeAPI.Models;

namespace SnakeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class SnakeController : ControllerBase
    {

        public SnakeContext Context{get; set;}

        public SnakeController(SnakeContext context)
        {
            Context = context;
        }


        [Route("PreuzmiKaveze")]
        [HttpGet]
        public async Task<List<Cage>> PreuzmiKaveze()
        {
            return await Context.Cages.Include(p => p.Snakes).Include(p=> p.Blocks).ToListAsync();
        }

        [Route("PreuzmiZmije/{name}")]
        [HttpGet]
        public async Task<List<Snake>> PreuzmiZmije(string name)
        {
            return await Context.Snakes.Where(s=> s.Parent.Name == name).ToListAsync();
        }


        [Route("UpisiKavez")]
        [HttpPost]
        public async Task UpisiKavez([FromForm] Cage kavez)
        {
            Context.Cages.Add(kavez);
            await Context.SaveChangesAsync();
            Response.Redirect("http://127.0.0.1:5500/");
        }

        [Route("UpisiZmiju/{imekaveza}")]
        [HttpPost]         
         public async Task<IActionResult> UpisiZmiju(string imekaveza,[FromForm] Snake zmija)
        {
           
           
            Cage kavez = null;

            kavez =  await Context.Cages.FindAsync(imekaveza);
        
            if(kavez == null)
            {
                return BadRequest("Kavez nije pronadjen!");
            }
            zmija.Parent = kavez;
            zmija.CageRef = imekaveza;

            Context.Snakes.Add(zmija);
            kavez.Snakes.Add(zmija);
            await Context.SaveChangesAsync();
           
            
             return Redirect("http://127.0.0.1:5500/");
        }

        [Route("AzurirajBlokove")]
        [HttpPost]
        public async Task AzurirajBlokove([FromBody] List<Node> blokovi)
        {
            await Context.Blocks.ForEachAsync(b=> Context.Blocks.Remove(b));

            blokovi.ForEach(b=> {
                var c =  Context.Cages.Find(b.CageRef);
                b.cage=c;
                Context.Blocks.Add(b);
                c.Blocks.Add(b);
            });
            await Context.SaveChangesAsync();

        }

        [Route("IzbrisiZmiju/{id}")]
        [HttpDelete]
        public async Task IzbrisiZmiju(int id)
        {
            var z = await Context.Snakes.FindAsync(id);
            Context.Snakes.Remove(z);
            await Context.SaveChangesAsync();
            Response.Redirect("http://127.0.0.1:5500/",false);
        }

        [Route("IzbrisiKavez/{name}")]
        [HttpDelete]
        public async Task<IActionResult> IzbrisiKavez(string name)
        {
            await Context.Blocks.ForEachAsync(b=>{
                if(b.CageRef==name)
                Context.Blocks.Remove(b);
            });

            await Context.Snakes.ForEachAsync(s=>{
                if(s.CageRef==name)
                Context.Snakes.Remove(s);
            });

            

            var k = await Context.Cages.FindAsync(name);
            if(k == null)
            return BadRequest("Greska u imenu!");

            Context.Cages.Remove(k);
            await Context.SaveChangesAsync();
            return Redirect("http://127.0.0.1:5500/");
        }

        [Route("AzurirajKavez")]
        [HttpPut]
        public async Task TaskAzurirajKavez([FromBody] Cage c)
        {
            Context.Cages.Update(c);
            await Context.SaveChangesAsync();
        }



    }
}
