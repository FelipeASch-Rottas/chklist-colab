# Checklist de Admissão

Aplicação web para criar, gerenciar e gerar PDFs de checklists de admissão de funcionários.

## 🎯 Funcionalidades

- ✅ Formulário com campos: Nome, Cargo, Setor e Data de Admissão
- ✅ Sistema de checkboxes personalizável
- ✅ Botão para limpar todas as informações
- ✅ Geração de PDF com dados preenchidos
- ✅ Navegação entre página inicial e página de PDF
- ✅ Preservação de dados ao navegar entre páginas
- ✅ Design responsivo para mobile e desktop

## 📁 Estrutura do Projeto

```
src/
├── pages/
│   ├── HomePage.jsx              # Página inicial com formulário
│   └── PDFGeneratorPage.jsx       # Página para gerar PDF
├── context/
│   └── FormContext.jsx            # Contexto para compartilhar dados
├── styles/
│   ├── HomePage.css               # Estilos da página inicial
│   └── PDFGeneratorPage.css        # Estilos da página PDF
├── App.jsx                        # Componente principal
├── App.css                        # Estilos globais
├── main.jsx                       # Ponto de entrada
└── index.css                      # CSS global

CUSTOMIZATION_GUIDE.md             # Guia completo de personalização
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
cd chklist-colab
npm install
```

### 2. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173/`

### 3. Build para Produção

```bash
npm run build
```

## 📦 Dependências Principais

- **React 19.2.6** - Framework UI
- **React DOM 19.2.6** - Renderização
- **jsPDF 4.2.1** - Geração de PDF
- **html2canvas 1.4.1** - Captura de HTML para PDF
- **React Hook Form 7.78.0** - Gerenciamento de formulários

## 🎨 Páginas

### Página 1: Checklist
- Campos de entrada para informações pessoais
- Lista de checkboxes para marcar itens
- Botão "Limpar Informações" - reseta todos os dados
- Botão "Gerar PDF" - navega para página de visualização/PDF

### Página 2: Geração de PDF
- Exibe um resumo com todos os dados preenchidos
- Mostra quais itens foram marcados (✓) ou não (○)
- Botão "Voltar" para retornar à página inicial
- Botão "Baixar PDF" para fazer download do arquivo

## 💡 Como Personalizar

Veja o arquivo `CUSTOMIZATION_GUIDE.md` para:
- Adicionar/modificar checkboxes
- Adicionar novos campos de entrada
- Alterar estilos e cores
- Modificar formato do PDF
- E muito mais!

## 📝 Exemplos de Checkboxes

O projeto vem com 5 itens de exemplo. Para adicionar seus próprios, veja:
- `src/pages/HomePage.jsx` (linha ~50)
- `src/pages/PDFGeneratorPage.jsx` (linha ~20)

## 🔒 Notas de Segurança

- Os dados são armazenados apenas no contexto da aplicação (memória)
- Não há persistência em banco de dados por padrão
- Para adicionar persistência, use `localStorage` ou um backend

## 🐛 Troubleshooting

Se encontrar problemas:

1. **Erro "module not found"**
   ```bash
   npm install
   ```

2. **Porta 5173 já em uso**
   ```bash
   npm run dev -- --port 3000
   ```

3. **PDF não baixa**
   - Verifique se jsPDF e html2canvas estão instalados
   - Verifique o console do navegador para erros

## 📞 Suporte

Para questões sobre personalização, consulte `CUSTOMIZATION_GUIDE.md`.

## 📄 Licença

Veja o arquivo LICENSE para detalhes.
