const { VITE_API_URL } = import.meta.env;
export const getDoctors = async ({ authToken }) => {
    try {
        // Obtenmemos una respuesta del servidor.
        const res = await fetch(
            `${VITE_API_URL}/api/users/doctors`, {
            method: 'get',
            headers: {
                Authorization: authToken
            }
        }
        );

        // Obtenemos el body de la ruta anteriormete seleccionada (entiendo).
        const body = await res.json();

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }

        // Almacenamos los doctores.
        //era data.user no data.doctors
        return body.data.users;
    } catch (err) {
        return err.message;
    }
}