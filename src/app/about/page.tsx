import { Metadata } from "next";
import Link from "next/link";
import { generateOrganizationSchema, generateBreadcrumbSchema, schemaToScriptProps } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";

export const metadata: Metadata = {
  title: "About — UPI Cost Calculator",
  description: "Learn about UPI Cost Calculator, our mission to make UPI payment rules transparent, our methodology, and how our source-backed calculator works.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script {...schemaToScriptProps(orgSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24 }}>
            About UPI Cost Calculator
          </h1>

          <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
            <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
              UPI Cost Calculator is a free, source-backed informational platform that helps merchants
              and consumers understand UPI payment costs and rules.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Our Mission</h2>
            <p>
              With the introduction of MDR on certain UPI transactions, understanding the cost structure
              has become important for merchants and consumers alike. We believe payment rules should
              be transparent, accessible, and easy to understand.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>What We Are</h2>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>An informational calculator and rules reference</li>
              <li>A source-backed educational resource</li>
              <li>A free tool for merchants and consumers</li>
              <li>Built with <Link href="/methodology" style={{ color: "hsl(var(--primary))" }}>transparent methodology</Link></li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>What We Are NOT</h2>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>We are <strong>not</strong> a bank or payment processor</li>
              <li>We are <strong>not</strong> a UPI app</li>
              <li>We are <strong>not</strong> a tax adviser, lawyer, or financial adviser</li>
              <li>We <strong>do not</strong> process payments or store payment credentials</li>
              <li>We are <strong>not</strong> affiliated with NPCI, RBI, or any payment provider</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Our Approach</h2>
            <p>
              Every rule in our calculator is sourced from official publications and verified reporting.
              We use a versioned rules engine with decimal-safe arithmetic (Decimal.js) to ensure accuracy. Our
              calculations clearly distinguish between merchant-side MDR and customer-facing fees.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Author</h2>
            <p>
              {siteConfig.name} is developed and maintained by <strong>{siteConfig.author.name}</strong>.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Sources</h2>
            <p>
              We consult official NPCI circulars and verified reporting from trusted publications.
              View our complete <Link href="/sources" style={{ color: "hsl(var(--primary))" }}>source registry</Link>.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Contact</h2>
            <p>
              Found an error or have a correction? <Link href="/contact" style={{ color: "hsl(var(--primary))" }}>Contact us</Link>.
            </p>
          </article>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            Last updated: September 2026
          </div>
        </div>
      </section>
    </>
  );
}
