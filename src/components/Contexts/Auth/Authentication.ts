export interface User {
  displayName: string;
}

export const Authentication = {
  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(user) as User;
    } else {
      return null;
    }
  },

  canEdit() {
    // A proper authentication should be made!!
    // Remove next line after telescope tests
    return true;
    const user = this.getUser();
    if (!user) {
      return false;
    } else {
      // Check if user can edit
      return true;
    }
  },

  async signin(username: string, password: string): Promise<[User, null] | [null, string]> {
    try {
      const res = await fetch(`/api/navigate/login`, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const data: User = await res.json();
        localStorage.setItem('user', JSON.stringify(data));
        return [data, null];
      } else {
        return [null, res.statusText];
      }
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.toString()];
      } else {
        return [null, 'Unexpected error'];
      }
    }
  },

  async signout() {
    try {
      const res = await fetch(`/api/navigate/logout`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        localStorage.removeItem('user');
      }
    } catch (error) {
      /* empty */
    }
  },
};
