import {signInWithPopup} from "firebase/auth";
import { auth, googleProvider } from "./utils/firebase";
import api from "./utils/axios";

const App = () => {
const handleGoogleLogin = async (token) => {
    try {
      const {data}= await api.post("/auth/login", { token });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        console.log(token);
        await handleGoogleLogin(token);
        console.log(data);
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={googleLogin}>
          Login with Google
        </button>  
    </div>
  )
}

export default App