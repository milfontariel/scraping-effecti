export function InputSearch({ att, setAtt, search, setSearch }) {
    return (
        <div className="mt-16 flex gap-5">
            <input className="text-black p-3 px-5 text-center rounded-md text-xl" type="text" placeholder="Inserir palavra-chave" value={search} onChange={e => setSearch(e.target.value)} />
            <button className="p-4 bg-slate-500 rounded-full text-black font-bold" onClick={() => setAtt(!att)}>PESQUISAR</button>
        </div>
    )
}