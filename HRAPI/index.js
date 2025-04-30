const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(reg,res)=>{
    try{
        res.json('WELCOME TO HR API')
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/region',async(reg,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/country',async(reg,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});
app.get('/employee',async(reg,res)=>{
    try{
        const result = await pool.query('select count(employee_id)as total_employees from employees');
        res.json(result.rows)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

const PORT = process.env.PORT || 6005;
app.listen(PORT,() => {
    console.log(`connected Successfully...on PORT ${PORT}`)
});