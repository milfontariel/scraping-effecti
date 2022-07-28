import puppeteer from "puppeteer";
import dotenv from 'dotenv';
import path from 'path';
const downloadPath = path.resolve('./download');
import fs, { readdir, stat } from 'fs';
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(process.env.BASE_URL);
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/Licitacoes.php');
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/ConsLicitacoesAndamento.php');

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });

    await page.evaluate(() => {
        function enviar(valor, botao, texto) {
            document.querySelector("#txtObjeto").value = texto;
            var valorForm = $('.formSubmit').val();
            $('input[name=' + botao + ']').val(valor);
            $('form[name=' + valorForm + ']').submit();
        }

        enviar('Pesquisa', 'Botao', 'hospitalar');
    })

    await page.waitForSelector("body > div > div.site-body > div > div.content > div > div > section > div > section:nth-child(5) > table");

    const response = () => {
        return page.evaluate(async () => {
            return await new Promise((resolve) => {
                const items = document.body.querySelectorAll(`body > div > div.site-body > div > div.content > div > div > section > div > section:nth-child(5) > table > tbody tr:last-child`);
                const array = Array.from(document.body.querySelectorAll(`body > div > div.site-body > div > div.content > div > div > section > div > section:nth-child(5) > table > tbody tr:last-child`), e => ({
                    titulo: e.children[0].innerText,
                    ref: e.children[0].children[0].href.replace("javascript:carregaProcesso('", '').replace("');", ''),
                    data: e.children[1].innerText,
                    etapa: e.children[2].innerText,
                    numProcesso: e.children[3].innerText,
                    modalidade: e.children[4].innerText,
                    comissao: e.children[5].innerText,
                    licitacao: e.children[6].innerText,
                    numSolicitacaoCompra: e.children[7].innerText,
                    valorEstimado: e.children[8].innerText,
                }));
                console.log(items);
                resolve(array);
            })
        })
    }


    const teste = await response();
    console.log(teste);


    /* const htmlObject = document.createElement('table');
    htmlObject.innerHTML = teste; */

    fs.writeFile('teste.json', JSON.stringify(teste, null, 2), err => {
        if (err) throw err;
        console.log('File is created successfully.');
    });


    // ******* Funções do documento


    function carregaProcesso(valor) {
        document.Acomp.Botao.value = 'carregaProcesso';
        document.Acomp.carregaProcesso.value = valor;
        document.Acomp.submit();
    }

    // await browser.close();
})();