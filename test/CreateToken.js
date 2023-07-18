const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreateToken contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    const createToken = await ethers.deployContract("CreateToken");
    await createToken.waitForDeployment();

    // The address the contract WILL have once mined
    console.log('---> Create Token Address:', createToken.target);

    // Initially, no tokens are minted, so balance should be 0
    const initialBalance = await createToken.balanceOf(owner.address, 1);
    expect(initialBalance).to.equal(0);
  });

  it("Should mint new tokens", async function () {
    const [owner] = await ethers.getSigners();
    console.log('---> Address:', owner.address);
    const cToken = await ethers.deployContract("CreateToken");
    await cToken.waitForDeployment();
    const initialBalance2 = await cToken.balanceOf(owner.address, 1);
    console.log('--> Initial Balance: ', initialBalance2.toString());

    // Mint a new token
    const tx = await cToken.mintNFT("https://ipfs.io/ipfs/QmPJhciUcxs4pmi4UrigamG6YccrDS2m47r8r1kNST1K35");

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Extract the token ID from the event logs
    const events = await cToken.queryFilter("Minted", tx.blockNumber);
    // console.log(events);
    const tokenId = events[0].args[1];
    // console.log(tokenId);

    // After minting, the balance should be 1
    const balance = await cToken.balanceOf(owner.address, tokenId);
    console.log('--> After Minting Balance: ', balance.toString());
    expect(balance).to.equal(1);
  });
});
