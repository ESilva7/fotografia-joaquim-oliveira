/* =========================================================================
   DADOS DO SITE  —  EDITE ESTE FICHEIRO PARA PERSONALIZAR TUDO
   -------------------------------------------------------------------------
   Tudo o que precisa de mudar (contactos, fotos, posters e preços) está
   aqui. Não precisa de tocar no resto do código.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1) INFORMAÇÃO GERAL / CONTACTOS
   ------------------------------------------------------------------------- */
const SITE = {
  name: "Joaquim Oliveira",
  brand: "Fotografia Joaquim Oliveira",
  tagline: "A luz certa, o instante exato.",
  // Telefone para encomendas via WhatsApp — formato internacional SEM "+" e SEM espaços.
  // Exemplo Portugal: 3519XXXXXXXX   |   Exemplo Brasil: 5511XXXXXXXXX
  whatsapp: "351900000000",
  email: "geral@fotografiajoaquimoliveira.pt",
  location: "Porto, Portugal",
  currency: "€",
  social: {
    facebook: "https://www.facebook.com/FotografiaJoaquimOliveira",
    instagram: "https://www.instagram.com/",
  },
};

/* -------------------------------------------------------------------------
   2) GALERIA — fotografias disponíveis em poster
   - category: usada nos filtros (deve coincidir com FILTERS abaixo)
   - src: caminho da imagem dentro de assets/images/
   - title / meta: texto que aparece no lightbox
   - ratio: proporção (largura / altura) para a galeria reservar o espaço certo
   ------------------------------------------------------------------------- */
const FILTERS = [
  { id: "todos",    label: "Todos" },
  { id: "porto",    label: "Porto" },
  { id: "mar",      label: "Mar & Costa" },
  { id: "natureza", label: "Natureza" },
  { id: "ceu",      label: "Céu" },
];

const GALLERY = [
  { src: "assets/images/portonoturno.jpg",     category: "porto",    title: "Porto à Noite",       meta: "Porto · à noite",       ratio: "3 / 2"  },
  { src: "assets/images/porto.jpg",            category: "porto",    title: "O Porto",             meta: "Porto · skyline",       ratio: "8 / 5"  },
  { src: "assets/images/ribeira.jpg",          category: "porto",    title: "Ribeira",             meta: "Porto · beira-rio",     ratio: "3 / 4"  },
  { src: "assets/images/rebelos.jpg",          category: "porto",    title: "Barcos Rabelos",      meta: "Douro · tradição",      ratio: "16 / 9" },
  { src: "assets/images/sjoao.jpg",            category: "porto",    title: "Noite de São João",   meta: "Porto · festa",         ratio: "3 / 4"  },
  { src: "assets/images/barco.jpg",            category: "mar",      title: "Mar Adentro",         meta: "Mar · barco",           ratio: "16 / 9" },
  { src: "assets/images/farol_porsol.jpg",     category: "mar",      title: "Farol ao Entardecer", meta: "Costa · farol",         ratio: "16 / 9" },
  { src: "assets/images/spedra.jpg",           category: "mar",      title: "Senhora da Pedra",    meta: "Costa · capela",        ratio: "4 / 5"  },
  { src: "assets/images/spedraporsol.jpg",     category: "mar",      title: "Pedra Dourada",       meta: "Costa · pôr do sol",    ratio: "9 / 4"  },
  { src: "assets/images/tempestadespedra.jpg", category: "mar",      title: "Tempestade",          meta: "Costa · tempestade",    ratio: "4 / 5"  },
  { src: "assets/images/ave.jpg",              category: "natureza", title: "Em Voo",              meta: "Natureza · ave",        ratio: "4 / 5"  },
  { src: "assets/images/borboleta.jpg",        category: "natureza", title: "Borboleta",           meta: "Natureza · macro",      ratio: "4 / 3"  },
  { src: "assets/images/louvadeus.jpg",        category: "natureza", title: "Louva-a-Deus",        meta: "Natureza · macro",      ratio: "4 / 3"  },
  { src: "assets/images/girassois.jpg",        category: "natureza", title: "Girassóis",           meta: "Natureza · verão",      ratio: "3 / 2"  },
  { src: "assets/images/lua.jpg",              category: "ceu",      title: "Lua Cheia",           meta: "Céu · lua",             ratio: "3 / 4"  },
  { src: "assets/images/lua2.jpg",             category: "ceu",      title: "Luar",                meta: "Céu · lua",             ratio: "3 / 4"  },
  { src: "assets/images/luacrescente.jpg",     category: "ceu",      title: "Lua Crescente",       meta: "Céu · lua",             ratio: "3 / 4"  },
  { src: "assets/images/porsol.jpg",           category: "ceu",      title: "Pôr do Sol",          meta: "Céu · entardecer",      ratio: "4 / 5"  },
  { src: "assets/images/aviao.jpg",            category: "ceu",      title: "Rasto no Céu",        meta: "Céu · voo",             ratio: "4 / 5"  },
];

/* -------------------------------------------------------------------------
   3) LOJA — POSTERS À VENDA (em destaque)
   - Cada poster reaproveita uma foto e oferece vários tamanhos.
   - sizes: { label, price }  (preço em número, sem símbolo)
   ------------------------------------------------------------------------- */
const POSTER_SIZES = [
  { label: "30 × 40 cm", price: 29 },
  { label: "50 × 70 cm", price: 49 },
  { label: "61 × 91 cm", price: 69 },
  { label: "70 × 100 cm", price: 99 },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Porto à Noite",
    image: "assets/images/portonoturno.jpg",
    desc: "A cidade e o rio refletidos ao cair da noite.",
    badge: "Mais procurado",
    sizes: POSTER_SIZES,
  },
  {
    id: "p2",
    name: "O Porto",
    image: "assets/images/porto.jpg",
    desc: "A vista clássica sobre a cidade e o Douro.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p3",
    name: "Pôr do Sol na Pedra",
    image: "assets/images/spedraporsol.jpg",
    desc: "A capela da Senhora da Pedra ao entardecer.",
    badge: "Edição limitada",
    sizes: POSTER_SIZES,
  },
  {
    id: "p4",
    name: "Girassóis",
    image: "assets/images/girassois.jpg",
    desc: "Um campo dourado em plena luz de verão.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p5",
    name: "Lua Cheia",
    image: "assets/images/lua.jpg",
    desc: "A lua em detalhe, suspensa no céu da noite.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p6",
    name: "Ribeira",
    image: "assets/images/ribeira.jpg",
    desc: "As casas típicas à beira-rio, no coração do Porto.",
    badge: "Novo",
    sizes: POSTER_SIZES,
  },
];
