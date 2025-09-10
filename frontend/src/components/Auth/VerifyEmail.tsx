import React, { useEffect, useState, useRef } from "react";
import { apiClient } from "../../utils/api"; // Pastikan ApiClient sudah terhubung dengan benar

const VerifyEmail: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Menyimpan status apakah permintaan sudah dilakukan
  const isRequesting = useRef(false);

  // Ambil token dari URL path
  const token = window.location.pathname.split('/').pop();

  useEffect(() => {
    // Pastikan token ada dan request belum dilakukan
    if (token && !isRequesting.current) {
      const verifyUserEmail = async () => {
        isRequesting.current = true; // Set true agar request tidak dipanggil ulang
        try {
          // Panggil API untuk verifikasi email
          const response = await apiClient.verifyEmail(token);

          if (response.success) {
            setIsVerified(true);
            window.location.href = "/login"; // Redirect setelah verifikasi sukses
          } else {
            setIsVerified(false);
            setErrorMessage(response.message);
          }
        } catch (error: any) {
          setIsVerified(false);
          setErrorMessage(error.message);
        }
      };

      verifyUserEmail();
    } else if (!token) {
      setErrorMessage("Token verifikasi tidak valid.");
    }
  }, [token]); // `token` sebagai dependensi untuk menjalankan `useEffect` hanya sekali

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {isVerified === null ? (
          <p>Verifying your email...</p>
        ) : isVerified ? (
          <p>Your email has been successfully verified. You will be redirected to the login page shortly.</p>
        ) : (
          <p>Failed to verify your email. {errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
