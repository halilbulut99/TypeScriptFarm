"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_middleware_1 = require("./typegoose-middleware");
const mongodb_1 = require("mongodb");
const object_id_scalar_1 = require("./object-id.scalar");
const path = __importStar(require("path"));
const resolvers_1 = require("./resolvers");
const auth_checker_1 = require("./utils/auth-checker");
const getSchema = async () => {
    var _a;
    const schemaPath = (_a = process.env.SCHEMA_PATH) !== null && _a !== void 0 ? _a : '';
    return await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        emitSchemaFile: path.resolve(__dirname, `${schemaPath}schema.gql}`),
        // use document converting middleware
        globalMiddlewares: [typegoose_middleware_1.TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }],
        authChecker: auth_checker_1.authChecker,
    });
};
exports.getSchema = getSchema;
