import { Compass } from "lucide-react";

const Loader = ({ fullPage = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute h-16 w-16 rounded-full border-2 border-primary/10 animate-ping"></div>
        {/* Spinner */}
        <div className="h-14 w-14 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
        <Compass className="absolute h-6 w-6 text-primary" />
      </div>
      <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold animate-pulse">
        Loading experiences...
      </p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{content}</div>;
};

export default Loader;
