import express from 'express' // Importa o framework Express para criação de APIs
import { PrismaClient } from '@prisma/client' // Importa o cliente do Prisma para interação com o banco de dados
import cors from 'cors'

const prisma = new PrismaClient() // Instancia o cliente do Prisma para realizar operações no banco

const app = express() // Inicializa a aplicação Express
app.use(express.json()) // Configura a aplicação para interpretar o corpo das requisições em JSON
app.use(cors()) // Habilita o CORS para permitir requisições de origens extern

// Rota para criação de usuários usando o método POST
app.post('/usuarios', async (req, res) => {

    // Cria um novo usuário no banco de dados com os dados enviados no corpo da requisição
    await prisma.user.create({
        data: {
            email: req.body.email, // Email do usuário
            age: req.body.age, // Idade do usuário
            name: req.body.name, // Nome do usuário
        }
    })

    // Retorna uma resposta com status 201 (Criado) e os dados enviados
    res.status(201).json(req.body)
})

// Rota para listar todos os usuários usando o método GET
app.get('/usuarios', async (req, res) => {
    //const users = await prisma.user.findMany() // Busca todos os usuários no banco de dados

    let users = [] // Inicializa uma lista vazia para armazenar usuários, caso necessário

    // Verifica se existem parâmetros de consulta na URL e busca usuários com base nesses parâmetros
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name, // Filtro opcional por nome
                age: req.query.age // Filtro opcional por idade
            }
        })
    } else {
        users = await prisma.user.findMany() // Retorna todos os usuários, caso não haja filtros
    }

    res.status(200).json(users) // Retorna uma resposta com status 200 (Sucesso) e a lista de usuários
})

// Rota para atualizar um usuário usando o método PUT
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: { id: req.params.id }, // Especifica qual usuário será atualizado pelo ID fornecido na URL

        data: {
            email: req.body.email, // Atualiza o email do usuário
            age: req.body.age, // Atualiza a idade do usuário
            name: req.body.name, // Atualiza o nome do usuário
        }
    })

    res.status(201).json(req.body) // Retorna uma resposta com status 201 (Atualizado) e os dados atualizados
})

// Rota para deletar um usuário usando o método DELETE
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: { id: req.params.id } // Especifica qual usuário será deletado pelo ID fornecido na URL
    })

    res.status(200).json({ message: 'Usuário Deletado' }) // Retorna uma mensagem de confirmação com status 200 (Sucesso)
})

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000') // Mensagem exibida no console para confirmar que o servidor está em execução
})
