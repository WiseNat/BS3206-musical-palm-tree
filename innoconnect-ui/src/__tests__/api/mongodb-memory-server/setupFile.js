import * as mongoose from 'mongoose';

beforeEach(async () => {
    await mongoose.connect(process.env['MONGO_URI']);
});

jest.mock('@/app/config/databaseConnection', () => ({
    connect: jest.fn(() => {})
}));