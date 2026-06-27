# Fotografia Joaquim Oliveira — Website

Site de fotografia de autor, pronto a usar, para **vender posters** e o **livro de fotografia**
(pré-venda). Design editorial, galeria com lightbox, carrinho de compras funcional e
finalização de encomenda por **WhatsApp ou Email** (sem necessidade de servidor).

---

## 🚀 Como abrir o site

**Opção A — abrir diretamente (mais simples)**
Faça **duplo clique em `index.html`**. O site abre no navegador e funciona por completo
(galeria, carrinho, formulários). É a forma recomendada no seu computador.

**Opção B — servidor local (opcional)**
Se preferir um servidor (por exemplo, para testar como ficará online), tem um pronto a usar,
sem precisar de instalar nada:

- Clique com o botão direito em `.claude\serve.ps1` → **Executar com PowerShell**, ou
- Abra o PowerShell nesta pasta e corra:

  ```powershell
  powershell -ExecutionPolicy Bypass -File .claude\serve.ps1
  ```

Depois abra <http://localhost:8000> no navegador.

> Nota: o comando `python -m http.server` também serve, **mas só se o Python estiver instalado**
> (não está, por defeito, no Windows). Por isso, use a Opção A ou o `serve.ps1` acima.

---

## ✏️ Como personalizar (tudo num só ficheiro)

Abra **`js/data.js`** — é o único ficheiro que precisa de editar. Lá pode mudar:

| O quê | Onde, em `js/data.js` |
|---|---|
| Nome, slogan, localização | objeto `SITE` |
| **Número de WhatsApp** (encomendas) | `SITE.whatsapp` — formato internacional, sem `+` nem espaços (ex.: `351912345678`) |
| **Email** | `SITE.email` |
| Links de Facebook / Instagram | `SITE.social` |
| Fotos da galeria | array `GALLERY` |
| Posters da loja e preços | arrays `PRODUCTS` e `POSTER_SIZES` |

> ⚠️ **Importante:** o número de WhatsApp e o email atuais são *exemplos*. Substitua-os pelos reais
> antes de publicar, ou as encomendas não chegarão a si.

---

## 🖼️ Fotografias

As fotografias reais já estão em `assets/images/` (Porto, costa, céu e natureza). Pontos-chave:

- **Foto principal (atrás do título):** `portonoturno.jpg` — definida em `css/style.css` (`.hero__bg`).
- **Secção "Sobre":** `porsol.jpg` — em `index.html` (`<img>` dentro de `.about__media`).
- **Livro de fotografia:** capa `ribeira.jpg` e fundo `porto.jpg` — em `css/style.css`.
- **Galeria e loja:** todas as fotos estão listadas em `js/data.js` (arrays `GALLERY` e `PRODUCTS`),
  cada uma com `title`, `category` e `ratio` (proporção largura/altura).

**Para trocar ou acrescentar fotos:** copie o ficheiro para `assets/images/` e edite o caminho
`src` (galeria) ou `image` (loja) em `js/data.js`. Use imagens grandes (lado maior ≥ 1600 px)
e ajuste o `ratio` à proporção real para a galeria reservar o espaço certo.

---

## 📂 Estrutura

```
projeto quim/
├── index.html          ← página (não precisa de editar)
├── css/style.css       ← aparência (não precisa de editar)
├── js/
│   ├── data.js         ← ★ EDITE AQUI: contactos, fotos, produtos, preços
│   └── main.js         ← lógica (não precisa de editar)
├── assets/images/      ← ★ COLOQUE AQUI as fotos reais
└── README.md
```

---

## 🌐 Como publicar (grátis)

Como é um site estático, pode publicá-lo de borla em segundos:

- **Netlify Drop** — arraste esta pasta para <https://app.netlify.com/drop>.
- **GitHub Pages** — crie um repositório, carregue os ficheiros e ative *Pages*.
- **Vercel** — `vercel` na pasta, ou importe o repositório.

Depois pode ligar um domínio próprio (ex.: `fotografiajoaquimoliveira.pt`).

---

## 🛒 Como funcionam as encomendas

1. O cliente escolhe o tamanho e adiciona o poster ao carrinho.
2. No carrinho, clica em **Finalizar por WhatsApp** ou **por Email**.
3. Abre-se uma mensagem **já preenchida** com a lista de produtos e o total, dirigida a si.
4. Combina pagamento e envio diretamente com o cliente.

O carrinho fica guardado no navegador do cliente (não se perde ao recarregar a página).

> 💡 Quando quiser pagamentos automáticos (cartão/MB Way), dá para integrar Stripe ou
> uma loja Shopify mais tarde — a base já está preparada.
