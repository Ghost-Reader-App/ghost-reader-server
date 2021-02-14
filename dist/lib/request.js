"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_rate_limit_1 = __importDefault(require("axios-rate-limit"));
const instance = axios_rate_limit_1.default(axios_1.default.create(), {
    maxRequests: 15,
    perMilliseconds: 1000,
    maxRPS: 1,
});
exports.default = axios_1.default;
