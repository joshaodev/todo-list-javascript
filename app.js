'use strict'

/* Banco de dados */
let bancoDados = [
    { 'tarefa': 'Aprender DEsign Gráfico', 'status': '' },
    { 'tarefa': 'Aprender Web dev', 'status': 'task-checked' }
]

/* Usando o localstorage (armazenar os dados localmente no Browser) para guardar o BD */

const criarItem = (tarefa, status = '', indice) => {
    const item = document.createElement('div');
    item.classList.add('task');
    item.innerHTML = `
        <li class="${status}">${tarefa}</li>
        <div class="task-manager">
            <span class="check" data-indice=${indice}>V</span>
            |
            <span class="del" data-indice=${indice}>U</span>
        </div>  
    `
    document.getElementById('taskContainer').appendChild(item);
}

/* Usado para limpar a tela, e evitar que os dados sejam repetidos, caso 
    a função 'actualizarTela' seja chamada varias vezes.
*/
const limparTarefas = () => {
    const taskContainer = document.getElementById('taskContainer')
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.lastChild);
    }
}

/* Procura cada dados do banco e adiciona na tela, mas antes limpa os dados
    que estavam renderizados na tela.
 */
const actualizarTela = () => {
    limparTarefas();
    bancoDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}


const inserirTarefa = (evento) => {
    const texto = evento.target.value
    const tecla = evento.key;
    if (tecla == 'Enter') {
        bancoDados.push({ 'tarefa': texto, 'status': '' })
        evento.target.value = ''
        actualizarTela();
    }
}

const checarItem = (indice) => {
    bancoDados[indice].status = bancoDados[indice].status == '' ? 'task-checked' : '';

}

const removerItem = (indice) => {
    bancoDados.splice(indice, 1);
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log(elemento.type);
    console.log(elemento.classList.value);
    //if (elemento.type  === 'span') {
    console.log('true')
    const indice = elemento.dataset.indice;
    if (elemento.classList.value == 'check') {
        checarItem(indice);
    }
    else if (elemento.classList.value == 'del') {
        console.log('true')
        removerItem(indice);
    }
    actualizarTela();
    //}
}

actualizarTela();
document.getElementById('newTask').addEventListener('keypress', inserirTarefa);
document.getElementById('taskContainer').addEventListener('click', clickItem);