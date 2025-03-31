//Dados da API

let pais; //nome do pais
let bandeira; //bandeira do pais

//Dados html
let img = document.getElementById('bandeira'); //IMG onde vai mostrar a bandeira para o cliente
let nome_pais = document.querySelector('h2'); //Resposta do a amostra para saber o nome do País 
let botoes = document.querySelectorAll('.button'); // Resposta do cliente
let pontuacaoElemento = document.getElementById('pts_jogo'); //Valor do pts
let pontuacao = 0; 
let nomeButtons = [];//lista para colocar os paises

//.flags.png; caminho da bandeira
//.translations.por.common; caminho para achar o país

document.addEventListener("DOMContentLoaded", () =>{
    sortPais() //pais pt
})

function sortPais(){
    // Limpar lista de nomes de países
    nomeButtons = [];
    
    //pegar todas as bandeiras
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        
        // Sorteia um país correto
        let randomIndex = Math.floor(Math.random() * data.length);
        let paisSorteado = data[randomIndex];

        pais = paisSorteado.translations.por.common; // Nome do país
        bandeira = paisSorteado.flags.png; // URL da bandeira

        // Adiciona o país correto à lista de opções
        nomeButtons.push(paisSorteado);

        while (nomeButtons.length < 4) {
            randomIndex = Math.floor(Math.random() * data.length);
            let opcaoSorteada = data[randomIndex];

            // Garante que não haverá repetição de países
            if (!nomeButtons.includes(opcaoSorteada)) {
                nomeButtons.push(opcaoSorteada);
            }
        }

        // Embaralha as opções de países, incluindo o correto
        nomeButtons.sort(() => Math.random() - 0.5);

        // Atualiza os botões com os nomes sorteados
        botoes.forEach((button, index) => {
            button.textContent = nomeButtons[index].translations.por.common;

            // Remove qualquer ouvinte de evento antigo
            button.removeEventListener("click", handleClick);
            
            // Adiciona evento de clique para verificar a resposta
            button.addEventListener("click", handleClick);
        });

        // Atualiza a bandeira e nome do país no HTML
        img.src = bandeira;
    });
}

// Função para verificar a resposta
function handleClick(event) {
    let botaoClick = event.target.textContent;

    if (botaoClick === pais) {
        pontuacao += 10;
        pontuacaoElemento.innerText = pontuacao;
        pontuacaoElemento.style.color = "#2ECC71";
    } else {
        pontuacao -= 5;
        pontuacaoElemento.innerText = pontuacao;
        pontuacaoElemento.style.color = "#E63946";
    }

    
    // Sorteia um novo país após a resposta
    setTimeout(() => {
        pontuacaoElemento.style.color = "";
        sortPais()
    }, 250);
}
