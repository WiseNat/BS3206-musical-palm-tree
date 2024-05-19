import { connect } from '@/app/config/databaseConnection';
import * as mongoose from 'mongoose';

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    // put your client disconnection code here, example with mongodb:
    await mongoose.disconnect();
});
