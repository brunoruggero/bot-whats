const puppeteer = require("puppeteer");

(async function main(){
    try {
     
        //configuração do puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

        //chamada whatsapp web
        await page.goto("https://web.whatsapp.com/");

        await page.waitForSelector("._2_1wd");
        await delay(5000);

        //pegar o nome do contato
        const contactName = ""; //Informar o contato para envio da mensagem, não pode ter emoji no nome do contato.
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector(".OTBsx");

        //encontrar barra de mensagem e focar
        const editor = await page.$("div[tabindex='-1']");
        await editor.focus();

        //quantidade de mensagem a ser enviadas
        const amountOfMessages = 5;

        //loop responsável pelo envio da mensagem
        for(var i = 0; i < amountOfMessages; i++){
            await page.evaluate(() => {
                const message = "teste de boot";
                document.execCommand("insertText", false, message);
            });
            await page.click("span[data-testid='send']");
            await delay(500);
        }
        
    } catch (e) {
        console.error("error mine", e);
    }
})();

function delay(time){
    return new Promise(function (resolve){
        setTimeout(resolve, time);
    });
}