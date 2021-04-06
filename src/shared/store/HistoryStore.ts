import { createStore } from "./Store";
import { History } from 'history'

const [setCurrentHistory, onCurrentHistory, getCurrentHistory, useCurrentHistory] = createStore<History>();

export { setCurrentHistory, onCurrentHistory, getCurrentHistory, useCurrentHistory }
