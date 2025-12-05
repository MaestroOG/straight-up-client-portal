import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("Please add JWT_SECRET in .env");
}

export function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    });
}

export function validateJWT(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}