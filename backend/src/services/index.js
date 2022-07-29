import puppeteer from "puppeteer";
import fs from 'fs';

export async function getBiddingsWithKeyword(busca) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/Licitacoes.php');
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/ConsLicitacoesAndamento.php');

    await page.evaluate((busca) => {
        function enviar(valor, botao, texto) {
            document.querySelector("#txtObjeto").value = texto;
            var valorForm = $('.formSubmit').val();
            $('input[name=' + botao + ']').val(valor);
            $('form[name=' + valorForm + ']').submit();
        }

        enviar('Pesquisa', 'Botao', busca);
    }, busca);

    try {
        await page.waitForSelector(
            "body > div > div.site-body > div > div.content > div > div > section > div > section:nth-child(5) > table", {
            timeout: 5000,
            visible: true
        });
    } catch (error) {
        await browser.close();
        return 'nada encontrado'
    }

    const response = () => {
        return page.evaluate(async () => {
            return await new Promise((resolve) => {
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
                resolve(array);
            })
        })
    }


    const result = await response();

    fs.writeFile('result.json', JSON.stringify(result, null, 2), err => {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    await browser.close();
    return result;
};

export async function loadBidding(ref) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/Licitacoes.php');
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/ConsLicitacoesAndamento.php');

    await page.evaluate(() => {
        function enviar(valor, botao, texto) {
            document.querySelector("#txtObjeto").value = texto;
            var valorForm = $('.formSubmit').val();
            $('input[name=' + botao + ']').val(valor);
            $('form[name=' + valorForm + ']').submit();
        }
        enviar('Pesquisa', 'Botao', '');
    });

    try {
        await page.waitForSelector(
            "body > div > div.site-body > div > div.content > div > div > section > div > section:nth-child(5) > table", {
            timeout: 5000,
            visible: true
        });
    } catch (error) {
        await browser.close();
        return 'nada encontrado'
    }

    await page.evaluate((ref) => {
        function carregaProcesso(valor) {
            document.Acomp.Botao.value = 'carregaProcesso';
            document.Acomp.carregaProcesso.value = valor;
            document.Acomp.submit();
        }
        carregaProcesso(ref);
    }, ref);

    await page.waitForSelector("body > div > div.site-body > div > div.content > div > div > section > div > article:nth-child(3) > section:nth-child(2) > table");

    const response = () => {
        return page.evaluate(async () => {
            return await new Promise((resolve) => {
                const html = document.querySelector("body > div > div.site-body > div > div.content > div > div > section > div > article:nth-child(3) > section:nth-child(2) > table").outerHTML;
                resolve(html)
            })
        })
    }

    const result = await response();

    fs.writeFile('result.html', result, err => {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    await browser.close();

    return result;
}

loadBidding('1-25-2022-1-6')