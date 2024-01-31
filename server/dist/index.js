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
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./db/connect"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const hotels_route_1 = __importDefault(require("./routes/hotels.route"));
const myHotels_route_1 = __importDefault(require("./routes/myHotels.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const bookings_route_1 = __importDefault(require("./routes/bookings.route"));
const middleware_1 = require("./middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
// routes
app.use("/api/users", users_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/hotels", hotels_route_1.default);
app.use("/api/my-hotels", myHotels_route_1.default);
app.use("/api/payments", payment_route_1.default);
app.use("/api/bookings", bookings_route_1.default);
// middlewares
app.use(middleware_1.NotFoundMiddleware);
app.use(middleware_1.ErrorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGO_CLOUD_URI);
        app.listen(8000, () => console.log("Server is running"));
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map