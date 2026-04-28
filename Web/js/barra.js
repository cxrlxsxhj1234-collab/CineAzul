fetch("extenciones/barra.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("barra").innerHTML = data;
    });