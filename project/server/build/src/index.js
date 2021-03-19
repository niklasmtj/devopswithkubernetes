"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_PATH = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const todos_1 = __importDefault(require("./routes/todos"));
const helper_1 = __importDefault(require("./routes/helper"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = express_1.default();
const PORT = process.env.PORT || 3001;
const BASE_PATH = __dirname;
exports.BASE_PATH = BASE_PATH;
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => res.sendFile(path_1.default.join(__dirname + "/public/index.html")));
app.use('/api/public', express_1.default.static(`${__dirname}/public`));
app.use("/api/helper", helper_1.default);
app.use("/api/todos", todos_1.default);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
