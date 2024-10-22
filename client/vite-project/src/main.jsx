import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Importamos el componente que nos permite activar la paginación (las rutas o endpoints).
import { BrowserRouter } from 'react-router-dom';

// Importamos el componente provider que maneja el token del usuario.
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
