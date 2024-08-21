document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const viewModeSelect = document.getElementById('view-mode');
    const searchBreedSelect = document.getElementById('search-breed');
    const searchSizeSelect = document.getElementById('search-size');
    const searchBtn = document.getElementById('search-btn');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const albumList = document.getElementById('album-list');

    // Simulación de datos de usuario
    const user = {
        name: "Yulian Gaitan",
        avatar: "https://images.pexels.com/photos/237900/pexels-photo-237900.jpeg",
        albums: ["Cachorros", "Favoritos", "Perros Grandes"]
    };

    // Función para cargar el perfil de usuario
    function loadUserProfile() {
        userName.textContent = user.name;
        userAvatar.src = user.avatar;
        user.albums.forEach(album => {
            const li = document.createElement('li');
            li.textContent = album;
            albumList.appendChild(li);
        });
    }

    // Cargar el perfil de usuario al iniciar
    loadUserProfile();

    // Función para cambiar entre modos de visualización
    viewModeSelect.addEventListener('change', function() {
        const mode = viewModeSelect.value;
        gallery.className = '';
        gallery.classList.add(mode);
    });

    // Cargar el modo de visualización inicial
    gallery.classList.add('mosaic');

    // Función para realizar la búsqueda avanzada
    searchBtn.addEventListener('click', function() {
        const breed = searchBreedSelect.value;
        const size = searchSizeSelect.value;
        console.log(`Buscando imágenes de raza: ${breed}, tamaño: ${size}`);
        
        // Aquí se añadiría la lógica para realizar la búsqueda utilizando la API de Dog CEO
        fetchDogs(breed, size);
    });

    // Función para obtener imágenes de perros de la API de Dog CEO
    function fetchDogs(breed = 'all', size = 'all') {
        const url = `https://dog.ceo/api/breeds/image/random/10`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = ''; // Limpiar galería
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = 'Imagen de perro';
                    const div = document.createElement('div');
                    div.classList.add('gallery-item');
                    div.appendChild(img);
                    gallery.appendChild(div);
                });
            })
            .catch(error => console.error('Error al obtener imágenes:', error));
    }

    // Llamada inicial para cargar imágenes
    fetchDogs();
});
