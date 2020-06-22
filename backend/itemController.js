var express = require('express');
const db = require("./db");
var mongo = require('mongodb');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Item = require('./Item');
const itemCollection = "item";




//Update fav
router.post('/editFav',(req,res)=>{

    // Payload from the request
    let data = req.body;
    if(!data || !data.itemId){
        return res.status(400).send({error : true, errorMessage : "cannot find reciept id"});
    }

            db.getDB().collection(itemCollection).find({ "_id" : new mongo.ObjectID(data.itemId)}).toArray((err,result)=>{
                if(err){
                    return res.status(404).json({
                        success : false,
                        message : "failed to find document in DB",
                        document : null,
                        messageDetails : err
                    });
                }
                else{
                    if(result && result[0]){
                        let item = result[0];

                            if(typeof(item.favourite )=="boolean" && data.favourite !== ""){
                                item.favourite = data.favourite;
                            }
    

                        // Inserting into DB
                        db.getDB().collection(itemCollection).updateOne({ "_id" : new mongo.ObjectID(data.itemId)},{$set: item},{upsert: true},(err,result)=>{
                            if(err){
                                return res.status(500).json({
                                    success : true,
                                    message : "failed to insert document to DB",
                                    document : null,
                                    messageDetails : err
                                });
                            }
                            else
                                return res.status(200).json({
                                    success : true,
                                    message : "successfully updated document in DB",
                                    messageDetails : "no error"
                                });
                        });

                    }else{
                        console.log("cannot find existing result ind DB");
                        return res.status(404).json({
                            success : false,
                            message : "failed to find document in DB",
                            document : null,
                            messageDetails : err
                        });
                    }

                }

            });
});


router.get('/favItems',(req,res)=>{

    db.getDB().collection(itemCollection).find({"favourite":true}).toArray((err,result)=>{
        if(err){
            res.status(404).json({
                success : false,
                message : "failed to find documents in DB",
                document : null,
                messageDetails : err
            });
        }
        else{
            if(result && result.length != 0){

                let items = result;

                res.status(200).json({
                    success : true,
                    message : "successfully retrieved the documents from DB",
                    document : items,
                    messageDetails : "no error"
                });

            }else{
                res.status(404).json({
                    success : false,
                    message : "failed to find documents in DB",
                    document : null,
                    messageDetails : err
                });
            }
        }
    });
});

router.get('/nonFavItems',(req,res)=>{

    db.getDB().collection(itemCollection).find({"favourite":false}).toArray((err,result)=>{
        if(err){
            res.status(404).json({
                success : false,
                message : "failed to find documents in DB",
                document : null,
                messageDetails : err
            });
        }
        else{
            if(result && result.length != 0){

                let items = result;

                res.status(200).json({
                    success : true,
                    message : "successfully retrieved the documents from DB",
                    document : items,
                    messageDetails : "no error"
                });

            }else{
                res.status(404).json({
                    success : false,
                    message : "failed to find documents in DB",
                    document : null,
                    messageDetails : err
                });
            }
        }
    });
});

module.exports = router;
