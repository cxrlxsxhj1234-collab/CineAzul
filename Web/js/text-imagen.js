fetch("extenciones/text-imagen.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("text-imagen").innerHTML = data;
    });