beforeAll(async () => {
});

afterAll(async () => {
});

jest.mock('@/app/config/databaseConnection', () => ({
    connect: jest.fn(() => {})
}));
