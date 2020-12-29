export default function ({ store, redirect }) {
  if (!store.state.sessionId) {
    return redirect('/auth/login')
  }
}
