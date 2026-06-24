# 📋 Guia de Personalização - Checklist de Admissão

## 📌 Visão Geral do Projeto

O projeto consiste em uma aplicação de duas páginas:

1. **Página Inicial** - Formulário com campos de entrada e checkboxes
2. **Página de PDF** - Visualização e geração de PDF com os dados preenchidos

## 🎨 Adicionando/Modificando Checkboxes

Os checkboxes estão definidos em **dois arquivos** que precisam ser sincronizados:

### 1. Adicionar em `src/pages/HomePage.jsx`

Procure a seção `checklistItems` e adicione novos itens:

```javascript
const checklistItems = [
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2' },
  { id: 'item3', label: 'Item 3' },
  // Adicione aqui:
  { id: 'item4', label: 'Novo Item' },
  { id: 'item5', label: 'Outro Item' },
]
```

### 2. Adicionar em `src/pages/PDFGeneratorPage.jsx`

Sincronize adicionando os mesmos itens:

```javascript
const checklistItems = [
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2' },
  { id: 'item3', label: 'Item 3' },
  // Mesmos itens aqui
  { id: 'item4', label: 'Novo Item' },
  { id: 'item5', label: 'Outro Item' },
]
```

## 📝 Adicionando Novos Campos de Entrada

Para adicionar um novo campo (por exemplo, "Email"):

### 1. Adicione no `FormContext.jsx`

Atualize o estado inicial:

```javascript
const [formData, setFormData] = useState({
  nome: '',
  cargo: '',
  setor: '',
  dataAdmissao: '',
  email: '', // Novo campo
  checkboxes: {},
})
```

### 2. Adicione no `HomePage.jsx`

Adicione um novo grupo de formulário:

```javascript
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    placeholder="Digite o email"
  />
</div>
```

### 3. Adicione no `PDFGeneratorPage.jsx`

Adicione a exibição do novo campo:

```javascript
<div className="info-group">
  <label>Email:</label>
  <p>{formData.email || '(Não preenchido)'}</p>
</div>
```

### 4. Atualize o `clearForm` no `FormContext.jsx`

Adicione o novo campo:

```javascript
const clearForm = () => {
  setFormData({
    nome: '',
    cargo: '',
    setor: '',
    dataAdmissao: '',
    email: '', // Incluir aqui
    checkboxes: {},
  })
}
```

## 🎨 Personalizando Estilos

Os estilos estão divididos em dois arquivos:

- **`src/styles/HomePage.css`** - Estilos da primeira página
- **`src/styles/PDFGeneratorPage.css`** - Estilos da segunda página

### Exemplo: Alterar Cores Principais

Nas variáveis de gradiente dos arquivos CSS, procure por:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

E altere para as cores desejadas.

## 📦 Alterando Nome do PDF

No arquivo `src/pages/PDFGeneratorPage.jsx`, procure por:

```javascript
pdf.save(`checklist-${formData.nome || 'documento'}.pdf`)
```

Você pode personalizar o formato do nome do arquivo.

## 🔄 Estrutura do Contexto

O `FormContext.jsx` gerencia:

- **`formData`** - Todos os dados do formulário
- **`updateFormData`** - Atualiza campos de texto
- **`updateCheckbox`** - Atualiza estado dos checkboxes
- **`clearForm`** - Limpa todos os dados
- **`currentPage`** - Página atual (home/pdf)
- **`navigateTo`** - Navega entre páginas

## 🚀 Próximos Passos (Sugestões)

1. **Persistência de Dados**: Adicione localStorage para salvar dados
2. **Validação**: Implemente validação de formulário
3. **Múltiplos Templates**: Crie diferentes templates de checklist
4. **Dark Mode**: Adicione tema escuro
5. **Exportação**: Adicione outros formatos de export (Excel, etc)

## 📱 Responsividade

O projeto já é responsivo para mobile. Para ajustar pontos de quebra, edite os media queries nos arquivos CSS.

## 🐛 Troubleshooting

**Problema**: Dados não persistem ao voltar
- **Solução**: Verifique se o `FormProvider` envolve todo o app em `App.jsx`

**Problema**: PDF não gera
- **Solução**: Verifique se `jspdf` e `html2canvas` estão instalados no `package.json`

**Problema**: Checkboxes não aparecem
- **Solução**: Certifique-se de adicionar o mesmo `id` em ambos os arquivos (HomePage e PDFGeneratorPage)
