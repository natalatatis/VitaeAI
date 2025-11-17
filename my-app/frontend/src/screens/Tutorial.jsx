import React from 'react';
import Header from '../components/Header';

const Tutorial = () => {
    return (
        <>
            <Header />
            <div
                style={{
                    maxWidth: '700px',
                    margin: '40px auto',
                    padding: '32px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    lineHeight: 1.7
                }}
            >
                <h1 style={{ marginBottom: '20px' }}>
                    Guía de Uso — Cómo crear tu CV con VitaeAI
                </h1>

                <ol style={{ paddingLeft: '20px' }}>
                    <li>
                        <strong>Crear cuenta o iniciar sesión:</strong> Regístrate o inicia sesión para acceder a todas las funciones y guardar tus CVs en tu espacio personal.
                    </li>

                    <li>
                        <strong>Completar tus datos personales:</strong> Ingresa tu nombre, teléfono, correo y cualquier información básica que aparecerá automáticamente en tus plantillas.
                    </li>

                    <li>
                        <strong>Elegir una plantilla:</strong> En la sección <em>“Crear CV”</em>, selecciona la plantilla que prefieras. Puedes cambiarla más adelante sin perder tu información.
                    </li>

                    <li>
                        <strong>Rellenar la información del CV:</strong> Agrega tu experiencia laboral, educación, habilidades, idiomas, foto y demás información relevante. Todo es editable directamente en la vista previa.
                    </li>

                    <li>
                        <strong>Usar la ayuda con IA:</strong> Si no sabes qué escribir, puedes usar la opción <em>“Ayuda con IA”</em> para que el sistema mejore tus descripciones o genere texto profesional.
                    </li>

                    <li>
                        <strong>Guardar tu CV:</strong> Haz clic en <em>“Guardar CV”</em> para almacenarlo en tu cuenta. Luego podrás editarlo cuando quieras en <em>“Mis CVs”</em>.
                    </li>

                    <li>
                        <strong>Exportar a PDF:</strong> Cuando tu CV esté listo, usa el botón <em>“Descargar PDF”</em> para obtener una copia profesional lista para enviar.
                    </li>
                </ol>

            </div>
        </>
    );
};

export default Tutorial;
