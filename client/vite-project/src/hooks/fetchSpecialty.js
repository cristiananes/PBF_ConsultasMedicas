const { VITE_API_URL } = import.meta.env;

export const fetchSpecialties = async (authToken) => {
    try {
        const res = await fetch(`${VITE_API_URL}/api/specialties`, {
            method: 'GET',
            headers: {
                Authorization: authToken,
            },
        });

        const body = await res.json();

        if (body.status === 'error') {
            throw new Error(body.message);
        }

        return body.specialities;
    } catch (err) {
        console.error('Error fetching specialties:', err);
        return [];
    }
};
