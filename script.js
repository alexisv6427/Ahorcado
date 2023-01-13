const words = {}; // {} nomenclatura de objetos, inicializo un objeto vacio
words.salud = ["FIT", "SALUDABLE", "VEGANO", "LACTOSA", "CEREAL", "FRUTAS", "EJERCICIO", "RESPIRACION", "MEDITACION"];
words.deportes = ["SOFTBOL", "BALONCESTO", "BMX", "PARACAIDISMO", "PARAPENTISMO", "TENIS DE MESA", "FUTBOL", "BOXEO", "AUTOMOVILISMO"];
words.historia = ["CRISTOBAL COLON", "CONTINENTES", "GUERRAS", "CONQUISTAS", "SIMON BOLIVAR", "RELIGIONES", "INDEPENDENCIA", "INVASIONES", "NAZI"];
words.ciencia = ["MICROSCOPIO", "CIENTIFICO", "TECNOLOGIA", "PROBETA", "LABORATORIO", "GRAVEDAD", "TESIS DE GRADO", "INVESTIGACION", "PHD"];

// asigancion de variables a elementos del html
const show = document.getElementById('category');
const divKeyboard = document.getElementById("keyboard");
const divPalabra = document.getElementById("palabra");
const divMono = document.getElementById("mono");
const divIndicador = document.getElementById("indicador_Mono");
const divAnimacion = document.getElementById("animacion");
const divMensaje = document.getElementById("mensaje");
const divMensajeP= document.getElementById("mensajeP");
const divRecargar = document.getElementById("boton_recargar");
const divCambio = document.getElementById("cambio");
const letters = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
// asigancion de variables diversas
let categories = [], wordSelected = "", categoryText = "", btns = [], palabra = "", btn , limite = 6, cont= 0, aciertos = 0;
let mono = ["Cabeza","Cuerpo","Brazo Izquierdo", "Brazo Dererecho","Pierna Izquierda","Pierna Derecha"];
// array con la direccion de las imagenes
var monoArr = ["https://i.pinimg.com/originals/8d/1e/1f/8d1e1f7b8c761e3afa2a899c9d4809d2.png", "./cuerpo.png", "./brazo_Izq.png",
"./brazo_Der.png", "./pierna_Izq.png",
"./pierna_Der.png"  ];

// realiza la figura en los respectivos espacios cada vez que se equivoque el usuario
function hacerMono() {
   var cabeza = document.createElement('img');
   cabeza.src = monoArr[cont-1];
   if (cont == 1) {
    document.getElementById('mono1').appendChild(cabeza);
   cabeza.setAttribute("id","imagen_"+cont);
   } else if (cont>1 && cont<=4) {
    document.getElementById('mono2').appendChild(cabeza);
   cabeza.setAttribute("id","imagen_"+cont);
   } else if (cont>4 && cont<=6) {
    document.getElementById('mono3').appendChild(cabeza);
   cabeza.setAttribute("id","imagen_"+cont);
   }
   
}
// revisa si la cantidad de aciertos es igual al numero de letras de la palabra para ver si ha ganado
function checarAciertos(){
    if (aciertos == palabra.length) {
        alert("¡Felicidades, ganaste el juego!");
        mostrarOcultarG();
        
    }
}
// oculta elementos de la interfaz,muestra el mensaje, el boton para volver a jugar y el globo cuando gana el usuario
function mostrarOcultarG (){
        divKeyboard.innerHTML = "";
        divIndicador.innerHTML = "";
        divMono.innerHTML = "";
        divPalabra.innerHTML = "";
        show.innerHTML = "";
        divCambio.innerHTML= "";
        divAnimacion.style.display = "block";
        divMensaje.style.display= "block";
}
// oculta elementos de la interfaz, muestra un mensaje y el boton para reiniciar cuando pierde el usuario
function mostrarOcultarP (){
    imagen_1.src = "./cabeza_z.png"
    divKeyboard.innerHTML = "";
    divIndicador.innerHTML = "";
    divPalabra.innerHTML = "";
    show.innerHTML = "";
    divCambio.innerHTML= "";
    divMensajeP.style.display = "block";
    divRecargar.style.display = "block";

}

function selectCategory() {
    categories = Object.keys(words); // ["salud","deportes","historia","ciencia"]
    let category = Math.floor(Math.random() * categories.length); // indice aleatorio de categorias
    categoryText = categories[category]; //La categoria en texto ej "salud" 
}

function selectRandomWord() {
    let indiceAleatorio = Math.floor(Math.random() * words[categoryText].length); // Entrega un indice aleatorio a partir del vector de palabras
    wordSelected = words[categoryText][indiceAleatorio];
}

// cada vez que el usuario presione un boton se ejecuta una serie de acciones
function keyDown(letter) {
    let flag = false;
    btn = document.getElementById("letra_" + letter);
    btn.setAttribute("disabled",""); //se desactiva el boton una vez que se pulsa sin importar si acierta o no

    if (cont>=limite) {
        alert ("Lo siento, has perdido el juego , te han ahorcado");
    } else {
        for (var i=0;i<palabra.length; i++){
        
            if(letter == palabra[i]){
                document.getElementById("posLetra_"+ i).innerHTML = letter; //sustituye el guion bajo por la letra en esa posicion
                flag = true;
                aciertos++; //aumenta el contador de aciertos
             }            
         }
         if (flag) {
            console.log("Si se encuentra la letra");
            checarAciertos(); //verifica cada vez que se acierta el numero de aciertos totales para ver si ya ha ganado el usuario
            
         }else {
            console.log("No se encontro la letra");
            cont++; //aumenta el contador de errores
            divIndicador.innerHTML += mono[cont-1] + "<br>"; //muestra de manera textual la parte del cuerpo que se ha dibujado 
            hacerMono(); //dibuja la parte del cuerpo correspondiente al numero de errores
            if (cont==limite) {
                alert ("Lo siento, has perdido el juego , te han ahorcado");
                mostrarOcultarP(); //una vez que se llega al limite de errores se ejecuta la funcion que oculta parte de la interfaz
            }
         }

    }
    

}

// se construye el teclado
function showKeyboard() {
    let letter = "";
    for (let i = 0; i < letters.length; i++) {
        letter = letters.substring(i, i + 1)
        divKeyboard.innerHTML += `<button id="letra_${letter}">${letter}</button>\n`;
        btn = document.getElementById("letra_" + letter);
        btn.setAttribute("onclick", `keyDown('${letter}')`);
    }
}

// muestra la informacion de la palabra y la categoria
function ShowData() {
    let texto = ""
    console.log(`La palabra seleccionada es: ${wordSelected}`);
    texto = "<p id='categoria'>"
    texto += `La categoria seleccionada es: ${categoryText}`;
    texto += "</p>";
    show.innerHTML = texto;
}

// dibuja los guiones bajos y los espacios en blanco
function showBlank () {
    
    palabra = wordSelected.split("");
    for (var i=0; i < palabra.length; i++) {
        if (isNaN(palabra[i]) && palabra[i] != "&nbsp;"){
           divPalabra.innerHTML+= "<div id='posLetra_"+ i +"' class='letraEspacio'>_</div> ";
        } else{
            divPalabra.innerHTML+= "<div id='espacio' class='blankSpace'></div>";
            aciertos++; //cada vez que se dibuje un espacio se aumenta el contador de aciertos para que vaya a la par de los caracteres existentes de la palabra
        }
        
     }

}





selectCategory();
selectRandomWord();
showKeyboard();
ShowData();
showBlank();


console.log(palabra);

