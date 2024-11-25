import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async (req , res) => {  // criando os usuarios com metodo post json
    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name,
        }
    })

    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res ) => {  // listando os usuarios metodo get
    
    const users = await prisma.user.findMany()

        res.status(200).json(users)
    }   
)

app.put('/usuarios/:id', async (req , res) => {  // criando os usuarios com metodo post json

    await prisma.user.update({
        where: { id: req.params.id },

        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name,
        }
    })

    res.status(201).json(req.body)

})


app.delete('/usuarios/:id', async (req , res) => {  // criando os usuarios com metodo post json

    await prisma.user.delete({
        where: { id: req.params.id }
    })

    res.status(200).json({ message: 'Usuario Deletado '})

})


app.listen(3000)


