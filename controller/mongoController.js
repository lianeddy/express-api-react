const { MongoClient, ObjectID, url } = require('../database').mongo;

module.exports = {
    getMovies : (req,res) => {
        MongoClient.connect(url, (err, client) => {
            if(err){
                res.status(500).send(err.message)
            }
            let moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.find({
                title : {
                    '$regex' : req.query.title,
                    '$options' : 'i'
                }
            }).limit(10).toArray((err, results) => {
                if(err){
                    res.status(500).send(err.message)
                }
                res.status(200).send(results)
            })
        })
    }
}