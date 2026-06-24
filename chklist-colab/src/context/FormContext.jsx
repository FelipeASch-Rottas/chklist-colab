import { createContext, useState } from 'react'

export const FormContext = createContext()

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    setor: '',
    dataAdmissao: '',
    checkboxes: {},
    systems: {
      'sistema-a': { login: '', senha: '', status: 'liberado' },
      'sistema-b': { login: '', senha: '', status: 'liberado' },
      'seguranca': { login: '', senha: '', status: 'liberado' },
    },
  })

  const [currentPage, setCurrentPage] = useState('home')
  const [expandedGroups, setExpandedGroups] = useState({})

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const updateCheckbox = (checkboxId, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      checkboxes: {
        ...prev.checkboxes,
        [checkboxId]: isChecked,
      },
    }))
  }

  const updateSystemAccess = (systemId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      systems: {
        ...prev.systems,
        [systemId]: {
          ...prev.systems[systemId],
          [field]: value,
        },
      },
    }))
  }

  const clearForm = () => {
    setFormData({
      nome: '',
      cargo: '',
      setor: '',
      dataAdmissao: '',
      checkboxes: {},
      systems: {
        'sistema-a': { login: '', senha: '', status: 'liberado' },
        'sistema-b': { login: '', senha: '', status: 'liberado' },
        'seguranca': { login: '', senha: '', status: 'liberado' },
      },
    })
  }

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        updateCheckbox,
        updateSystemAccess,
        clearForm,
        currentPage,
        navigateTo,
        expandedGroups,
        toggleGroup,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
