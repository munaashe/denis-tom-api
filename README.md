
# Project Setup and Running Instructions

## Introduction

This project is a Next.js application integrated with MongoDB for storing decisions and using the TOM API for decision fetching. The live environment is deployed on Vercel.

## Setup Instructions

### 1. Clone the Repository

First, clone the project repository from Git:

```bash
git clone https://github.com/munaashe/denis-tom-api.git
cd denis-tom-api
```

### 2. Install Dependencies

Install the required dependencies using Yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory of the project. Copy the contents from `.env.example` to `.env.local` and replace the placeholders with the actual values provided via confidential email.

Example `.env.local`:

```env
MONGODB_URI=
TOM_API_KEY=
TOM_API_BASE_URL=
TOM_API_MODEL_ID=
```

### 4. Run the Development Server

Start the development server:

```bash
yarn dev
```

Navigate to `http://localhost:3000` in your browser to view the application.

## Live Environment

The project is live and deployed on Vercel. You can access it at [https://denis-tom-api.vercel.app/](https://denis-tom-api.vercel.app/).

## Security Measures

1. **Environment Variables**: Sensitive information such as database URIs and API keys are stored in environment variables and not hard-coded in the source code.

2. **Data Validation**: The application performs data validation on incoming requests to ensure that only valid data is processed and stored.

3. **Error Handling**: Proper error handling is implemented to avoid leaking sensitive information and to provide meaningful error messages.

4. **MongoDB Security**: The MongoDB connection is secured using connection strings with appropriate credentials and access controls.

5. **Authentication and Authorization**: API requests are authenticated using tokens to ensure that only authorized users can access certain endpoints.

6. **Vercel Security**: The Vercel deployment platform provides built-in security features such as HTTPS, automatic SSL certificates, and environment variable management.


## Additions
Batch Operations - I failed to find where exactly I can use the batch operations on the app