import { Img, Link } from "@react-email/components";

interface LogoProps {
  showText?: boolean;
  baseUrl?: string;
}

export default function Logo({ showText = true, baseUrl = "" }: LogoProps) {
  return (
    <Link href={baseUrl} style={linkStyle}>
      <Img
        src={`${baseUrl}/static/logo.png`}
        alt="Boopsign Logo"
        width="40"
        height="40"
      />
      {showText && <span style={textStyle}>Boopsign.com</span>}
    </Link>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
};

const textStyle = {
  fontSize: "20px",
  fontWeight: "600",
};
