/* js/menu.js */

fetch("extenciones/menu.html")
.then(res => res.text())
.then(data => {

document.getElementById("menu").innerHTML = data;

/* esperar a que cargue el HTML */
setTimeout(() => {

const input = document.getElementById("srch");
const resultados = document.getElementById("resultados");
const btn = document.querySelector(".search-box button");

if(!input || !resultados) return;

const items = {
    "avatar":"1",
    "naruto":"2",
    "breaking bad":"3",
    "amor de mentira":"4",
    "spider man":"5"
};

/* función buscar */
function buscar(texto){

texto = texto.toLowerCase().trim();

resultados.innerHTML = "";

if(texto === "") return;

for(let nombre in items){

if(nombre.includes(texto)){

resultados.innerHTML += `
<div class="item-busqueda"
onclick="window.location.href='info.html?id=${items[nombre]}'">
${nombre}
</div>
`;

}

}

}

/* tiempo real */
input.addEventListener("input", function(){
buscar(input.value);
});

/* botón */
btn.addEventListener("click", function(){
buscar(input.value);
});

/* enter */
input.addEventListener("keydown", function(e){
if(e.key === "Enter"){
buscar(input.value);
}
});

},100);

});