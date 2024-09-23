import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message, setMessage }: { message: Message, setMessage: (message: Message) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('timeout')) {
      setMessage({ error: 'You have been logged out due to inactivity. Please sign in again.' });
    }
    if (searchParams.has('logout')) {
      setMessage({ success: 'You have been logged out. Please sign in again.' });
    }
  }, [searchParams]);
  const getIcon = () => {
    if ("success" in message) return <CheckCircle className="w-5 h-5" />;
    if ("error" in message) return <XCircle className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  const getColorClasses = () => {
    if ("success" in message) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if ("error" in message) return "bg-red-50 text-red-800 border-red-200";
    return "bg-blue-50 text-blue-800 border-blue-200";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={JSON.stringify(message)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center p-4 mb-4 text-sm rounded-lg ${getColorClasses()}`}
        role="alert"
      >
        <div className="mr-3">{getIcon()}</div>
        <div className="flex-1">
          {"success" in message && message.success}
          {"error" in message && message.error}
          {"message" in message && message.message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
