"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp = require('sharp');
const fs = require('fs');
const app = (0, express_1.default)();
const port = 3000;
const imageName = [
    "encenadaport",
    "fjord",
    "icelandwaterfall",
    "palmtunnel",
    "santamonica",
];
app.use(`/images/`, express_1.default.static('./' + "/images"));
app.use(`/resized/`, express_1.default.static('./' + "/resized"));
app.get("/", (req, res) => {
    res.send("MAIN PAGE ");
});
app.get("/images", (req, res) => {
    const p = req.query.name;
    const w = Number(req.query.width);
    const h = Number(req.query.height);
    let x = 0;
    void (imageName.map((n) => {
        if (n === p) {
            x = 1;
        }
    }));
    if (fs.existsSync(`./resized/${p}_${w}_${h}.jpg`)) {
        res.redirect(`/resized/${p}_${w}_${h}.jpg`);
    }
    else {
        if (x == 1 && Number.isInteger(w) && Number.isInteger(h)) {
            if (Math.sign(w) == 1 && Math.sign(h) == 1) {
                sharp(`./images/${p}.jpg`)
                    .resize(Number(w), Number(h))
                    .toFile(`./resized/${w}-${h}-${p}.jpg`);
                res.redirect(`/resized/${w}-${h}-${p}.jpg`);
            }
            else {
                res.send("you sent negative height or negative width");
            }
        }
        else {
            res.send("you sent wrong data");
        }
    }
});
app.listen(port, () => {
    console.log("listening on port");
});
exports.default = app;
