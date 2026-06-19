import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.user);

  console.log(user);

  return <div>
 <h1>Home</h1>

      <h2>
        Welcome {user?.name}
      </h2>



  </div>;
}
