import { useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env;

export const useReplies = (consultId, authToken) => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const res = await fetch(
                    `${VITE_API_URL}/api/replies/${consultId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );

                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Almacenamos las respuestas
                setAnswers(body.data.answers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [consultId, authToken]);

    return { answers, loading, error };
};
