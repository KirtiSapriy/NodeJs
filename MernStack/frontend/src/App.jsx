import { useState } from 'react'
import { Provider } from 'react-redux'
import { Store } from './Store/Store'
import Main from './Pages/Main'

function App() {

  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  )

}

export default App
