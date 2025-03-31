
//Dados da API

let pais; //nome do pais

let bandeira; //bandeira do pais

let pais_br;

//Dados html

let img = document.getElementById('bandeira'); //IMG onde vai mostrar a bandeira para o cliente

let nome_pais = document.querySelector('h2'); //Resposta do a amostra para saber o nome do País 

let frm = document.querySelector('form'); // Resposta do cliente

let pontuacaoElemento = document.getElementById('pts_jogo'); //Valor do pts

let pontuacao = 0; 

let sort;


document.addEventListener("DOMContentLoaded", () =>{
    sortPais()// pais_en & pais pt
})

function sortPais(){
    //pegar todas as bandeiras
    fetch('https://restcountries.com/v3.1/all')
    //quando chegar os dados, converter em json
    .then(response => response.json())

    //Sorteia um país
    .then(data =>{
        const paisAleatorio = data[Math.floor(Math.random()*data.length)];

        //pegando os dados do JSON
        pais = paisAleatorio.name.common;
        bandeira = paisAleatorio.flags.png;
        pais_br = paisAleatorio.translations.por.common;

        //passando para o html
        img.src = bandeira;
        nome_pais.innerText = pais_br;

    })

}


frm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let resposta_pais = frm.pais.value.trim(); 

    if (resposta_pais === pais_br) { 
        pontuacao += 10;
    } else {
        pontuacao -= 5;
    }

    
    pontuacaoElemento.innerText = pontuacao;

    frm.pais.value = "";
    sortPais()
});
