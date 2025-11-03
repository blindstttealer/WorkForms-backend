import 'dotenv/config';

function requireEnv(name: string): string {
    const v = process.env[name];
    if (!v || v.trim() === '') {
        throw new Error(`Missing env var: ${name}`);
    }
    return v;
}

export const JWT_SECRET: string = requireEnv('JWT_SECRET');