# Atividade WB-5 

Aplicação web finalizada, feita na materia de POO, consistem em um aplicação onde é possivel fazer o cadastro de clientes, produtos e servicos, alem de ver listagem de acordo com os dados do consumo dos cliente de uma empresa ficticia chamada WorldBeauty.

---

### Para rodar (após o clone):
Crie um banco de dados no mysql e na raiz do projeto o arquivo .env e coloque seus dados assim:
 - DATABASE_URL="mysql://user:senha@localhost:3306/nomedobanco"
```bash
  npm install

  npx prisma generate

  npx prisma migrate dev --name init

  npm run backend
```

e em um outro terminal rode:

```bash
  npm run dev
```

Acesse o site em http://localhost:5173/