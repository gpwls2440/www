export default function ({ store, redirect }) {
  console.log('store.state.sessionId: ' + store.state.sessionId)
  if (!store.state.sessionId) {
    return redirect('/auth/login')
  }
}
