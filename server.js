import express from 'express'


const app = express()
app.use(express.json())

const users = [] //salvando usuarios dentro dessa variavel

app.post('/usuarios', (req , res) => {  // criando os usuarios com metodo post json
    users.push(req.body)
    res.send("deu bom !")

})

app.get('/usuarios', (req, res ) => {  // listando os usuarios metodo get
    res.json(users)
    }   
)

app.listen(3000)


