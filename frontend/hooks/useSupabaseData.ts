import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const useSupabaseData = (table) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedData, error } = await supabase
                .from(table)
                .select('*');

            if (error) console.error('Error fetching data:', error);
            else setData(fetchedData);

            setLoading(false);
        };

        fetchData();

        const subscription = supabase
            .from(`${table}`)
            .on('*', (payload) => {
                console.log('Change received!', payload);
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeSubscription(subscription);
        };
    }, [table]);

    return { data, loading };
};

export default useSupabaseData;