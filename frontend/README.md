# 💻 Frontend: Biblioteca Digital (Next.js)

A interface de usuário do Books Management System foi desenvolvida focando em uma experiência fluida, responsiva e internacionalizada. Utilizando as tecnologias mais recentes do ecossistema React, o frontend oferece uma UX premium com transições suaves e feedback constante.

## ✨ Funcionalidades de UX/UI

- **Dashboard de Busca**: Filtros dinâmicos que sincronizam automaticamente com a URL, permitindo compartilhar buscas específicas.
- **Internacionalização (i18n)**: Suporte bilíngue total (PT/EN) gerido pelo `next-intl`, com detecção e persistência de idioma.
- **Dark Mode**: Tema escuro e claro com persistência via `next-themes` e suporte nativo do Tailwind CSS 4.
- **Sistema de Modais**: Diálogos intuitivos para criação e edição de livros, evitando recarregamentos de página (spa-feel).
- **Feedbacks e Toasts**: Notificações em tempo real via `Sonner` para confirmar o sucesso ou erro de qualquer operação (CRUD).

## 📁 Estrutura do Código (src)

O diretório `src` está organizado para facilitar a escalabilidade e manutenção:

```bash
src/
├── actions/         # Server Actions para mutações de dados (Create/Delete)
├── app/             # Rotas, Layouts e Páginas (Next.js App Router)
│   └── [locale]/    # Agrupamento por idioma
├── components/      # Componentes UI reutilizáveis
│   ├── books/       # Componentes de domínio (Cards, Lists, Dialogs)
│   └── ui/          # Componentes base do shadcn/ui (Buttons, Inputs, etc)
├── hooks/           # Hooks customizados (Ex: useBookFilters)
├── lib/             # Utilitários, constantes e fontes (Geist)
├── services/        # Abstração da comunicação com a API Backend
├── types/           # Definições de interfaces TypeScript globais
└── messages/        # Arquivos de tradução JSON (pt.json, en.json)
```

## 🔌 Integração com API Flask

Toda a comunicação com o backend ocorre através da camada de **services/**. 
- Recomendamos o uso da variável de ambiente `API_URL` (ou `NEXT_PUBLIC_API_URL` para chamadas no cliente) para garantir que o frontend saiba exatamente onde o backend está rodando, especialmente em diferentes ambientes (Docker vs Local).

## 🐳 Docker Integration

O frontend está preparado para ser containerizado de forma otimizada.

### Dockerfile e Build
O projeto inclui um `Dockerfile` multi-stage e um script utilitário para facilitar o processo:

1. **Build da Imagem**:
   ```bash
   cd frontend
   bash build.bash
   ```
Este comando gera a imagem `frontend:latest` pronta para ser orquestrada pelo Docker Compose.

## 🧪 Suíte de Testes (E2E)

Utilizamos o **Playwright** para garantir que os fluxos principais da aplicação continuem funcionando após qualquer alteração.

**Para rodar os testes localmente:**
```bash
cd frontend/codes
npm install
npx playwright test
```
*Os testes cobrem: Criação, Busca, Edição, Deleção e Internacionalização.*