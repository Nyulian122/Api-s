document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const viewModeSelect = document.getElementById('view-mode');
    const searchBreedSelect = document.getElementById('search-breed');
    const searchSizeSelect = document.getElementById('search-size');
    const searchBtn = document.getElementById('search-btn');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const albumList = document.getElementById('album-list');
    const createAlbumBtn = document.getElementById('create-album-btn');

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

    // Función para llenar el menú de razas
    function loadBreeds() {
        const url = `https://dog.ceo/api/breeds/list/all`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const breeds = data.message;
                searchBreedSelect.innerHTML = '<option value="all">Todas</option>'; // Añadir opción "Todas" al inicio

                // Añadir razas al menú desplegable
                for (const breed in breeds) {
                    if (breeds.hasOwnProperty(breed)) {
                        if (breeds[breed].length === 0) {
                            // Razas que no tienen sub-razas
                            const option = document.createElement('option');
                            option.value = breed;
                            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                            searchBreedSelect.appendChild(option);
                        } else {
                            // Razas que tienen sub-razas
                            breeds[breed].forEach(subBreed => {
                                const option = document.createElement('option');
                                option.value = `${breed}-${subBreed}`;
                                option.textContent = `${breed.charAt(0).toUpperCase() + breed.slice(1)} ${subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}`;
                                searchBreedSelect.appendChild(option);
                            });
                        }
                    }
                }
            })
            .catch(error => console.error('Error al obtener las razas:', error));
    }

    // Llamada inicial para llenar el menú de razas
    loadBreeds();

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
        
        // Aquí se añade la lógica para realizar la búsqueda utilizando la API de Dog CEO
        fetchDogs(breed, size);
    });

    // Función para obtener imágenes de perros de la API de Dog CEO
    function fetchDogs(breed = 'all', size = 'all') {
        let url = 'https://dog.ceo/api/breeds/image/random/10';

        // Añadir el filtro de raza si se ha seleccionado una
        if (breed !== 'all') {
            // Si la raza es específica (p.ej., "bulldog" o "labrador-retriever"), construir la URL para esa raza
            url = `https://dog.ceo/api/breed/${breed}/images/random/10`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = ''; // Limpiar galería
                if (data.status === 'success' && data.message) {
                    data.message.forEach(imageUrl => {
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.alt = 'Imagen de perro';
                        const div = document.createElement('div');
                        div.classList.add('gallery-item');
                        div.appendChild(img);
                        gallery.appendChild(div);
                    });
                } else {
                    gallery.innerHTML = '<p>No se encontraron imágenes para la raza seleccionada.</p>';
                }
            })
            .catch(error => console.error('Error al obtener imágenes:', error));
    }

    // Llamada inicial para cargar imágenes
    fetchDogs();

    // Función para crear un nuevo álbum
    createAlbumBtn.addEventListener('click', function() {
        const albumName = prompt("Ingrese el nombre del nuevo álbum:");
        if (albumName && albumName.trim() !== "") {
            user.albums.push(albumName.trim());
            const li = document.createElement('li');
            li.textContent = albumName;
            albumList.appendChild(li);
        }
    });
});
