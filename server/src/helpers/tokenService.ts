import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}
class TokenService {
    static generateTokens = (data: any) => {
        const accessToken = jwt.sign(data, ACCESS_TOKEN_KEY, {
            expiresIn: "24h",
        });
        const refreshToken = jwt.sign(data, REFRESH_TOKEN_KEY, {
            expiresIn: "72h",
        });
        return {
            accessToken,
            refreshToken,
        };
    };

    static validateAccessToken = (token: string) => {
        try {
            const userData = jwt.verify(token, ACCESS_TOKEN_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    };

    static validateRefreshToken = (token: string) => {
        try {
            const userData = jwt.verify(token, REFRESH_TOKEN_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    };
}
export default TokenService;