import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
// import { parseEther } from 'ethers/lib/utils';
// import { createPublicClient, http, createWalletClient, custom } from "viem";
// import { fantom } from "viem/chains";
import { useContractRead, useWalletClient, usePrepareContractWrite, useContractWrite } from 'wagmi'

import WalletConnectButton from "../components/WalletConnectButton";
import CreateToken from "../../artifacts/contracts/CreateToken.sol/CreateToken.json";
// import { hardh } from "../../custom-chain";

const inter = Inter({ subsets: ['latin'] })
const createTokenContract = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const ipfsProjectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const ipfsProjectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET;

const auth = 'Basic ' + Buffer.from(ipfsProjectId + ':' + ipfsProjectSecret).toString('base64');

// const client = ipfsHttpClient("https://ipfs.infura.io:5001");
const ipfsClient = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

export default function Home() {
  const [account, setAccount] = useState('');
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formInput, updateFormInput] = useState({
    title: "Test",
    owner: "",
    price: "0.02",
    currency: "ETH",
    fileType: "",
    descendant: "",
    externalLink: "",
    tag: "",
    image: "",
    collection: "Burning Earth",
    game: "Anthropocene",
    rarity: "Common",
    description: "",
    type: "Sale"
  });
  //useWalletClient returns a Viem's WalletClient Object
  const { data: walletClient } = useWalletClient({
    onSuccess(data) {
      setAccount(data.account.address);
      console.log('Connected Address', data.account.address);

    },
  });

  // console.log('Token Create Contract Address: ', createTokenContract)

  // const { config } = usePrepareContractWrite({
  //   address: createTokenContract,
  //   abi: CreateToken.abi,
  //   functionName: 'mintNFT',
  //   chainId: 1337,
  // });
  // console.log('CONFIG: ', config);
  // const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: createTokenContract,
    abi: CreateToken.abi,
    functionName: 'mintNFT',
    chainId: 1337,
    onSuccess(data) {
      console.log('Write Success', data)
    },
  })

  // Funtion to fireoff when the form is submitted
  async function onChange(event) {
    // get the file from the input
    
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log('Selected Image: ', event.target.files[0]);
      const file = event.target.files[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      console.log('FILE EXTENSION: ', fileExtension);

      try {
        // Update fileType based on file extension
        switch (fileExtension) {
          case 'png':
          case 'jpeg':
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'image' }));
            break;
          case 'mp4':
          case 'mov':
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'video' }));
            break;
          case 'mp3':
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'audio' }));
            break;
          case 'gif':
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'gif' }));
            break;
          case 'pdf':
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'pdf' }));
            break;
          default:
            updateFormInput((prevInput) => ({ ...prevInput, fileType: 'image' }));
            break;
        }

        // adding the file to the IPFS
        const added = await ipfsClient.add(
          file, {
            progress: (bytes) => console.log(`received: ${bytes}`),
            // progress: (prog) => console.log(`received: ${prog}`)
          }
        );
        const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`;
        // const url = `https://ipfs.io/ipfs/${added.path}`;
        console.log("url: ", url);
        // formInput.image = url;
        updateFormInput(prevState => {
          return {...prevState, image: url};
        });
        console.log("formInput ", formInput);
        console.log("fileHash: ", added.path);
        console.log("fileUrl: ", url);
        setFileUrl(url);
        setFileHash(added.path);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${inter.className}`}>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={60}
          height={15}
          priority
        />
      </div>
      <div className="relative flex items-center mt-10">
        <p className="">
          Click Wallet Icon!
        </p>
      </div>
      <div className="relative flex items-center">
        <WalletConnectButton/>
      </div>
      <div className="relative flex items-center mt-10">
        <p>
          Wallet address: {account}
        </p>
      </div>
      <div className="relative flex items-center mt-10">
        <p>
          File Hash: {fileHash}
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center">
                <label htmlFor="fileInput" className="my-4 form-label inline-block text-white text-base">
                  {selectedImage ? (
                    <Image width={200} height={200} src={selectedImage} alt="Selected image" className="rounded-lg"/>
                  ) : (
                    <div className="w-14 h-14 border-2 border-[#3db7c3] rounded-lg flex justify-center items-center">
                      <Image width={18} height={16} src="/img/image-icon.png" alt="Upload Icon"/>
                    </div>
                  )}
                </label>
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  className="hidden"
                  type="file"
                  required={true}
                  onChange={onChange}
                  accept=".png,.jpeg,.jpg,.mov,.mp4,.pdf,.mp3"
                />
                <button
                  disabled={!write}
                  // onClick={onButtonClick}
                  onClick={() =>
                    write({
                      args: [ "https://ipfs.io/ipfs/QmPJhciUcxs4pmi4UrigamG6YccrDS2m47r8r1kNST1K35"],
                      from: account,
                      value: ethers.parseUnits('0.00', "ether"),
                    })
                  }
                  className="bg-[#1d1d28] text-[#3db7c3] font-semibold py-2 px-4 rounded"
                >
                  Mint NFT
                </button>
                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
              </div>
    </main>
  )
}
