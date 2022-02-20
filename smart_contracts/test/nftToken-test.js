const { expect } = require("chai");
const { ethers } = require("hardhat");
//const { getBytes32FromIpfsHash } = require("../utils/ipfshash");

describe("NftToken", function () {
  it("Should mint nft to someone", async function () {
    const Nft = await ethers.getContractFactory("NftToken");
    const nft = await Nft.deploy();
    await nft.deployed();
    let uri = "/cic/ipfs/jjn.png";
    let recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";

    let balanceOf = await nft.balanceOf(recipient);
    expect(balanceOf).to.equal(0);
    console.log(balanceOf);

    const transaction = await nft.payTomint(recipient, uri, {
      value: ethers.utils.parseEther("0.002"),
    });
    await transaction.wait();
    balanceOf = await nft.balanceOf(recipient);
    expect(balanceOf).to.equal(1);
    console.log(balanceOf);
    let count = await nft.count();
    console.log(count);
    let isOwned = await nft.isCountedOwn(uri);
    expect(isOwned).to.equal(true);
  });
});

// const metadata = getBytes32FromIpfsHash(nftObj.ipfs);
// const transaction = await nft.mint(nft.address, metadata);
// const tx = await transaction.wait();
// const event = tx.events[0];
// console.log(event);
// const value = event.args[2];
// const token = value.toNumber(); // Getting the tokenID
// console.log(token);

// const nfts = await nft.nfts(token);
// console.log(nfts);

// const IPFShash = nfts.ipfsHash;
// expect(IPFShash).to.be.equal(metadata);

// const owner = await nft.ownerOf(token);
// console.log(owner);
// const balance = await nft.balanceOf(owner);
// console.log(balance);
