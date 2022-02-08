const express = require('express')
const routerCustomer = express.Router()
const CustomerDAO = require('../models/customer')

//Getting all
routerCustomer.get('/',async (req,res)=>{
    try{
        const customers = await CustomerDAO.find()
        res.json(customers)
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
})

//Getting one
routerCustomer.get('/:id',getCustomer,(req,res)=>{
   res.send(res.customer)
})

//Creating one
routerCustomer.post('/', async (req,res)=>{
    const customer = new CustomerDAO({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    })

    try{
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//Updating
routerCustomer.patch('/:id',getCustomer, async (req,res)=>{
    if(req.body.name !=null){
        res.customer.name = req.body.name
    }
    if(req.body.phone !=null){
        res.customer.phone = req.body.phone
    }
    if(req.body.email !=null){
        res.customer.email = req.body.email
    }
    try{
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//Deleting
routerCustomer.delete('/:id',getCustomer, async (req,res)=>{
    try{
        await res.customer.remove()
        res.json({message:'Deleted Customer'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getCustomer(req,res,next){
    let customer

    try{
        customer = await CustomerDAO.findById(req.params.id)

        if(customer==null){
            return res.status(404).json({message:'Cannot find customer'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.customer = customer
    next()
}

module.exports = routerCustomer