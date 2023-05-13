# Gerenciador de Pedidos

## Descrição

Consiste em um gerenciador de pedidos, onde será lido dois tipos de arquivos, arquivos de Pedidos e arquivos de Notas, assim verificando se o Pedido encontra-se pendente ou não. Para que o pedido seja considerado pendente a soma de quantidade de produtos das notas for diferente da quantidade de produtos de Pedidos.

## Como executar o projeto

Para esexutar o projeto, basta rodar no terminal

```bash
#Rodando o app.js:
> node app.js
```

## Observações

No entrypoint app.js alguns erros que estão sendo lançados nas validações das notas e dos pedidos, estão sendo logados apenas para exibição. O ideal seria temos uma instância de um objeto, por exemplo, logger que pudesse salvar registro em uma ferramenta de monitoramento, que pudesse alertar aos desenvolvedores dos erros ocorridos.
