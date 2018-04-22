import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyAN0xKBUSwuhoNi6bRy0oBy__JdiFuKOs4',
  authDomain: 'kanbancupu.firebaseapp.com',
  databaseURL: 'https://kanbancupu.firebaseio.com',
  projectId: 'kanbancupu',
  storageBucket: 'kanbancupu.appspot.com',
  messagingSenderId: '952467162239'
})

export const db = app.database()
export const kanbanRef = db.ref('kanban')
