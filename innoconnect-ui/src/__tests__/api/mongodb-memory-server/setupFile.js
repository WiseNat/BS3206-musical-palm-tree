import * as mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env['MONGO_URI']);
});

afterAll(async () => {
    await mongoose.disconnect();
});

jest.mock('@/app/config/databaseConnection', () => ({
    connect: jest.fn(() => {})
}));