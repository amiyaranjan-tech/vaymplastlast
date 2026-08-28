import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { server } from "../server";

const DeleteAccountPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState(isAuthenticated ? user?.email || "" : "");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submittingRef = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ref guard is synchronous (unlike state) so a fast double-submit
    // (double click, Enter + click) can't slip both requests through
    if (submittingRef.current || submitted) return;
    submittingRef.current = true;

    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/request-account-deletion`, {
        email,
        reason,
      });
      toast.success(data.message);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      submittingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header activeHeading={0} />
      <div className="min-h-[70vh] bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-md p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Account Deletion Request
          </h1>
          <p className="text-gray-500 mb-6">Vaymp &mdash; developed and operated by Vaymp</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. About this page
            </h2>
            <p className="text-gray-700">
              If you use the Vaymp app or website and would like to delete your
              account and associated data, you can submit an account deletion
              request using the form below. This page works entirely in your
              browser &mdash; you do not need to install or reinstall the Vaymp
              app to use it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. What data will be deleted
            </h2>
            <p className="text-gray-700 mb-2">
              Once your request is confirmed, we permanently delete:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Your user account and profile (name, email, phone number)</li>
              <li>Your saved delivery addresses</li>
              <li>Your login credentials (password) and Google sign-in link</li>
              <li>Your profile photo, if you uploaded one</li>
              <li>Your chat conversations and messages with sellers</li>
              <li>Product reviews and ratings you have posted</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Data retention
            </h2>
            <p className="text-gray-700">
              We retain your past <strong>order, payment and refund records</strong>{" "}
              even after your account is deleted. These records include the
              purchase details (items, amounts paid, order status) together
              with a copy of the account and delivery information as it stood
              at the time of that order &mdash; name, email, phone number and
              delivery address. This is necessary for accounting, fraud
              prevention, and to resolve any order disputes or refund/warranty
              claims raised by you or the seller. These records are no longer
              linked to an active account of yours and are kept only for as
              long as needed for these purposes &mdash; we do not currently
              have a fixed deletion timeframe defined for them. No other
              personal data is retained.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Request account deletion
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4">
                <p className="font-medium">
                  Your account deletion request has been received.
                </p>
                <p className="mt-2 text-sm">
                  We&apos;ve sent a confirmation link to <strong>{email}</strong>.
                  For your security, deletion only happens after you click that
                  link and confirm it &mdash; this proves the request came from
                  the account owner. The link expires in 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address used for your Vaymp account
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                    Reason for leaving (optional)
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className="mt-1 w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional message"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 h-[42px] rounded-md text-white font-medium bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Request Account Deletion"}
                </button>
              </form>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Are you an admin or support account? These can&apos;t be deleted
              through this form &mdash; email{" "}
              <a href="mailto:vaympforyou@gmail.com" className="text-blue-600 hover:underline">
                vaympforyou@gmail.com
              </a>{" "}
              and we&apos;ll process it for you.
            </p>
          </section>

          <section className="mb-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Identity verification
            </h2>
            <p className="text-gray-700">
              To prevent unauthorized deletion requests, we send a confirmation
              link to the email address on your account. Only someone with
              access to that inbox can complete the deletion.
            </p>
          </section>

          <section className="mb-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Support and Privacy Policy
            </h2>
            <p className="text-gray-700">
              Questions about this process? Contact us at{" "}
              <a href="mailto:vaympforyou@gmail.com" className="text-blue-600 hover:underline">
                vaympforyou@gmail.com
              </a>
              . See our{" "}
              <a href="/PrivacyPolicy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              for more on how we handle your data.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteAccountPage;
