import { initializeApp, database } from 'firebase'
import config from "../config";

initializeApp(config.firebase)

const db = database()
const modRef = db.ref('mods')

export function getMods(callback) {
  modRef.on('value', e=>callback(Object.values(e.val())))
}