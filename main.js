import { crawlPage } from "./crawl.js";

function main () {
    if(process.argv.length < 3){
        console.log("no url");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("too many arguments");
        process.exit(1);
    }
    const baseURL = process.argv[2];

    crawlPage(baseURL);

    console.log(`start crawling of ${baseURL}`);

}

main();