import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";

interface UserState {
	name?: string;
	email?: string;
	isAuthenticated: boolean;
	fetchUser: () => Promise<void>;
	signOutUser: () => Promise<void>;
}
export const useUserStore = create<UserState>()(
	persist(
		set => ({
			name: undefined,
			email: undefined,
			isAuthenticated: false,

			fetchUser: async () => {
				try {
					const { username } = await getCurrentUser();

					if (username) {
						const { name, email } = await fetchUserAttributes();
						set({
							name: name,
							email: email,
							isAuthenticated: true,
						});
					}
				} catch {
					set({ name: undefined, email: undefined, isAuthenticated: false });
				}
			},

			signOutUser: async () => {
				await signOut();
				set({ name: undefined, email: undefined, isAuthenticated: false });
			},
		}),
		{
			name: "user-storage", // key in localStorage
			partialize: state => ({
				name: state.name,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
