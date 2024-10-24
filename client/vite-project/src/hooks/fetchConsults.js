const { VITE_API_URL } = import.meta.env;

export const fetchConsults = async ({ authToken }) => {
    try {
        //obtenemos la respuesta del servidor
        const res = await fetch(`${VITE_API_URL}/api/consults`, {
            method: 'get',
            headers: {
                Authorization: authToken,
            },
        });
        //obtenemos el body de la ruta anteriormente seleccionada
        const body = await res.json();
        console.log(body);

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }

        //Almacenamos las consultas
        console.log(body.data.consults);

        return body.data.consults;
    } catch (err) {
        return err.message;
    }
};
