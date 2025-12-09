import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query"

export function useUser() {
    // Always provide a fake user for ALL components
    const user = {
        id: "1",
        role: "authenticated",
        user_metadata: {
            name: "Admin User",
            email: "admin@example.com"
        }
    };
    return { isLoading: false, user, isAuthenticated: true };
}