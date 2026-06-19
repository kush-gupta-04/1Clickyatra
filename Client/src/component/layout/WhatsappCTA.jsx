import { MessageCircle } from "lucide-react";

const WhatsAppCTA = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || "+1234567890";
  const defaultMessage = encodeURIComponent(
    "Hello 1ClickTravel, I would like to inquire about a vacation package.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group flex items-center justify-center cursor-pointer"
      title="Chat with us on WhatsApp"
    >
      {/* Pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 group-hover:animate-none"></span>

      <MessageCircle className="h-6 w-6 stroke-[2.5]" />

      {/* Tooltip */}
      <span className="absolute right-14 bg-white text-slate-800 text-xs py-1.5 px-3 rounded-md border border-slate-200 shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-semibold whitespace-nowrap hidden sm:inline-block">
        Book on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppCTA;
