function escribirComoMaquina(texto, velocidad = 100) {
    let i = 0;
    
    function escribir() {
        if (i < texto.length) {
            process.stdout.write(texto.charAt(i));
            i++;
            setTimeout(escribir, velocidad);
        } else {
            process.stdout.write('\n\n');
        }
    }
    
    escribir();
}

// Mensaje especial
const mensaje = `✨ ¡Hola Mundo! 🌍

Bienvenido a Node.js, donde las ideas 
se convierten en realidad con código.

💫 ¡Que tu viaje en programación esté 
lleno de descubrimientos y éxito! 🚀`;

console.log('🤖 Iniciando secuencia de saludo...\n');
setTimeout(() => escribirComoMaquina(mensaje), 1000);