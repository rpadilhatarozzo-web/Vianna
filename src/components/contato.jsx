import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!form.nome.trim()) tempErrors.nome = "Nome é obrigatório";
    if (!form.email.trim()) {
      tempErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "E-mail inválido";
    }
    if (!form.mensagem.trim()) tempErrors.mensagem = "Mensagem é obrigatória";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulando envio
      setSubmitted(true);
      setForm({ nome: "", email: "", mensagem: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="mb-3 inline-flex rounded-full border border-[#E5005E]/30 bg-[#E5005E]/10 px-4 py-1 text-sm font-medium text-[#E5005E]">
            Fale Conosco
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Entre em contato
          </h2>
          <p className="">
            Tem alguma dúvida sobre matrículas, metodologia ou estrutura? Nossa equipe está pronta para ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch">

          {/* Informações de Contato (Esquerda) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col justify-between rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10"
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Canais de Atendimento</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Escolha o canal mais conveniente ou preencha o formulário e responderemos em até 24 horas úteis.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008280]/10 border border-[#008280]/20 text-[#008280]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400">Telefone e WhatsApp</h4>
                    <p className="text-slate-800 dark:text-white mt-1 text-sm font-medium">(32) 3239-7800</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400">E-mail</h4>
                    <p className="text-slate-800 dark:text-white mt-1 text-sm font-medium">contato@colegiovianna.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400">Localização</h4>
                    <p className="text-slate-800 dark:text-white mt-1 text-sm leading-relaxed">
                      Av. Rio Branco, 2440 - Centro, Juiz de Fora - MG, 36010-011
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-xs text-slate-400">
              <p>Horário de Atendimento: Segunda a Sexta, das 07h às 19h.</p>
            </div>
          </motion.div>

          {/* Formulário (Direita) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 flex flex-col justify-center rounded-3xl border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Nome */}
                  <div className="relative">
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${errors.nome ? "text-red-400" : "text-slate-400"}`}>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={form.nome}
                      onChange={(e) => {
                        setForm({ ...form, nome: e.target.value });
                        if (errors.nome) setErrors({ ...errors, nome: "" });
                      }}
                      placeholder="Seu nome"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-100/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition duration-300 ${errors.nome
                          ? "border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-200/80 dark:border-white/10 focus:border-[#008280]/50 focus:ring-[#008280]/20"
                        }`}
                    />
                    {errors.nome && (
                      <span className="text-xs text-red-400 mt-1 block font-medium">{errors.nome}</span>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className="relative">
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${errors.email ? "text-red-400" : "text-slate-400"}`}>
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="seu@email.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-100/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition duration-300 ${errors.email
                          ? "border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-200/80 dark:border-white/10 focus:border-[#008280]/50 focus:ring-[#008280]/20"
                        }`}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400 mt-1 block font-medium">{errors.email}</span>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div className="relative">
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${errors.mensagem ? "text-red-400" : "text-slate-400"}`}>
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      value={form.mensagem}
                      onChange={(e) => {
                        setForm({ ...form, mensagem: e.target.value });
                        if (errors.mensagem) setErrors({ ...errors, mensagem: "" });
                      }}
                      placeholder="Como podemos ajudar você?"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-100/50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition duration-300 resize-none ${errors.mensagem
                          ? "border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-200/80 dark:border-white/10 focus:border-[#008280]/50 focus:ring-[#008280]/20"
                        }`}
                    />
                    {errors.mensagem && (
                      <span className="text-xs text-red-400 mt-1 block font-medium">{errors.mensagem}</span>
                    )}
                  </div>

                  {/* Botão de Enviar */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E5005E] text-white font-bold rounded-xl transition duration-300 hover:bg-[#c4004f] hover:shadow-[0_0_20px_rgba(229,0,94,0.3)] cursor-pointer"
                  >
                    <span>Enviar Mensagem</span>
                    <Send size={18} />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#008280]/20 text-[#008280] border border-[#008280]/30 mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Mensagem Enviada!</h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed text-sm">
                    Agradecemos seu contato. Nossa equipe pedagógica entrará em contato com você o mais breve possível.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
