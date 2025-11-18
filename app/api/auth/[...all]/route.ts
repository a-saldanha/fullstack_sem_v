// app/api/auth/[...all]/route.ts

import { auth } from "@/lib/auth/config";
import { toNextJsHandler } from "better-auth/next-js";
import { createMockUser } from "@/lib/data/mockStore";

// Augment the handler to capture successful registration (if BetterAuth exposes it)
const handler = toNextJsHandler(auth, {
    // Custom handler to intercept registration and create mock user in our store
    onRegisterSuccess: async (userPayload, context) => {
        // userPayload will likely be the raw data sent to the register endpoint
        // We create a mock user in our store using the ID BetterAuth generates.
        const newUser = createMockUser({
            id: userPayload.id, // Assuming ID is returned or accessible
            name: userPayload.name || "New User",
            email: userPayload.email,
        });
        console.log(`Mock user created for new registration: ${newUser.id}`);
    }
});

export const { GET, POST } = handler;
