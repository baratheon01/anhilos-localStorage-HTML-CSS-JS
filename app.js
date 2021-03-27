
const contenedor = document.querySelector('#container');

const btnHilo = document.querySelector('#btnHilo');
const formato = new Intl.NumberFormat('es');
const formContainer = document.querySelector('#formContainer');
const formSave = document.querySelector('#formSave');
const listaItems = document.querySelector('#listaItems');
const tableItems = document.querySelector('#tableItems');
const form = document.querySelector('#form');
const pdiv = document.querySelector('#p');
const costoProducto = document.querySelector('#costoProducto');
const btnSave = document.querySelector('#btnSave');
let itemsGuardados = [];

eventListeners();
function eventListeners(){

   //cuando el documento esta listo trae los items guardados
   document.addEventListener('DOMContentLoaded', ()=>{
        itemsGuardados = JSON.parse(localStorage.getItem('items') || []);

        crearHTML();
   });
    
}




clickHilo();
function clickHilo(){
    
    btnHilo.addEventListener('click', ()=>{
        borrarValor();
        //hilo
        let vh = parseInt(document.querySelector('#valorHilo').value);
        let mh = parseInt(document.querySelector('#metroHilo').value);
        let hg = parseInt(document.querySelector('#hiloGastado').value);
        //tela
        let vt = parseInt(document.querySelector('#valorTela').value);
        let mt = parseInt(document.querySelector('#metroTela').value);
        let tg = parseInt(document.querySelector('#telaGastada').value);
        //Materiales
        let cm = parseInt(document.getElementById("valorMarco").value);
        let cc = parseInt(document.getElementById("valorCajas").value);
        //valorHora
        let vht = parseInt(document.getElementById("valorHora").value);
        let vhtd = 4200*vht;

        const pasandoMetros = mh * 100;
        const pasandoMetrosTela = mt * 100;


        const op1 = (hg * (vh / pasandoMetros));
        

        const op2 = (tg * (vt / pasandoMetrosTela));
        

        const total = op1 + op2 + cm + cc + vhtd;
        

        let p = document.createElement('P');
        p.classList.add("p-precio-total");
        p.innerHTML = `El total es: ${formato.format(total)}`

        pdiv.appendChild(p);

       
        costoProducto.value = formato.format(total);
    });
}




agregandoItem();
function agregandoItem(){
    
    
    btnSave.addEventListener('click', () =>{
        
        //const nombreProducto = document.querySelector("#nombreProducto").value;
        let costoPValor = costoProducto.value;
       const itemsAGuardar = {
            id: Date.now(),
            nombre: document.querySelector('#nombreProducto').value,
            costo: costoPValor
        }

        

        itemsGuardados = [...itemsGuardados, itemsAGuardar ];
        crearHTML();
        
    });
}



function crearHTML(){
    borrarHTML();
    if(itemsGuardados.length>0){
        itemsGuardados.forEach( item =>{
            const {id, nombre, costo} = item
            const row = document.createElement('tr');
            row.innerHTML=`
            <td>
                ${nombre}
            </td>
            <td>
                ${costo}
            </td>
            `;
            tableItems.appendChild(row);
        })
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('items', JSON.stringify(itemsGuardados));
}


calculadora()
function calculadora(){
   const vm = 3200;
   const mh = 8;
   const mhh = mh*100;
   const hg = 1500;
   console.log(hg * (vm/mhh));
    
}

calculadora2();
function calculadora2(){
    const vl = 5800;
    const ml= 1000;
    const lg = 400;

    const op2 = (lg * (vl/ml));
    console.log(op2);
}


calculadora3()
function calculadora3(){
    const metros = 1;
    let metrosop = metros*100;
    console.log(metrosop);
}


function borrarHTML(){
    while(tableItems.firstChild){
        tableItems.removeChild(tableItems.firstChild);
    }
}

function borrarValor(){
    while(pdiv.firstChild){
        pdiv.removeChild(pdiv.firstChild);
    }
}