import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import FirebaseService from "../services/FirebaseService";
import { AuthContext } from "./auth-context";

const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	// Handle user state changes
	function onAuthStateChanged(user: any) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = FirebaseService.auth.onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);  	
  
	const signin = async (): Promise<void> => {
		const results = await FirebaseService.signInWithPopup();
		const credentials = FirebaseService.GoogleAuthProvider.credentialFromResult(results);
	};
  
	const signout = async (): Promise<void> => {
		await FirebaseService.signOut();
	};	
  
	const value = { user, signin, signout };
	
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;