import dotenv from 'dotenv';

dotenv.config();

const {
    API_PORT,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
} = process.env;

export const envConfig = {
    API_PORT,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
}