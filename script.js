//tableau contenant les éléments du localStorage et parsé en JSON
let elementsList = JSON.parse(localStorage.getItem('tasks'));

let task = document.createElement('li');
task.id = 'task';

let pp = document.createElement('p');
pp.id = "pp";
pp.textContent = "NO TASK FOUND";

let img = document.createElement('img');
img.src = "imgs/warn.svg";
img.style.width = 100 + "px";
img.style.height = 100 + "px";
task.appendChild(img);
task.appendChild(pp);

//Fonction qui charge les taches présentes dans le localStorage
function loadElements(){
    let list = document.getElementById("list");
    //vider la liste affichée 
    list.innerHTML = "";

    if(elementsList.length === 0){
        console.log('no task...');
        list.appendChild(task);
    }else{
        for (const elt of elementsList) {
            console.log(elt.name, elt.tag, elt.ok);
    
            //Creation de l'element à ajouter à la liste 
            let listElt = document.createElement('li');
            listElt.id = "list-elt";
    
            //Creation d'un p pour le text
            let p = document.createElement('p');
            p.id = "p";
            p.textContent = elt.name;
    
            //Creation du boutton DEL de l'element
            let delBtn = document.createElement('button');
            delBtn.id = "del-btn";
    
            //Creation du boutton OK de l'element
            let okBtn = document.createElement('button');
            okBtn.id = "ok-btn";
    
            if (elt.ok) {
                listElt.style.textDecoration = "line-through";
                listElt.style.color = "gray";
                okBtn.style.backgroundImage = "url('imgs/checked1.svg')";
                okBtn.style.backgroundColor = "#d6cfff";
                okBtn.style.borderRadius = 5 + 'px';
            }
            
    
            //Ce qui se passe quand on clique sur DEL
            delBtn.onclick = () => {
                let nameToDelete = p.textContent;
                    for(i = 0; i < elementsList.length; i++){
                        if (elementsList[i].name === nameToDelete) {
                            elementsList.splice(i, 1);
                            break; 
                          }
                    }
                    localStorage.setItem('tasks', JSON.stringify(elementsList));
                    
                    list.removeChild(listElt);
            }
    
            //Ce qui se passe quand on clique sur OK
            okBtn.onclick = () => {
                listElt.style.textDecoration = "line-through";
                listElt.style.color = "gray";
                okBtn.style.backgroundImage = "url('imgs/checked1.svg')";
                okBtn.style.backgroundColor = "#d6cfff";
                okBtn.style.borderRadius = 5 + 'px';
    
                //Trouver la tache en question et lui attribuer ok = true
                let nameToFind = p.textContent;
                    for(i = 0; i < elementsList.length; i++){
                        if (elementsList[i].name === nameToFind) {
                            elementsList[i].ok = true;
                            break; 
                          }
                    }
                    localStorage.setItem('tasks', JSON.stringify(elementsList));
            }
    
            listElt.appendChild(okBtn);
            listElt.appendChild(p);
            listElt.appendChild(delBtn);
            
            list.appendChild(listElt);
        }
    }
}

function displayByTags(tag){
    let list = document.getElementById("list");
    list.innerHTML = "";
    //Filtrer la liste de tâches avec la fonction .filter()
    let tasksList = elementsList.filter((element)=>element.tag === tag);
    console.log('recherche...');

    //Verifier la liste de tâches filtrées
    //si elle est vide renvoyer un message
    //sinon afficher la liste des taches ayant ce tag
    if(tasksList.length === 0){
        console.log('no task...');
        list.appendChild(task);
    }else{
        console.log('trouver');
        for(let task of tasksList){
            //Creation de l'element à ajouter à la liste 
            let listElt = document.createElement('li');
            listElt.id = "list-elt";

            //Creation du boutton OK de l'element
            let okBtn = document.createElement('button');
            okBtn.id = "ok-btn";

            //Creation d'un p pour le text
            let p = document.createElement('p');
            p.id = "p";
            p.textContent = task.name;

            //Creation du boutton DEL de l'element
            let delBtn = document.createElement('button');
            delBtn.id = "del-btn";

            //Mettre un trait sur les taches deja faites
            if (task.ok) {
                listElt.style.textDecoration = "line-through";
                listElt.style.color = "gray";
                okBtn.style.backgroundImage = "url('imgs/checked1.svg')";
                okBtn.style.backgroundColor = "#d6cfff";
                okBtn.style.borderRadius = 5 + 'px';
            }

            //Ce qui se passe quand on clique sur DEL
            delBtn.onclick = () => {
                let nameToDelete = p.textContent;
                for(i = 0; i < elementsList.length; i++){
                    if (elementsList[i].name === nameToDelete) {
                        elementsList.splice(i, 1);
                        break; 
                      }
                }
                localStorage.setItem('tasks', JSON.stringify(elementsList));
                
                list.removeChild(listElt);
            }

            //Ce qui se passe quand on clique sur OK
            okBtn.onclick = () => {
                listElt.style.textDecoration = "line-through";
                listElt.style.color = "gray";
                okBtn.style.backgroundImage = "url('imgs/checked1.svg')";
                okBtn.style.borderRadius = 5 + 'px';
                okBtn.style.backgroundColor = "#d6cfff";

                //Trouver la tache en question et lui attribuer ok = true
                let nameToFind = p.textContent;
                for(i = 0; i < elementsList.length; i++){
                    if (elementsList[i].name === nameToFind) {
                        elementsList[i].ok = true;
                        break; 
                    }
                }
                localStorage.setItem('tasks', JSON.stringify(elementsList));
            }

            listElt.appendChild(okBtn);
            listElt.appendChild(p);
            listElt.appendChild(delBtn);
            list.appendChild(listElt);
        }
    }
}


//Permet d'ajouter une tâche à la todoList
function addElement(){
    
    let eltTxt = document.getElementById("elt-txt");
    let eltTag = document.getElementById("elt-tag");

    let eltContent = eltTxt.value;
    let tagContent = eltTag.value;

    //Verifier si la zone de texte contion du texte
    if(eltContent && tagContent){
        elementsList.push({name: eltContent, tag: tagContent, ok: false});
        localStorage.setItem('tasks', JSON.stringify(elementsList));
        
        console.log(eltContent, " ", tagContent);
        console.log(elementsList);

        loadElements();        
    }else{
        alert("Insérez des elements dans les 2 cases!!");
    }   

    //Remise de la valeur de la zone de text à zéro
    eltTxt.value = null;
    eltTag.value = null;

}

//Chargement des tâches présentes dans le localStorage à l'ouverture de la page
loadElements();


let searchTask = document.getElementById('search-task');

//Activer la fonction quand l'utilisateur est sur la barre de recherche
    searchTask.addEventListener("input", (event) => {
        console.log(searchTask.value);
        displayByTags(searchTask.value);
        
    });
  
//Activer dès que l'utilisateur n'est plus sur la barre de recherche
searchTask.addEventListener("blur", (event) => {
    loadElements();
    searchTask.value = "";
    searchTask.style.backgroundColor = "";
});


//Cette partie s'active dès que l'utilisateur clique sur 
//le boutton de recherche
let search = document.getElementById('search');

search.addEventListener('click', () => {
    searchTask.style.display = 'block';
    console.log('BLOCK');
    document.addEventListener('click', hide);
});

//Permet de faire disparaitre la zone de texte
//dès que l'utilisateur passe à autre chose

function hide(event){
    if (event.target !== search && event.target !== searchTask) {
        searchTask.style.display = 'none';
        document.removeEventListener('click', hide);
      }
}