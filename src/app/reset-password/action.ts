"use server";

type ResetPasswordRequest = {
  email: string;
  token: string;
  newPassword: string;
};

type ResetPasswordResponse = {
  success: boolean;
  error?: string;
};

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const response = await fetch(`${apiUrl}/auth/reset-password-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        email: data.email,
        newPassword: data.newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `Failed with status: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      error: "Failed to reset password. Please try again later.",
    };
  }
}
