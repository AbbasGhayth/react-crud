const express = require('express');
const contactRoutes = express.Router();

let Contact = require('./contact.model');

//store
contactRoutes.route('/add').post(function(req,res){
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({'contact':'contact is added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//get data
contactRoutes.route('/').get(function (req, res){
    Contact.find(function(err, contact){
        if(err)
            console.log(err);
        else {
            res.json(contact);
        }
    });
});

//edit
contactRoutes.route('/edit/:id').get(function(req,res){
    let id = req.params.id;
    Contact.findById(id, function(err, contact){
        res.json(contact);
    });
});

//update
contactRoutes.route('/update/:id').post(function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(!contact)
            res.status(404).send("data is not found");
        else {
            contact.contact_name = req.body.contact_name;
            contact.contact_number = req.body.contact_number;

            contact.save().then(contact => {
                res.json('Update Complete');
            }).catch(err => {
                res.status(400).send("unable to update database");
            });
        }
    });
});

//delete
contactRoutes.route('/delete/:id').get(function(req, res){
    Contact.findByIdAndRemove({
        _id:req.params.id
    }, function(err,contact){
        if(err)
            res.json(err);
        else
            res.json('Successfully removed');
    });

});

module.exports = contactRoutes;