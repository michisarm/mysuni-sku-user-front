import { createContext } from 'react'
import { TrackerInstance } from './types'

const TrackerContext = createContext<TrackerInstance | null>(null)

export default TrackerContext
