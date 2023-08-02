const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors')

const app = express();


app.use(cors())
app.use(express.json())


const database = {
    users : [
        {
            id : '123',
            name : 'john',
            email : 'john@gmail.com',
            password: 'cookies',
            entries : 0,
            joined : new Date()
        },
        {
            id : '124',
            name : 'johnny',
            email : 'johnny@gmail.com',
            password : 'cook',
            entries : 0,
            joined : new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin',(req,res)=>{

    bcrypt.compare('raja', '$2b$04$dcM62ohj5sbpkUxb/dIkvecKxP/G/wAtX29QEqOKiFGf.jZGeN6gO', function(err, result) {
       console.log('first guess',result);
    });
    bcrypt.compare('raj', '$2b$04$dcM62ohj5sbpkUxb/dIkvecKxP/G/wAtX29QEqOKiFGf.jZGeN6gO', function(err, result) {
        console.log('second guess',result);
    });

    const{email,password} = req.body;
    if((email === database.users[0].email) && (password === database.users[0].password))
    {
        res.json(database.users[0]);
    }
    else{
        res.json(req.body);
        res.status(400).json('error logging in')
    }

})

app.post("/register",(req,res) => {
    const {email,name,password} = req.body;
    // bcrypt.hash(password,1, function(err, hash) {
    //     console.log(hash);
    // });
    database.users.push(
        {
            id : '125',
            name : name,
            email : email,
            password : password,
            entires : 0,
            joined : new Date()
        },
    )
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    let found = false;
    const {id} = req.params;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('Not found');
    }
    
})

app.put('/image', (req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('Not found');
    }
})

app.listen(3000,() => {
    console.log("Server Started");
})


