"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_route_config_1 = require("../Common/common.route.config");
const auth_controller_1 = __importDefault(require("./auth.controller"));
class AuthRoutes extends common_route_config_1.RouteConfig {
    constructor(app) {
        super(app, "AuthRoutes");
    }
    configureRoutes() {
        this.app.route("/login").post(auth_controller_1.default.login);
        this.app.route("/signup").post(auth_controller_1.default.signup);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
