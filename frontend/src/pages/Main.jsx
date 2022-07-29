import { useEffect } from 'react';
import { Biddings } from '../components/Biddings';
import { getBiddings } from '../services/api';
import mainContext from '../hooks/useMain';
import { useState } from 'react';
import { InputSearch } from '../components/InputSearch';
import { Spinner } from '../components/Spinner';

export function Main() {

    const { biddings, setBiddings } = mainContext();
    const [search, setSearch] = useState('');
    const [att, setAtt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchBiddings(search) {
            try {
                setIsLoading(true);
                const response = await getBiddings(search);
                setBiddings(response);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        try {
            fetchBiddings(search);
        } catch (error) {
            console.error(error);
        }

    }, [att]);

    if (isLoading) {
        return (
            <div className='flex flex-col justify-center items-center gap-3 mt-[200px]'>
                <p>Carregando...</p>
                <Spinner />
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <InputSearch att={att} setAtt={setAtt} search={search} setSearch={setSearch} />
            <Biddings biddings={biddings} />
        </div>
    )
}