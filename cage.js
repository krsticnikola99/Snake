
import {Snake} from "./snake.js"

export class Cage{
    

    constructor(name,px,py,customBlock)
    {
        this.customBlock = customBlock;
        this.apple = null;
        this.cName = name;
         this.x=px;
         this.y=py;
         this.snakes =[];   
        setInterval(()=> {
            if(this.snakes!=null)
            {
                this.snakes.forEach((element) => element.reDraw(this.x,this.y));
            }

        },50); 
    }
   

    Draw(host)
    {
        const table = document.createElement("table");
        table.classList.add("cagestil");
        var row;
        var col;
        for(let i =0;i<this.y;i++)
        {
            row = document.createElement("tr");
            for(let j=0;j<this.x;j++)
            {
                col = document.createElement("td");
                col.className = this.getFieldClass(j,i);
                col.style.background= "white";
                //Crtanje pocetnih blokova
                if((j == 0 || i == 0 || j == this.x-1  || i == this.y-1) || (this.customBlock && this.customBlock.find(o=> o.x == j && o.y == i)) )
                {
                    if((j == 0 || i == 0 || j == this.x-1  || i == this.y-1))
                    col.style.background= "#FFFFFE";
                    else
                    {
                        col.style.cursor = "crosshair";
                        col.style.background= "#FFFFFD";
                    }
                    

                    col.innerHTML = "<image src=\"./resources/wall.png\" style=\"margin:-2px;margin-top:-1px; margin-bottom:-3px; background-color: #994403; z-index: -1;\"></image>";
                }
                
               
                row.appendChild(col);

               //Postavljanje jabuke
                col.oncontextmenu = (()=>{
                   if(document.querySelector("."+this.getFieldClass(j,i)).style.background == "black" )
                   {
                       if(this.apple == null)
                         { 
                            document.querySelector("."+this.getFieldClass(j,i)).innerHTML = "<image src=\"./resources/apple.png\" style=\"margin:-2px;\"></image>";
                             this.apple = {j,i};
                            console.log(this.apple);
                         };
                   }

                });
                
                //Postavljanje novog bloka
                 col.onclick =  (()=>{
                    let el = document.querySelector("."+this.getFieldClass(j,i));
                    if(el.style.background == "black")
                    {

                        this.customBlock.push({x:j,y:i});
                        el.style.background= "#FFFFFD";
                        el.style.zIndex = -1;
                        el.style.cursor = "crosshair";
                        el.innerHTML = "<image src=\"./resources/wall.png\" style=\"margin:-2px;margin-top:-1px; margin-bottom:-3px; background-color: #994403; z-index: -1;\"></image>";                
                     
                    }
                    //Lomi blok
                    else if(el.style.background == "rgb(255, 255, 253)")
                    {
                        this.customBlock = this.customBlock.filter(b=>b.x!=j || b.y!=i);
                        el.style.background= "white";
                        el.innerHTML = "";
                        el.style.cursor ="default";
                    }
 
                 });

              
                col.onmouseover = (()=>{
                    if(document.querySelector("."+this.getFieldClass(j,i)).style.background == "white" )
                    document.querySelector("."+this.getFieldClass(j,i)).style.background = "black";
                 });
                
                 col.onmouseout = (()=>{
                    if(document.querySelector("."+this.getFieldClass(j,i)).style.background == "black" )
                    document.querySelector("."+this.getFieldClass(j,i)).style.background = "white";
                 });
             
              
            }
            table.appendChild(row);
        }
        host.appendChild(table);
    }

    addSnake(s)
    {
       this.snakes.push(s); 
      // console.log(this.snakes);
    }

    getFieldClass(x,y)
    {
        return this.cName+"_field"+x+"x"+y;
    }

   getJSONstring()
    {
        var str = "";
                    
        this.customBlock.forEach((b,ind)=>{
            str= str+"{\"x\": "+b.x+",\"y\": "+b.y+", \"cageRef\": \""+this.cName+"\"}"
            if(ind < this.customBlock.length-1)
            str+=",";

        });
   
        console.log(str);
        return str;
    }

  /*   getJSONstring()
    {
        var str = "";
                    
        this.customBlock.forEach((b,ind)=>{
            str= str+{"x":b.x,"y": b.y,"cageRef":this.cName};

            if(ind < this.customBlock.length-1)
            str+=",";

        });
   
        console.log(str);
        return str;
    }
*/
  


}