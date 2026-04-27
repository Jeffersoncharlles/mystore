# MyStore - E-commerce Store

Uma loja de e-commerce moderna construída com Next.js, React e arquitetura limpa, focando em performance, manutenibilidade e escalabilidade.

Preview: https://mystore-kohl-two.vercel.app/

## 📋 Sumário

- [Stack Tecnológico](#-stack-tecnológico)
- [Decisões Arquiteturais](#-decisões-arquiteturais)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Getting Started](#-getting-started)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Ferramentas de Desenvolvimento](#-ferramentas-de-desenvolvimento)

---

## 🚀 Stack Tecnológico

### Frontend Framework
- **Next.js 15.5** - Framework React com SSR, API routes e otimizações nativas
  - *Por quê?* Renderização no servidor reduz JavaScript no cliente, melhora SEO e performance. Turbopack oferece build mais rápido.

### UI & Styling
- **React 19** - Biblioteca de componentes
- **Tailwind CSS 4** - Utility-first CSS framework
  - *Por quê?* Desenvolvimento rápido de UI consistente, tema unificado, bundle size otimizado
- **Tailwind Merge** - Resolve conflitos de classes Tailwind
- **TW Animate CSS** - Animações utilitárias para Tailwind
- **shadcn/ui** - Biblioteca de componentes acessíveis baseada em Radix UI
  - *Por quê?* Componentes prontos, acessíveis por padrão, podem ser customizados localmente
- **Radix UI** - Primitivos de componentes unstyled mas acessíveis
  - *Por quê?* Garantem accessibility (a11y) e comportamento correto de componentes complexos
- **Lucide React** - Ícones otimizados como componentes React
  - *Por quê?* Leve, tree-shakeable, consistente com design system

### State Management & Data Fetching
- **TanStack React Query 5** ⭐ - Gerenciamento de estado do servidor
  - **Por quê desta escolha?**
    - Evita layout shift: dados vêm do servidor e são cacheados no cliente
    - Reduz requisições ao banco: cache inteligente reutiliza dados
    - Economiza banda: dados não são refetchados desnecessariamente
    - Mantém dados sempre atualizados: stale-while-revalidate automático
    - Elimina `useEffect` para fetching, reduzindo bugs relacionados a sincronização
    - Exemplo: Produto é fetchado uma vez, cacheado, e atualizado em background sem causar flash de tela

### Database & ORM
- **Drizzle ORM** - TypeScript ORM type-safe
  - *Por quê?* Type-safe, sem migrations automáticas que podem quebrar, suporta PostgreSQL nativamente
- **PostgreSQL (pg)** - Database relacional
- **Drizzle Kit** - Ferramentas CLI para migrations e schema
  - *Por quê?* Migrations explícitas e controláveis, integrado com Drizzle

### Validação & Schema
- **Zod** - Schema validation para TypeScript
  - *Por quê?* Validação type-safe, ótimo para validar requests e responses da API, segue o padrão do projeto

### Utilities
- **Date-fns** - Manipulação de datas sem dependências externas
- **clsx** - Concatenação condicional de classes
- **class-variance-authority** - Criação de variantes de componentes type-safe
  - *Por quê?* Substitui necessidade de styled-components, mantém tudo em Tailwind
- **dotenv** - Carregamento de variáveis de ambiente

### Testing
- **Jest** - Test runner e assertion library
- **React Testing Library** - Testes de componentes React
- **@testing-library/jest-dom** - Matchers customizados para DOM
- **@faker-js/faker** - Geração de dados fake para testes

### Type Safety
- **TypeScript 5** - Linguagem com tipos estáticos
  - *Por quê?* Reduz bugs em tempo de compilação, melhora documentação do código

---

## 🏗️ Decisões Arquiteturais

### 1. **Clean Architecture** ⭐
A estrutura de pastas segue o padrão de Clean Architecture para máxima **desacoplagem** entre camadas:

```
src/
├── core/
│   ├── application/        # Casos de uso, serviços de negócio
│   ├── domain/             # Entidades, DTOs, interfaces de repositório
│   └── infra/              # Implementações concretas (ORM, banco de dados)
├── app/                    # Next.js app router e page/layout
├── components/             # Componentes React reutilizáveis
├── hooks/                  # Hooks customizados
├── http/                   # Serviços HTTP (consumo de APIs externas)
├── providers/              # Context providers
└── shared/                 # Utilities globais, constantes, tipos genéricos
```

**Por quê dessa forma?**
- **Desacoplamento total**: A lógica de negócio (services, entities) não conhece Drizzle ORM ou banco de dados
- **Fácil migração de framework**: Se amanhã for necessário trocar Next.js por um framework só de backend, é rápido:
  1. Mover `core/` para novo projeto
  2. Reimplementar apenas a camada `infra/` (repositórios)
  3. Remover apenas `app/` (Next.js específico) e `components/` (React específico)
- **Testabilidade**: Serviços e entidades podem ser testados sem mock do banco de dados, apenas interfaces
- **Reutilização**: Mesma lógica de negócio pode ser usada em API REST, GraphQL, CLI, etc.

### 2. **React Query para Fetching** ⭐
Em vez de `useEffect` + `useState` para buscar dados:

```typescript
// ❌ Evitado: useEffect (causa problemas)
useEffect(() => {
  setLoading(true);
  fetchProducts().then(data => {
    setProducts(data);
    setLoading(false);
  });
}, []);

// ✅ Usado: React Query (resolve os problemas)
const { data: products, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products').then(r => r.json())
});
```

**Benefícios:**
1. **Sem layout shift**: Dados são cacheados entre componentes
2. **Sincronização automática**: Sem problema de stale/race conditions
3. **Menos banda**: Cache automático evita requisições duplicadas
4. **Server State Management**: Trata cache, refetching, background updates
5. **DevTools**: Debugar estado do servidor é trivial

### 3. **TypeScript + Zod para Type Safety**
- TypeScript garante tipos em tempo de compilação
- Zod garante validação em runtime (importante para dados do usuário/API)
- Combinação oferece segurança end-to-end

### 4. **Drizzle ORM**
- Type-safe queries sem raw SQL
- Migrações explícitas e controláveis
- Fácil de substituir se necessário
- Schema como source of truth

---

## 📁 Estrutura do Projeto

### `/src/core` - Lógica de Negócio (Framework-agnostic)
```
core/
├── application/
│   └── services/           # ProductService, CartService - orquestram use cases
├── domain/
│   ├── dtos/               # Data Transfer Objects - molda dados entre camadas
│   ├── entities/           # Product, CartItem - entidades do negócio
│   └── repositories/       # Interfaces de repositório (sem implementação)
└── infra/
    └── database/
        └── drizzle/        # Implementação concreta com Drizzle
            ├── schema/     # Definição de tabelas
            └── repositories/ # Implementação das interfaces
```

**Fluxo de dados:**
1. Componente React chama serviço via hook
2. Serviço chama repositório (interface)
3. Repositório (Drizzle) chama banco de dados
4. Dados retornam como DTO tipado

### `/src/app` - Next.js Específico
- App router (Next.js 13+)
- API routes em `/api`
- Server components por padrão

### `/src/components` - Componentes React
- `product-card.tsx` - Componente de produto reutilizável
- `ui/` - Componentes base (button, input, etc via shadcn/ui)
- `layout/` - Componentes de layout (header, footer)

---

## 🛠️ Ferramentas de Desenvolvimento

### **Biome** - Lint & Format (MUITO mais rápido que ESLint)
```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "bracketSpacing": true
  },
  "linter": {
    "rules": { "recommended": true },
    "domains": { "react": "recommended", "next": "recommended" }
  }
}
```

**Por quê Biome em vez de ESLint?**
- **Muito mais rápido**: Escrito em Rust, não JavaScript
- **Mais moderno**: Suporta regras React 19 e Next.js nativamente
- **Tudo em um**: Lint + format integrado (ESLint + Prettier em um)
- **Performance**: Linter para um projeto médio é instantâneo

**Comandos:**
```bash
pnpm lint       # Verifica toda a codebase
pnpm format     # Formata arquivos (idempotente)
```

### **Lefthook** - Git Hooks (Validações pré-commit/push)
```yaml
pre-commit:
  commands:
    check:
      run: pnpm biome format --write {staged_files}
      stage_fixed: true

pre-push:
  commands:
    validate:
      run: pnpm typecheck
    lint:
      run: pnpm biome lint {push_files}
```

**Fluxo:**
1. `git commit` → Biome formata arquivos staged automaticamente
2. `git push` → TypeScript verificado + Lint executado

**Por quê?**
- Garante que ninguém faça push com erros de type
- Código sempre formatado uniformemente
- Falha rápido antes de PR/CI

---

## 🚀 Getting Started

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- pnpm (ou npm/yarn)
- PostgreSQL 14+

### 1. Clonar e Instalar Dependências
```bash
git clone <repo>
cd mystore
pnpm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env.local
```

Editar `.env.local` com suas credenciais do PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mystore_db
```

### 3. Setup do Banco de Dados
```bash
# Gerar migrations (se houver mudanças no schema)
pnpm db:generate

# Executar migrations
pnpm db:migrate

# (Opcional) Seed inicial de dados
pnpm db:seed

# (Opcional) Abrir Drizzle Studio para ver dados
pnpm db:studio
```

### 4. Rodar em Desenvolvimento
```bash
pnpm dev
```

Aplicação roda em `http://localhost:3000`

---

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
pnpm dev              # Rodar Next.js com Turbopack (mais rápido)
pnpm build            # Build para produção com Turbopack
pnpm start            # Rodar aplicação buildada
```

### Qualidade de Código
```bash
pnpm lint             # Verificar com Biome (rápido)
pnpm format           # Formatar com Biome
pnpm typecheck        # Verificar tipos TypeScript
```

### Testing
```bash
pnpm test             # Rodar testes Jest uma vez
pnpm test:watch       # Watch mode para desenvolvimento
pnpm test:coverage    # Relatório de cobertura
```

### Database
```bash
pnpm db:generate      # Gerar migration baseado no schema
pnpm db:migrate       # Executar migrations
pnpm db:push          # Push schema (desenvolvimento)
pnpm db:studio        # Abrir Drizzle Studio (UI do banco)
pnpm db:seed          # Populate banco com dados iniciais
```

---

## 🔄 Workflow Típico

1. **Desenvolvedor faz mudanças**
   ```bash
   pnpm dev
   ```

2. **Antes de commit, Lefthook formata automaticamente**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # ↓ Lefthook pre-commit executa
   # ↓ Biome formata arquivos automaticamente
   ```

3. **Antes de push, validações são executadas**
   ```bash
   git push
   # ↓ Lefthook pre-push executa
   # ✓ TypeScript typecheck
   # ✓ Biome lint
   ```

4. **Em CI (GitHub Actions, etc), testes rodam**
   ```bash
   pnpm test:coverage
   ```

---

## 💡 Decisões Importantes

| Decisão | Razão |
|---------|-------|
| **React Query** | Gerenciar cache/refetch/sync do servidor sem `useEffect` |
| **Drizzle ORM** | Type-safe, não gera migrations automáticas, controle total |
| **Clean Architecture** | Desacoplamento permite migrar de framework rapidamente |
| **Biome** | Lint/format em Rust é 100x mais rápido que ESLint |
| **Lefthook** | Validações automáticas reduzem bugs antes de push |
| **Tailwind + shadcn/ui** | Componentes acessíveis prontos, development speed |
| **TypeScript strict mode** | Erros em compile-time, não em production |
| **Turbopack** | Build/dev mais rápido que Webpack (built-in Next.js 15+) |

---

## 🤝 Contribuindo

1. Criar feature branch
2. Fazer alterações (Lefthook faz validações automáticas)
3. Abrir PR
4. CI valida tudo (typecheck + tests)

---

## 📝 Licença

MIT
