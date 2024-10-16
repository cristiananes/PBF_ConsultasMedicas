const { VITE_API_URL } = import.meta.env;

export const useDoctorData = async ({ userId, authToken }) => {
    try {
        // Obtenemos la respuesta del servidor para la ruta específica del doctor.
        const res = await fetch(`${VITE_API_URL}/api/doctor/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: authToken,
            },
        });

        // Obtenemos el body de la respuesta.
        const body = await res.json();
        console.log(body);

        // Si hay algún error, lanzamos una excepción.
        if (body.status === 'error') {
            throw new Error(body.message);
        }

        // Almacenamos los datos del doctor.
        console.log(body.data.doctorData);

        return body.data.doctorData;
    } catch (err) {
        return err.message;
    }
};
