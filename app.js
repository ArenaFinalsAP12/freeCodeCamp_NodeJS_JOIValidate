// User Input Validation with Express and JOI
/*
const express = require('express');
const path = require('path');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static(path.join(__dirname,'static')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'static','index.html'));
});

app.post('/',(req,res)=> {
    console.log(req.body);
    const schema = Joi.object().keys({
        email : Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    Joi.validate(req.body,schema,(err,result)=> {
        if(err) {
            console.log(err);
            res.send('an error has occurred');
        }
        console.log(result);
        res.send('successfully posted data');
    });
});

app.listen(3000);
*/
// User Input Validation with JOI Validating Nested Objects and Arrays (part 2)

const Joi = require('joi'); 

const arrayString = ['banana','bacon','cheese'];
const arrayObjects = [{example: 'example1'},{example: 'example2'},{example: 'example3'}];

const userInput = { personalInfo: {
                        streetAddress: '123987987',
                        city: 'kljlkajd',
                        state: 'fl'
                    },
                    preferences: arrayObjects};

const personalInfoSchema = Joi.object().keys({
    streetAddress : Joi.string().trim().required(),
    city : Joi.string().trim().required(),
    state : Joi.string().trim().length(2).required(),
});

const preferencesSchema = Joi.array().items(Joi.object().keys({
    example: Joi.string().required()
})); // This ensures that all items in the array are strings

const schema = Joi.object().keys({
    personalInfo: personalInfoSchema,
    preferences: preferencesSchema
});

Joi.validate(userInput,schema,(err,result)=> {
    if (err)
        console.log(err)
    else
        console.log(result);
});