const express = require('express');
const clientCassandra = require('../database/db');
const Product = require('../models/product.model');
const router = express.Router();
const redis = require('redis');

const clientRedis = redis.createClient({ url: "redis://localhost:6379" });
clientRedis.on('error', (err) => console.log('Redis Client Error', err));

// Setup essential routes 
router.get('/', (req, res) => {
    const query = `SELECT * from app.product;`;

    (async () => {
        try {
            await clientRedis.connect();
            let offres = {};
            let keys = await clientRedis.keys("*")
            for(var i=0; i<keys.length; i++){
                offres[keys[i]] = JSON.parse(await clientRedis.get(keys[i]));
            }
            await clientRedis.disconnect();

            await clientCassandra.execute(query)
                .then(produits => {
                    produits = produits.rows;
                    res.render('index', { title: 'Home', produits, offres });
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        } catch (error) {
            console.error(error);
        }
    })();
});

router.post('/', (req, res) => {
    id = req.body.id;
    nom = req.body.nom;
    offre = req.body.offre;
    const query = `SELECT * from app.product;`;
    // console.log(id, offre);
    (async () => {
        await clientRedis.connect();
        try {
            const obj = {
                produitId: id,
                produitNom: nom,
                offre: offre,
             };
            await clientRedis.set(id, JSON.stringify(obj), {'EX': 100, 'NX': true});
            let offres = {};
            let keys = await clientRedis.keys("*");
            for(var i=0; i<keys.length; i++){
                offres[keys[i]] = JSON.parse(await clientRedis.get(keys[i]));
            }
            await clientRedis.disconnect();

            await clientCassandra.execute(query)
                .then(produits => {
                    produits = produits.rows;
                    res.render('index', { title: 'Home', produits, offres });
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        } catch (error) {
            console.error(error);
        }
    })();
});

// router.get('/getById/:id', (req, res) => {
//     const id = req.params.id;
//     const query = 'SELECT * from app.product WHERE id = ?;';
//     clientCassandra.execute(query, [id], { prepare: true })
//         .then(produit => res.status(200).json({
//             message: "Success: product found!",
//             status: res.statusCode,
//             produit: produit.rows
//         })).catch(err => {
//             res.status(400).json(err)
//         });
// });

// router.post("/post", (req, res) => {
//     const nom = req.body.nom;
//     const prix = req.body.prix;
//     product = new Product(nom, prix);
//     const query = "INSERT INTO product (id, nom, prix) VALUES (?, ?, ?);";
//     clientCassandra.execute(query, [product.id, product.nom, product.prix], { prepare: true })
//         .then(res.status(201).json({
//             message: "Success: product created!",
//             status: res.statusCode
//         })).catch(err => {
//             res.status(400).json({
//                 message: err,
//                 status: res.statusCode
//             })
//         });
// });

module.exports = router;