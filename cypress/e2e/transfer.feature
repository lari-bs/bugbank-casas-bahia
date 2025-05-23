#language: pt
@transfer @all
Funcionalidade: Transferência

  Cenário: Deve realizar transferência de valor entre contas com sucesso
    Dado que faço login em conta com saldo
    Quando faço uma transferência entre contas
    E preencho com uma conta válida
    Então transferência acontece com sucesso

  Cenário: Não deve realizar transferência para uma conta inexistente
    Dado que faço login em conta com saldo
    Quando faço uma transferência entre contas
    E preencho com uma conta inválida
    Então transferência não deve ser realizada

  Cenário: Deve realizar transferência de valor entre contas com sucesso e saldos atualizados
    Dado que faço login em conta com saldo
    Quando faço uma transferência entre contas
    E preencho com uma conta válida
    Então transferência acontece com sucesso
    E saldo atual é o saldo antigo - valor da transferência na conta origem
    E saldo atual é o saldo antigo + valor da transferência na conta destino

