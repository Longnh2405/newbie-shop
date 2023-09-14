import fs from 'fs/promises';
import path from 'path';
import * as DateFNS from 'date-fns';

const fileName = path.join(__dirname, '../../logs', 'logs.log');

export async function logEvent(msg: string) {
    try {
        const dateTime = DateFNS.format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        const contentLog = `${dateTime}---------${msg}\n`;

        fs.appendFile(fileName, contentLog);
    } catch (error) {
        console.log('Error logEvent: ', { error });
    }
}
