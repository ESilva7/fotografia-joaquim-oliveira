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
  location: "Portugal",
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
   ------------------------------------------------------------------------- */
const FILTERS = [
  { id: "todos",    label: "Todos" },
  { id: "retratos", label: "Retratos" },
  { id: "natureza", label: "Natureza" },
  { id: "urbano",   label: "Urbano" },
  { id: "pb",       label: "Preto & Branco" },
];

// ratio = proporção da foto (largura / altura), para a galeria reservar o espaço certo.
// Use "5 / 7" para vertical, "7 / 5" para horizontal, "1 / 1" para quadrada.
const GALLERY = [
  { src: "assets/images/portrait-01.jpg", category: "retratos", title: "Olhar Sereno",     meta: "Retrato · luz natural",     ratio: "5 / 7" },
  { src: "assets/images/nature-01.jpg",   category: "natureza", title: "Manhã no Vale",    meta: "Paisagem · nascer do sol",  ratio: "7 / 5" },
  { src: "assets/images/urban-01.jpg",    category: "urbano",   title: "Linhas da Cidade", meta: "Urbano · arquitetura",      ratio: "7 / 5" },
  { src: "assets/images/bw-01.jpg",       category: "pb",       title: "Contraste",        meta: "Preto & branco · estúdio",  ratio: "5 / 7" },
  { src: "assets/images/portrait-02.jpg", category: "retratos", title: "Perfil",           meta: "Retrato · ambiente",        ratio: "5 / 7" },
  { src: "assets/images/nature-02.jpg",   category: "natureza", title: "Horizonte",        meta: "Paisagem · costa",          ratio: "7 / 5" },
  { src: "assets/images/detail-01.jpg",   category: "natureza", title: "Detalhe",          meta: "Macro · textura",           ratio: "1 / 1" },
  { src: "assets/images/portrait-03.jpg", category: "retratos", title: "Luz de Janela",    meta: "Retrato · interior",        ratio: "5 / 7" },
  { src: "assets/images/urban-02.jpg",    category: "urbano",   title: "Vertigem",         meta: "Urbano · perspetiva",       ratio: "5 / 7" },
  { src: "assets/images/bw-02.jpg",       category: "pb",       title: "Silêncio",         meta: "Preto & branco · rua",      ratio: "7 / 5" },
  { src: "assets/images/nature-03.jpg",   category: "natureza", title: "Bruma",            meta: "Paisagem · floresta",       ratio: "5 / 7" },
  { src: "assets/images/portrait-04.jpg", category: "retratos", title: "Presença",         meta: "Retrato · estúdio",         ratio: "5 / 7" },
  { src: "assets/images/detail-02.jpg",   category: "urbano",   title: "Fragmento",        meta: "Detalhe · geometria",       ratio: "1 / 1" },
];

/* -------------------------------------------------------------------------
   3) LOJA — POSTERS À VENDA
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
    name: "Olhar Sereno",
    image: "assets/images/portrait-01.jpg",
    desc: "Retrato em luz natural. Poster impresso em papel mate de alta qualidade.",
    badge: "Mais procurado",
    sizes: POSTER_SIZES,
  },
  {
    id: "p2",
    name: "Manhã no Vale",
    image: "assets/images/nature-01.jpg",
    desc: "Paisagem ao nascer do sol — poster de cores ricas e profundas.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p3",
    name: "Contraste",
    image: "assets/images/bw-01.jpg",
    desc: "Estudo a preto e branco. Poster de alto contraste e textura.",
    badge: "Edição limitada",
    sizes: POSTER_SIZES,
  },
  {
    id: "p4",
    name: "Linhas da Cidade",
    image: "assets/images/urban-01.jpg",
    desc: "Geometria urbana. Poster perfeito para espaços modernos.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p5",
    name: "Luz de Janela",
    image: "assets/images/portrait-03.jpg",
    desc: "Retrato intimista de luz suave. Poster para ambientes acolhedores.",
    badge: "",
    sizes: POSTER_SIZES,
  },
  {
    id: "p6",
    name: "Horizonte",
    image: "assets/images/nature-02.jpg",
    desc: "Linha de costa ao entardecer. Poster panorâmico e sereno.",
    badge: "Novo",
    sizes: POSTER_SIZES,
  },
];
