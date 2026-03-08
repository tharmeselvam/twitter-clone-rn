import * as Keychain from 'react-native-keychain';

export class SecureStorage {
    static accessKey = "accessToken";
    static refreshKey = "refreshToken";

    static async saveTokens(
        { accessToken, refreshToken }: { accessToken: string, refreshToken: string }
    ): Promise<void> {
        try {
            await Keychain.setGenericPassword(this.accessKey, accessToken, { service: this.accessKey });
            await Keychain.setGenericPassword(this.refreshKey, refreshToken, { service: this.refreshKey });
        } catch (error) {
            throw error;
        }
    }

    static async getAccessToken(): Promise<string | null> {
        const creds = await Keychain.getGenericPassword({ service: this.accessKey });

        if (!creds) throw new Error;

        return creds.password;
    }

    static async getRefreshToken(): Promise<string | null> {
        const creds = await Keychain.getGenericPassword({ service: this.refreshKey });

        if (!creds) throw new Error;

        return creds.password;
    }
}