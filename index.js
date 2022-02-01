//instanciamos los objetos con require
require('dotenv').config()
const express=require('express')
const cookieParser = require('cookie-parser');
const cors=require('cors')
const login=require('./controller/login');
const category=require('./controller/category');
const record=require('./controller/record')
const balance=require('./controller/balance')
const app=express()
const port=process.env.HOST
app.use(cookieParser());
app.use(express.json())
app.use(cors())
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.post("/api/v1/login/signup",login.signup)
app.post("/api/v1/login",login.signin)
app.post("/api/v1/category",category.createCategory)
app.get("/api/v1/category",category.getCategory)
app.get("/api/v1/home/balance/:userID",balance.balance)
app.get("/api/v1/home/latest/:userID",balance.latestRecords)
app.post("/api/v1/record",record.createRecords)
app.post("/api/v1/record/type/",record.type)
app.get("/api/v1/record/category/:id",record.getCategory)
app.put("/api/v1/record/update",record.updateRecord)
app.delete("/api/v1/record/delete",record.deleteRecord)
app.post("/api/v1/record/get",record.getRecord)
app.listen(port,()=>{console.log(`server init in port:${port}`)})