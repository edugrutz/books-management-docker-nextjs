# ⚙️ Backend: API Flask

A API do sistema de gerenciamento de livros é responsável por fornecer os dados e persistir as alterações via banco de dados SQLite. Desenvolvida com Flask, ela oferece uma interface RESTful preparada para integração com o frontend em Next.js.

## 📁 Estrutura Interna de Código

A organização do código segue uma separação clara entre roteamento e lógica de negócio:

```bash
backend/
├── routes/          # Definição dos Blueprints do Flask
│   ├── books.py     # Endpoints de busca, listagem e CRUD de livros
│   └── authors.py   # Endpoints de consulta de autores
├── services.py      # Lógica de negócio, serialização e acesso ao SQLite
├── app.py           # Configuração global, middlewares (CORS) e inicialização
├── build.bash       # Automação para construção da imagem Docker
└── db.sqlite        # Banco de dados SQLite persistente
```

## 🗄️ Persistência de Dados e Regras de Negócio

### Banco de Dados (SQLite)
O sistema utiliza o SQLite pela sua portabilidade. O schema atual contempla as tabelas `book` (detalhes do livro) e `author` (metadados do autor).

### Tratamento de Dados Legados
- **Integridade**: Foram identificados registros com `ID null` na base original. Para garantir a estabilidade sem deletar dados, a API utiliza o filtro `WHERE id IS NOT NULL` em todas as consultas.
- **Busca via SQL**: As funcionalidades de pesquisa utilizam operadores `LIKE` para permitir buscas parciais e flexíveis.
- **Incremental Manual**: Como a tabela original não possui auto-incremento, o backend calcula o próximo ID através de `MAX(id) + 1` de maneira lógica durante a criação.

## 📡 Endpoints e Porta Padrão

A API opera nativamente na **porta 5000**, essencial para a comunicação correta com o frontend.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/books` | Listagem geral paginada |
| `GET` | `/api/v1/books/search` | Busca multicritério (Título, Autor, Data, Global) |
| `GET` | `/api/v1/books/<id>` | Detalhes de um livro específico |
| `POST` | `/api/v1/books` | Cadastro de novo livro |
| `PUT` | `/api/v1/books/<id>` | Atualização completa de metadados |
| `DELETE` | `/api/v1/books/<id>` | Remoção do registro do banco |
| `GET` | `/api/v1/authors` | Listagem de autores cadastrados |

## 🐳 Docker Integration

Para garantir a portabilidade, o backend possui suporte total a containers.

### Construção da Imagem
Você pode gerar a imagem Docker localmente utilizando o script fornecido:
```bash
cd backend
bash build.bash
```