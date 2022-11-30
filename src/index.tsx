import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { MathJaxContext } from 'better-react-mathjax'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const config = {
    loader: { load: ['[tex]/html'] },
    tex: {
        packages: { '[+]': ['html'] },
        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
        ],
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]'],
        ],
    },
}

root.render(
    <React.StrictMode>
        <MathJaxContext config={config} version={3}>
            <App />
        </MathJaxContext>
    </React.StrictMode>
)
