const { VITE_API_URL } = import.meta.env;

export const fetchReplies = async (consultId, authToken) => {
    try {
        const res = await fetch(`${VITE_API_URL}/api/replies/${consultId}`, {
            method: 'GET',
            headers: {
                Authorization: authToken,
            },
        });

        const body = await res.json();

        if (body.status === 'error') {
            throw new Error(body.message);
        }

        console.log(body);

        return body.data.answers;
    } catch (err) {
        return err.message;
    }
};
