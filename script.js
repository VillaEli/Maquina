const text = "Este es un efecto de máquina de escribir.";
const container = document.getElementById('text-container');
const audio = new Audio('maquina.mp3');
let i = 0;
let typingSpeed = 100;  // Velocidad de escritura
let audioReady = false; // Estado de la carga del audio
let isPlaying = false;  // Estado de la animación
let isAudioPlaying = false; // Estado del sonido (para evitar que se solape)

function typeWriter() {
  if (i < text.length && isPlaying) {
    // Agregar el siguiente carácter al contenedor
    container.textContent += text.charAt(i);

    // Reproducir el sonido solo si no está en curso
    if (!isAudioPlaying) {
      audio.currentTime = 0;
      audio.play();
      isAudioPlaying = true;
    }

    i++;
    setTimeout(typeWriter, typingSpeed);  // Llamar a la función después de un delay
  } else if (i >= text.length) {
    isAudioPlaying = false;  // Terminar de reproducir sonido cuando se termine el texto
  }
}

// Asegurarse de que el audio esté listo para reproducirse
audio.oncanplaythrough = () => audioReady = true;

document.body.addEventListener('click', () => {
  if (audioReady && !isPlaying) {
    // Si el audio está listo y no está jugando, empieza la animación
    isPlaying = true;
    typeWriter();
  } else if (isPlaying) {
    // Si la animación está en curso, detenerla
    isPlaying = false;
    audio.pause();
    isAudioPlaying = false;
  }
});

// Función para pausar/reanudar la animación
function toggleAnimation() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    typeWriter();  // Reanudar la animación de la máquina de escribir
  } else {
    audio.pause();  // Detener el audio
    isAudioPlaying = false;  // El audio ya no se está reproduciendo
  }
}
