"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request-failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="cform">
      <span className="label">{t("formKicker")}</span>
      <h3 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "26px", marginTop: "10px" }}>
        {t("formTitle")}
      </h3>
      <p>{t("formDesc")}</p>

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">{t("fields.name")}</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="phone">{t("fields.phone")}</label>
            <input id="phone" name="phone" type="tel" required />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="email">{t("fields.email")}</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="field">
            <label htmlFor="projectType">{t("fields.projectType")}</label>
            <select id="projectType" name="projectType" defaultValue="">
              <option value="" disabled>
                {t("fields.projectTypePlaceholder")}
              </option>
              <option value="home">{t("projectTypes.home")}</option>
              <option value="office">{t("projectTypes.office")}</option>
              <option value="furniture">{t("projectTypes.furniture")}</option>
              <option value="other">{t("projectTypes.other")}</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="budget">{t("fields.budget")}</label>
          <input id="budget" name="budget" type="text" />
        </div>

        <div className="field">
          <label htmlFor="message">{t("fields.message")}</label>
          <textarea id="message" name="message" required />
        </div>

        <label className="consent">
          <input type="checkbox" name="consent" required />
          <span>
            {t("fields.consent")}{" "}
            <Link href="/gizlilik-politikasi" target="_blank" rel="noopener noreferrer">
              {t("privacyLinkText")}
            </Link>
          </span>
        </label>

        <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")}
        </button>

        {status === "ok" && <p className="form-msg ok">{t("success")}</p>}
        {status === "error" && <p className="form-msg err">{t("error")}</p>}
      </form>
    </div>
  );
}
