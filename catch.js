try {
    console.log('🌈 ¡Iniciando programa! 🌈');
    
    // Forzamos un error para demostrar el catch
    throw new Error('Este es un error simulado para demostrar el Try/Catch');
    
} catch (error) {
    console.log('🚨 ¡Ups! Algo pasó... pero lo manejamos con elegancia');
    console.log('💡 Mensaje del error: ' + error.message);
    console.log('🛠️  Continuamos ejecutando el programa normalmente');
} finally {
    console.log('✅ Bloque finally siempre se ejecuta');
    console.log('🎯 Programa completado exitosamente');
}