import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();
    
    console.log("Received contact form:", { name, email, subject: subject || "Nouveau message", message: message.substring(0, 100) + "..." });

    // Send email to AlymJr
    const emailResponse = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["contact@alymjr.fr"],
      subject: subject || `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Nouveau message depuis votre portfolio
          </h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #6366f1; margin-top: 0;">Informations du contact</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject || "Non spécifié"}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e0e7ff; border-radius: 8px;">
            <p style="margin: 0; color: #6366f1; font-size: 14px;">
              <strong>Répondre à:</strong> ${email}
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the sender
    const confirmationResponse = await resend.emails.send({
      from: "AlymJr Portfolio <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de réception de votre message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            Merci pour votre message, ${name} !
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            J'ai bien reçu votre message et je vous remercie de m'avoir contacté.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #6366f1; margin-top: 0;">Récapitulatif de votre message</h2>
            <p><strong>Sujet:</strong> ${subject || "Non spécifié"}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #6366f1; margin: 10px 0;">
              <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Je m'efforce de répondre dans les plus brefs délais, généralement sous 24h.
          </p>
          
          <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6366f1; text-align: center;">
              <strong>AlymJr</strong><br>
              Designer Graphique<br>
              contact@alymjr.fr
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Emails sent successfully",
      emailId: emailResponse.data?.id,
      confirmationId: confirmationResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
    
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);