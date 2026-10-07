import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-slate-100"><section className="max-w-lg rounded-2xl border border-amber-300/30 bg-slate-900 p-7 shadow-2xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-amber-300">Portfolio recovery</p><h1 className="mt-3 text-2xl font-bold">The page needs a refresh.</h1><p className="mt-3 leading-7 text-slate-300">The development server was updated while this page was open. Refresh the browser once to load the newest version.</p><button onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-sky-400 px-4 py-3 font-semibold text-slate-950">Refresh portfolio</button></section></main>
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><AppErrorBoundary><App /></AppErrorBoundary></React.StrictMode>)
