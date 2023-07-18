This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, install the dependencies:
```bash
npm install
```
Second, set environment variables. Check the 'env.example' file and add them into de 'next.config' file.

Third, run the development server:
```bash
npm run dev
```

# Hardhat Project for Web3
This project uses Hardhat to deploy contracts to the Blockchain and also to test Blockchain interaction.

Fourth, open a new terminal and create a localhost network:
```shell
npx hardhat node
```

compile the contracts
```shell
npx hardhat compile
```

Fifth, open a new terminal and deploy a contract to the localhost network:
```shell
npx hardhat run scripts/deploy.js --network localhost
```
or
```shell
npx hardhat run scripts/deploy.js --network <network>
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
