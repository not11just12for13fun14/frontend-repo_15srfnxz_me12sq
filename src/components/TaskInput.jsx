import { useState, useRef, useEffect } from 'react'

const energyOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

function TaskInput({ onAdd }) {
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')
  const [energy, setEnergy] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      const rec = new SR()
      rec.lang = 'en-US'
      rec.continuous = false
      rec.interimResults = true

      rec.onresult = (e) => {
        let finalTranscript = ''
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          const result = e.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          }
        }
        if (finalTranscript) setText((prev) => (prev ? prev + ' ' : '') + finalTranscript.trim())
      }
      rec.onend = () => setListening(false)
      recognitionRef.current = rec
    }
  }, [])

  const startVoice = () => {
    if (!recognitionRef.current) return
    setListening(true)
    recognitionRef.current.start()
  }

  const stopVoice = () => {
    if (!recognitionRef.current) return
    recognitionRef.current.stop()
  }

  const submit = async () => {
    if (!text.trim()) return
    const payload = {
      text: text.trim(),
      mood: mood.trim() || undefined,
      energy: energy || undefined,
    }
    await onAdd(payload)
    setText('')
    setMood('')
    setEnergy('')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task (e.g., email Alex, plan deck for Friday)"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onMouseDown={startVoice}
          onMouseUp={stopVoice}
          onTouchStart={startVoice}
          onTouchEnd={stopVoice}
          className={`px-3 py-2 rounded-lg border ${listening ? 'bg-red-50 border-red-300 text-red-700' : 'bg-gray-50 border-gray-300 text-gray-700'} transition`}
          title="Hold to speak"
        >
          {listening ? 'Listening…' : 'Hold to Speak'}
        </button>
        <button onClick={submit} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
          Add
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Mood (optional)"
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <select value={energy} onChange={(e) => setEnergy(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300">
          <option value="">Energy…</option>
          {energyOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TaskInput
