const express = require("express")
const User = require("../models/userModel")


const router = express.Router()

router.post("/", async (req, res) => {
    const { name, email, age } = req.body
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        })
        res.status(201).json(userAdded)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.get("/", async (req, res) => {
    try {
        const showAll = await User.find()
        res.status(200).json(showAll)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        singleUser = await User.findById({_id:id})
        res.status(200).json(singleUser)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        singleUser = await User.findByIdAndDelete({_id:id})
        res.status(200).json(singleUser)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.patch("/:id", async (req, res) => {
    const {id} = req.params
    const {name,email,age} = req.body
    try {
        updateUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router