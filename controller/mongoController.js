const { MongoClient, ObjectID, url } = require('../database').mongo;

module.exports = {
    getMovies : (req,res) => {
        MongoClient.connect(url, (err, client) => {
            if(err){
                res.status(500).send(err.message)
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.find({
                title : req.query.title
                // title : {
                //     '$regex' : req.query.title,
                //     '$options' : 'i'
                // }
            }).limit(10).toArray((err, results) => {
                client.close();
                if(err){
                    res.status(500).send(err.message)
                }
                res.status(200).send(results)
            })
        })
    }, 
    addMovies : (req,res) => {
        MongoClient.connect(url, (err,client) => {
            if(err){
                res.status(500).send(err.message)
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.insertOne(req.body, (err,results) => {
                client.close()
                if(err){
                    res.status(500).send(err.message)
                }
                res.status(200).send(results)
            })
        })
    },
    editMovies : (req,res) => {
        //5e992d71f8f07440aca2b22b
        if(!req.body.unset){
            req.body.unset = {"title": ""}
        }
        MongoClient.connect(url, (err,client) => {
            if(err){
                res.status(500).send(err.message)
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.updateOne({
                _id : new ObjectID(req.params.id)
            },{
                $set : req.body.set,
                $unset : req.body.unset
            },(err,results) => {
                client.close();
                if(err){
                    res.status(500).send(err.message)
                }
                res.status(200).send(results)
            })
        })
    },
    deleteMovieById : (req,res) => {
        MongoClient.connect(url, (err,client) => {
            if(err){
                res.status(500).send(err.message)
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.deleteOne({
                _id : req.params.id
            }, (err,results) => {
                client.close();
                if(err){
                    res.status(500).send(err.message)
                }
                res.status(200).send(results)
            })
        })
    },
    getMoviesAsync : async (req,res) => {
        // req.query.limit=10
        let client = await MongoClient.connect(url)

        let moviesCol = client.db('sample_mflix').collection('movies')

        let data = await moviesCol.find({ 
            title : {
                '$regex' : '',
                '$options' : 'i'
            },  
        }).limit(parseInt(10)).toArray()
        client.close();
        // let response = await data.toArray()

        res.status(200).send(data)
    },
}