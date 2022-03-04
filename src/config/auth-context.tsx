import { User } from "firebase/auth";
import { createContext } from "react";
interface AuthContextType {
	user: User | null;
	signin: () => void;
	signout: (callback: VoidFunction) => void;
}
export const AuthContext = createContext<AuthContextType>(null!);