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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("../Common/services/mongoose.service"));
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const util_1 = require("util");
const password_1 = require("../Common/services/password");
const scryptAsync = util_1.promisify(crypto_1.scrypt);
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    age: { type: Number, required: false },
    major: { type: String, required: false },
    isGraduate: { type: Boolean, required: false },
}, {
    toObject: {
        transform: function (doc, ret) { },
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        },
    },
});
UserSchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const hashed = yield password_1.Password.toHash(this.get("password"));
            this.set("password", hashed);
        }
        done();
    });
});
UserSchema.statics.build = (attrs) => {
    return new User(attrs);
};
const User = mongoose_service_1.default.getInstance().model("User", UserSchema);
exports.default = User;
