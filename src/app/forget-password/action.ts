"use server";

type ResetPasswordResponse = {
  success: boolean;
  error?: string;
};

export async function requestPasswordReset(
  email: string
): Promise<ResetPasswordResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to send reset email",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return {
      success: false,
      error: "Failed to send reset email. Please try again later.",
    };
  }
}
