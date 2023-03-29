export const Authentication = {

  getUser() {
    let user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  },

  canEdit() {
    // A proper authentication should be made!!
    // Remove next line after telescope tests
    return true
    let user = this.getUser()
    if (!Boolean(user)) {
      return false
    } else {
      // Check if user can edit
      return true
    }
  },

  async signin(username: string, password: string) {
    try {
      const res = await fetch(`/api/navigate/login`, {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        let data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return [data, undefined]
      } else {
        return [null, res.statusText]
      }
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.toString()]
      } else {
        return [null, "Unexpected error"]
      }
    }
  },

  async signout() {
    try {
      const res = await fetch(`/api/navigate/logout`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        localStorage.removeItem("user")
      }
    } catch (error) {
    }
  }
}