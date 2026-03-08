import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export const isTokenValid = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return decoded.exp > currentTime + 60;
    } catch {
        return false;
    }
}