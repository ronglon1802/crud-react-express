const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const { Console } = require('console');


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test-dev');
        console.log('Connect Successfully');
    } catch (error) {
        console.log(error, 'Connect Failure');
    }
}

connectDb();

app.post('/add', async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        })
        res.json('Them thanh cong')
    } catch (error) {
        console.log(error)
    }
})

app.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users)
})

app.get('/edit/:id', async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    res.json(user)
})

app.patch('/edit/:id', async (req, res) => {

    const updateduser = await User.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender
    });
    res.status(200).json(updateduser);
})

app.delete('/delete/:id', async (req, res) => {
    const deleteData = await User.findOneAndDelete({ _id: req.params.id });
    res.json(deleteData)
})


app.listen(5000, () => {
    console.log('Server is running at Port 5000');
})