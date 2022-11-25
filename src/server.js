const express = require('express');
const cors = require("cors");

class Server {
    app = express();
    PORT = process.env.PORT || 8000;
    message = "mon message";
    
    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.set('views', './src/views');
        this.app.set('view engine', 'ejs');

        this.app.use('/', require("./router/product.router"));
        // this.app.use('/offre', require("./router/offre.router"));
        
        this.listen();
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server listening on port:${this.PORT}`);
        });
    };
}

new Server();