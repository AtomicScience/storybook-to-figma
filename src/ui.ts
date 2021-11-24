/// <reference lib="dom" />
import './ui.css'

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));