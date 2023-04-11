import { useContext, useState } from "react";
import { credentials } from "@/userdata/userdata";
import { UserContext } from "@/lib/context";
import Image from 'next/image';

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.trim() in credentials) {
      if (credentials[user.trim()] == password) {
        setUsername(user.trim());
      } else alert("Wrong password.");
    } else alert("Wrong username.");
    window.localStorage.setItem('CFS_Content_Username', JSON.stringify(user.trim()))
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
      <Image className="mb-8" src="/cfs-logo.jpg" alt="Cambridge Foundation School Logo" width={400} height={30} />
      <h1 className="text-xl text-blue-900 font-bold mb-8">Content Portal Login</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4 flex flex-col gap-2">
          <label htmlFor="username"
            className="mb-1 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            type="text"
            id="username"
            autoComplete="username"
            required
          />
          <label htmlFor="password"
            className="mb-1 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            autoComplete="current-password"
            required
          />
        </fieldset>
        <button className="w-full rounded-md text-white font-medium bg-blue-800 hover:bg-blue-900 focus:outline-none px-24 py-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export const validateUser = () => {
  if (user.trim() in credentials && credentials[user.trim()] == password) return user.trim();
};
