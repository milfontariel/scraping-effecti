export function Biddings({ biddings }) {

    if (biddings.length < 1) {
        return (
            <p className="mt-20">Nenhum resultado encontrado</p>
        )
    }

    return (
        <table className="box-border w-3/4 mt-8 mx-auto">
            {
                biddings.map(bidding => {
                    return (
                        <tbody key={bidding.ref} className="border-t-[1px] border-gray-100">
                            <tr>
                                <td>
                                    <a
                                        className="cursor-pointer text-white underline"
                                        onClick={() => console.log(bidding.ref)}>
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