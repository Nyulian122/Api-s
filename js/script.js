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
        avatar: "data:image/jpeg;base64,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",
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
