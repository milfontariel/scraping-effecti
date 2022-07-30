import puppeteer from "puppeteer";
import { createBiddings } from "../repositories/biddingsRepository.ts";

export async function getBiddingsWithKeyword(search) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/Licitacoes.php');
    await page.goto('http://www.recife.pe.gov.br/portalcompras/app/ConsLicitacoesAndamento.php');

    const busca = search ? search : '';

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
            timeout: 10000,
            visible: true
        });
    } catch (error) {
        await browser.close();
        return []
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

    try {
        await createBiddings(result);
        await browser.close();
        return result;
    } catch (error) {
        throw { type: "bad_request" };
    }

};

export async function loadBidding(ref) {
    const browser = await puppeteer.launch({ headless: true });
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
            timeout: 10000,
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
                const html = document.querySelector("*").outerHTML;
                resolve(html)
            })
        })
    }

    const result = await response();

    await browser.close();

    return result;
}