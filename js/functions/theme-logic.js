// Definición de la función para cambiar el tema
export const toggleTheme = () => {
    const rootElement = document.documentElement;
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('selected-theme', newTheme);
};

// Función para aplicar el tema guardado al iniciar
export const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
};