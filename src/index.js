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

const privateKey ="";
const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "polygon");
const contract = sdk.getNFTDrop("");
let tokenId = 1853;

//アドレスの配列の要素の数だけループ
for (let i = 1; i < getCSV().length; i++) {
    const walletAddress = getCSV()[i][2];
    //const supply = getCSV()[i][1];

    systemLogger.info("walletAddress:"+walletAddress);
    
    await transfer(walletAddress, tokenId);
    systemLogger.info("success token ID:"+tokenId);
    tokenId++;

    //transfer
   /* if(supply == 2){
        await transfer(walletAddress,tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
        await transfer(walletAddress,tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
    }else if(supply == 1){
        await transfer(walletAddress, tokenId);
        systemLogger.info("success token ID:"+tokenId);
        tokenId++;
    /*}else {
        systemLogger.info("supply number missing")
    }*/
}

function getCSV() {
    let filepath = 'resource/addressList.csv';
    let data = fs.readFileSync(filepath,'utf8');

    //アドレスの配列作る
    let lines = data.split(/\r\n|\n|\r/g);
    let table = lines.map(function(line){
        return line.split(',');
    });
    return table;
}

async function transfer(walletAddress,id) {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms));
    await _sleep(5000);
    const tokenId = id;
    contract.transfer(walletAddress, tokenId);
}