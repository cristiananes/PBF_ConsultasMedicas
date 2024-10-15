import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConsultDetail = () => {
  const { id } = useParams(); // Obtén el ID desde los parámetros de la URL
  const [consult, setConsult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama a la API local para obtener los detalles de la consulta
    const fetchConsult = async () => {
      try {
        const response = await fetch(`/api/consults/${id}`);
        if (!response.ok) {
          throw new Error('Consulta no encontrada');
        }
        const data = await response.json();
        setConsult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsult();
  }, [id]);

  const handleAccept = async () => {
    try {
      // Simulación de una llamada a la API para aceptar la consulta
      const response = await fetch(`/api/consults/${id}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al aceptar la consulta');
      }

      const data = await response.json();
      setConsult(data); // Actualiza el estado de la consulta si es necesario
      alert('Consulta aceptada con éxito');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!consult) {
    return <div>No se encontró la consulta</div>;
  }

  return (
    <div>
      <h2>Detalles de la Consulta</h2>
      <p>
        <strong>Nombre:</strong> {consult.name}
      </p>
      <p>
        <strong>Email:</strong> {consult.email}
      </p>
      <p>
        <strong>Mensaje:</strong> {consult.message}
      </p>
      <button onClick={handleAccept}>Aceptar Consulta</button>
    </div>
  );
};

export default ConsultDetail;
