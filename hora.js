function holaMundoTemporal() {
    const ahora = new Date();
    const horas = ahora.getHours();
    let saludo = '';
    
    if (horas < 12) saludo = '☀️ ¡Buenos días Mundo!';
    else if (horas < 18) saludo = '🌞 ¡Buenas tardes Mundo!';
    else saludo = '🌙 ¡Buenas noches Mundo!';
    
    console.log('╔' + '═'.repeat(50) + '╗');
    console.log('║' + ' '.repeat(50) + '║');
    console.log(`║   ${saludo.padEnd(38)} ║`);
    console.log('║' + ' '.repeat(50) + '║');
    console.log(`║   🕐 Hora actual: ${ahora.toLocaleTimeString().padEnd(28)} ║`);
    console.log('║' + ' '.repeat(50) + '║');
    console.log('╚' + '═'.repeat(50) + '╝');
}

// Ejecutar cada segundo
setInterval(holaMundoTemporal, 1000);
holaMundoTemporal();