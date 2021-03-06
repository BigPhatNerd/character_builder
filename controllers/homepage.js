const router = require('express').Router();
const {Character, User } = require('../models')

//render homepage
router.get('/', (req, res) => {
    Character.findAll({
        attributes: [
            'id',
            'charName',
            'charRace',
            'charClass',
            'charCon',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCharacterData => {
        const characters = dbCharacterData.map(character => character.get({ plain: true }));
        res.render('homepage', {
            characters,
            loggedIn: req.session.loggedIn,
            style: 'style.css'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//render login/signup
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        style: 'login.css'
    });
});

router.get('/:id',(req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if (!dbData) {
            res.status(400).json({ message: "no character found with this id"});
            return;
        }
        const character = dbData.get({plain: true});
        // check class, this generates the right partials.
        if(character.charClass === "Wizard") {
            res.render('Character', {character: character, Wizard: true, style: 'style.css'});
        } else if (character.charClass === "Bard") {
            res.render('Character', {character: character, Bard: true, style: 'style.css'});
        } else if (character.charClass === "Cleric") {
            res.render('Character', {character: character, Cleric: true, style: 'style.css'});
        } else if (character.charClass === "Druid") {
            res.render('Character', {character: character, Druid: true, style: 'style.css'});
        } else if (character.charClass === "Barbarian") {
            res.render('Character', {character: character, Barbarian: true, style: 'style.css'});
        } else if (character.charClass === "Fighter") {
            res.render('Character', {character: character, Fighter: true, style: 'style.css'});
        } else if (character.charClass === "Monk") {
            res.render('Character', {character: character, Monk: true, style: 'style.css'});
        } else if (character.charClass === "Paladin") {
            res.render('Character', {character: character, Paladin: true, style: 'style.css'});
        } else if (character.charClass === "Ranger") {
            res.render('Character', {character: character, Ranger: true, style: 'style.css'});
        } else if (character.charClass === "Rogue") {
            res.render('Character', {character: character, Rogue: true, style: 'style.css'});
        } else if (character.charClass === "Sorcerer") {
            res.render('Character', {character: character, Sorcerer: true, style: 'style.css'});
        } else if (character.charClass === "Warlock") {
            res.render('Character', {character: character, Warlock: true, style: 'style.css'})
        } else {
            res.status(400).json({ message: "An Error getting Class info"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;