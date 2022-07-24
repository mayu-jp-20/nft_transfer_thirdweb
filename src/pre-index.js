import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import * as fs from 'fs';
import pkg from 'log4js';
const { getLogger } = pkg;
const {configure} = pkg;

//log設定ファイルの読み込み
configure({
    appenders: { app: { type: "file", filename: "app.log" } },
    categories: { default: { appenders: ["app"], level: "info" } }
});
var systemLogger = getLogger();

/*const privateKey =""; //private key 
const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "polygon");
const contract = sdk.getNFTDrop("0xA6B2A3d9A4F8DA01e4fab82Ea6C27F2032EC10dF");*/
let tokenId = 0;

//アドレスの配列の要素の数だけループ
for (let i = 1; i < getCSV().length; i++) {
    const walletAddress = getCSV()[i][2];
    const supply = getCSV()[i][1];

    systemLogger.info("walletAddress:"+walletAddress);

    //transfer
    if(supply == 2){
        transfer(walletAddress,tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
        transfer(walletAddress,tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
    }else if(supply == 1){
        transfer(walletAddress, tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
    }else {
        systemLogger.info("supply number missing")
    }
}

function getCSV() {
    let filepath = 'resource/mayu-address.csv'; //filepath
    let data = fs.readFileSync(filepath,'utf8');

    //アドレスの配列作る
    let lines = data.split(/\r\n|\n|\r/g);
    let table = lines.map(function(line){
        return line.split(',');
    });
    return table;
}
async function transfer(walletAddress,id) {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(2000);
    const tokenId = id;
    //contract.transfer(walletAddress, tokenId);
}
/*function claim(walletAddress,supply) {
    const quantity = supply; // how many unique NFTs you want to claim
    await contract.claimTo(walletAddress, quantity);
}*/

