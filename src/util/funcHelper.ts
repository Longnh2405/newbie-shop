import bcrypt from 'bcrypt';

export function hashWithBcrypt(rounds: number = 10, plaintext: string) {
    return bcrypt.hashSync(plaintext, rounds);
}

export function compareWithBcrypt(plaintext: string, encrypted: string) {
    return bcrypt.compare(plaintext, encrypted);
}

export function generateString(n = 8) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=';
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
