import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12">
      <div className="max-w-md mx-auto w-full">
        <RegisterForm />
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
