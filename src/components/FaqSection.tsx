/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

const faqData: FAQItem[] = [
  {
    id: "iniciante",
    question: "¿Sirve para principiantes?",
    answer: "Sí. Si ya tocas lo básico en el bajo, dominas la postura de apoyo y puedes mantener un ritmo estándar, ya podrás obtener resultados inmediatos con estas frases."
  },
  {
    id: "acesso",
    question: "¿Cómo y cuándo recibo mi acceso?",
    answer: "¡El acceso es inmediato! Tan pronto como se confirme tu pago (el pago en línea se aprueba al instante), recibirás un correo electrónico con tu enlace de acceso exclusivo a toda nuestra plataforma con las video lecciones y materiales en PDF para descargar."
  },
  {
    id: "vitalicio",
    question: "¿El acceso es de por vida?",
    answer: "¡Absolutamente! Pagas solo una vez y tienes acceso para siempre. Puedes descargar el material en PDF las veces que necesites y ver los videos explicativos a tu propio ritmo, sin plazos, vencimientos ni cobros adicionales."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      {/* Decorative background glow behind FAQ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ambient-glow-amber pointer-events-none -z-10 opacity-60" />

      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange">
          Principales Preguntas
        </span>
        <h2 className="mt-2 text-4xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
          Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">Frecuentes</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-brand-card border-brand-orange/40 shadow-lg shadow-brand-orange/5"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-sans font-semibold text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 transition-colors ${isOpen ? "text-brand-orange" : "text-slate-400"}`} />
                  <span className="text-base md:text-lg">{item.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4 p-1.5 rounded-full bg-white/[0.04] text-slate-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-slate-300 leading-relaxed border-t border-white/[0.04] bg-black/[0.15]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
