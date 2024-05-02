// const express =require('express');
// const mongoose =require('mongoose');
// const TaskSchema =require('./model.js');

// const app=express();
// mongoose.connect('mongodb+srv://Hari123:Harikrishna@cluster0.sminnku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
//     ()=>console.log(" Data connected")
// )

// app.post('/addtodo', async(req,res)=>{
//     const {todo} = req.body;
//     try{
//         newData= new TaskSchema({
//             todo : todo
//          });
//          await newData.save();
//          return res.json( await TaskSchema.find());
//         }
//     catch(err){
//         console.log(err.message);
//     }
// })

// app.listen(3000,()=>{
//     console.log("server running ..!");
// })

const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model.js'); // Corrected the variable name here
const cors =require('cors');

const app = express();
mongoose.connect('mongodb+srv://Hari123:Harikrishna@cluster0.sminnku.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Data connected"))
    .catch(err => console.error("Connection error:", err)); // Improved error handling for database connection

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin :"*"
}))

app.post('/addtodo', async (req, res) => {
    const { todo } = req.body;
    try {
        const newData = new TaskSchema({ todo }); // Simplified object creation
        await newData.save();
        const todos = await TaskSchema.find(); // Corrected the model name here
        return res.json(todos);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Server error' }); // Sending a 500 error response
    }
});

app.get('/gettask', async (req, res)=>{
    try{
       return res.json( await TaskSchema.find());
    }
    catch(err){
        console.log(err.message);
    }
});

app.delete('/delete/:id', async (req,res)=>{
    try{
       await TaskSchema.findByIdAndDelete(req.params.id);
       return res.json( await TaskSchema.find());
    }
    catch(err){
        console.log(err.message);
    }
});
    
    

const PORT = process.env.PORT || 5000; // Using environment variable for port or defaulting to 6000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
