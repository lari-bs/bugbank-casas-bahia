#language: pt
@login @all
Funcionalidade: Login

  Cenário: Deve cadastrar usuário com sucesso
    Dado que acesso a tela de registro de usuário
    Quando cadastrar o usuário "email@teste.com", "nome", "senha"
    Então o usuário é cadastrado com sucesso

  Cenário: Deve mostrar alertas ao tentar fazer login com dados inválidos
    Dado que acesso a tela de login
    Quando utilizar dados inválidos
    Então alerta de dados inválidos é exibida

  Cenário: Não deve cadastrar usuário com dados inválidos
    Dado que acesso a tela de registro de usuário
    Quando cadastrar o usuário inválido
    Então alerta de email inválido é exibido
