function mostrarCampos() {
    var tipo = document.getElementById("tipo").value;
  
    var camposEstudiante = document.getElementById("camposEstudiante");
    var camposProfesor = document.getElementById("camposProfesor");
  
    if (tipo === "estudiante") {
      camposEstudiante.style.display = "block";
      camposProfesor.style.display = "none";
    } else if (tipo === "profesor") {
      camposEstudiante.style.display = "none";
      camposProfesor.style.display = "block";
    } else {
      camposEstudiante.style.display = "none";
      camposProfesor.style.display = "none";
    }
  }

let listaUsuarios = [];

const objUsuario = {
    id: '',
    nombre: '',
    correo: '',
    dni: '',
    tipo: ''
}

// pte campos que se habilitan segun el tipo

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreinput = document.querySelector('#nombre');
const correoinput = document.querySelector('#correo');
const dniInput = document.querySelector('#dni');
const tipoSelect = document.querySelector('#tipo');
const btnAgregar = document.querySelector("#btnAgregar");

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreinput.value == ''|| correoinput.value == '' || dniInput.value == '' || tipoSelect.value == ''){
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando){
        editarUsuario();
        editando = false;
    }else{
        objUsuario.id = Date.now();
        objUsuario.nombre = nombreinput.value;
        objUsuario.correo = correoinput.value;
        objUsuario.dni = dniInput.value;
        objUsuario.tipo = tipoSelect.value;

        // Asignar campos específicos según el tipo
        if (objUsuario.tipo === "estudiante") {
            objUsuario.codigo = document.getElementById("codigo").value;
            objUsuario.programa = document.getElementById("programa").value;
            objUsuario.profesion = null;
            objUsuario.tarjetaProfesional = null;
        } else if (objUsuario.tipo === "profesor") {
            objUsuario.profesion = document.getElementById("profesion").value;
            objUsuario.tarjetaProfesional = document.getElementById("tarjetaProfesional").value;
            objUsuario.codigo = null;
            objUsuario.programa = null;
        }


        agregarUsuario();
    }
}

function agregarUsuario(){
    listaUsuarios.push({...objUsuario});
    mostrarUsuarios();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objUsuario.id = '';
    objUsuario.nombre = '';
    objUsuario.correo = '';
    objUsuario.dni = '';
    objUsuario.tipo = '';
}

function mostrarUsuarios(){

    limpiarHTML();

    const divUsuarios = document.querySelector('.div-usuarios');

    listaUsuarios.forEach( usuario =>{
        const {id, dni, nombre, correo, tipo} = usuario;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - DNI: ${dni} - ${nombre} - ${correo} - Tipo: ${tipo}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarUsuario(usuario);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarUsuario(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divUsuarios.appendChild(parrafo);
        divUsuarios.appendChild(hr);
    });
    
}

function cargarUsuario(usuario){
    const {id, dni, nombre, correo} = usuario;
    dniInput.value = dni;
    nombreinput.value = nombre;
    correoinput.value = correo;
    tipoSelect.value = tipo;
    

    objUsuario.id = id;

    formulario.querySelector('button[type="submit"]').textContent ='Actualizar';
    editando = true;
}

function editarUsuario(){
    objUsuario.dni = dniInput.value;
    objUsuario.nombre = nombreinput.value;
    objUsuario.correo = correoinput.value;
    objUsuario.tipo = tipoSelect.value;

    listaUsuarios.map(usuario =>{
        if(usuario.id == objUsuario.id){
            usuario.dni = objUsuario.dni;
            usuario.nombre = objUsuario.nombre;
            usuario.correo = objUsuario.correo;
            usuario.tipo = objUsuario.tipo;
        }
    });

    limpiarHTML();
    mostrarUsuarios();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent ='Agregar';
    editando = false;
}

function eliminarUsuario(id){
    listaUsuarios = listaUsuarios.filter(usuario => usuario.id !== id);
    limpiarHTML();
    mostrarUsuarios();
}

function limpiarHTML(){
    const divUsuarios = document.querySelector('.div-usuarios');
    while(divUsuarios.firstChild){
        divUsuarios.removeChild(divUsuarios.firstChild);
    }
}



