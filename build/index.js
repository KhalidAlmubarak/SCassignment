"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
const user_route_config_1 = require("./User/user.route.config");
const auth_route_config_1 = require("./Auth/auth.route.config");
const app = express_1.default();
const routes = [];
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = process.env.PORT || 8000;
const debugLog = debug_1.default("app");
if (process.env.DEBUG) {
    process.on("unhandledRejection", function (reason) {
        debugLog("Unhandled Rejection:", reason);
        process.exit(1);
    });
}
else {
}
routes.push(new user_route_config_1.UserRoutes(app));
routes.push(new auth_route_config_1.AuthRoutes(app));
const server = http.createServer(app);
server.listen(PORT, () => {
    debugLog(`Server is running on ${PORT}`);
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
