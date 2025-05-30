import { Link } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />

        <div className="mt-4 flex flex-col gap-2 text-center">
          <Link
            to="/email-verification"
            className="text-gunfire-orange hover:text-gunfire-orange-hover"
          >
            Nie pamiętam hasła
          </Link>
          <Link
            to="/email-verification"
            className="text-gunfire-orange hover:text-gunfire-orange-hover"
          >
            Wyślij ponownie link aktywacyjny
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Nie posiadasz jeszcze konta? </span>
          <Link
            to="/register"
            className="text-gunfire-orange hover:text-gunfire-orange-hover"
          >
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
