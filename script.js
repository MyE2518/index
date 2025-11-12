document.addEventListener("DOMContentLoaded", () => {
  const formLogin   = document.getElementById("login-form");
  const capaLogin   = document.getElementById("overlay-login");
  const enlacesNav  = document.querySelectorAll("nav a");

  const main = document.getElementById("main-content");
  const vistas = {
    inicio:   document.getElementById("vista-inicio"),
    galeria:  document.getElementById("vista-galeria"),
    opciones: document.getElementById("vista-opciones"),
  };

  // Hasta que no se inicie sesión, el nav queda deshabilitado
  enlacesNav.forEach(a => a.style.pointerEvents = "none");

  // Marca visual del nav
  function marcarActivo(nombre) {
    enlacesNav.forEach(a => a.classList.toggle("active", a.dataset.section === nombre));
  }

  // Muestra una sección y ajusta el tema del main
  function mostrarSeccion(nombre) {
    Object.entries(vistas).forEach(([key, nodo]) => {
      const activa = key === nombre;
      nodo.classList.toggle("activa", activa);
      nodo.setAttribute("aria-hidden", String(!activa));
    });

    if (nombre === "galeria") {
      main.classList.add("dark");
      main.classList.remove("aside-theme");
    } else {
      main.classList.add("aside-theme");
      main.classList.remove("dark");
    }

    marcarActivo(nombre);
  }

  // Login básico
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = formLogin.querySelector('input[type="text"]').value.trim();
    const clave   = formLogin.querySelector('input[type="password"]').value;

    if (usuario === "usuario"){
      // Oculta overlay y habilita navegación
      capaLogin.style.display = "none";
      document.body.classList.remove("prelogin");
      enlacesNav.forEach(a => a.style.pointerEvents = "auto");

      // Habilita el main e inicia en "Inicio"
      main.classList.remove("locked");
      mostrarSeccion("inicio");
    } else {
      alert("Usuario incorrecto.");
    }
  });

  // Navegación
  enlacesNav.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(a.dataset.section);
    });
  });
});

