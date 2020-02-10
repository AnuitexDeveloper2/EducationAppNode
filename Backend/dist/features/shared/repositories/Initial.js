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
const user_1 = __importDefault(require("../db-models/user"));
const role_1 = require("../enums/role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_2 = __importDefault(require("../db-models/user"));
const author_1 = __importDefault(require("../db-models/author"));
const author_2 = __importDefault(require("../db-models/author"));
const printing_edition_1 = __importDefault(require("../db-models/printing-edition"));
const printing_edition_2 = __importDefault(require("../db-models/printing-edition"));
const printingEditionType_1 = require("../enums/printingEditionType");
class Init {
    constructor() {
        this.checkModel = user_2.default;
        this.admin = new user_1.default();
        this.author = new author_2.default();
        this.printingEdition = new printing_edition_2.default();
    }
    Check() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initAdmin();
            this.initAuthor();
            this.initProdiuct();
        });
    }
    initAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_2.default.find();
            if (result.length == 0) {
                const admin = new user_1.default({
                    userName: 'Morgenshtern88',
                    firstName: 'Vladimir',
                    lastName: 'Goncharuk',
                    email: 'morgenshtern1988@gmail.com',
                    role: role_1.Role.Admin,
                    passwordHash: '25012005'
                });
                var salt = bcryptjs_1.default.genSaltSync(10);
                admin.passwordHash = bcryptjs_1.default.hashSync('25012005', salt);
                admin.save();
                return admin;
            }
            return this.admin;
        });
    }
    initAuthor() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield author_1.default.find();
            if (result.length == 0) {
                const author = new author_2.default({
                    name: ' Terry Pratchett'
                });
                author.save();
                return author;
            }
            return this.author;
        });
    }
    initProdiuct() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield printing_edition_1.default.find();
            if (result.length == 0) {
                const printingEdition = new printing_edition_2.default({
                    title: 'The Colour of Magic',
                    description: 'The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett',
                    cover_image: 'http/:',
                    type: printingEditionType_1.PrintingEditionType.Book,
                    price: 25,
                    currency: 'USD',
                    author_ids: '5e3d1c71c818e21204ac2b8b'
                });
                printingEdition.save();
                return printingEdition;
            }
            return this.printingEdition;
        });
    }
}
exports.Init = Init;
//# sourceMappingURL=Initial.js.map