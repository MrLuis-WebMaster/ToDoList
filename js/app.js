// variables 
const formulario = document.querySelector("#formulario");
const ListaTareas = document.querySelector("#lista-tareas");
let tareas = [];

// eventos 
Eventos();

function Eventos () {
    // cuando agg nueva tarea
    formulario.addEventListener("submit",AgregarTarea);
    // cuando carga la pagina
    document.addEventListener("DOMContentLoaded", function(){
        tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        CrearHTML();
    })

}


//funciones

function AgregarTarea (e) {
    e.preventDefault();

    const tarea = document.querySelector("#tarea").value;

    if (tarea === ""){
        MostrarError("Debes agregar una tarea");
        return;
    }

    const TareaObj = {
        id: Date.now(),
        tarea
    }
    tareas = [...tareas, TareaObj];
    
    //Crear HTML
    CrearHTML();
    // reiniciar formulario
    formulario.reset();
}

function MostrarError (mensaje) {
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error");
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(error);
    setTimeout(() => {
       error.remove(); 
    }, 3000);
}

function CrearHTML () {

    LimpiarHTML();

    if (tareas.length > 0) {
        tareas.forEach ( tarea => {
            const BtnEliminar = document.createElement("a");
            BtnEliminar.classList.add("borrar-tarea");
            BtnEliminar.textContent = "X";
    
            //Funcion de eliminar
            BtnEliminar.onclick = () => {
                borrarTarea(tarea.id);
            }

 
            const li = document.createElement("li");
            li.textContent = tarea.tarea;
            li.appendChild(BtnEliminar);

            ListaTareas.appendChild(li);
        })
    }
    // Sincronizar el local Storage
    SincronizarStorage();
}

function SincronizarStorage () {
    localStorage.setItem("tareas",JSON.stringify(tareas));
}

function borrarTarea (id) {
    tareas = tareas.filter( tarea => tarea.id !== id);
    CrearHTML();

}

function LimpiarHTML () {
    while (ListaTareas.firstChild) {
        ListaTareas.removeChild(ListaTareas.firstChild);
    }
}
