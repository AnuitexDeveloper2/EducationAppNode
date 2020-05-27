"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const mailTransportert = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
        user: 'morgenshtern1988@gmail.com',
        pass: '25012005'
    }
});
exports.sendingEmail = (user) => {
    let mailOptions = {
        from: 'morgenshtern1988@gmail.com',
        to: user.email,
        subject: "// Subject line",
        text: `Confirm registration by clicking on the link: http://localhost:3000/confirmedEmail?user=${user.id}`
    };
    mailTransportert.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        }
        return true;
    });
};
//# sourceMappingURL=emailHelper.js.map