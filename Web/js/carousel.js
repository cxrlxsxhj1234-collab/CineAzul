fetch("extenciones/carousel.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("carousel").innerHTML = data;
    });