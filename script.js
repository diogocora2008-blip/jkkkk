document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternância de Tema Light/Dark Mode
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-bs-theme');
        if (currentTheme === 'light') {
            body.setAttribute('data-bs-theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.setAttribute('data-bs-theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // 2. Pesquisa em Tempo Real (Real-time Filter)
    const searchInput = document.getElementById('searchInput');
    const tableSections = document.querySelectorAll('.table-section');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        tableSections.forEach(section => {
            const text = section.innerText.toLowerCase();
            if (text.includes(term)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // 3. Inicialização do Panzoom.js para o modal do DER
    const derImage = document.getElementById('derImage');
    const derModal = document.getElementById('derModal');
    let panzoomInstance = null;

    derModal.addEventListener('shown.bs.modal', () => {
        if (!panzoomInstance) {
            panzoomInstance = Panzoom(derImage, {
                maxScale: 5,
                minScale: 0.5,
                increment: 0.2,
                contain: 'outside'
            });

            derImage.addEventListener('wheel', panzoomInstance.zoomWithWheel);

            document.getElementById('zoomIn').addEventListener('click', () => panzoomInstance.zoomIn());
            document.getElementById('zoomOut').addEventListener('click', () => panzoomInstance.zoomOut());
            document.getElementById('zoomReset').addEventListener('click', () => panzoomInstance.reset());
        }
    });
});
