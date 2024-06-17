const express = require('express')
const router = express.Router()
const {
    getPeople,
    postPeople,
    putPeople,
    deletePeople
} = require('../controlers/people.controler')

router.get('/', getPeople)

router.post('/', postPeople)

router.put('/:ID', putPeople)

router.delete('/:id', deletePeople)


module.exports = router