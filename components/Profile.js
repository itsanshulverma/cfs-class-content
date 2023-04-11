import { UserContext } from "@/lib/context";
import { useContext } from "react";
import {
  teacherSubjectMap,
  classwiseClassroomLinks,
} from "@/userdata/userdata.js";
import Link from "next/link";

export default function Profile() {
  const { username } = useContext(UserContext);
  const teacherData = teacherSubjectMap[username];
  const links = [];
  for (const key in teacherData) {
    links.push([
      key,
      teacherData[key],
      classwiseClassroomLinks[key][teacherData[key]],
    ]);
  }

  const handleLogOut = () => {
    window.localStorage.setItem('CFS_Content_Username', JSON.stringify(""));
    window.location.reload(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-start">
        <h1 className="text-2xl font-bold mb-8">Hello, {username}!</h1>
        <button onClick={handleLogOut}
          className="block rounded bg-gray-200 md:px-4 md:py-2 p-4 text-xs font-medium uppercase text-gray-700 ml-5 hover:bg-gray-800 hover:text-white">
            Log Out
        </button>
      </div>
      <p className="text-md mb-4">Here are your classroom content links:</p>
      {links.map((item, index) => (
        <div key={index}
          className="block w-[22rem] mb-5 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <h5
            className="mb-2 text-l font-medium leading-tight text-neutral-800">
            {item[1]}
          </h5>
          <p className="mb-4 text-base text-neutral-600">
            Class {item[0]}
          </p>
          {item[2] && <Link href={item[2]}
            className="inline-block rounded bg-blue-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white hover:bg-blue-900">
            Drive Link
          </Link>}
        </div>
      ))}
    </div>
  );
}
