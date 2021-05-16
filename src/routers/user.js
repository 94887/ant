const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const async = require('async')
const pg = require('pg')
const router = new express.Router()

router.post('/api/register', async (req, res) => {
    const user = new User(req.body)

    try {

        if(await User.findOne({email: req.body.email})){
            res.json({message: "Email Already Exists"})
        }else{
            if(await User.findOne({uniqueEmployeeId: req.body.uniqueEmployeeId})){
                res.json({message: "User ALready Exists"})
            }else{
                await user.save()   
                async.auto({
                    find_register: function(cb){
                        const id = User.findOne({email: req.body.email})
                        return cb(null,{
                            id
                        })
                    },
                    save_to_pg: ['find_register', function(result, cb){
                        const { _id, Firstname, orgName } = result.id
                        let orgNameToLowerCase = orgName.toLowerCase()
                        let orgWithoutSpace = orgNameToLowerCase.split(" ").join("");
                        pg('user')
                        .insert({
                            name: Firstname,
                            org_name: orgWithoutSpace,
                            userId: _id
                        })
                        .then((err) => {
                            return cb(null, err)
                        })
                        .catch((error) => {
                            return cb({ code: 'DB_SAVE_ERROR' })
                        })
                        return cb(null)
                    }]
                })
                const token = await user.generateAuthToken()
                res.status(201).json({ user, token })
            }
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/users/sort/:obj/:pageNumber/:nPerPage', auth, async (req, res) => {
    try{
        if(req.params.obj==="Firstname"){
            sort = await User.find()
                             .sort({Firstname: 1})
                             .skip( req.params.pageNumber > 0 ? ( ( req.params.pageNumber - 1 ) * req.params.nPerPage ) : 0 )
                             .limit(10)
            res.json({sort: sort})
        }
        if(req.params.obj==="Lastname"){
            sort = await User.find()
                              .sort({Lastname: 1})
                              .skip( req.params.pageNumber > 0 ? ( ( req.params.pageNumber - 1 ) * req.params.nPerPage ) : 0 )
                              .limit(10)
            res.json({sort: sort})
        }
        if(req.params.obj==="uniqueEmployeeId"){
            sort = await User.find()
                             .sort({uniqueEmployeeId: 1})
                             .skip( req.params.pageNumber > 0 ? ( ( req.params.pageNumber - 1 ) * req.params.nPerPage ) : 0 )
                             .limit(10)
            res.json({sort: sort})
        }
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router