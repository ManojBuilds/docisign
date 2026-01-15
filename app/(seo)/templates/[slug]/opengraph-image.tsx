import { templatesData } from "@/lib/templates-data";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BoopSign Contract Template";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const template = templatesData[slug];

  if (!template) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          BoopSign
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "#EFF6FF",
            borderRadius: "100px",
            border: "1px solid #DBEAFE",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#2563EB",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#2563EB",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {template.category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#0F172A",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>{template.name}</span>
          <div
            style={{
              height: "8px",
              width: "120px",
              backgroundColor: "#2563EB",
              marginTop: "16px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "24px",
            color: "#64748B",
            lineHeight: 1.5,
            maxWidth: "700px",
            marginBottom: "64px",
          }}
        >
          {template.subtitle.length > 150
            ? template.subtitle.substring(0, 150) + "..."
            : template.subtitle}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#2563EB",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              B
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1E293B",
              }}
            >
              BoopSign
            </span>
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            boopsign.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
