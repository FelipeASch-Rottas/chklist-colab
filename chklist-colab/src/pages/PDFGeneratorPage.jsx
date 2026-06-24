import { useContext, useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { FormContext } from '../context/FormContext'
import '../styles/PDFGeneratorPage.css'

export default function PDFGeneratorPage() {
  const { formData, navigateTo } = useContext(FormContext)
  const contentRef = useRef(null)

  // Mesmos grupos da HomePage
  const checklistGroups = [
        {
      id: 'notebook',
      name: 'Notebook',
      items: [
        { id: 'notebook-item1', label: 'Login no AD' },
      ],
    },
    {
      id: 'mo365',
      name: 'Microsoft 365',
      items: [
        { id: 'mo365-item1', label: 'Criar e-mail' },
        { id: 'mo365-item2', label: 'Vincular grupos de acesso (SP_Acesso_...)' },
        { id: 'mo365-item3', label: 'Vincular grupos de PBI (PBI_...)' },
        { id: 'mo365-item4', label: 'Verificar cargo/área/gestor' },
      ],
    },
    {
      id: 'apps_internos',
      name: 'Apps Internos',
      items: [
        { id: 'apps_internos-item1', label: 'App de Anomalias' }
      ],
    },
    {
      id: 'mobuss',
      name: 'Mobuss',
      items: [
        { id: 'mobuss-item1', label: 'Criar login' },
        { id: 'mobuss-item2', label: 'Liberar permissões' },
      ],
    },
    {
      id: 'flowreset',
      name: 'FlowReset',
      items: [
        { id: 'flowreset-item1', label: 'Criar login' },
      ],
    },
    {
      id: 'megaerp',
      name: 'Mega ERP',
      items: [
        { id: 'megaerp-item1', label: 'Ajustar grupo do usuário' },
        { id: 'megaerp-item2', label: 'Liberar ou copiar permissões' },
        { id: 'megaerp-item3', label: 'Configurar expiração de senha' },
        { id: 'megaerp-item4', label: 'Liberar módulos de materiais' },
      ],
    },
        {
      id: 'approvo',
      name: 'Approvo',
      items: [
        { id: 'approvo-item1', label: 'Criar login' },
      ],
    },
    {
      id: 'mereo',
      name: 'Mereo',
      items: [
        { id: 'mereo-item1', label: 'Criar login' },
        { id: 'mereo-item2', label: 'Garantir área correta' },
      ],
    },
    {
      id: 'cvcrm',
      name: 'CV CRM',
      items: [
        { id: 'cvcrm-item1', label: 'Criar login' },
      ],
    },
    {
      id: 'seniorx',
      name: 'Senior X',
      items: [
        { id: 'seniorx-item1', label: 'Criar login' },
        { id: 'seniorx-item2', label: 'Liberar permissões' },
      ],
    },
    {
      id: 'clicksign',
      name: 'ClickSign',
      items: [
        { id: 'clicksign-item1', label: 'Criar login' },
        { id: 'clicksign-item2', label: 'Vincular grupos de acesso' },
      ],
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      items: [
        { id: 'docusign-item1', label: 'Criar login (Sender)' },
      ],
    },
        {
      id: 'prevision',
      name: 'Prevision',
      items: [
        { id: 'prevision-item1', label: 'Criar login' },
      ],
    },
    {
      id: 'blip',
      name: 'Blip',
      items: [
        { id: 'blip-item1', label: 'Adicionar atendente' },
        { id: 'blip-item2', label: 'Liberar permissões' },
      ],
    },
  ]

  const calculateGroupPercentage = (items) => {
    const totalItems = items.length
    const checkedCount = items.filter(
      (item) => formData.checkboxes[item.id]
    ).length
    return totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0
  }

  const calculateTotalPercentage = () => {
    const liberatedGroups = checklistGroups.filter(
      (group) => formData.systems[group.id]?.status !== 'na'
    )
    const allItems = liberatedGroups.flatMap((g) => g.items)
    const totalItems = allItems.length
    const checkedCount = allItems.filter(
      (item) => formData.checkboxes[item.id]
    ).length
    return totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0
  }

  const getLiberatedSystems = () => {
    return checklistGroups.filter(
      (group) => formData.systems[group.id]?.status !== 'na'
    )
  }

  const handleGeneratePDF = async () => {
    try {
      // 1. Criamos o PDF configurando em mm e formato A4 padrão
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // 2. Selecionamos os elementos individuais direto do DOM renderizado
      // Vamos capturar a seção de informações e cada card de sistema
      const infoSection = document.querySelector('.info-section')
      const systemCards = document.querySelectorAll('.system-card')

      const pageHeight = 297 // Altura total do A4 em mm
      const marginY = 15     // Margem superior e inferior
      const marginX = 10     // Margem esquerda e direita
      const maxContentHeight = pageHeight - (marginY * 2) // Espaço útil vertical (267mm)
      const imgWidth = 210 - (marginX * 2) // Largura útil horizontal (190mm)

      let currentY = marginY
      let isFirstPage = true

      // Função auxiliar para renderizar um elemento HTML no PDF
      const renderElementToPDF = async (element) => {
        if (!element) return

        // html2canvas tira o "print" perfeito respeitando suas fontes e CSS
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2, // Garante alta definição para os textos não borrarem
          useCORS: true,
        })
        
        const imgData = canvas.toDataURL('image/png')
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Se o elemento sozinho for maior que a página (segurança), força caber
        const finalImgHeight = imgHeight > maxContentHeight ? maxContentHeight : imgHeight

        // QUEBRA DE PÁGINA INTELIGENTE: Se o card não couber no espaço restante, pula de página
        if (currentY + finalImgHeight > pageHeight - marginY) {
          pdf.addPage()
          currentY = marginY // Reseta o cursor para o topo da nova página
        } else if (!isFirstPage && currentY === marginY) {
          // Se acabou de criar uma página nova no loop anterior, não faz nada
        }

        // Desenha o "print" do card no PDF
        pdf.addImage(imgData, 'PNG', marginX, currentY, imgWidth, finalImgHeight)
        
        // Empurra o cursor para baixo para o próximo card + 6mm de espaçamento
        currentY += finalImgHeight + 6 
        isFirstPage = false
      }

      // --- Início da Montagem do PDF ---
      
      // Adiciona o título principal "Lista de Acessos" textualmente no topo
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(22)
      pdf.text("Lista de Acessos", marginX, currentY + 5)
      currentY += 15

      // Renderiza a seção de dados do usuário (Nome, Cargo, etc.)
      await renderElementToPDF(infoSection)

      // Adiciona o subtítulo "Sistemas Liberados"
      if (systemCards.length > 0) {
        // Se o subtítulo for ficar muito no final da página, empurra para a próxima
        if (currentY + 15 > pageHeight - marginY) {
          pdf.addPage()
          currentY = marginY
        }
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(16)
        pdf.text("Sistemas Liberados", marginX, currentY + 5)
        currentY += 12

        // Loop por cada card de sistema de forma individual
        for (let i = 0; i < systemCards.length; i++) {
          await renderElementToPDF(systemCards[i])
        }
      } else {
        // Mensagem caso não tenha sistemas
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(12)
        pdf.text("Nenhum sistema foi liberado para este usuário.", marginX, currentY + 5)
      }

      // Salva o documento final
      pdf.save(`checklist-${formData.nome || 'documento'}.pdf`)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
    }
  }



  return (
    <div className="pdf-generator-page">
      <div className="container">
        <button
          type="button"
          className="btn btn-back"
          onClick={() => navigateTo('home')}
        >
          ← Voltar
        </button>

        <div className="content-preview" ref={contentRef}>
          <h1>Lista de Acessos</h1>

          <div className="info-section">
            <div className="info-group">
              <label>Nome:</label>
              <p>{formData.nome || '(Não preenchido)'}</p>
            </div>
            <div className="info-group">
              <label>Cargo:</label>
              <p>{formData.cargo || '(Não preenchido)'}</p>
            </div>
            <div className="info-group">
              <label>Setor:</label>
              <p>{formData.setor || '(Não preenchido)'}</p>
            </div>
            <div className="info-group">
              <label>Data de Admissão:</label>
              <p>{formData.dataAdmissao || '(Não preenchido)'}</p>
            </div>
          </div>

          <div className="systems-access-section">
            <h2>Sistemas Liberados</h2>
            {getLiberatedSystems().length === 0 ? (
              <div className="no-systems">
                <p>Nenhum sistema foi liberado para este usuário.</p>
              </div>
            ) : (
              <div className="systems-grid">
                {getLiberatedSystems().map((group) => (
                  <div key={group.id} className="system-card">
                    <h3>{group.name}</h3>
                    <div className="access-info">
                      <div className="access-item">
                        <span className="label">Login:</span>
                        <span className="value">
                          {formData.systems[group.id]?.login || '—'}
                        </span>
                      </div>
                      <div className="access-item">
                        <span className="label">Senha:</span>
                        <span className="value">
                          {formData.systems[group.id]?.senha || '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGeneratePDF}
        >
          Baixar PDF
        </button>
      </div>
    </div>
  )
}
