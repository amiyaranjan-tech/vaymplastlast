import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { server } from "../server";

const ConfirmAccountDeletion = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("checking"); // checking | ready | invalid | deleting | done
  const [email, setEmail] = useState("");
  const submittingRef = useRef(false);

  useEffect(() => {
    axios
      .get(`${server}/user/verify-deletion-token/${token}`)
      .then(({ data }) => {
        setEmail(data.email);
        setStatus("ready");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const confirmDeletion = async () => {
    // ref guard is synchronous (unlike state) so a double-click can't slip
    // both invocations through before the first one flips the status
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("deleting");
    try {
      const { data } = await axios.post(`${server}/user/confirm-account-deletion`, {
        token,
      });
      toast.success(data.message);
      setStatus("done");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      setStatus("invalid");
      submittingRef.current = false;
    }
  };

  return (
    <div>
      <Header activeHeading={0} />
      <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-md p-8 text-center">
          {status === "checking" && <p className="text-gray-600">Verifying your request...</p>}

          {status === "ready" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm account deletion</h1>
              <p className="text-gray-600 mb-6">
                This will permanently delete the Vaymp account for{" "}
                <strong>{email}</strong> and its associated data. This action
                cannot be undone.
              </p>
              <button
                onClick={confirmDeletion}
                className="w-full h-[42px] rounded-md text-white font-medium bg-red-600 hover:bg-red-700"
              >
                Yes, permanently delete my account
              </button>
            </>
          )}

          {status === "deleting" && <p className="text-gray-600">Deleting your account...</p>}

          {status === "done" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Account deleted</h1>
              <p className="text-gray-600 mb-6">
                Your account and associated data have been permanently deleted.
              </p>
              <Link to="/" className="text-blue-600 hover:underline">
                Return to home
              </Link>
            </>
          )}

          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Link invalid or expired</h1>
              <p className="text-gray-600 mb-6">
                This deletion link is invalid, expired, or was already used.
              </p>
              <Link to="/delete-account" className="text-blue-600 hover:underline">
                Request a new deletion link
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmAccountDeletion;
