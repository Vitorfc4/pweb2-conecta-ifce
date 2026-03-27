# ConectaIFCE

Projeto front-end da disciplina de Programação Web II, desenvolvido com **React + Vite + TypeScript + Tailwind CSS + componentes no padrão shadcn/ui**.

## O que esta versão entrega

- Setup com React + Vite + TypeScript
- Tailwind CSS configurado com tokens de tema
- Estrutura inspirada em shadcn/ui (`components.json`, `components/ui`, utilitário `cn`)
- ESLint, Prettier, Husky e Commitlint configurados
- Alias `@/` no TypeScript e no Vite
- Rotas públicas e privadas com React Router
- Layout público reutilizável com navbar e footer
- Layout da área logada com header + sidebar
- Autenticação com armazenamento de sessão e token
- Estrutura pronta para JWT real em modo REST
- Tratamento automático de `401` com limpeza de sessão
- Feed principal com SWR
- Criação de post com suporte a imagem
- Curtidas com atualização otimista
- Comentários com carregamento sob demanda
- Perfil com visualização de posts e ação de seguir/deixar de seguir
- Sugestões de usuários com follow/unfollow
- Listagem de grupos
- Web Vitals inicializado no `main.tsx`

## Modos de execução

O projeto foi preparado para funcionar em dois modos:

### 1) `mock` (padrão)
Usa uma base local em `localStorage`, já com dados de demonstração. Esse modo funciona imediatamente após instalar as dependências.

### 2) `rest`
Usa uma API REST externa. Basta configurar a URL base da API e mudar a variável de ambiente.

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

```bash
VITE_APP_NAME=ConectaIFCE
VITE_API_MODE=mock
VITE_API_BASE_URL=http://localhost:3000
```

- `VITE_API_MODE=mock` → usa os dados locais
- `VITE_API_MODE=rest` → usa a API real

## Endpoints esperados no modo REST

A camada de serviços foi centralizada para facilitar manutenção e adaptação dos endpoints. Esta versão espera, por padrão, a seguinte convenção REST:

- `POST /auth/login`
- `POST /auth/register`
- `GET /posts`
- `POST /posts`
- `POST /posts/:id/like`
- `GET /posts/:id/comments`
- `POST /posts/:id/comments`
- `GET /users/suggestions`
- `GET /users/:id/profile`
- `POST /users/:id/follow`
- `GET /groups`

## Rodando o projeto

```bash
npm install
npm run dev
```

abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

## Credenciais de demonstração (modo mock)

- E-mail: `ana.silva@ifce.edu.br`
- Senha: `12345678`

## Scripts úteis

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run check:types
```

## Estrutura principal

```text
src/
  components/
    common/
    layout/
    ui/
  features/
    auth/
    feed/
    groups/
    profile/
  lib/
  mocks/
  pages/
  providers/
  routes/
  types/
```

## Decisões técnicas importantes

### 1. Serviços centralizados
As chamadas externas foram concentradas em serviços por domínio (`auth`, `feed`, `groups`, `profile`). Isso facilita a troca entre mock e API real e evita espalhar `fetch` pelos componentes.

### 2. SWR para cache e revalidação
O feed, os comentários, sugestões, grupos e perfil usam SWR. Isso melhora a experiência do usuário com cache, deduplicação e atualizações simples via `mutate`.

### 3. Atualização otimista em curtidas
Ao curtir um post, a interface é atualizada imediatamente antes da confirmação final da API, o que melhora a sensação de velocidade.

### 4. Tratamento de `401`
A camada de API possui um handler central para respostas `401`, limpando a sessão e redirecionando o usuário para o login.

### 5. Criação de post com imagem
No modo REST, a publicação envia `FormData`, o que facilita integração com upload real de arquivos. No modo mock, a imagem é convertida em data URL para manter a demonstração funcional.



