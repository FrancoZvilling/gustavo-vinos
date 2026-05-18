export const articles = [
  {
    id: 1,
    slug: 'malbec-argentino-guia-definitiva',
    title: 'Malbec Argentino: La Guía Definitiva',
    subtitle: 'Todo lo que necesitás saber sobre la cepa insignia de Argentina',
    category: 'tintos',
    categoryLabel: 'Tintos',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    excerpt: 'El Malbec encontró en la Argentina su tierra prometida. Desde Mendoza hasta la Patagonia, esta cepa de origen francés se transformó en el emblema de la vitivinicultura nacional.',
    content: `
      <p>El Malbec es mucho más que una cepa: es una declaración de identidad. Originaria del suroeste de Francia, donde se la conoce como Côt, esta variedad encontró en los suelos argentinos —especialmente en Mendoza— las condiciones ideales para expresar su máximo potencial.</p>
      
      <h2>Historia y Origen</h2>
      <p>Llegó a la Argentina en 1853 de la mano del agrónomo francés Michel Pouget. Lo que comenzó como un experimento se convirtió en una revolución. Hoy, Argentina es el mayor productor de Malbec del mundo, con más de 40.000 hectáreas plantadas.</p>
      
      <h2>Perfil Sensorial</h2>
      <p>En nariz, el Malbec argentino ofrece aromas intensos a frutos rojos maduros —ciruelas, moras, cerezas negras— con notas de violetas y, cuando pasa por barrica, toques de vainilla, chocolate y tabaco. En boca, es carnoso, con taninos redondos y una acidez equilibrada que invita a seguir bebiendo.</p>
      
      <h2>Regiones Destacadas</h2>
      <p>Si bien Mendoza concentra el 85% de la producción, cada subregión aporta su carácter único: Luján de Cuyo ofrece elegancia y estructura; el Valle de Uco, frescura y mineralidad a gran altitud; y la Patagonia sorprende con vinos de acidez vibrante y carácter atlántico.</p>
      
      <h2>Maridajes Ideales</h2>
      <p>El Malbec es el compañero perfecto del asado argentino, pero su versatilidad va mucho más allá. Funciona de maravilla con carnes rojas a la parrilla, cordero, pasta con salsas de tomate, pizzas artesanales y quesos semi-duros como el provolone.</p>
    `,
    author: {
      name: 'Martín Arce',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      role: 'Sommelier & Editor'
    },
    date: '2025-05-10',
    readTime: 8,
    featured: true,
    relatedIds: [2, 3, 5],
  },
  {
    id: 2,
    slug: 'maridaje-perfecto-carne-vino',
    title: 'El Arte del Maridaje: Carne y Vino',
    subtitle: 'Cómo elegir el vino perfecto para cada corte',
    category: 'maridaje',
    categoryLabel: 'Maridaje',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    excerpt: 'Descubrí las combinaciones que transforman una simple comida en una experiencia gastronómica inolvidable. La ciencia y el arte detrás del maridaje perfecto.',
    content: `
      <p>El maridaje no es una ciencia exacta, pero sí un arte que puede elevarse con conocimiento y práctica. La clave está en entender cómo los componentes del vino —acidez, taninos, cuerpo y dulzor— interactúan con los sabores de la comida.</p>
      
      <h2>Principios Básicos</h2>
      <p>La regla de oro es buscar el equilibrio: un plato con mucha grasa necesita un vino con buena acidez para "limpiar" el paladar. Un corte magro pide taninos más suaves. Y la intensidad del plato debe coincidir con la intensidad del vino.</p>
      
      <h2>Cortes y sus Vinos</h2>
      <p><strong>Bife de chorizo:</strong> Malbec con cuerpo medio, que acompañe sin opacar. <strong>Entraña:</strong> Un Cabernet Franc fresco y especiado. <strong>Ojo de bife:</strong> Cabernet Sauvignon con estructura y taninos firmes. <strong>Cordero:</strong> Pinot Noir de la Patagonia, elegante y con buena acidez.</p>
    `,
    author: {
      name: 'Lucía Fontana',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      role: 'Chef & Crítica Gastronómica'
    },
    date: '2025-05-08',
    readTime: 6,
    featured: true,
    relatedIds: [1, 4, 6],
  },
  {
    id: 3,
    slug: 'vinos-blancos-verano',
    title: 'Blancos para el Verano Porteño',
    subtitle: 'Frescura y elegancia para los días de calor',
    category: 'blancos',
    categoryLabel: 'Blancos',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    excerpt: 'Cuando el termómetro sube en Buenos Aires, nada mejor que un blanco bien frío. Nuestra selección de los mejores blancos argentinos para sobrevivir al verano.',
    content: `
      <p>El verano en Buenos Aires pide a gritos un buen vino blanco. Atrás quedaron los días en que los blancos argentinos eran sinónimo de mediocridad. Hoy, bodegas de todo el país producen blancos de clase mundial.</p>
      
      <h2>Torrontés: El Embajador</h2>
      <p>Originario de Salta, el Torrontés es el blanco insignia de Argentina. Aromático, floral, con notas a rosas y duraznos. Servido bien frío (8-10°C), es el aperitivo perfecto para las tardes de verano en la terraza.</p>
      
      <h2>Sauvignon Blanc del Valle de Uco</h2>
      <p>La altitud le da a estos Sauvignon Blanc una frescura y una mineralidad que los distingue. Cítricos, herbáceos, con una acidez que corta como un cuchillo. Ideal con ceviches y sushi.</p>
    `,
    author: {
      name: 'Martín Arce',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      role: 'Sommelier & Editor'
    },
    date: '2025-05-05',
    readTime: 5,
    featured: false,
    relatedIds: [1, 5, 6],
  },
  {
    id: 4,
    slug: 'alta-cocina-buenos-aires',
    title: 'Alta Cocina en Buenos Aires: Revolución Culinaria',
    subtitle: 'Los chefs que están redefiniendo la gastronomía porteña',
    category: 'alta-cocina',
    categoryLabel: 'Alta Cocina',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    excerpt: 'Buenos Aires vive una explosión gastronómica. Nuevos restaurantes, conceptos innovadores y chefs que fusionan lo clásico con lo contemporáneo están posicionando a la ciudad como destino culinario global.',
    content: `
      <p>La escena gastronómica de Buenos Aires está en su mejor momento. Una nueva generación de chefs, formados en las mejores cocinas del mundo y con un profundo respeto por los ingredientes locales, está redefiniendo lo que significa comer bien en la capital argentina.</p>
      
      <h2>La Nueva Ola</h2>
      <p>Restaurantes como Don Julio, Aramburu y Proper no solo aparecen en las listas internacionales: están contando una historia. La historia de una cocina que honra la tradición del asado y la pasta casera, pero que no le teme a la innovación.</p>
    `,
    author: {
      name: 'Lucía Fontana',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      role: 'Chef & Crítica Gastronómica'
    },
    date: '2025-05-01',
    readTime: 7,
    featured: true,
    relatedIds: [2, 5, 6],
  },
  {
    id: 5,
    slug: 'entrevista-sommelier-mendoza',
    title: 'Entrevista: Un Sommelier en las Alturas de Mendoza',
    subtitle: 'Conversamos con Diego Flores sobre el futuro del vino argentino',
    category: 'entrevistas',
    categoryLabel: 'Entrevistas',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80',
    excerpt: 'Diego Flores lleva 20 años recorriendo viñedos. Desde su base en el Valle de Uco, nos comparte su visión sobre las tendencias, los desafíos y el futuro del vino argentino.',
    content: `
      <p><strong>TERROIR:</strong> Diego, ¿cómo ves el presente del vino argentino?</p>
      <p><strong>Diego Flores:</strong> Estamos viviendo un momento increíble. Hay una generación de enólogos jóvenes que están experimentando con cepas olvidadas, con vinificaciones naturales, con terruños que nadie había explorado. El resultado es una diversidad de estilos que no existía hace 15 años.</p>
      
      <h2>Sobre las Tendencias</h2>
      <p><strong>TERROIR:</strong> ¿Qué tendencias ves con más fuerza?</p>
      <p><strong>DF:</strong> Sin duda, los vinos de menor intervención. No hablo necesariamente de vinos "naturales" en el sentido estricto, sino de una filosofía de respeto por la uva y el terruño. También veo mucho interés en las cepas criollas, que son históricamente las más plantadas pero las menos valoradas.</p>
    `,
    author: {
      name: 'Martín Arce',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      role: 'Sommelier & Editor'
    },
    date: '2025-04-28',
    readTime: 10,
    featured: false,
    relatedIds: [1, 3, 4],
  },
  {
    id: 6,
    slug: 'cena-perfecta-paso-a-paso',
    title: 'La Cena Perfecta: Paso a Paso',
    subtitle: 'De la selección del menú al último sorbo de vino',
    category: 'maridaje',
    categoryLabel: 'Maridaje',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    excerpt: 'Organizar una cena memorable requiere planificación, buen gusto y un poco de audacia. Te guiamos en cada decisión para que tu próxima velada sea inolvidable.',
    content: `
      <p>Una cena perfecta no se improvisa, pero tampoco tiene que ser una fuente de estrés. Con los ingredientes correctos —literalmente— y un poco de planificación, cualquier anfitrión puede crear una experiencia que sus invitados recordarán por mucho tiempo.</p>
      
      <h2>El Menú</h2>
      <p>La clave está en la coherencia. Elegí un hilo conductor: puede ser una región (toda cocina italiana), un ingrediente (cena temática de hongos) o un estilo (finger food y copas). Lo importante es que cada plato se conecte con el siguiente.</p>
      
      <h2>La Selección de Vinos</h2>
      <p>Para una cena de cuatro pasos, necesitás al menos tres vinos: un espumante para el aperitivo, un blanco para la entrada y un tinto para el plato principal. Si querés lucirte, sumá un dulce natural para el postre.</p>
    `,
    author: {
      name: 'Lucía Fontana',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      role: 'Chef & Crítica Gastronómica'
    },
    date: '2025-04-25',
    readTime: 6,
    featured: false,
    relatedIds: [2, 4, 5],
  },
];
