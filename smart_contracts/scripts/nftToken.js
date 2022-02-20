const main = async () => {
  const Nft = await hre.ethers.getContractFactory("NftToken");
  const nft = await Nft.deploy();

  await nft.deployed();

  console.log("nft deployed to:", nft.address);
};

const runmain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runmain();
