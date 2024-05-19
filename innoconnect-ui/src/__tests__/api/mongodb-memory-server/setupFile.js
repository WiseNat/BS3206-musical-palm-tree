import * as mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env['MONGO_URI']);
    jest.mock("@/app/config/databaseConnection")
});

afterAll(async () => {
    await mongoose.disconnect();
});
