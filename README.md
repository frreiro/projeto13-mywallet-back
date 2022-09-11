<p align="center">
  <a href="https://github.com/frreiro/projeto13-mywallet-back">
    <img width="200" height="200" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4b0.svg" />
  </a>

  <h3 align="center">
    MyWallet-API
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/frreiro/projeto13-mywallet-back

$ cd projeto13-mywallet-back

$ npm install

$ npm run dev
```

API:

```
- POST /signUp
    - Rota para criar um cadastro
    - headers: {}
    - body: {
        'name': 'Lorem ipsum dolo',
        'email': 'exemple@exemple.com',
        'password': 'password123'
    }
    
- POST /signIn
    - Rota para se logar ao sistema
    - headers: {}
    - body: {
        'email': 'exemple@exemple.com',
        'password': 'password123'
    }
    
- GET /wallet
  - Rota para listar todas as transações e saldo da conta
  - headers: { "Authorization": "Bearer $token" }
  - body: {}
  
- POST /wallet/:method
    - Rota para criar uma transação
    - method = in / out
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        'value': '90.00',
        'description': 'Lorem ipsum dolor sit amet.'
    }
    
- PUT /wallet/:id
    - Rota para atualizar uma transação
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        'value': '90.00',
        'description': 'Lorem ipsum dolor sit amet.'
    }
- DELETE /wallet/:id
    - Rota para deletar uma transação
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
