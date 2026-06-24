import { useContext } from 'react'
import { FormContext } from '../context/FormContext'
import ChecklistGroup from '../components/ChecklistGroup'
import '../styles/HomePage.css'

export default function HomePage() {
  const {
    formData,
    updateFormData,
    updateCheckbox,
    updateSystemAccess,
    clearForm,
    navigateTo,
    expandedGroups,
    toggleGroup,
  } = useContext(FormContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleCheckboxChange = (checkboxId, checked) => {
    updateCheckbox(checkboxId, checked)
  }

  const handleSystemAccessChange = (systemId, field, value) => {
    updateSystemAccess(systemId, field, value)
  }

  const handleGerarPDF = () => {
    navigateTo('pdf')
  }

  // Grupos de checkboxes com estrutura melhorada
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
  ]

  return (
    <div className="home-page">
      <div className="container">
        <h1>Checklist de Admissão</h1>

        <form className="form-section">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">Cargo</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              placeholder="Digite o cargo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="setor">Setor</label>
            <input
              type="text"
              id="setor"
              name="setor"
              value={formData.setor}
              onChange={handleInputChange}
              placeholder="Digite o setor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataAdmissao">Data de Admissão</label>
            <input
              type="date"
              id="dataAdmissao"
              name="dataAdmissao"
              value={formData.dataAdmissao}
              onChange={handleInputChange}
            />
          </div>

          <div className="checklist-section">
            <h2>Checklist</h2>
            <div className="groups-container">
              {checklistGroups.map((group) => (
                <div key={group.id} className="system-group-wrapper">
                  <div className="system-access-section">
                    <h3>{group.name}</h3>
                    
                    <div className="access-fields">
                      <div className="access-field">
                        <label htmlFor={`login-${group.id}`}>Login</label>
                        <input
                          type="text"
                          id={`login-${group.id}`}
                          value={formData.systems[group.id]?.login || ''}
                          onChange={(e) =>
                            handleSystemAccessChange(group.id, 'login', e.target.value)
                          }
                          placeholder="Digite o login"
                          disabled={formData.systems[group.id]?.status === 'na'}
                        />
                      </div>

                      <div className="access-field">
                        <label htmlFor={`senha-${group.id}`}>Senha</label>
                        <input
                          type="password"
                          id={`senha-${group.id}`}
                          value={formData.systems[group.id]?.senha || ''}
                          onChange={(e) =>
                            handleSystemAccessChange(group.id, 'senha', e.target.value)
                          }
                          placeholder="Digite a senha"
                          disabled={formData.systems[group.id]?.status === 'na'}
                        />
                      </div>
                    </div>

                    <div className="na-checkbox">
                      <input
                        type="checkbox"
                        id={`na-${group.id}`}
                        checked={formData.systems[group.id]?.status === 'na'}
                        onChange={(e) =>
                          handleSystemAccessChange(
                            group.id,
                            'status',
                            e.target.checked ? 'na' : 'liberado'
                          )
                        }
                      />
                      <label htmlFor={`na-${group.id}`}>Sem acesso (N/A)</label>
                    </div>
                  </div>

                  {formData.systems[group.id]?.status !== 'na' && (
                    <ChecklistGroup
                      group={group}
                      items={group.items}
                      checkedItems={formData.checkboxes}
                      onCheckboxChange={handleCheckboxChange}
                      isExpanded={expandedGroups[group.id] !== false}
                      onToggleExpand={toggleGroup}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Limpar Informações
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGerarPDF}
            >
              Gerar PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
