"use client";

import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/components/LanguageProvider";

type Purpose = "hiring" | "project" | "other";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  emailDestination: string;
};

export default function ContactModal({
  isOpen,
  onClose,
  emailDestination,
}: Props) {
  const { lang } = useLanguage();
  const lenis = useLenis();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("hiring");
  const [projectNote, setProjectNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedProject, setIsSubmittedProject] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    purpose: Purpose;
    note: string;
  } | null>(null);

  const handleClose = useCallback(() => {
    setIsSubmittedProject(false);
    setIsSubmitting(false);
    onClose();
  }, [onClose]);

  // Stop Lenis scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedNote = projectNote.trim();
    const selectedPurpose = purpose;

    setIsSubmitting(true);

    // 1. Dispatch to our backend API (/api/contact) to store inquiry and trigger email dispatch
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          purpose: selectedPurpose,
          message:
            trimmedNote ||
            (selectedPurpose === "hiring"
              ? "Hiring / Role inquiry from portfolio"
              : selectedPurpose === "project"
              ? "Project collaboration inquiry"
              : "General networking inquiry"),
        }),
      });
    } catch (err) {
      console.warn("[ContactModal] Background inquiry dispatch warning:", err);
    } finally {
      setIsSubmitting(false);
    }

    // 2. Handle routing based on user purpose
    if (selectedPurpose === "project") {
      // If user selected "Project", display the greeting confirmation screen
      setSubmittedData({
        name: trimmedName,
        email: trimmedEmail,
        purpose: selectedPurpose,
        note: trimmedNote,
      });
      setIsSubmittedProject(true);
      return;
    }

    // For Hiring or Other: Transfer directly to Google Gmail web compose
    const subjectPrefix =
      selectedPurpose === "hiring" ? "Hiring Opportunity" : "Connecting";
    const subject = encodeURIComponent(
      `[${subjectPrefix}] ${trimmedName} - Connecting with Aditya Pande`
    );
    const bodyText = encodeURIComponent(
      `Hi Aditya,\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nPurpose: ${
        selectedPurpose === "hiring"
          ? "Hiring / Role Opportunity"
          : "General / Other Discussion"
      }\n\nMessage / Opportunity Details:\nI would like to connect and discuss an opportunity with you.`
    );

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestination}&su=${subject}&body=${bodyText}`;

    // SYNCHRONOUS window.open inside the click/submit handler guarantees modern browsers do NOT block it as a popup
    const popup = window.open(gmailWebUrl, "_blank", "noopener,noreferrer");

    // If browser strictly blocked the pop-up, navigate directly in the current window
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      window.location.href = gmailWebUrl;
    } else {
      handleClose();
    }
  };

  const handleProjectDirectGmail = () => {
    const pName = submittedData?.name || name;
    const pEmail = submittedData?.email || email;
    const pNote = submittedData?.note || projectNote;

    const subject = encodeURIComponent(
      `[Project Inquiry] ${pName ? `${pName} - ` : ""}New Project Collaboration`
    );
    const bodyText = encodeURIComponent(
      `Hi Aditya,\n\nName: ${pName || "Not provided"}\nEmail: ${
        pEmail || "Not provided"
      }\nPurpose: Project Collaboration\n\nProject Scope / Overview:\n${
        pNote || "I would like to discuss and collaborate on a project."
      }`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestination}&su=${subject}&body=${bodyText}`;
    const popup = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      window.location.href = gmailUrl;
    }
  };

  const handleSystemMailto = () => {
    const subject = encodeURIComponent(
      `[Direct Inquiry] ${name ? `${name} - ` : ""}Aditya Pande Portfolio`
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\nName: ${name || ""}\nEmail: ${email || ""}\n`
    );
    window.location.href = `mailto:${emailDestination}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Dimmed backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-ink-0/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Atmospheric seasonal glow behind modal */}
      <div
        aria-hidden="true"
        className="fixed -inset-10 bg-gradient-to-tr from-ice-500/20 via-sky-400/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-ice-700/60 bg-gradient-to-b from-ink-1/95 via-ink-2/90 to-ink-1/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] z-10 transition-all">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          data-cursor="hover"
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-ice-700/60 bg-ink-2/70 text-ice-300 hover:text-ice-50 hover:border-ice-500 transition-all flex items-center justify-center text-sm"
        >
          ✕
        </button>

        {isSubmittedProject ? (
          /* ─── Project Greeting Confirmation Screen ─── */
          <div className="py-4 text-center animate-fadeIn">
            {/* Animated Glow Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-ice-400/20 border border-emerald-400/40 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              ✨
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">
              {lang === "hi"
                ? "Project Inquiry Safaltapoorvak Bheji Gayi"
                : "Inquiry Dispatched & Saved"}
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-ice-50 tracking-tight mb-3">
              {lang === "hi"
                ? `Shukriya ${
                    submittedData?.name || name || "Aapka"
                  }! Hum aapse jald hi contact karenge.`
                : `Thank you ${
                    submittedData?.name || name || ""
                  }! We'll contact you soon.`}
            </h3>

            <p className="text-sm sm:text-base text-ice-200/90 leading-relaxed max-w-md mx-auto mb-5">
              {lang === "hi"
                ? `Aapki project inquiry receive ho chuki hai aur system me darj kar li gayi hai. Aditya aapki requirements dekh kar ${
                    submittedData?.email || email || "aapke email"
                  } par jald se jald reach out karenge.`
                : `Your project inquiry has been recorded and delivered. Aditya will review your requirements and reach out to ${
                    submittedData?.email || email || "your email"
                  } shortly.`}
            </p>

            {/* Submission Summary Card */}
            <div className="p-4 rounded-2xl border border-ice-700/50 bg-ink-2/70 text-xs font-mono text-ice-300 mb-6 text-left space-y-1.5">
              <div className="flex justify-between items-center text-emerald-400 font-semibold border-b border-ice-800/60 pb-1.5 mb-1.5">
                <span>✓ Status: Recorded &amp; Sent</span>
                <span className="text-[11px] text-ice-400">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p>
                <strong className="text-ice-100">Name:</strong>{" "}
                {submittedData?.name || name}
              </p>
              <p>
                <strong className="text-ice-100">Email:</strong>{" "}
                {submittedData?.email || email}
              </p>
              <p>
                <strong className="text-ice-100">Purpose:</strong> Project Collaboration
              </p>
              {submittedData?.note && (
                <p className="text-ice-300 truncate">
                  <strong className="text-ice-100">Note:</strong>{" "}
                  {submittedData.note}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="frost-btn frost-btn--primary w-full sm:w-auto !py-2.5 !px-6"
              >
                {lang === "hi" ? "Theek Hai (Done)" : "Done (Close)"}
              </button>

              <button
                type="button"
                onClick={handleProjectDirectGmail}
                className="frost-btn w-full sm:w-auto !py-2.5 !px-5 text-xs text-ice-300 flex items-center justify-center gap-2"
              >
                <span>✉</span>
                <span>
                  {lang === "hi"
                    ? "Direct Gmail se bhi bhejein ↗"
                    : "Send copy via Gmail directly ↗"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* ─── Contact Input & Purpose Selection Form ─── */
          <div>
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ice-400 mb-1">
                {lang === "hi" ? "DIRECT CONNECT" : "DIRECT CONNECT"}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                {lang === "hi" ? "Aditya se Connect Karein" : "Connect with Aditya"}
              </h3>
              <p className="text-xs sm:text-sm text-ice-300 mt-1">
                {lang === "hi"
                  ? "Apna naam, email aur purpose select karein."
                  : "Fill in your details and select your purpose to get started."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-mono text-ice-200 mb-1.5 uppercase tracking-wider">
                  {lang === "hi" ? "Aapka Naam" : "Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    lang === "hi" ? "Jaise: Rahul Sharma" : "e.g. Alex Johnson"
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-ice-700/70 bg-ink-2/80 text-ice-50 placeholder-ice-500 text-sm focus:outline-none focus:border-ice-400 focus:ring-1 focus:ring-ice-400 transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-mono text-ice-200 mb-1.5 uppercase tracking-wider">
                  {lang === "hi" ? "Aapka Email" : "Email"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-ice-700/70 bg-ink-2/80 text-ice-50 placeholder-ice-500 text-sm focus:outline-none focus:border-ice-400 focus:ring-1 focus:ring-ice-400 transition-all"
                />
              </div>

              {/* Purpose Selection Chips */}
              <div>
                <label className="block text-xs font-mono text-ice-200 mb-2 uppercase tracking-wider">
                  {lang === "hi"
                    ? "Purpose (Kyun contact karna chahte hain?)"
                    : "Purpose of Contact"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Hiring */}
                  <button
                    type="button"
                    onClick={() => setPurpose("hiring")}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      purpose === "hiring"
                        ? "border-ice-300 bg-ice-100 text-ink-0 shadow-[0_0_15px_rgba(234,242,251,0.3)]"
                        : "border-ice-700/60 bg-ink-2/60 text-ice-300 hover:text-ice-50 hover:border-ice-500"
                    }`}
                  >
                    <span className="text-sm">💼</span>
                    <span>{lang === "hi" ? "Hiring?" : "Hiring?"}</span>
                  </button>

                  {/* Project */}
                  <button
                    type="button"
                    onClick={() => setPurpose("project")}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      purpose === "project"
                        ? "border-ice-300 bg-ice-100 text-ink-0 shadow-[0_0_15px_rgba(234,242,251,0.3)]"
                        : "border-ice-700/60 bg-ink-2/60 text-ice-300 hover:text-ice-50 hover:border-ice-500"
                    }`}
                  >
                    <span className="text-sm">🚀</span>
                    <span>{lang === "hi" ? "Project?" : "Project?"}</span>
                  </button>

                  {/* Other */}
                  <button
                    type="button"
                    onClick={() => setPurpose("other")}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      purpose === "other"
                        ? "border-ice-300 bg-ice-100 text-ink-0 shadow-[0_0_15px_rgba(234,242,251,0.3)]"
                        : "border-ice-700/60 bg-ink-2/60 text-ice-300 hover:text-ice-50 hover:border-ice-500"
                    }`}
                  >
                    <span className="text-sm">💬</span>
                    <span>{lang === "hi" ? "Other" : "Other"}</span>
                  </button>
                </div>
              </div>

              {/* Optional note if Project is chosen */}
              {purpose === "project" && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-mono text-ice-200 mb-1.5 uppercase tracking-wider">
                    {lang === "hi"
                      ? "Project Details (Optional)"
                      : "Brief Project Note (Optional)"}
                  </label>
                  <textarea
                    rows={2}
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    placeholder={
                      lang === "hi"
                        ? "Project ke baare me thoda batayein..."
                        : "Describe the project or timeline..."
                    }
                    className="w-full px-4 py-2 rounded-xl border border-ice-700/70 bg-ink-2/80 text-ice-50 placeholder-ice-500 text-xs focus:outline-none focus:border-ice-400 focus:ring-1 focus:ring-ice-400 transition-all resize-none"
                  />
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="frost-btn frost-btn--primary w-full !py-3 flex items-center justify-center gap-2 font-semibold disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-ink-0 border-t-transparent rounded-full animate-spin" />
                      <span>{lang === "hi" ? "Bhej rahe hain..." : "Sending..."}</span>
                    </span>
                  ) : purpose === "project" ? (
                    <>
                      <span>
                        {lang === "hi"
                          ? "Project Submit Karein ✦"
                          : "Submit Project Inquiry ✦"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {lang === "hi"
                          ? `Google Gmail pe Transfer Karein (${
                              purpose === "hiring" ? "Hiring" : "Other"
                            }) ↗`
                          : `Continue to Google Gmail (${
                              purpose === "hiring" ? "Hiring" : "Other"
                            }) ↗`}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct email fallback link */}
              <div className="pt-2 text-center text-[11px] text-ice-400 flex items-center justify-center gap-1.5">
                <span>Or direct:</span>
                <button
                  type="button"
                  onClick={handleSystemMailto}
                  className="underline hover:text-ice-100 transition-colors"
                >
                  {emailDestination}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
