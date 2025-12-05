import bcrypt from 'bcrypt'

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

export function validateABN(abn) {
    abn = abn.replace(/\s+/g, "");
    if (!/^\d{11}$/.test(abn)) {
        return false;
    }

    const digits = abn.split("").map(Number);

    digits[0] = digits[0] - 1;


    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];


    const total = digits.reduce((sum, digit, i) => sum + digit * weights[i], 0);


    return total % 89 === 0;
}


export async function hashPassword(password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}