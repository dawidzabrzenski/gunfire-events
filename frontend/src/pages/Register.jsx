import { Link, useLocation } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  const location = useLocation();
  const success = location.state?.success;

  return (
    <div className="flex min-h-screen flex-col justify-center py-12">
      <div className="mx-auto w-1/2">
        <RegisterForm success={success} />
        <div className="mt-4 text-center">
          <span className="text-gray-600">Posiadasz już konto? </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
