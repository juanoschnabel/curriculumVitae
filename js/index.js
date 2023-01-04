const form = document.getElementById("formContacto");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  capturarDatos();
  document.getElementById("formContacto").reset();
});

const capturarDatos = () => {
  const nombre = document.getElementById("nombre").value;
  const telefono = Number(document.getElementById("telefono").value);
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;
  const datos = {
    nombre,
    telefono,
    email,
    mensaje,
  };
  validaciones(datos);
};
const mensajeFinal = (nombre, telefono, email) => {
  Toastify({
    text: `Muchas Gracias, ${nombre}!! Los datos de contacto ingresados son: ${telefono} y ${email}. Ya recibí tu mensaje y estaremos en contacto a la brevedad.
    Saludos!`,
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
};

const validaciones = ({ nombre, telefono, email, mensaje }) => {
  const Nombre = validacionNombre(nombre);
  const Telefono = validacionTelefono(telefono);
  const Mensaje = validacionMensaje(mensaje);
  if (Nombre === false) {
    Swal.fire({
      icon: "error",
      title:
        "Ingrese un nombre válido que tenga entre 4 y 20 caracteres y que solo contenga letras",
      showConfirmButton: false,
      timer: 4000,
    });
  }
  if (Telefono === false) {
    Swal.fire({
      icon: "error",
      title: "Ingrese un teléfono correcto que contenga 10 números",
      showConfirmButton: false,
      timer: 4000,
    });
  }
  if (Mensaje < 19) {
    Swal.fire({
      icon: "error",
      title: "Ingrese un mensaje de al menos 20 caracteres",
      showConfirmButton: false,
      timer: 4000,
    });
  }
  if (Nombre && Telefono === true && Mensaje > 19) {
    mensajeFinal(nombre, telefono, email);
  } else {
    document.getElementById("form").reset();
  }
};
const validacionNombre = (nombre) => {
  const validacionNombre = !/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(nombre)
    ? false
    : true;
  return validacionNombre;
};
const validacionTelefono = (telefono) => {
  const validacionTelefonica = validacionNumerica(telefono);
  if (!isNaN(telefono) && validacionTelefonica == 10) {
    return true;
  } else {
    return false;
  }
};
const validacionMensaje = (mensaje) => {
  const Mensaje = validacionNumerica(mensaje);
  console.log(Mensaje);
  return Mensaje;
};

const validacionNumerica = (prop) => {
  return prop.toString().length;
};
