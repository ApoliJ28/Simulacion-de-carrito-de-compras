//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoButton = document.getElementById('vaciar-carrito');
//Listeners

cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona "agregar carrito".
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoButton.addEventListener('click', vaciarCarrito);

    //Al cargar documento, mostrar en local storage

    document.addEventListener('DOMContentLoaded', leerLocalStorage());
}

//Funciones

//Funcion que añade el curso al carrito.
function comprarCurso(e){
    e.preventDefault();

    // Delagation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const  curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCursos(curso);
    }
}

//Lee los datos del curso
function leerDatosCursos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    };
    
    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    let curso, cursoId;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoId);
}

//Elimina los cursos del carrito en el DOM
function vaciarCarrito(e){
    //forma lenta
    //listaCursos.innerHTML = '';
    //forma rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar local storage
    vaciarLocalStorage();

    return false;
}

//almacena cursos en el carrito a local Storage

function guardarCursoLocalStorage(curso){
    let cursos;

    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos',JSON.stringify(cursos));
}

//Comprueba que haya elementos en local storage
function obtenerCursosLocalStorage(curso){
    let cursosLS;

    //comprobamos si hay algo en local storage

    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos')); //Lo convierte en un arreglo
    }
    return cursosLS;
}

//Imprime los cursos de local storage en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}

//Elimina el curso por el ID  en local storage

function eliminarCursoLocalStorage(cursoID){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso, index){
        if(cursoID === curso.id){
            cursosLS.splice(index,1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina todos los cursos de local storage

function vaciarLocalStorage(){
    localStorage.clear();
}