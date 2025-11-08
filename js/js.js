const url = 'https://pokeapi.co/api/v2/pokemon/'

const cant = 4;

let preguntas = ['sprite','types',
    'letra', 'id'
];

let preg = ['Quizá necesites una ayuda visual...', 'Tipo/s', 'Empieza con la letra:', 'Pokedex:']

let input = document.getElementById('input');

let btnpista = document.getElementById('pista');

let pokemon = document.getElementById('respuesta');
pokemon.innerHTML = '<img id="img" class="opaci imagen" src="https://i.redd.it/td4wgilvnjp61.jpg">';
let btncant = document.getElementById('try');

let contad = document.getElementById('contador');

let contenedor = document.getElementById('contenedorinput');

document.addEventListener('DOMContentLoaded',()=>{
let conta = 0;
//voy a hacer una funcion con esto, si se emboca que vuelva a buscar un numero.
    function juego(conta){
        contad.innerText = conta;
        btncant.innerText = cant;
        let numero = Math.floor(Math.random()*1000 + 1);
        console.log(numero);
        let intentos = 4;
        setTimeout(()=>{
            pokemon.innerHTML = '<img id="img" class="opaci imagen" src="https://i.redd.it/td4wgilvnjp61.jpg">';
        },3000);
        fetch(url+numero)
            .then(response=> {
                if(!response.ok){
                    throw new Error('Error en la respuesta');
                }
                return response.json();
            })
            .then(data =>{
                setTimeout(()=>{
                    btnpista.innerText = preg[intentos-1] +' '+data[preguntas[intentos-1]];
                },1500);
                let nombre = data.name;
                console.log(data);
                console.log(data[preguntas[3]]);
            
                input.addEventListener('keydown', (e)=>{
                    if(e.key == 'Enter'){
                        if (input.value.toLowerCase().trim() == nombre){
                            conta++;
                            document.getElementById('img').src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`;
                            input.remove();
                            input = document.createElement('input');
                            input.id = 'input';
                            input.placeholder = 'Escribí tu Pokémon';
                            contenedor.appendChild(input);
                            return (juego(conta));
                        } else {
                            input.value = '';
                            intentos = intentos - 1;
                            let pista;
                            switch(preguntas[intentos-1]){
                                case 'sprite':
                                    pista = '';
                                    break;
                                case 'types':
                                    pista = data.types.map(t=>t.type.name).join(', ');
                                    break;
                                case 'letra':
                                    pista = data.name[0].toUpperCase();
                                    break;
                                case 'id':
                                    pista = data.id;
                                    break;
                            }
                            btnpista.innerText = preg[intentos-1] +' '+ pista;
                            btncant.innerText = intentos;
                        }
                    }
                    if(intentos == 1){
                        document.getElementById('img').src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`;
                    } 
                    if (intentos == 0){
                        alert('Se terminó el juego.')
                        return;
                    }
                });

            })
        }
        juego(conta);
        

});

