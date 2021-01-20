import {Node} from "./Node.js"
import {Cage} from "./cage.js"

export class Snake{

    

    constructor(duzina,color,cage)
    {
        this.count;
        this.speed = 10;
        this.cage = cage;
        this.sLength=duzina;
        this.sNodes = new Array(duzina);
        this.color = color;

        //console.log(cage.apple);

       for(let i=0;i<this.sLength;i++)
        {
            this.sNodes[i] = new Node(1,1);
            const z = document.querySelector("."+this.cage.getFieldClass(this.sNodes[i].x,this.sNodes[i].y));
          //  z.style.background = this.color; 
        }
       /* let z;
        this.sNodes[0] = new Node(1,3);
        this.sNodes[1] = new Node(2,3);
        this.sNodes[2] = new Node(2,2);
        this.sNodes[3] = new Node(2,1);
        this.sNodes[4] = new Node(2,0);
        this.sNodes[5] = new Node(1,0);
        this.sNodes[6] = new Node(0,0);
        this.sNodes[7] = new Node(0,1);
        this.sNodes[8] = new Node(0,2);
        this.sNodes[9] = new Node(0,3);

        for(let i=0;i<this.sLength;i++)
        {
            const z = document.querySelector("."+this.cage.getFieldClass(this.sNodes[i].x,this.sNodes[i].y));
            z.style.background = this.color; 
        }*/

    }


    reDraw(){

        let rot = 0;
        this.count++;
        if((this.count * this.speed) < 20)
        return;
        this.count=0;


        const next =  this.getNextPosition();

     
        if(this.sNodes[0] === next)
        {
                //Zablokirana je
        }
        else
        {            
        //uklanjanje repa iz prethodne iteracije
         const z = document.querySelector("."+this.cage.getFieldClass(this.sNodes[this.sLength-1].x,this.sNodes[this.sLength-1].y));
         z.style.background = "white"; 
         z.innerHTML = "";
        // z.style.transform = "rotate(0deg)";

         

        // postavljanje novog repa
         const z1 = document.querySelector("."+this.cage.getFieldClass(this.sNodes[this.sLength-2].x,this.sNodes[this.sLength-2].y));
        
         const tailX = this.sNodes[this.sLength-3].x-this.sNodes[this.sLength-2].x;
         const tailY = this.sNodes[this.sLength-3].y - this.sNodes[this.sLength-2].y;
       //  z1.style.transform = "rotate(0deg)";
         if(tailX == 1)
         z1.innerHTML = "<image src=\"./resources/rep0.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
         else if(tailX == -1)
         z1.innerHTML = "<image src=\"./resources/rep180.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
         else if(tailY == 1)
         z1.innerHTML = "<image src=\"./resources/rep90.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
         else if(tailY == -1)
         z1.innerHTML = "<image src=\"./resources/rep270.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";

         //Rotiranje cvorova
         for(let i = this.sLength-1;i>0;i--)
            {
                this.sNodes[i] = this.sNodes[i-1];
            }
            //Postavljanje nove glave
            this.sNodes[0] = next;
            const p = document.querySelector("."+this.cage.getFieldClass(this.sNodes[1].x,this.sNodes[1].y));//Pozicija vrata
            const g = document.querySelector("."+this.cage.getFieldClass(next.x,next.y));//Pozicija glave

            const neckX = this.sNodes[0].x-this.sNodes[2].x;
            const neckY = this.sNodes[0].y - this.sNodes[2].y;
            if(neckX*neckY === 0)//forward position
            {
               // p.innerHTML="<image src=\"./resources/telo.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
              //  p.style.transform = "rotate(0deg)";
                if(neckX === 0)
                p.innerHTML="<image src=\"./resources/telov.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                else
                p.innerHTML="<image src=\"./resources/teloh.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";

            }
            else//krivina
            {
                //p.innerHTML="<image src=\"./resources/krivina.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                const odnos1X = this.sNodes[1].x-this.sNodes[2].x;
                const odnos1Y = this.sNodes[1].y - this.sNodes[2].y;

                const odnos2X = this.sNodes[0].x-this.sNodes[1].x;
                const odnos2Y = this.sNodes[0].y - this.sNodes[1].y;
               // p.style.transform = "rotate(0deg)";
                if((odnos1X == 0 && odnos1Y > 0 && odnos2X < 0 && odnos2Y == 0) || (odnos1X > 0 && odnos1Y == 0 && odnos2Y<0 && odnos2X == 0))
                {
                    p.innerHTML="<image src=\"./resources/krivina0.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                   // p.style.transform = "rotate(0deg)";
                }
                else if((odnos1X== 0 && odnos1Y > 0 && odnos2X > 0 && odnos2Y == 0) || (odnos1X<0 && odnos1Y == 0 && odnos2X == 0 && odnos2Y < 0))
                {
                    p.innerHTML="<image src=\"./resources/krivina90.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                    //p.style.transform = "rotate(90deg)";
                }
                else if((odnos1X < 0 && odnos1Y == 0 && odnos2X == 0 && odnos2Y > 0 ) || (odnos1X == 0 && odnos1Y < 0 && odnos2X > 0 && odnos2Y == 0))
                {
                    p.innerHTML="<image src=\"./resources/krivina180.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                    //p.style.transform = "rotate(180deg)";
                }
                else
                {
                    p.innerHTML="<image src=\"./resources/krivina270.png\" class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
                   // p.style.transform = "rotate(270deg)";
                }
         

            }
            
            
            

            //Jabuka
            if(this.cage.apple!= null && next.x === this.cage.apple.j && next.y === this.cage.apple.i)
            {
                this.cage.apple = null;
                g.innerHTML = "";
                console.log(this.color+" pojela");
            }


            //Postavljanje slike glave
            const forwardX = this.sNodes[0].x-this.sNodes[1].x;
            const forwardY = this.sNodes[0].y - this.sNodes[1].y;
            g.style.background = "#FFFFFE";
            //g.innerHTML = "<image src=\"./resources/snakehead.png\" style=\"margin:-7px;\"></image>";
            //g.style.transform = "rotate(0deg)";
            if(forwardX == 1)
            g.innerHTML = "<image src=\"./resources/head0.png\"  class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
            else if(forwardX == -1)
            g.innerHTML = "<image src=\"./resources/head180.png\"  class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
            else if(forwardY == 1)
            g.innerHTML = "<image src=\"./resources/head90.png\"  class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
            else if(forwardY == -1)
            g.innerHTML = "<image src=\"./resources/head270.png\"  class = \"imgstyle\" style = \"background-color:"+this.color+"\"></image>";
            

           
        }
         
    }
    
   

    getNextPosition(){
        this.zapamti = [];
        var p = []
        p.push(this.sNodes[1]);
        var pos = this.getValidPosition(this.sNodes[0],this.sNodes[1],p,this.sLength)
        if(pos != null)
        {
            return pos;
        }
        else
        {
            this.boolzapamti = true;
            return this.sNodes[0];
        }

    }

    getValidPosition(e,prosliel,prosli,dubina)
    {
       
        var moguc = [];

        moguc.push(new Node(e.x, e.y+1));
        moguc.push(new Node(e.x, e.y-1));
        moguc.push(new Node(e.x+1, e.y));
        moguc.push(new Node(e.x-1, e.y));



const forwardX = (2*e.x)-prosliel.x;
const forwardY = (2*e.y) - prosliel.y;

moguc.push(new Node(forwardX,forwardY));
moguc.push(new Node(forwardX,forwardY));
moguc.push(new Node(forwardX,forwardY));
moguc.push(new Node(forwardX,forwardY));
moguc.push(new Node(forwardX,forwardY));
moguc.push(new Node(forwardX,forwardY));

     
        prosli.push(e);

        

        if(this.cage.apple != null)
        {
            this.speed = 20;
            var priority = [];
            for(let i = 0;i< moguc.length;i++)
            {
                priority[i] = Math.abs((moguc[i].x - this.cage.apple.j)) + Math.abs((moguc[i].y) - this.cage.apple.i);
            }

            for(let i=0; i<moguc.length;i++)
            {
                for(let j = i+1;j<moguc.length-1;j++)
                {
                    if(priority[i] > priority[j])
                    {
                        var pom = priority[i];
                        priority[i] = priority[j];
                        priority[j] = pom;

                        pom = moguc[i];
                        moguc[i] = moguc[j];
                        moguc[j] = pom;
                    }

                }

            }


        }
        else
        {
            this.speed = 10;
            for(let mix=0; mix<20;mix++)
            {
                const i = Math.floor(Math.random() * moguc.length);
                const j = Math.floor(Math.random() * moguc.length);
                
                var pom = moguc[i];
                moguc[i] = moguc[j];
                moguc[j] = pom;
    
            }

        }



       

        for(let i = 0;i<moguc.length;i++)
        {
            if(moguc[i].x>=0 && moguc[i].y>=0 && moguc[i].x<this.cage.x && moguc[i].y < this.cage.y) //u okviru tabele
            {
               

                if(prosli.find((f)=>f.x === moguc[i].x && f.y === moguc[i].y) == null) // nije neki od proslih elemenata
                {
                
                    if((moguc[i].x == this.sNodes[this.sLength-1].x && moguc[i].y == this.sNodes[this.sLength-1].y) || document.querySelector("."+this.cage.getFieldClass(moguc[i].x,moguc[i].y)).style.background == "white" || document.querySelector("."+this.cage.getFieldClass(moguc[i].x,moguc[i].y)).style.background == "purple")
                    {//ako je rep ili polje bele boje ili roze
                        
                    if(dubina == 0)
                    {
                        return moguc[i]; 
                    }
                        
                        
                        if(this.getValidPosition(moguc[i],e,prosli,(dubina-1)) != null)
                        {
                           // document.querySelector("."+this.cage.getFieldClass(moguc[i].x,moguc[i].y)).style.background = "pink";
                            return moguc[i];
                            
                        }
                    }
                }

            }


        }

return null;

    }



}