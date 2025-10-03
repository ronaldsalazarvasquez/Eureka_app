# 🌟 Proyecto Eureka

**Eureka** es una plataforma web para la gestión y exposición de proyectos estudiantiles universitarios. Permite a estudiantes, docentes y administradores visualizar, filtrar, subir, comentar y evaluar proyectos de innovación en un entorno moderno y colaborativo, con sistema de autenticación basado en roles.

## ✨ Características principales

### 🔐 Sistema de autenticación con roles
- **Administrador**: Gestión completa de proyectos (aprobar, rechazar, cambiar estados).
- **Estudiante**: Subir proyectos, comentar, calificar y explorar el repositorio.

### 🗂 Exploración de proyectos
- **Grid responsivo** con tarjetas (cards) de proyectos.
- **Filtros avanzados** por categoría, campus y búsqueda por texto.
- **Ordenamiento** por fecha de envío.

### 📄 Detalle completo del proyecto
- Modal centrado con información detallada:
  - Descripción completa
  - Problemática que resuelve
  - Impacto esperado
  - Tecnologías utilizadas
  - Historial de aprobación
  - Enlace al repositorio de GitHub
  - Sistema de comentarios con hilos (replies)

### ⭐ Sistema de feedback interactivo
- Calificación con estrellas (rating).
- Contador de vistas y valoraciones.
- Comentarios anidados con respuestas.

### 👤 Perfiles de autores
- Modal con CV digital de cada autor.
- Listado de proyectos realizados por el autor.
- Avatar y descripción personalizada.

### ➕ Subida de proyectos
- Formulario validado con campos obligatorios.
- Registro automático de estado inicial (Uploaded).
- Historial de cambios de estado.

### 📊 Dashboard administrativo
- Vista consolidada de todos los proyectos.
- Estadísticas por estado (Aprobados, En Revisión, Subidos).
- Gestión rápida de estados de proyectos.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **React 18** | Framework principal |
| **TypeScript** | Tipado estático |
| **Vite** | Build tool y dev server |
| **TailwindCSS** | Estilos y diseño responsivo |
| **React Hooks** | Gestión de estado (`useState`, `useEffect`, `useCallback`) |
| **Heroicons & SVG** | Iconografía personalizada |

### Datos mockeados (preparado para backend)
- `constants.tsx` → MOCK_PROJECTS, MOCK_AUTHORS
- `users.json` → Autenticación local

---

## 📦 Instalación y ejecución local

### Prerequisitos
- **Node.js** v18 o superior
- **npm** o **yarn**

1. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`

