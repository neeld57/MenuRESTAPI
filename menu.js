//require express
const express = require('express');
//router for five different routes for menu REST API
const router = express.Router();
//require body parser to gegt JSON data from POST and PUT requests
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//create constant sqlite to use sqlite
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test');
//variable last to keep track of the id number menu items can be added at
var last = 0;
//I use serialize here to have the function run synchronous that way
//addIfNeeded only runs after I have the last id of the menu items
       db.serialize(function () {
           db.run("CREATE TABLE IF NOT EXISTS menu (id INT, name TEXT)");
           db.each("SELECT id, name FROM menu", function (err, row) {
               //code to find the id of the last element in the database
               last=row.id;
           });
           db.close((err) => {
               if (err) {
                   return console.error(err.message);
               }
               //code to add some menu items if the current database is empty
                addIfNeeded();
           });
       });
//created a function to add some food to test REST API
       function addIfNeeded(){
           if(last===0){
               //reinitialize db as we close our database earlier
               var db = new sqlite3.Database('test');
               var add = db.prepare("INSERT INTO menu VALUES (?,?)");
               add.run(1, "Chicken Sandwich");
               add.run(2, "Grilled Cheese");
               add.run(3, "Candy");
               add.finalize();
               last +=3;
           }
       }


//Task 1: Get a Menu Section by ID
router.get('/:productID', function(req,res,next){
    var db = new sqlite3.Database('test');
    //get id
    var id = req.params.productID;
    //sql query depending to the ID number passed in
    var sql = 'SELECT id, name FROM menu WHERE id  = ?';
    db.get(sql,[id], (err,row)=>{
        if(err){
            return console.error(err.message);
        }
        //JSON output
            res.status(200).json({
                MenuSection: {id: row.id, name: row.name}
            });
    });
});

//Task 2: Get All Menu Sections
router.get('', (req,res,next) =>{
    var db = new sqlite3.Database('test');
    var allItems =[];
    //use serialize to have All Items added to array allItems before display in JSON format later
    db.serialize(() => {
        db.each("SELECT id, name FROM menu", function(err,row){
           allItems.push({id:row.id, name:row.name});
        });
        //use close function to have JSON message array allItems displayed
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            //displays the array allItems
            res.status(200).json({
                MenuSection: allItems
            });
        });
    });
});
//Task 3: Add a New Menu Section
router.put('',(req,res,next) =>{
    var name = (req.body.name);
    var db = new sqlite3.Database('test');
    var add = db.prepare("INSERT INTO menu VALUES (?,?)");
    //get value of last and then add the new section at the end of the database
    last++;
    add.run(last, name);
    add.finalize();
    //Deliver Message with Code 201 for Successful Creation of Menu Item
    res.status(201).json({
        success: true,
        MenuSection: [{id:last, name:name}]
    });

});
//Task 4: Edit a Menu Section
router.post('/:productID',(req,res,next) =>{
    var db = new sqlite3.Database('test');
    var id =req.params.productID;
    var name = (req.body.name);
    //sql query to set a new name for the given id
    var sql = 'UPDATE menu SET name = ? WHERE id = '+id;
    db.run(sql,name,(err)=>{
        }
    );
    //display JSON
    res.status(200).json({
        success: true,
        MenuSection: [{id:id, name:name}]
    });
});


//Task 5: Delete a Menu Section
router.delete('/:productID', function(req,res,next){
    var db = new sqlite3.Database('test');
    var getID = req.params.productID;
    //delete based on the ID passed in through the url
    var sql = 'DELETE FROM menu WHERE id  = ?';
    db.run(sql,[getID], (err,row)=>{
        res.status(200).json({
            success: true
        });
    });
});

module.exports = router;