import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />

        <div className="mt-4 flex flex-col gap-2 text-center">
          <Link
            to="/email-verification"
            className="text-blue-500 hover:text-blue-700"
          >
            Nie pamiętam hasła
          </Link>
          <Link
            to="/email-verification"
            className="text-blue-500 hover:text-blue-700"
          >
            Wyślij ponownie link aktywacyjny
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Nie posiadasz jeszcze konta? </span>
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
