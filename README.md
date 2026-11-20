# 09 — Map, filter e spread

`map` e `filter` permitem construir novos arrays a partir de um array existente. A sintaxe de espalhamento, chamada de **spread**, permite expandir elementos ou propriedades em outra estrutura.

Nesta aula, usamos números e produtos para comparar transformação, seleção e cópias rasas.

## Callbacks e valores retornados

`map` e `filter` recebem uma função callback. Os três argumentos que ela pode receber são, nessa ordem:

1. O elemento atual.
2. O índice desse elemento.
3. O array original percorrido pelo método.

Não precisamos declarar os três parâmetros quando usamos apenas o elemento. O retorno tem papéis diferentes: em `map`, vira um elemento do novo array; em `filter`, decide se o elemento original será incluído.

## Map: transformar valores

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numerosComParesDobrados = nums.map((num) => {
  if (num % 2 === 0) {
    return num * 2;
  }

  return num;
});

console.log(numerosComParesDobrados);
// [1, 4, 3, 8, 5, 12, 7, 16, 9, 20]
```

O operador `%` calcula o resto da divisão. Quando `num % 2 === 0`, o número é par e a callback devolve seu dobro. Para os ímpares, devolve o próprio número.

Portanto, `map` não precisa alterar todos os valores. Nesse exemplo, o novo array continua com dez elementos, incluindo os ímpares originais. O nome `numerosComParesDobrados` descreve esse resultado; ele não contém apenas pares.

## Spread: espalhar elementos

Podemos usar `...` dentro de um novo array para espalhar os elementos de outro:

```js
const copiaNums = [...nums];

copiaNums[0] = 100;
console.log(copiaNums[0]); // 100
console.log(nums[0]); // 1

const numerosComExtras = [0, ...nums, 11];
console.log(numerosComExtras);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```

Spread significa **espalhamento**, não apenas junção ou cópia. Nesses exemplos, ele ajuda a criar uma cópia e a compor um array com elementos adicionais. Alterar uma posição de `copiaNums` não altera aquela posição de `nums`.

## Filter: selecionar elementos

Usaremos os seguintes produtos:

```js
const produtos = [
  { id: 1, nome: "Produto 1", preco: 80 },
  { id: 2, nome: "Produto 2", preco: 120 },
  { id: 3, nome: "Produto 3", preco: 60 },
  { id: 4, nome: "Produto 4", preco: 100 },
  { id: 5, nome: "Produto 5", preco: 150 }
];

const precoMaiorOuIgualACem = produtos.filter(
  (produto) => produto.preco >= 100
);
```

O resultado contém os produtos de IDs **2, 4 e 5**, com preços **120, 100 e 150**, na ordem original. O operador `>=` inclui o preço `100`; não representa uma comparação estritamente maior.

`filter` inclui um elemento quando a callback retorna um valor avaliado como verdadeiro, ou *truthy*. Quando retorna um valor *falsy*, não o inclui. O novo array pode ter menos elementos, todos ou nenhum.

### O retorno do trecho original

O trecho enviado usava `if (produto.preco >= 100) return produto`. Isso funciona: o objeto retornado é truthy. Quando a condição falha, a função termina retornando `undefined`, que é falsy.

Retornar diretamente a comparação, como acima, expressa o critério com um booleano. O valor retornado pela callback **não substitui o produto** no array filtrado.

## Combinando filter e map

```js
const apenasParesDobrados = nums
  .filter((num) => num % 2 === 0)
  .map((num) => num * 2);

console.log(apenasParesDobrados); // [4, 8, 12, 16, 20]
```

Primeiro selecionamos os pares; depois dobramos os valores selecionados. Diferentemente do primeiro exemplo, esse resultado tem cinco elementos e não inclui os ímpares.

## Cópias rasas e objetos compartilhados

Criar outro array não significa copiar profundamente os objetos que ele contém:

```js
const copiaProdutos = [...produtos];

console.log(copiaProdutos === produtos); // false
console.log(copiaProdutos[0] === produtos[0]); // true
```

As listas são diferentes, mas seus elementos apontam para os mesmos objetos. Isso caracteriza uma **cópia rasa**. O array produzido por `filter` também guarda referências aos objetos selecionados.

Podemos observar o compartilhamento em um exemplo separado:

```js
const itensOriginais = [{ nome: "Item de exemplo" }];
const itensCopiados = [...itensOriginais];

itensCopiados[0].nome = "Item alterado";
console.log(itensOriginais[0].nome); // Item alterado
```

Alteramos uma propriedade do objeto compartilhado, não apenas uma posição de uma das listas.

## Criando novos objetos com map e spread

Em `map`, compartilhar ou criar objetos depende do que a callback retorna. Podemos criar um objeto por produto e atualizar seu preço:

```js
const produtosReajustados = produtos.map((produto) => ({
  ...produto,
  preco: produto.preco + 10
}));
```

O spread copia as propriedades, e `preco`, escrito depois, recebe o valor reajustado. Os parênteses permitem retornar o literal de objeto nessa arrow function com retorno implícito.

Os novos preços são **90, 130, 70, 110 e 160**. Os preços originais permanecem **80, 120, 60, 100 e 150**. Cada produto retornado é outro objeto, mas essa cópia também é rasa: se houvesse objetos aninhados, suas referências continuariam compartilhadas.

`map` e `filter` não alteram o array original por si mesmos. Entretanto, suas callbacks podem modificar dados. Retornar um objeto original em `map` também mantém aquela referência; o método não garante cópia profunda nem imutabilidade.

## Organização dos exemplos

No arquivo executável, `nums` é declarado uma única vez. Repetir `const nums` no mesmo escopo ao reunir trechos independentes causa `SyntaxError` e impede a execução.

## Clonar o repositório

```bash
git clone https://github.com/Kalebreus/estudos-js-09-map-filter-spread.git
cd estudos-js-09-map-filter-spread
```

## Executar os exemplos

Com uma versão LTS do [Node.js](https://nodejs.org/) instalada, execute na raiz do repositório:

```bash
node exemplos.js
```

Não é necessário instalar dependências. O arquivo [exemplos.js](exemplos.js) reúne as transformações, filtros, cópias e comparações de referências.

## Para praticar

1. Dobre os ímpares em vez dos pares no primeiro `map`.
2. Troque `>= 100` por `> 100` e compare os produtos selecionados.
3. Adicione outro número ao início ou ao final usando spread.
4. Altere o reajuste para `20` e confira os preços originais.

[Catálogo de estudos](https://github.com/Kalebreus/reposit-rio)
