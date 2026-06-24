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
      id: 'sistema-a',
      name: 'Sistema A',
      items: [
        { id: 'sa-item1', label: 'Configuração inicial' },
        { id: 'sa-item2', label: 'Integração com API' },
        { id: 'sa-item3', label: 'Testes unitários' },
        { id: 'sa-item4', label: 'Documentação' },
      ],
    },
    {
      id: 'sistema-b',
      name: 'Sistema B',
      items: [
        { id: 'sb-item1', label: 'Setup do banco de dados' },
        { id: 'sb-item2', label: 'Modelos de dados' },
        { id: 'sb-item3', label: 'Migrations' },
        { id: 'sb-item4', label: 'Seed data' },
        { id: 'sb-item5', label: 'Backups' },
      ],
    },
    {
      id: 'seguranca',
      name: 'Segurança',
      items: [
        { id: 'seg-item1', label: 'Autenticação' },
        { id: 'seg-item2', label: 'Autorização' },
        { id: 'seg-item3', label: 'Encriptação' },
        { id: 'seg-item4', label: 'Auditoria' },
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
      const element = contentRef.current
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

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
          <h1>Checklist de Admissão</h1>

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
