// Execute na raiz do repositório:
// node exemplos.js

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== Map: dobrar os pares e manter os ímpares ===");

const numerosComParesDobrados = nums.map((num) => {
  if (num % 2 === 0) {
    return num * 2;
  }

  return num;
});

console.log(numerosComParesDobrados); // [1, 4, 3, 8, 5, 12, 7, 16, 9, 20]
console.log("Original:", nums); // Continua com os números de 1 a 10.

console.log("=== Spread: copiar e combinar arrays ===");

const copiaNums = [...nums];
console.log("Cópia:", copiaNums);
console.log("É o mesmo array?", copiaNums === nums); // false

copiaNums[0] = 100;
console.log("Primeiro número da cópia:", copiaNums[0]); // 100
console.log("Primeiro número do original:", nums[0]); // 1

const numerosComExtras = [0, ...nums, 11];
console.log("Com novos elementos:", numerosComExtras); // 0 a 11

console.log("=== Filter: preços maiores ou iguais a 100 ===");

const produtos = [
  { id: 1, nome: "Produto 1", preco: 80 },
  { id: 2, nome: "Produto 2", preco: 120 },
  { id: 3, nome: "Produto 3", preco: 60 },
  { id: 4, nome: "Produto 4", preco: 100 },
  { id: 5, nome: "Produto 5", preco: 150 }
];

// A callback retorna um booleano que decide se cada produto entra no resultado.
const precoMaiorOuIgualACem = produtos.filter((produto) => produto.preco >= 100);

console.log(precoMaiorOuIgualACem); // Produtos de IDs 2, 4 e 5.
console.log("Quantidade no original:", produtos.length); // 5
console.log("Quantidade selecionada:", precoMaiorOuIgualACem.length); // 3
console.log("É o mesmo objeto do original?", precoMaiorOuIgualACem[0] === produtos[1]); // true

console.log("=== Combinar filter e map ===");

const apenasParesDobrados = nums
  .filter((num) => num % 2 === 0)
  .map((num) => num * 2);

console.log(apenasParesDobrados); // [4, 8, 12, 16, 20]

console.log("=== Spread de array: cópia rasa ===");

const copiaProdutos = [...produtos];
console.log("É o mesmo array?", copiaProdutos === produtos); // false
console.log("É o mesmo primeiro objeto?", copiaProdutos[0] === produtos[0]); // true

// Exemplo separado para demonstrar a alteração de um objeto compartilhado.
const itensOriginais = [{ nome: "Item de exemplo" }];
const itensCopiados = [...itensOriginais];

itensCopiados[0].nome = "Item alterado";
console.log("Nome no original:", itensOriginais[0].nome); // Item alterado
console.log("Nome na cópia:", itensCopiados[0].nome); // Item alterado

console.log("=== Map com novos objetos e spread de objeto ===");

const produtosReajustados = produtos.map((produto) => ({
  ...produto,
  preco: produto.preco + 10
}));

console.log("Novos preços:", produtosReajustados.map((produto) => produto.preco)); // [90, 130, 70, 110, 160]
console.log("Preços originais:", produtos.map((produto) => produto.preco)); // [80, 120, 60, 100, 150]
console.log("É o mesmo primeiro objeto?", produtosReajustados[0] === produtos[0]); // false
// O spread de objeto também é raso: valores aninhados continuariam compartilhados.
