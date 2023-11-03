import cors from 'cors';

const CORS_OPTIONS: Parameters<typeof cors>[0] = {
    origin: false,
    methods: 'none',
    credentials: true,
    preflightContinue: true,
}

export const corsConfig = cors(CORS_OPTIONS);