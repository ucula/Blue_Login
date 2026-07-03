import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailTemplateProps {
  verificationUrl: string;
}

export default function VerifyEmailTemplate({
  verificationUrl,
}: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        {/* Logo Header */}
        <table
          align="center"
          border={0}
          cellPadding={0}
          cellSpacing={0}
          style={logoTable}
        >
          <tbody>
            <tr>
              <td style={logoIconContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="#000000"
                  style={{ display: "block" }}
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </td>
              <td style={logoText}>ExpertAdmin</td>
            </tr>
          </tbody>
        </table>

        {/* Main Content Card */}
        <Container style={container}>
          <Text style={heading}>Verify your email</Text>

          {/* Dotted Grid Pattern Illustration with Overlapping Circles */}
          <table
            width="100%"
            border={0}
            cellPadding={0}
            cellSpacing={0}
            style={illustrationContainer}
          >
            <tbody>
              <tr>
                <td align="center" valign="middle" style={{ height: "160px" }}>
                  <div style={outerCircle}>
                    <table
                      width="100%"
                      border={0}
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ height: "100%" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="middle"
                            style={{ position: "relative" }}
                          >
                            <Img
                              src="https://img.icons8.com/ios/80/000000/mail.png"
                              width="40"
                              height="40"
                              alt="Mail Icon"
                              style={{ display: "block" }}
                            />
                            <div style={blueBadge}>
                              <table
                                width="100%"
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                style={{ height: "100%" }}
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" valign="middle">
                                      <Img
                                        src="https://img.icons8.com/ios-glyphs/30/ffffff/checkmark.png"
                                        width="14"
                                        height="14"
                                        alt="Checkmark"
                                        style={{ display: "block" }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Body Text */}
          <Text style={paragraph}>
            Hi there, we received a request to verify your email address. Click
            the button below to complete the verification check.
          </Text>

          {/* Verification Button */}
          <Section style={btnContainer}>
            <Link style={button} href={verificationUrl}>
              Verify Email
            </Link>
          </Section>

          {/* Footer Divider */}
          <Hr style={hr} />

          {/* Footer Info Text */}
          <Text style={footer}>
            This link will expire in 24 hours for your protection.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styling
const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 20px",
};

const logoTable = {
  margin: "0 auto 24px",
};

const logoIconContainer = {
  verticalAlign: "middle",
};

const logoText = {
  paddingLeft: "8px",
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  color: "#000000",
  verticalAlign: "middle",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025)",
  maxWidth: "480px",
  margin: "0 auto",
  padding: "40px 32px",
  textAlign: "center" as const,
};

const heading = {
  margin: "0 0 24px",
  fontSize: "22px",
  fontWeight: "600",
  color: "#000000",
  lineHeight: "1.2",
  textAlign: "center" as const,
};

const illustrationContainer = {
  backgroundColor: "#f4f4f5",
  backgroundImage: "radial-gradient(#e4e4e7 1.5px, transparent 1.5px)",
  backgroundSize: "12px 12px",
  borderRadius: "12px",
  marginBottom: "32px",
};

const outerCircle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  border: "2px solid #000000",
  position: "relative" as const,
  display: "inline-block",
};

const blueBadge = {
  position: "absolute" as const,
  bottom: "-2px",
  right: "-2px",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "#2563eb",
  border: "2px solid #ffffff",
};

const paragraph = {
  margin: "0 0 32px",
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#475569",
  textAlign: "center" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#000000",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  padding: "16px 32px",
  borderRadius: "8px",
  display: "inline-block",
  textAlign: "center" as const,
};

const hr = {
  border: "0",
  borderTop: "1px solid #e2e8f0",
  margin: "32px 0 24px",
};

const footer = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#475569",
  fontStyle: "italic",
  textAlign: "center" as const,
};
