import { Project, Status, Category, Campus, Author } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Sistema de Gestión de Biblioteca Automatizado',
    author: 'Ana Torres',
    campus: Campus.Lima,
    category: Category.Development,
    status: Status.Approved,
    problem: 'Las bibliotecas universitarias enfrentan dificultades en la gestión manual de préstamos y devoluciones, generando largas colas y errores en el inventario.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    expectedImpact: 'Reducir el tiempo de espera de los estudiantes en un 50% y mejorar la precisión del inventario de libros al 99%.',
    description: 'Una aplicación web completa para que los bibliotecarios gestionen el catálogo y los miembros, y para que los estudiantes puedan buscar, reservar y renovar libros en línea.',
    githubUrl: 'https://github.com/example/library-system',
    views: 1258,
    rating: 4.8,
    ratingsCount: 150,
    submissionDate: '2023-09-01',
    approvalHistory: [
      { status: Status.Uploaded, date: '2023-09-01' },
      { status: Status.InReview, date: '2023-09-05' },
      { status: Status.Approved, date: '2023-09-15' },
    ],
    comments: [
        {
            id: 'c1-1',
            author: 'Carlos Vega',
            text: '¡Excelente proyecto, Ana! La arquitectura parece muy sólida. ¿Consideraron usar WebSockets para notificaciones en tiempo real?',
            timestamp: new Date('2023-09-16T10:00:00Z').toISOString(),
            replies: [
                {
                    id: 'c1-2',
                    author: 'Ana Torres',
                    text: '¡Gracias, Carlos! Sí, lo estuvimos evaluando. Por ahora nos enfocamos en el core con peticiones HTTP, pero definitivamente es el siguiente paso para mejorar la UX.',
                    timestamp: new Date('2023-09-16T11:30:00Z').toISOString(),
                },
                 {
                    id: 'c1-3',
                    author: 'Admin User',
                    text: 'Gran iniciativa. Asegúrense de documentar bien la API para futuras integraciones. Aprobado.',
                    timestamp: new Date('2023-09-15T14:00:00Z').toISOString(),
                }
            ]
        }
    ]
  },
  {
    id: 2,
    title: 'Red Neuronal para Detección de Enfermedades en Cultivos',
    author: 'Carlos Vega',
    campus: Campus.Arequipa,
    category: Category.Technology,
    status: Status.Approved,
    problem: 'Los agricultores locales pierden una parte significativa de sus cosechas debido a enfermedades que no se detectan a tiempo.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    expectedImpact: 'Proveer una herramienta de bajo costo que permita a los agricultores identificar enfermedades en sus plantas con un 95% de precisión usando sus teléfonos móviles.',
    description: 'Un modelo de aprendizaje profundo entrenado con miles de imágenes de hojas de plantas para clasificar diversas enfermedades comunes en la región. La app móvil permite tomar una foto y obtener un diagnóstico instantáneo.',
    githubUrl: 'https://github.com/example/crop-disease-detection',
    views: 3420,
    rating: 4.9,
    ratingsCount: 230,
    submissionDate: '2023-10-10',
    approvalHistory: [
      { status: Status.Uploaded, date: '2023-10-10' },
      { status: Status.InReview, date: '2023-10-12' },
      { status: Status.Approved, date: '2023-10-25' },
    ],
    comments: [],
  },
  {
    id: 3,
    title: 'Plataforma de Tutorías Peer-to-Peer',
    author: 'Sofia Mendez',
    campus: Campus.Cusco,
    category: Category.Development,
    status: Status.InReview,
    problem: 'Estudiantes de primeros ciclos tienen dificultades con materias complejas y no siempre pueden acceder a tutorías personalizadas.',
    technologies: ['Vue.js', 'Firebase', 'Stripe API'],
    expectedImpact: 'Conectar a más de 500 estudiantes con tutores avanzados, mejorando las tasas de aprobación en cursos clave en un 15%.',
    description: 'Una plataforma que permite a los estudiantes avanzados ofrecer sus servicios como tutores y a los estudiantes de ciclos inferiores encontrar y agendar sesiones de estudio.',
    githubUrl: 'https://github.com/example/p2p-tutoring',
    views: 450,
    rating: 4.5,
    ratingsCount: 45,
    submissionDate: '2024-03-05',
    approvalHistory: [
      { status: Status.Uploaded, date: '2024-03-05' },
      { status: Status.InReview, date: '2024-03-07' },
    ],
  },
  {
    id: 4,
    title: 'Diseño de Puente Peatonal Sostenible',
    author: 'Luis Ramos',
    campus: Campus.Trujillo,
    category: Category.Engineering,
    status: Status.Uploaded,
    problem: 'Una comunidad local está aislada del centro de la ciudad por un río, dificultando el acceso a servicios básicos, especialmente durante la temporada de lluvias.',
    technologies: ['AutoCAD', 'SAP2000', 'Materiales Reciclados'],
    expectedImpact: 'Mejorar la calidad de vida de más de 200 familias, garantizando un paso seguro y reduciendo los tiempos de viaje en un 70%.',
    description: 'El proyecto consiste en el diseño estructural completo de un puente peatonal utilizando principalmente materiales reciclados y de bajo impacto ambiental. Se incluyen planos, análisis de cargas y presupuesto.',
    githubUrl: 'https://github.com/example/sustainable-bridge',
    views: 120,
    rating: 0,
    ratingsCount: 0,
    submissionDate: '2024-04-20',
    approvalHistory: [
        { status: Status.Uploaded, date: '2024-04-20' },
    ],
  },
   {
    id: 5,
    title: 'Marketplace de Productos Artesanales Locales',
    author: 'Maria Quispe',
    campus: Campus.Cusco,
    category: Category.Development,
    status: Status.Approved,
    problem: 'Los artesanos de la región de Cusco tienen dificultades para alcanzar un mercado más amplio y dependen en gran medida del turismo presencial.',
    technologies: ['React Native', 'Firebase Firestore', 'Google Cloud Functions'],
    expectedImpact: 'Incrementar las ventas de los artesanos locales en un 40% al proporcionarles una vitrina digital accesible a nivel nacional e internacional.',
    description: 'Una aplicación móvil para iOS y Android que permite a los artesanos registrarse, subir sus productos, gestionar ventas y envíos. Los compradores pueden explorar productos por categoría, artesano o región.',
    githubUrl: 'https://github.com/example/artisan-marketplace',
    views: 2100,
    rating: 4.7,
    ratingsCount: 180,
    submissionDate: '2023-11-15',
    approvalHistory: [
      { status: Status.Uploaded, date: '2023-11-15' },
      { status: Status.InReview, date: '2023-11-18' },
      { status: Status.Approved, date: '2023-11-28' },
    ],
  },
  {
    id: 6,
    title: 'Sistema de Monitoreo de Calidad del Aire con IoT',
    author: 'Jorge Paredes',
    campus: Campus.Piura,
    category: Category.Technology,
    status: Status.InReview,
    problem: 'La ciudad de Piura carece de un sistema de monitoreo de la calidad del aire en tiempo real, lo que impide tomar medidas preventivas contra la contaminación.',
    technologies: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'Arduino'],
    expectedImpact: 'Proporcionar datos abiertos y en tiempo real sobre la calidad del aire para que ciudadanos e instituciones puedan tomar decisiones informadas.',
    description: 'Una red de sensores de bajo costo distribuidos por la ciudad que miden partículas PM2.5, CO2 y otros contaminantes. Los datos se envían a un servidor central y se visualizan en un dashboard público.',
    githubUrl: 'https://github.com/example/air-quality-iot',
    views: 890,
    rating: 4.6,
    ratingsCount: 95,
    submissionDate: '2024-02-12',
    approvalHistory: [
      { status: Status.Uploaded, date: '2024-02-12' },
      { status: Status.InReview, date: '2024-02-14' },
    ],
  },
];

export const MOCK_AUTHORS: Author[] = [
    {
        name: 'Ana Torres',
        description: 'Estudiante de 9º ciclo de Ingeniería de Software en la Sede Lima. Apasionada por el desarrollo web full-stack y la creación de soluciones escalables que impacten positivamente en la sociedad. Experiencia en metodologías ágiles y DevOps.',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    {
        name: 'Carlos Vega',
        description: 'Investigador y estudiante de doctorado en Ciencias de la Computación en Arequipa. Mi enfoque es la aplicación de la inteligencia artificial y el machine learning para resolver problemas en la agricultura y el medio ambiente. Co-fundador del club de IA de la universidad.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
    },
    {
        name: 'Sofia Mendez',
        description: 'Estudiante de Ingeniería de Sistemas en la Sede Cusco. Me especializo en el desarrollo front-end y la experiencia de usuario (UX/UI). Creo que la tecnología debe ser intuitiva, accesible y centrada en las personas. Me encanta el senderismo y la fotografía en mis tiempos libres.',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
    },
     {
        name: 'Luis Ramos',
        description: 'Futuro Ingeniero Civil de la Sede Trujillo. Mi interés se centra en la ingeniería estructural y el uso de materiales sostenibles para crear infraestructura resiliente y amigable con el medio ambiente. Busco aplicar mis conocimientos para mejorar las comunidades rurales.',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop'
    },
    {
        name: 'Maria Quispe',
        description: 'Emprendedora y estudiante de Desarrollo de Software en Cusco. Me motiva usar la tecnología para potenciar las economías locales y preservar la cultura. Mi objetivo es crear plataformas que conecten a productores y consumidores de manera justa y transparente.',
        avatarUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee864a?q=80&w=1887&auto=format&fit=crop'
    },
    {
        name: 'Jorge Paredes',
        description: 'Estudiante de Ingeniería Electrónica en la Sede Piura, con un profundo interés en el Internet de las Cosas (IoT) y los sistemas embebidos. Me gusta diseñar y construir hardware que pueda recopilar datos del mundo real para generar un impacto positivo.',
        avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop'
    },
    {
        name: 'John Doe',
        description: 'Estudiante de Ingeniería de Sistemas enfocado en la ciberseguridad y el desarrollo de aplicaciones seguras. Busco constantemente aprender nuevas tecnologías y aplicarlas en proyectos desafiantes. Entusiasta de los CTF y la programación competitiva.',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop'
    },
    {
        name: 'Admin User',
        description: 'Coordinador Académico del Departamento de Innovación. Mi rol es supervisar y guiar los proyectos de los estudiantes, asegurando la calidad y fomentando la colaboración interdisciplinaria. Creo firmemente en el potencial de nuestros estudiantes para generar un cambio real.',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop'
    }
];


export const GithubIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export const StarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export const ImpactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
);

export const ProblemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

export const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const LogoutIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

export const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path>
    </svg>
);

export const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

export const ChartPieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>
);

export const BuildingOfficeIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        <line x1="9" y1="9" x2="9" y2="22"></line>
     </svg>
);

export const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
);

export const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.48 3.48 0 0 1 9 19.5V22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21A3.48 3.48 0 0 0 15 19.5V22"></path>
        <path d="M9.17 9a3 3 0 0 0-2.34 1.13L6 11.5V13a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-1.5l-.83-1.37A3 3 0 0 0 14.83 9H9.17Z"></path>
    </svg>
);

export const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

export const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
);