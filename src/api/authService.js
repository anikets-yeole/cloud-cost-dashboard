import { fetchJSON } from "./fetchData";

export async function login(username, password) {
  const users = await fetchJSON("/mock-data/users.json");
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  const { password: pw, ...safeUser } = user;       // use Object Destructuring to omit the password
  return {
    token: btoa(`${username}:${Date.now()}`),
    user: safeUser,
  };
}
