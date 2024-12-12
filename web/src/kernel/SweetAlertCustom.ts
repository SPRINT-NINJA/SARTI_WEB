import Swal from "sweetalert2";
import charge from "../assets/loading.gif";
import productoDeletedImage from "@/assets/producto_deleted_or_inactive.png";

class SweetAlertCustom {
  static questionMessage(
    text?: string,
    title = "¿Está seguro de realizar esta acción?"
  ) {
    return Swal.fire({
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ffa446",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#e35b5d",
      reverseButtons: true,
      customClass: {
        actions: "custom-swal-buttons", // Esta es la clase personalizada que añadimos
      },
    });
  }

  static errorMessage(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
  }

  static warningMessage(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  static successMessage(title = "Éxito", text = "Acción realizada", timer?: any,) {
    if (!timer) timer = 1500;
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      timer: timer,
      showConfirmButton: false,
    });
  }

  static successMessageHtml(
    html: any,
    data: any,
    timer: number,
    title = "Éxito",
    confirmButtonText = "Aceptar"
  ) {
    return Swal.fire({
      title: title,
      html: html,
      icon: "success",
      timer: timer,
      showConfirmButton: true,
      confirmButtonText,
    }).then(() => {
      if (data)
        navigator.clipboard
          .writeText(data)
          .then(() =>
            this.successMessage(
              "Contraseña copiada",
              "La contraseña ha sido copiada al portapapeles"
            )
          );
    });
  }

  static infoMessage(title: string, text: string, timer: number) {
    if (!timer) timer = 3000;
    Swal.fire({
      title: title,
      text: text,
      icon: "info",
      timer: timer,
      showConfirmButton: false,
    });
  }

  static invalidForm(
    title = "Fomulario inválido",
    text = "Por favor llena todos los campos obligatorios para continuar."
  ) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#10B981",
      showCancelButton: false,
      customClass: {
        actions: "custom-swal-buttons", // Esta es la clase personalizada que añadimos
      },
    });
  }

  static notImplemented() {
    Swal.fire({
      title: "En proceso...",
      text: "Esta funcionalidad aún no está implementada, estamos trabajando en ello. 🏨",
      icon: "info",
      timer: 3000,
      showConfirmButton: false,
    });
  }

  static welcomeMessage() {
    Swal.fire({
      title: "Bienvenido",
      text: "",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  }

  static async ErrorServer() {
    await Swal.fire({
      title: "El servidor no responde",
      text: "Sin respuesta del servidor",
      icon: "error",
      timer: 3000,
      confirmButtonColor: "#ddae23bb",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  static loading(title = "Cargando", text = "Espera estamos en proceso de tu información", timer?: any,) {
    if (!timer) timer = 1500;
    Swal.fire({
      title: title,
      text: text,
      imageUrl: charge,
      imageWidth: 200,
      imageHeight: 100,
      timer: timer,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  static productDeletedOrInactive(
    title = "¡Ops!, no encontramos lo que estás buscando",
    text = "El producto que estás buscando parece haber sido borrado o desactivado."
  ) {
    Swal.fire({
      title: title,
      text: text,
      imageUrl: productoDeletedImage, // Usamos la importación directa
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "Producto no encontrado",
      showConfirmButton: false,
      allowOutsideClick: true,
      backdrop: true,
      timer: 3000
    });
  }
}

export default SweetAlertCustom;