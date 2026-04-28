/* js/main.js */

const params = new URLSearchParams(window.location.search);
const rawId = params.get("id");

/* ELEMENTOS */
const titulo = document.getElementById("titulo");
const meta = document.getElementById("meta");
const descripcion = document.getElementById("descripcion");
const zone = document.getElementById("player-zone");
const episodios = document.getElementById("episodios");
const reparto = document.getElementById("reparto");

const btnVer = document.getElementById("btn-ver");
const btnDescargar = document.getElementById("btn-descargar");

/* ===============================
   VALIDAR ID
=============================== */

if(!rawId){
    document.body.innerHTML = "<h1>No encontrado</h1>";
    throw new Error("Sin ID");
}

/* ===============================
   DETECTAR SI ES EPISODIO
=============================== */

function detectar(id){

    const match = id.match(/^([A-Za-z0-9]+)(\d+)x(\d+)$/);

    if(match){
        return{
            base:match[1],
            temp:parseInt(match[2]),
            cap:parseInt(match[3]),
            episodio:true
        };
    }

    return{
        base:id,
        episodio:false
    };

}

const data = detectar(rawId);

/* ===============================
   EXISTE CONTENIDO
=============================== */

if(!contenido[data.base]){
    document.body.innerHTML = "<h1>No encontrado</h1>";
    throw new Error("No existe");
}

const item = contenido[data.base];

/* ===============================
   TITULO PAGINA
=============================== */

document.title = item.titulo + " | Cine Azul";

/* ===============================
   INFORMACION GENERAL
=============================== */

titulo.textContent = item.titulo;

meta.innerHTML =
item.fecha + " • " +
item.categoria + " • " +
item.tipo + " • " +
item.calidad + "<br>" +
"País: " + item.pais + " • " +
"Idioma: " + item.idioma + "<br>" +
"Director: " + item.director + " • " +
"Rating: " + item.rating;

descripcion.textContent = item.descripcion;

/* ===============================
   PAGINA PRINCIPAL
=============================== */

if(!data.episodio){

    /* Vista previa */
    if(item.preview){

        zone.innerHTML = `
        <iframe
        src="${item.preview}"
        width="100%"
        height="550"
        frameborder="0"
        allowfullscreen>
        </iframe>
        `;

    }else{

        zone.innerHTML = `
        <img src="${item.banner}">
        `;

    }

    btnVer.href = "ver.html?id=" + data.base + "1x1";

    btnDescargar.style.display = "none";

}

/* ===============================
   SI ES EPISODIO
=============================== */

if(data.episodio){

    const temporada = item.temporadas[data.temp];

    if(!temporada){
        document.body.innerHTML = "<h1>Temporada no encontrada</h1>";
        throw new Error("Sin temporada");
    }

    const ep = temporada[data.cap - 1];

    if(!ep){
        document.body.innerHTML = "<h1>Episodio no encontrado</h1>";
        throw new Error("Sin episodio");
    }

    titulo.textContent =
    item.titulo + " - Temporada " + data.temp + " Episodio " + data.cap;

    descripcion.textContent = ep.sinopsis;

    meta.innerHTML =
    "Temporada " + data.temp +
    " • Episodio " + data.cap +
    " • " + ep.peso;

    /* reproductor */

    if(ep.video.includes("youtube.com/embed") ||
       ep.video.includes("vimeo.com")){

        zone.innerHTML = `
        <iframe
        src="${ep.video}"
        width="100%"
        height="550"
        frameborder="0"
        allowfullscreen>
        </iframe>
        `;

    }else{

        zone.innerHTML = `
        <video controls autoplay>
        <source src="${ep.video}" type="video/mp4">
        </video>
        `;

    }

    btnVer.style.display = "none";

    btnDescargar.onclick = function(e){
        e.preventDefault();
        abrirModal(ep);
    };

}

/* ===============================
   REPARTO
=============================== */

if(reparto && item.reparto){

    item.reparto.forEach(actor=>{

        reparto.innerHTML += `
        <div class="actor">

            <img src="${actor.img}">

            <div class="hover-info">
                <h3>${actor.nombre}</h3>
                <p>${actor.personaje}</p>
                <span>${actor.info}</span>
            </div>

        </div>
        `;

    });

}

/* ===============================
   CAPITULOS
=============================== */

for(let t in item.temporadas){

    item.temporadas[t].forEach(ep=>{

        const activo =
        data.episodio &&
        parseInt(t) === data.temp &&
        ep.cap === data.cap
        ? "active"
        : "";

        episodios.innerHTML += `
        <a class="card ${activo}"
        href="ver.html?id=${data.base}${t}x${ep.cap}">

            <img src="${ep.img}">
            <span>T${t}E${ep.cap} - ${ep.titulo}</span>

        </a>
        `;

    });

}

/* ===============================
   MODAL DESCARGA
=============================== */

function abrirModal(ep){

    let html = `
    <div class="modal-bg" id="modal">

        <div class="modal">

            <h2>Descargar</h2>

            <p>Peso del archivo: ${ep.peso}</p>
    `;

    ep.descargas.forEach(x=>{

        html += `
        <a class="btn-modal"
        href="${x.url}"
        target="_blank">

        ${x.idioma} - ${x.calidad}

        </a>
        `;

    });

    html += `
            <button class="cerrar" onclick="cerrarModal()">
            Cerrar
            </button>

        </div>

    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);

}

/* ===============================
   CERRAR MODAL
=============================== */

function cerrarModal(){

    const modal = document.getElementById("modal");

    if(modal){
        modal.remove();
    }

}