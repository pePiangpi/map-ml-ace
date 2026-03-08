import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot } from 'lucide-react';

const analogies: Record<string, string> = {
  kinesis: '🏭 Kinesis is like a conveyor belt — data flows through continuously in real-time!',
  s3: '📦 S3 is like an infinite storage locker — throw anything in, find it with the right key!',
  sagemaker: '🧪 SageMaker is like a complete science lab — everything you need to experiment, train, and deploy ML models!',
  glue: '🧹 Glue is like a robot janitor — it automatically cleans and organizes your messy data!',
  redshift: '🔬 Redshift is like a super-fast calculator — crunch billions of numbers in seconds!',
  lambda: '⚡ Lambda is like a magic button — press it and code runs instantly, no server needed!',
  emr: '🏗️ EMR is like renting a construction crew — powerful workers (Spark/Hadoop) for big data jobs!',
  xgboost: '🌲 XGBoost is like a team of expert judges — each learns from the previous one\'s mistakes!',
  endpoint: '🍽️ A real-time endpoint is like a restaurant — always open, ready to serve predictions instantly!',
  batch: '📬 Batch Transform is like a mail service — send all your letters at once, get answers back later!',
  drift: '📉 Data drift is like fashion trends changing — your model learned old trends but the world moved on!',
  feature: '🧱 Features are like building blocks — the right blocks make a strong model!',
  default: '🤖 I\'m your AWS ML tutor! Ask me about any AWS service or ML concept and I\'ll explain it simply!'
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(analogies)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  if (lower.includes('overfitting')) return '📏 Overfitting is like memorizing answers instead of understanding — you ace the study guide but fail on new questions!';
  if (lower.includes('underfitting')) return '😴 Underfitting is like barely studying — you don\'t know enough to answer anything well!';
  if (lower.includes('bias')) return '🎯 High bias = your model is too simple (like drawing a straight line through curved data). It misses important patterns!';
  if (lower.includes('variance')) return '🎢 High variance = your model is too complex (like connecting every dot). It fits noise instead of signal!';
  if (lower.includes('precision')) return '🎯 Precision: "Of all the things I said were positive, how many actually were?" — Quality over quantity!';
  if (lower.includes('recall')) return '🔍 Recall: "Of all the actual positives, how many did I find?" — Don\'t miss anything important!';
  return analogies.default;
}

export default function AITutor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '👋 Hi! I\'m your AWS ML Tutor. Ask me about any AWS service or ML concept!' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-orange"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-border flex items-center gap-2 bg-muted/30">
              <Bot size={18} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">ML Tutor</span>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">Analogy Mode</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-xs px-3 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-2 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about any AWS ML topic..."
                className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button onClick={send} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
