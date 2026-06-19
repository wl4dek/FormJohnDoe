import type { RegisterUserResponse } from "@/types/userResponse";
import type { FormData } from "@/types/form";
import { API_URL } from "@/utils/constants";

export const create_user = async (data: FormData): Promise<RegisterUserResponse> => {
    console.log('create_user', { ...data })
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
    });

    const body = await response.json();

    if (!response.ok) {
        throw body;
    }

    return body;
}