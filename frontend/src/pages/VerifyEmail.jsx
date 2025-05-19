import { useEffect, useState, useRef } from "react"; // Dodaj useRef
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const { verifyEmailToken } = useAuth();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    const token = searchParams.get("id");
    if (!token || hasVerified.current) return;

    const verify = async () => {
      const result = await verifyEmailToken(token);
      setStatus(result.type);
      setMessage(result.message);
      hasVerified.current = true;

      if (result.type === "success") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    verify();
  }, [searchParams.get("token"), navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Weryfikacja konta</h2>

        {status === "loading" && <p>Trwa weryfikacja tokenu...</p>}

        {status !== "loading" && (
          <p
            className={`text-lg ${status === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
