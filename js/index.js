document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById('submit_webinar_form').addEventListener('submit', function (event){
        event.preventDefault();
        /// URL BASE DE DATOS, por comodida se usa local y no se generan archivos para la base de datos
        const url='https://ng-recipe-book-92934.firebaseio.com/attendees.json';

        /// Muestra de Modal y pantalla gris.
        document.getElementById('screen_grey').classList.toggle('fullscreen');
        document.getElementById('screen_grey').style.zIndex = "1";
        document.body.style.overflow = "hidden";
        document.getElementById('modal_submit').classList.toggle('hidden');
        document.getElementById('modal_submit').classList.toggle('animate_blur');
        document.getElementById('modal_submit').style.zIndex = "1";
        /// Armado de objetos a guardar en local storage
        // No revisa que el mail ya este registrado
        let htmlForm = document.getElementById('submit_webinar_form');
        let formData = new FormData(htmlForm);
        let newAttendant = {}
        formData.forEach( (elem,index) => {
            newAttendant[index] = elem;
        })

        let localData = localStorage.getItem('webinar_attendant');
        let newData = [];
        if (!!localData){
            let editedData = [...JSON.parse(localData), newAttendant];
            newData = JSON.stringify(editedData);
            fetch(url, {
                "method": 'POST', // http Method
                "mode": "no-cors",
                "body": JSON.stringify(newAttendant), // data can be `string` or {object}!
                "headers":{
                  'Content-Type': 'application/json'
                }
              }).then(res => localStorage.setItem('webinar_attendant',newData))
              .catch(error =>{/*Procesar el error, por ej: mandando mensaje a modal */ console.log(error); })
        } else{
            newData = JSON.stringify([newAttendant]);
            localStorage.setItem('webinar_attendant',newData)
        }

        this.reset();
    });

    
});

function closeModal(){
    document.getElementById('screen_grey').classList.toggle('fullscreen');
    document.getElementById('modal_submit').classList.toggle('hidden');
    document.getElementById('modal_submit').classList.toggle('animate_blur');
    document.getElementById('screen_grey').style.zIndex = "-1";
    document.getElementById('modal_submit').style.zIndex = "-1";
    document.body.style.overflow = "visible";
}