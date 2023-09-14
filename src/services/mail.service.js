import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

// export const handleSendMail = async (mail) => {
//     const GOOGLE_MAILER_CLIENT_ID = '206407594499-b1kiim8kpp99ogan9hoc650h67s97q6f.apps.googleusercontent.com';
//     const GOOGLE_MAILER_CLIENT_SECRET = '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';
//     const GOOGLE_MAILER_REFRESH_TOKEN =
//         '1//04JCgsaWu65hWCgYIARAAGAQSNwF-L9IrvP5HehPfOTsEzdBH988oVC2aO_qWT1G6Hs1hhzVsktPjGVzbwtJeyINI7ATnmhfodKg';
//     const ADMIN_EMAIL_ADDRESS = 'thuctapcosochuyennganh@gmail.com';

//     try {
//         const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
//         const myAccessTokenObject = await myOAuth2Client.getAccessToken();
//         const myAccessToken = myAccessTokenObject?.token;

//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: ADMIN_EMAIL_ADDRESS,
//                 // pass: '123456Aa@',
//                 clientId: GOOGLE_MAILER_CLIENT_ID,
//                 clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
//                 refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
//                 accessToken: myAccessToken,
//             },
//         });
//         console.log('👿 ~ file: router.ts:31 ~ handleSendMail ~ transporter:', transporter);

//         let info = await transporter.sendMail({
//             from: ADMIN_EMAIL_ADDRESS,
//             to: mail,
//             subject: 'Hello ✔',
//             text: 'Hello world?',
//             html: '<b>Hello world?</b>',
//         });
//         console.log('👿 ~ file: router.ts:41 ~ handleSendMail ~ info:', info);

//         console.log('Message sent: %s', info.messageId);

//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.log('Error handleSendMail: ', error);
//     }
// };

export function handleSendMail(mail, content) {
    try {
        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '0ce5c121be748e',
                pass: '8496e137158bee',
            },
        });

        const message = {
            from: 'newbie-shop-longnh@gmail.com',
            to: mail,
            subject: 'Yêu cầu cấp lại mật khẩu!',
            text: content,
        };

        transport.sendMail(message, (err, info) => {
            if (err) {
                console.log('error: ', err);
            } else {
                console.log('success: ', info);
            }
        });
    } catch (error) {
        console.log('Error handleSendMail: ', { error });
    }
}
