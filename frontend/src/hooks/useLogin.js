import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});


			if (!res.ok) {
				toast.error("Invalid username or password");
				return { loading, login };
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to login");
			}
			const data = await res.json();

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
