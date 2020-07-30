var novaTarefa = document.querySelector("#novaTarefa");
var botaoAdd = document.querySelector("#adiciona");
var tarefasIncompletas = document.querySelector("#tarefasIncompletas");
var tarefasCompletadas = document.querySelector("#tarefasCompletas");

var criarNovoElementoTarefa = function(tarefaTexto){
    var novoItem = document.createElement("li");
    var novoCheckbox = document.createElement("input");
    var novaLabel = document.createElement("label");
    var novoEditInput = document.createElement("input");
    var novoEditBtt = document.createElement("button");
    var novoDeleteBtt = document.createElement("button");

    novaLabel.innerText = tarefaTexto;

    novoCheckbox.type = "checkbox";
    novoEditInput.type = "text";

    novoEditBtt.innerText = "Editar";
    novoEditBtt.className = "edit";
    novoDeleteBtt.innerText = "Apagar";
    novoDeleteBtt.className = "delete";

    novoItem.appendChild(novoCheckbox);
    novoItem.appendChild(novaLabel);
    novoItem.appendChild(novoEditInput);
    novoItem.appendChild(novoEditBtt);
    novoItem.appendChild(novoDeleteBtt);
    return novoItem;
}

var criaNovaTarefa = function(){
    console.log("Adicionando tarefa");
    var novoItem = criarNovoElementoTarefa(novaTarefa.value);

    tarefasIncompletas.appendChild(novoItem);
    bindTaskEvents(novoItem, tarefaCompleta);
    novaTarefa.value = "";

}

var editarTarefa = function(){
    console.log("Editando Tarefa");
    console.log("Mudando 'editar' pra 'salvar'");

    var novoItem = this.parentNode;
    
    var editInput = novoItem.querySelector('input[type=text]');
    var label = novoItem.querySelector("label");
    var botao = novoItem.querySelector("button");
    var containsClass=novoItem.classList.contains("editMode");

    if(containsClass){
        label.innerText = editInput.value;
        botao.innerText = "Editar";
        
        
    }else{
        editInput.value = label.innerText;
        botao.innerText = "Salvar";
    }

    novoItem.classList.toggle("editMode");
}

var apagarTarefa = function(){
    console.log("Apagando tarefa");

    var novoItem = this.parentNode;
    var ul = novoItem.parentNode;

    ul.removeChild(novoItem);
}

var tarefaCompleta = function(){
    console.log("Tarefa feita");

    var novoItem = this.parentNode;
    tarefasCompletadas.appendChild(novoItem);
    bindTaskEvents(novoItem, tarefaCompleta);
}

var tarefaIncompleta = function(){
    console.log("Tarefa incompleta");

    var novoItem = this.parentNode;
    tarefasIncompletas.appendChild(novoItem);
    bindTaskEvents(novoItem, tarefaIncompleta);
}

var ajaxRequest = function(){
    console.log("AJAX REQUEST");
}

//botaoAdd.onclick = criaNovaTarefa;
botaoAdd.addEventListener("click", criaNovaTarefa);
botaoAdd.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskItemList, checkBoxEventHandler){
    console.log("bind lista de eventos");

    var checkBox = taskItemList.querySelector("input[type=checkbox]");
    var editButton = taskItemList.querySelector("button.edit");
    var deleteButton = taskItemList.querySelector("button.delete");

    editButton.onclick = editarTarefa;
    deleteButton.onclick = apagarTarefa;

    checkBox.onchange = checkBoxEventHandler;
}

for(var i=0; i < tarefasIncompletas.children.length; i ++){
    bindTaskEvents(tarefasIncompletas.children[i], tarefaCompleta);
}

for(var i=0; i < tarefasCompletadas.children.length; i++){
    bindTaskEvents(tarefasCompletadas.children[i], tarefaIncompleta)
}


novaTarefa.addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.keyCode === 13){
            criaNovaTarefa();
        }
    })  

