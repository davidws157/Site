/*  Chama o Botão onde esta class ao clicar adiciona */
let carrinhos = document.querySelectorAll('.add-car');  

let produto = [
    {
        name: 'Produto 1',
        tag: 'Produto1',
        preco: 15,
        quantidade: 0
    },
    {
        name: 'Produto 2',
        tag: 'Produto2',
        preco: 20,
        quantidade: 0
    },
    {
        name: 'Produto 3',
        tag: 'Produto3',
        preco: 25,
        quantidade: 0,
    },
    {
        name: 'Produto 4',
        tag: 'Produto4',
        preco: 15,
        quantidade: 0
    },
    {
        name: 'Produto 5',
        tag: 'Produto5',
        preco: 20,
        quantidade: 0
    },
    {
        name: 'Produto 6',
        tag: 'Produto6',
        preco: 25,
        quantidade: 0,
    },
    {
        name: 'Produto 7',
        tag: 'Produto7',
        preco: 15,
        quantidade: 0
    },
    {
        name: 'Produto 8',
        tag: 'Produto8',
        preco: 20,
        quantidade: 0
    },
    {
        name: 'Produto 9',
        tag: 'Produto9',
        preco: 25,
        quantidade: 0,
    },
];
 /* Laço de Repetição que adciona  a quantidade  de produtos ao clickar no Botão */
for (let i=0; i < carrinhos.length; i++) {  
    carrinhos[i].addEventListener('click', () =>{
        carNum(produto[i]);
        valorTotal(produto[i]);
    })
}
/* Chama o icone do Carrinho e classe span que esta nele e se tover alguma contagem Mostra ao Lado do Icone*/
function onLoadcarNum(){
    let produnum = localStorage.getItem('carNum');
    if(produnum){

        document.querySelector('.carrinho span').textContent = produnum;
    }
}

function carNum(produto){

    let produnum = localStorage.getItem('carNum');
    produnum = parseInt(produnum);
      if(produnum){
        localStorage.setItem('carNum', produnum +1);
        document.querySelector('.carrinho span').textContent = produnum + 1;
      }else{
        localStorage.setItem('carNum',1);
        document.querySelector('.carrinho span').textContent = 1;
      }  
    setItems(produto);
}
function setItems(produto){
   let carItems = localStorage.getItem('produtoCarrinho');
   carItems = JSON.parse(carItems);
   if(carItems != null){
       if(carItems[produto.tag] == undefined ){
         carItems= {
             ...carItems,
             [produto.tag]:produto
         }
       }
       carItems[produto.tag].quantidade +=1; 
   }else{
    produto.quantidade = 1;
    carItems = {
        [produto.tag]: produto
   }
    }
    localStorage.setItem("produtoCarrinho", JSON.stringify (carItems) );
}

function valorTotal(produto){
  
   let carValor = localStorage.getItem('valorTotal');
  
   console.log("Mu carrinho é ", carValor);
   console.log(typeof carValor);

   if(carValor != null){
        carValor = parseInt(carValor);
        localStorage.setItem("valorTotal", carValor + produto.preco);
   }else{
        localStorage.setItem("valorTotal", produto.preco);
    }
   }
   
function displayCar(){
    let carItems = localStorage.getItem("produtoCarrinho")
    carItems = JSON.parse(carItems);
    let produtoContainer = document.querySelector(".produtos");
    let carValor = localStorage.getItem('valorTotal');
    console.log(carItems);
    if(carItems && produtoContainer){
        
        produtoContainer.innerHTML='';
        Object.values(carItems).map(item =>{
            produtoContainer.innerHTML += `
            <div class="produto">
                <ion-icon name="close-circle"></ion-icon>
                <img src="img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="preco">
                R$${item.preco},00
            </div>
            <div class="quantidade"> 
                <ion-icon name="arrow-back-circle"></ion-icon>
                 <span>${item.quantidade}</span>
                 <ion-icon name="arrow-forward-circle"></ion-icon>
            </div>
            <div class="total">
               R$${item.quantidade * item.preco},00 
            </div>
            `;
        })
        produtoContainer.innerHTML +=`
            <div class="ValorTotalContainer"<
                <h4 class="ValorTotalTitulo">
                    Valor Total : 
                </h4>
                <h4 class="ValorTotalC">
                    R$ ${carValor},00
                </h4>

        `;
    }
}

onLoadcarNum();
displayCar();