"use strict";
class Movie {
    constructor(title, year, genre, rating) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.rating = rating;
    }
}
let movies = [];
// Obtener elementos del DOOM
const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");
const genreInput = document.getElementById("genreInput");
const ratingInput = document.getElementById("ratingInput");
const addBtn = document.getElementById("addBtn");
const movieTableBody = document.getElementById("movieTableBody");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
// Funcion para renderizar las tablas
function renderTable(filteredMovies = movies) {
    movieTableBody.innerHTML = "";
    filteredMovies.forEach((movie, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.year}</td>
      <td>${movie.genre}</td>
      <td>${movie.rating}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editMovie(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteMovie(${index})">Eliminar</button>
      </td>
    `;
        movieTableBody.appendChild(row);
    });
}
// Agregar las película
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const year = parseInt(yearInput.value);
    const genre = genreInput.value.trim();
    const rating = parseInt(ratingInput.value);
    // Validaciones
    if (!title) {
        alert("El título es obligatorio.");
        return;
    }
    if (isNaN(year) || year < 1900) {
        alert("Ingresa un año válido.");
        return;
    }
    if (!genre) {
        alert("El género es obligatorio.");
        return;
    }
    if (isNaN(rating) || rating < 1 || rating > 10) {
        alert("El rating debe estar entre 1 y 10.");
        return;
    }
    // Agregar a la lista
    movies.push(new Movie(title, year, genre, rating));
    renderTable();
    // Limpiar el inputs
    titleInput.value = "";
    yearInput.value = "";
    genreInput.value = "";
    ratingInput.value = "";
});
// Editar la película
window.editMovie = (index) => {
    const movie = movies[index];
    titleInput.value = movie.title;
    yearInput.value = movie.year.toString();
    genreInput.value = movie.genre;
    ratingInput.value = movie.rating.toString();
    // Cambiar el boton a "Guardarr"
    addBtn.textContent = "Guardar cambios";
    addBtn.classList.replace("btn-success", "btn-primary");
    addBtn.onclick = () => {
        movie.title = titleInput.value.trim();
        movie.year = parseInt(yearInput.value);
        movie.genre = genreInput.value.trim();
        movie.rating = parseInt(ratingInput.value);
        renderTable();
        // Resetear los botosn
        addBtn.textContent = "Agregar";
        addBtn.classList.replace("btn-primary", "btn-success");
        addBtn.onclick = null;
        addBtn.addEventListener("click", () => { });
    };
};
// Eliminar pelicula
window.deleteMovie = (index) => {
    if (confirm("¿Seguro que deseas eliminar esta película?")) {
        movies.splice(index, 1);
        renderTable();
    }
};
// Buscar la peliula
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    renderTable(filtered);
});
renderTable();
