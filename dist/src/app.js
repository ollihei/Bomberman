"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor() {
        this.express = express();
        this.initRoutes();
    }
    initRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map