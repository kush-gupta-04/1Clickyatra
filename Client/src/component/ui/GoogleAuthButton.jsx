import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authFailure, authStart, authSuccess } from "../../store/slices/authSlice.js";
import API from "../../api/axios.js";
import { firebaseAuth, isFirebaseConfigured } from "../../config/firebase.js";

const GoogleAuthButton = ({ text, onError }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleGoogleSignIn = async () => {
    dispatch(authStart());
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const idToken = await result.user.getIdToken();
      const response = await API.post("/auth/google", { idToken });
      const user = response.data.data;
      dispatch(authSuccess({ user, token: user.token }));
    } catch (error) {
      console.error("Google Auth error:", error);
      const message =
        error.response?.data?.message ||
        (error.code === "auth/popup-closed-by-user"
          ? "Google sign-in popup was closed before completion."
          : error.code === "auth/popup-blocked"
          ? "Google sign-in popup was blocked by browser."
          : error.message || "Google sign-in failed. Please try again.");
      dispatch(authFailure(message));
      onError?.(message);
    }
  };

  if (!isFirebaseConfigured) {
    return (
      <p className="text-center text-xs text-slate-500" role="status">
        Firebase sign-in is not configured. Add the Firebase web app settings to enable it.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-md transition-colors text-xs uppercase tracking-wider flex items-center justify-center space-x-3 cursor-pointer shadow-sm disabled:cursor-wait disabled:opacity-60"
    >
      <span className="font-bold normal-case text-base text-blue-600" aria-hidden="true">
        G
      </span>
      <span>
        {loading
          ? "Connecting..."
          : text === "signup_with"
            ? "Sign up with Google"
            : "Continue with Google"}
      </span>
    </button>
  );
};

export default GoogleAuthButton;