window.addEventListener("load", (event) => {

    let btn = document.querySelector(".main__btn");
    let notes = document.querySelector(".main__notes");

    btn.addEventListener("click", (e) => {

        //AGREGAR NOTA CUANDO LE DOY CLICK
        createNote("", "", true);
    });



    let createNote = (body = "", title = "", transition = true) => {

        //CREANDO EL HTML DE LA NOTA
        let note = document.createElement("article");
        note.classList.add("notes__note");

        note.innerHTML += `
                    <header class="note__header">
                        <input type="text" class="header__input" value="${title}">
                        <i class="note__icon fa-solid fa-trash"></i>
                    </header>

                    <textarea class="note__body" name="body">${body}</textarea>
        `;

        //ELEMENTOS DEL DOM A UTILIZAR
        let input = note.querySelector(".header__input");
        let textarea = note.querySelector(".note__body");
        let trash = note.querySelector(".note__icon");

        //GUARDAR DATOS DE LA NOTA
        input.addEventListener("input", () => {
            update();
        });

        textarea.addEventListener("input", () => {
            update();
        });

        //ELIMINAR NOTAS DE LA LISTA
        trash.addEventListener("click", (e) => {
            
            note.classList.remove("note--visible-no-transition");
            note.classList.remove("note--visible");

            setTimeout(() => {
                note.remove();
            update();
            }, 310);
            
        });

        //AGREGO NOTA AL CONTENEDOR DE NOTAS
        notes.appendChild(note);

        if(transition){
            setTimeout(() => {
                note.classList.add("note--visible");
            }, 10);
        }else{
            note.classList.add("note--visible-no-transition");
        }
        
    }

    


    let update = () => {
        notesArray = [];
        let notesDom = document.querySelectorAll(".notes__note");


        //RECORRO LAS NOTAS Y GUARDO SUS VALORES EN UN JSON
        notesDom.forEach(noteDom => {
            let noteInput = noteDom.querySelector(".header__input");
            let noteTextarea = noteDom.querySelector(".note__body");

            let note = {
                "title": noteInput.value,
                "body": noteTextarea.value
            };

            if(note.body.trim() != "" || note.title.trim()!= ""){
                notesArray.push(note);
            }
            
        });

        //console.log(notesArray);

        //GUARDAR NOTAS EN LOCALSTORAGE

        localStorage.setItem("notes", JSON.stringify(notesArray));
    }


    //FUNCION PARA QUE SE LISTEN TTODAS LAS NOPTAS DE NUEVO
    let getNotes = () => {
        let notesStorage = JSON.parse(localStorage.getItem("notes"));

        if(notesStorage){
            notesStorage.forEach(note => {
                createNote(note.body, note.title, false);
            });
        }
    }
    getNotes();


});
