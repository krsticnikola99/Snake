
export class InputForm{

 constructor(host)
 {
  this.Draw(host);
 }

 Draw(host){

    const kontejner = document.createElement("div");
    kontejner.className = "kontejnerForma";
    host.appendChild(kontejner);

    var elLabela = document.createElement("h1");
    elLabela.innerHTML="Podesavanja <img src=\"./resources/gear.png\">"
    kontejner.appendChild(elLabela);
  

    const kontForma = document.createElement("div");
    kontForma.className = "cageForma";
    kontejner.appendChild(kontForma);

 

//Forma za dodavanje kaveza
    const kont1Forma = document.createElement("div");
    kont1Forma.className = "cage1Forma";
    kontForma.appendChild(kont1Forma);

        elLabela = document.createElement("h3");
        elLabela.innerHTML = "Kreiraj kavez";
        kont1Forma.appendChild(elLabela);

        var form1 = document.createElement("form");
        form1.method = "POST";
        form1.action = "https://localhost:5001/Snake/UpisiKavez";
        kont1Forma.appendChild(form1);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Ime kaveza";
        form1.appendChild(elLabela);

        let tb = document.createElement("input");
        tb.className = "vrsta";
        tb.name = "name"
        form1.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Duzina";
        form1.appendChild(elLabela);

        tb = document.createElement("input");
        tb.type="number";
        tb.className = "vrsta";
        tb.name = "X";
        tb.max = 50;
        tb.min = 10;
        form1.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Sirina";
        form1.appendChild(elLabela);

        tb = document.createElement("input");
        tb.type="number";
        tb.name = "Y";
        tb.max = 50;
        tb.min = 10;
        tb.className = "vrsta";
        form1.appendChild(tb);

        
        let dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj kavez";
        dugme.type="submit";
        form1.appendChild(dugme);



       
//Forma za dodavanje zmije
        const kont2Forma = document.createElement("div");
        kont2Forma.className = "cage2Forma";
        kontForma.appendChild(kont2Forma);


        elLabela = document.createElement("h3");
        elLabela.innerHTML = "Dodaj zmiju";
        kont2Forma.appendChild(elLabela);

        form1 = document.createElement("form");
        form1.method = "POST";
        
        kont2Forma.appendChild(form1);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Boja";
        form1.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className = "vrsta";
        tb.type="color";
        tb.name = "Color"
        form1.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Duzina";
        form1.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className = "vrsta";
        tb.name = "Length"
        tb.type ="number";
        tb.max = 20;
        tb.min = 4;
        form1.appendChild(tb);


        elLabela = document.createElement("label");
        elLabela.innerHTML = "Ime kaveza";
        form1.appendChild(elLabela);

        tb = document.createElement("select");
        tb.className = "vrsta";
        form1.appendChild(tb);

        fetch("https://localhost:5001/Snake/PreuzmiKaveze").then(p => {
            p.json().then(data => {
                data.forEach(kavez => {
                   var option = document.createElement("option");
                   option.value = kavez.name;
                   option.innerHTML = kavez.name;
                   tb.appendChild(option);
                });
            });
        });



        dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj zmiju";
        dugme.onclick = ()=>{
            form1.action = "https://localhost:5001/Snake/UpisiZmiju/"+tb.value;
        }
        dugme.type="submit";
        form1.appendChild(dugme);


//Forma za brisanje
const kont3Forma = document.createElement("div");
kont3Forma.className = "cage1Forma";
kontForma.appendChild(kont3Forma);


elLabela = document.createElement("h3");
elLabela.innerHTML = "Brisanje";
kont3Forma.appendChild(elLabela);

const form3 = document.createElement("form");
form3.method = "GET";

kont3Forma.appendChild(form3);

elLabela = document.createElement("label");
elLabela.innerHTML = "Kavez";
form3.appendChild(elLabela);

let tb1 = document.createElement("input");
tb1.className = "izbor";
tb1.type="radio";
tb1.name = "radiob"
tb1.checked = true;
tb1.onclick = (e) =>{
    zmijecombo.disabled = true;
};
form3.appendChild(tb1);

elLabela = document.createElement("label");
elLabela.innerHTML = "Zmija";
form3.appendChild(elLabela);

tb1 = document.createElement("input");
tb1.className = "izbor";
tb1.type="radio";
tb1.name = "radiob"
tb1.onclick = (e) =>{
    zmijecombo.disabled = false;
};
form3.appendChild(tb1);


form3.appendChild(document.createElement("br"));
form3.appendChild(document.createElement("br"));

elLabela = document.createElement("label");
elLabela.innerHTML = "Ime kaveza";
form3.appendChild(elLabela);

const kavezcombo = document.createElement("select");
kavezcombo.className = "vrsta";
form3.appendChild(kavezcombo);


fetch("https://localhost:5001/Snake/PreuzmiKaveze").then(p => {
    p.json().then(data => {
        data.forEach(kavez => {

           var option = document.createElement("option");
           option.value = kavez.name;
           option.innerHTML = kavez.name;
           kavezcombo.appendChild(option);
          
           kavezcombo.value=option;
        });
    });
});


kavezcombo.onchange = (e)=>{
    zmijecombo.childNodes.forEach(c=>{
        zmijecombo.removeChild(c);
    });
    console.log(kavezcombo.value);
    fetch("https://localhost:5001/Snake/PreuzmiZmije/"+kavezcombo.value).then(p => {
        p.json().then(data => {
            data.forEach(zmija => {
                console.log(zmija);
               var option = document.createElement("option");
               option.value = zmija.id;
               option.style.color = zmija.color;
               option.innerHTML = "████";
               zmijecombo.appendChild(option);
            });
        });
    });
};

elLabela = document.createElement("label");
elLabela.innerHTML = "Boja zmije";
form3.appendChild(elLabela);

const zmijecombo = document.createElement("select");
zmijecombo.className = "vrsta";
zmijecombo.disabled = true;
form3.appendChild(zmijecombo);


dugme = document.createElement("button");
dugme.innerHTML = "Izbrisi";
dugme.onclick = ()=>{
    if(tb1.checked == true)//brise zmiju
     fetch("https://localhost:5001/Snake/IzbrisiZmiju/"+zmijecombo.value, {method:"DELETE"});
    else//brise kavez
     fetch("https://localhost:5001/Snake/IzbrisiKavez/"+kavezcombo.value, {method:"DELETE"});
}
dugme.type="submit";
form3.appendChild(dugme);


//Update
const kont4Forma = document.createElement("div");
kont4Forma.className = "cage1Forma";
kontForma.appendChild(kont4Forma);

    elLabela = document.createElement("h3");
    elLabela.innerHTML = "Izmeni kavez";
    kont4Forma.appendChild(elLabela);

    var form4 = document.createElement("form");
    form4.method = "PUT";

    kont4Forma.appendChild(form4);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Ime kaveza";
    form4.appendChild(elLabela);

    const kavezcombo1 = document.createElement("select");
    kavezcombo1.className = "vrsta";
    form4.appendChild(kavezcombo1);
    
    
    fetch("https://localhost:5001/Snake/PreuzmiKaveze").then(p => {
        p.json().then(data => {
            data.forEach(kavez => {
    
               var option = document.createElement("option");
               option.value = kavez.name;
               option.innerHTML = kavez.name;
               kavezcombo1.appendChild(option);
              
            });
        });
    });

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Duzina";
    form4.appendChild(elLabela);

   const tb2 = document.createElement("input");//tb izmeni
   tb2.type="number";
   tb2.className = "vrsta";
   tb2.name = "X";
   tb2.max = 50;
   tb2.min = 10;
    form4.appendChild(tb2);

    elLabela = document.createElement("label");
    elLabela.innerHTML = "Sirina";
    form4.appendChild(elLabela);

   const tb3 = document.createElement("input");
   tb3.type="number";
   tb3.name = "Y";
   tb3.max = 50;
   tb3.min = 10;
   tb3.className = "vrsta";
    form4.appendChild(tb3);

    
    dugme = document.createElement("button");
    dugme.innerHTML = "Azuriraj kavez";
    dugme.onclick = (e)=>{

        fetch("https://localhost:5001/Snake/AzurirajKavez",{
        headers:{ 
            "Content-Type":"application/json"
        },
        method:"PUT",
        body:JSON.stringify(
            {
                "name": kavezcombo1.value,
                "x": tb2.value,
                "y": tb3.value
              
              }
        )

        });
    };
    dugme.type="submit";
    form4.appendChild(dugme);




        


 }



}