import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login: setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginHandler = async ({ email, password, role }) => {
    setLoading(true);

    try {
      const response = await loginUser({ email, password, role });

      const {
        access,
        refresh,
        email: userEmail,
        username,
        role: userRole,
      } = response;

      if (!access) {
        return { status: 401, data: { message: "Invalid credentials" } };
      }

      // ✅ Normalize roles: 'sub-vendor' vs 'subvendor'
      const normalize = (r) => r?.toLowerCase().replace(/-/g, "");

      if (normalize(userRole) !== normalize(role)) {
        return {
          status: 403,
          data: {
            message: `Unauthorized login. You are registered as '${userRole}', not '${role}'.`,
          },
        };
      }

      // ✅ Save in auth context
      setAuth({
        token: access,
        refreshToken: refresh,
        user: {
          email: userEmail,
          username,
          role: userRole,
        },
      });

      return { status: 200, data: response };
    } catch (error) {
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Login failed";

      return { status, data: { message } };
    } finally {
      setLoading(false);
    }
  };

  return { login: loginHandler, loading };
};

export default useLogin;
