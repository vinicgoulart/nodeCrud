const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');

router.get('/', async (req, res) =>{
    //getting all requests
    try {
        const movies = await Movies.find({});
        res.json({ error: false, movies });


    } catch (error) {
        res.json({ error: true, message: error.message });
    }
    res.json({mensagem: 'GET ALL'});

});

//getting request using id
router.get('/:id' , async (req, res) =>{
    try {
        const id = req.params.id;
        const movies = await Movies.findById(id);
        res.json({ error: false, movies });


    } catch (error) {
        res.json({ error: true, message: error.message });
    }

    

})

//creating requests
router.post('/', async (req, res) => { //async, await = next action won't happen until the await action happens.
    try {
        const movie = req.body;
        const response = await new Movies(movie).save(); //saving a post in mongo.
        res.json({ error: false, movie: response }); //if everything goes well, no error message will apear.
    } catch (error) {
        res.json({ error: true, message: error.message }); //otherwise, if something goes wrong, the error message will apear.
    }
    
})

//puting requests
router.put('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const new_movie = req.body;

        const movie = await Movies.findByIdAndUpdate(id, new_movie);
        res.json({ error: false, movie });

    } catch (error) {
        res.json({ error: true, message: error.message });
    }



    const id = req.params.id;
    res.json({message: `Updating id: ${id}`});
})

router.delete('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const deleted_movie = await Movies.findByIdAndDelete(id);
        res.json({ error: false });
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
    const id = req.params.id;
    res.json({message: `Deleting Id: ${id}`});
})


module.exports = router;