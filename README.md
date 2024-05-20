# InnoConnect - Inventor Matching

## Introduction

Empower Your Ideas, Connect for Impact - InnoConnect: Building Tomorrow Together

Innovation waits for no one. Will you be left behind? Join InnoConnect!

## Prerequisites

- A device with NodeJS installed
- A MongoDB instance

## How to run the application locally

1. Clone this repository
2. Run `npm install` within the innoconnect-ui directory
3. Create a `.env` file with the variables from `example.env`.
   - `DB_CONNECTION_URL` is the connection string for the MongoDB database
   - `AUTH_SECRET` is a hexadecimal string used for authentication (can be anything)
4. Run `npm run test` to ensure the Jest tests run correctly.
5. Run `npm run dev` to start the application
   - This will be accessible on [[localhost:3000](http://localhost:3000/)]
