import { useState } from "react";
import { getBiddingPage } from "../../services/api"

export function Biddings({ biddings }) {

    if (biddings.length < 1) {
        return (
            <p className="mt-20">Nenhum resultado encontrado</p>
        )
    }

    async function handleBiddingPage(ref) {
        try {
            const response = await getBiddingPage(ref);
            const win = window.open("about:blank", "_blank");
            win.document.write(response);
            win.document.close();
            const storage = JSON.parse(localStorage.getItem('biddingsOpen'));
            localStorage.setItem('biddingsOpen', JSON.stringify({ ...storage, [ref]: ref }));
            setUnfold({ ...unfold, [ref]: ref });
        } catch (error) {
            console.error(error);
        }
    }

    const [unfold, setUnfold] = useState(JSON.parse(localStorage.getItem('biddingsOpen')));

    console.log(localStorage.getItem('biddingsOpen'));
    return (
        <table className="box-border w-3/4 mt-8 mx-auto">
            {
                biddings.map(bidding => {
                    const viewed = unfold[bidding.ref] ? true : false;
                    return (
                        <tbody key={bidding.ref} className={`border-t-[1px] border-gray-100 ${viewed ? 'bg-green-800' : 'bg-slate-700'}`}>
                            <tr>
                                <td>
                                    <a
                                        className="cursor-pointer text-white underline"
                                        onClick={() => handleBiddingPage(bidding.ref)}>
                                        {bidding.titulo}
                                    </a>
                                </td>
                                <td>{bidding.data}</td>
                                <td>{bidding.etapa}</td>
                                <td>{bidding.numProcesso}</td>
                                <td>{bidding.modalidade}</td>
                                <td>{bidding.comissao}</td>
                                <td>{bidding.licitacao}</td>
                                <td>{bidding.numSolicitacaoCompra}</td>
                                <td>{bidding.valorEstimado}</td>
                            </tr>
                        </tbody>
                    )
                })
            }
        </table>
    )
}