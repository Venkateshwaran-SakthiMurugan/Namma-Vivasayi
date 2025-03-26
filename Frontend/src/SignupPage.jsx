import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignupCard from './SignupPage/SignupCard.jsx'
import { Provider } from './components/ui/provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
    < SignupCard />
    </Provider>
  </StrictMode>,
)
