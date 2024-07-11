"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongodbConnection_1 = require("./mongodbConnection");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, dotenv_1.configDotenv)();
        const db = yield (0, mongodbConnection_1.run)().catch(console.dir);
        if (!db) {
            throw new Error('No DB!');
        }
        const app = (0, express_1.default)();
        const port = process.env.port && Number(process.env.port);
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
        app.get('/', (req, res) => {
            res.send('Hello World');
        });
        app.get('/dadjoke', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const collection = db.collection('dadjokes');
            try {
                console.log(collection.collectionName);
                const apiRes = yield fetch((_a = process.env.JOKE_URL) !== null && _a !== void 0 ? _a : '', { headers: { Accept: "application/json" } }).then(x => x.json());
                const { id: _id, status } = apiRes, rest = __rest(apiRes, ["id", "status"]);
                const foundRecord = yield collection.findOne({ _id: _id });
                if (foundRecord)
                    return res.json(foundRecord);
                const result = yield collection.insertOne(Object.assign(Object.assign({}, rest), { _id }));
                return res.json(apiRes);
            }
            catch (error) {
                // if(error.)
                // res.send(200).json(await collection.aggregate([{ $sample: { size: 1 } }]))   
                console.error(error);
                res.status(500).json(error);
            }
        }));
        app.listen(port, () => console.log(`Listning on port ${port}`));
    });
}
main().then();
