try {
    console.log('✨'.repeat(25));
    console.log('🌍   ¡HOLA MUNDO HERMOSO!   🌎');
    console.log('✨'.repeat(25));
    console.log('   💫 Todo está funcionando');
    console.log('   perfectamente bien 💫');
    console.log('❤️'.repeat(3) + '✨'.repeat(19) + '❤️'.repeat(3));
    
    // Simulamos que todo salió excelente
    const mensajeExito = '🎉 ¡Éxito total! 🎉';
    console.log(`\n   ${mensajeExito}`);
    
} catch (error) {
    console.log('😢 Oh no! Algo salió mal...');
    console.log('🔧 Pero aquí estamos para manejar errores');
    console.log(`📝 Error: ${error.message}`);
} finally {
    console.log('\n' + '⭐'.repeat(15));
    console.log('¡Siempre llegamos hasta aquí!');
    console.log('⭐'.repeat(15));
}