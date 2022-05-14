'use strict'

/* Banco de dados */
/*let bancoDados = [
    { 'tarefa': 'Aprender DEsign Gráfico', 'status': '' },
    { 'tarefa': 'Aprender Web dev', 'status': 'task-checked' }
]*/

/* Usando o localstorage (armazenar os dados localmente no Browser) 
    setBancoDados -> Define os dados no localstore
    getBancoDados -> Captura os dados do localstore
*/

const setBancoDados = (bancoDados) => {
    localStorage.setItem('listaTarefas', JSON.stringify(bancoDados));
}

const getBancoDados = () => {
    return localStorage.getItem('listaTarefas') ? JSON.parse(localStorage.getItem('listaTarefas')) : [];
}

/* Método para criar uma tarefa (elemento) no HTML */
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

/* Procura cada dados do "banco" e adiciona na tela, mas antes limpa os dados
    que estavam renderizados na tela.
 */
const actualizarTela = () => {
    limparTarefas();
    const bancoDados = getBancoDados();
    bancoDados.forEach((item, indice) => {
        criarItem(item.tarefa, item.status, indice);
    });
}

/* Captura o dado da caixa de texto, e adiciona ao banco de dados.  */
const inserirTarefa = (evento) => {
    const texto = evento.target.value
    const tecla = evento.key;
    if (tecla == 'Enter') {
        const bancoDados = getBancoDados();
        bancoDados.push({ 'tarefa': texto, 'status': '' }) /* Define a estrutura a armazenar -> {'tarefa':'tarefa', 'status':'status'} */
        setBancoDados(bancoDados);
        evento.target.value = ''
        actualizarTela();
    }
}

/* Actualiza o estado checkado da tarefa, e modifica no banco de dados */
const checarItem = (indice) => {
    const bancoDados = getBancoDados();
    bancoDados[indice].status = bancoDados[indice].status == '' ? 'task-checked' : '';
    setBancoDados(bancoDados);
}

/* Remove a tarefa do banco de dados */
const removerItem = (indice) => {
    const bancoDados = getBancoDados()
    bancoDados.splice(indice, 1);
    setBancoDados(bancoDados)
}

/* Verifica qual elemento(através da sua classe) da tarefa foi clicado */
const clickItem = (evento) => {
    const elemento = evento.target;
    const indice = elemento.dataset.indice;
    if (elemento.classList.value == 'check') {
        checarItem(indice);
    }
    else if (elemento.classList.value == 'del') {
        removerItem(indice);
    }
    actualizarTela();
}


/* Funções(chamadas a cada actualização do browser) e Listeners */
actualizarTela();
document.getElementById('newTask').addEventListener('keypress', inserirTarefa);
document.getElementById('taskContainer').addEventListener('click', clickItem);