// Eventos del navbar para que quede resaltada la categoría seleccionada y el scroll contemple el navbar
const navItems = document.querySelectorAll('.nav-link:not(.text-success)');
for (const navItem of navItems) {
    navItem.addEventListener('click', ( e ) => {
        e.preventDefault();

        // Primero lo resalto
        const previousSelected = document.querySelector('.nav-link.active');
        previousSelected && previousSelected.classList.remove('active');
        navItem.classList.add('active');

        // Luego me desplazo        
        const header = document.querySelector('header');
        const element = document.querySelector(`${navItem.hash}`);
        const headerOffset = header.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition
        });
    })
}