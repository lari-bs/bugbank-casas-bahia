#language: pt
@withdraw @all
Funcionalidade: Saque

  Cenário: Não deve realizar saque de valor maior que o saldo disponível
    Dado que faço login em conta com saldo
    Quando faço um saque da conta
    E o valor do saque é maior que o saldo disponível
    Então alerta informando que o valor do saque é maior que o saldo da conta é exibido

  Cenário: Não deve realizar saque sem saldo na conta
    Dado que faço login em conta sem saldo
    Quando faço um saque da conta
    Então alerta informando que o valor do saque é maior que o saldo da conta é exibido