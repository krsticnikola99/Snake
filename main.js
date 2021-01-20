import {Cage} from "./cage.js"
import {Snake} from "./snake.js"
import {InputForm} from "./forma.js"
import{Node} from "./Node.js"



new InputForm(document.body);
const mybody = document.createElement("div");
mybody.classList.add("myBody");
document.body.appendChild(mybody);




let Kavezi = [];

fetch("https://localhost:5001/Snake/PreuzmiKaveze").then(p => {
    p.json().then(data => {
        data.forEach(kavez => {
            const cb = [];
            kavez.blocks.forEach(b=>{
                cb.push({x:b.x,y:b.y});
            });
            let kavez1 = new Cage(kavez.name,kavez.x, kavez.y, cb);
            kavez1.Draw(mybody);
            Kavezi.push(kavez1);
            
       
            kavez.snakes.forEach(s => {
                const s1 = new Snake(s.length,s.color,kavez1);
                kavez1.addSnake(s1);
            });
        });
    });
});



window.onbeforeunload = (e) =>{
    console.log(Kavezi);
    var s = "[";
    Kavezi.forEach((kavez,ind)=>
        {
           s += kavez.getJSONstring();
           if(ind< Kavezi.length-1)
            s+=",";    
        });
        s += "]";

        console.log(s);

        fetch("https://localhost:5001/Snake/AzurirajBlokove",
        {
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body: s
        

        }
        );

      
   
};


/*
window.onbeforeunload = (e) =>{
    Kavezi.forEach(kavez=>
        {
            var asd = [kevez.getJSONstring().json()];
            kavez.getJSONstring();
            fetch("https://localhost:5001/Snake/AzurirajBlokove/"+kavez.name,
            {
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body: JSON.stringify(
                    asd
                )
            

            }
            );
        }
        );
   
};
*/
/*const kavez = new Cage("prvi",50,40);
kavez.Draw(document.body);
const s = new Snake(5,"red",kavez);
const s1 = new Snake(10,"yellow",kavez);
const s2 = new Snake(20,"blue",kavez);
const s3 = new Snake(12,"green",kavez);
kavez.addSnake(s);
kavez.addSnake(s1);
kavez.addSnake(s2);
kavez.addSnake(s3);

const kavez1 = new Cage("drugi",30,40);
kavez1.Draw(document.body);

const s4 = new Snake(12,"green",kavez1);
kavez1.addSnake(s4);*/