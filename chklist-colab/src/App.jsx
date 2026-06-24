import { useContext } from 'react'
import { FormProvider, FormContext } from './context/FormContext'
import HomePage from './pages/HomePage'
import PDFGeneratorPage from './pages/PDFGeneratorPage'
import './App.css'

function AppContent() {
  const { currentPage } = useContext(FormContext)

  return currentPage === 'home' ? <HomePage /> : <PDFGeneratorPage />
}

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  )
}

export default App
