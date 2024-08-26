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

    const user = {
        name: "Yulian Gaitan",
        avatar: "https://images.pexels.com/photos/237900/pexels-photo-237900.jpeg",
        albums: ["Cachorros", "Favoritos", "Perros Grandes"]
    };


    function loadUserProfile() {
        userName.textContent = user.name;
        userAvatar.src = user.avatar;
        user.albums.forEach(album => {
            const li = document.createElement('li');
            li.textContent = album;
            albumList.appendChild(li);
        });
    }

    loadUserProfile();


    function loadBreeds() {
        const url = `https://dog.ceo/api/breeds/list/all`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const breeds = data.message;
                searchBreedSelect.innerHTML = '<option value="all">Todas</option>'; 

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

    loadBreeds();

    viewModeSelect.addEventListener('change', function() {
        const mode = viewModeSelect.value;
        gallery.className = '';
        gallery.classList.add(mode);
    });

    gallery.classList.add('mosaic');

    searchBtn.addEventListener('click', function() {
        const breed = searchBreedSelect.value;
        const size = searchSizeSelect.value;
        console.log(`Buscando imágenes de raza: ${breed}, tamaño: ${size}`);
        
        fetchDogs(breed, size);
    });

    function fetchDogs(breed = 'all', size = 'all') {
        let url = 'https://dog.ceo/api/breeds/image/random/10';

        if (breed !== 'all') {
            url = `https://dog.ceo/api/breed/${breed}/images/random/10`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = ''; 
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

    fetchDogs();

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
