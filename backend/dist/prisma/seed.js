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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield prisma.user.upsert({
            where: { email: "aditya@gmail.com" },
            update: {},
            create: {
                email: "aditya@gmail.com",
                password: "11111111",
                name: "aditya",
                posts: {
                    create: Array.from({ length: 20 }, (_, index) => ({
                        title: `Post ${index + 1}`,
                        content: `This is content for post ${index + 1}`,
                        published: true,
                    })),
                },
            },
        });
        const b = yield prisma.user.upsert({
            where: { email: "tinku@gmail.com" },
            update: {},
            create: {
                email: "tinku@gmail.com",
                password: "22222222",
                name: "tinku",
                posts: {
                    create: Array.from({ length: 20 }, (_, index) => ({
                        title: `Post ${index + 1}`,
                        content: `This is content for post ${index + 21}`,
                        published: true,
                    })),
                },
            },
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
