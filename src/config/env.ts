import dotenv from 'dotenv';

dotenv.config();

const {
    API_HOSTNAME,
    API_PORT,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
} = process.env;

export const envConfig = {
    API_HOSTNAME,
    API_PORT,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
}