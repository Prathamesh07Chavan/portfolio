'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Copy, Check, Linkedin, Github, Sparkles, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ContactSection() {
  const setCursorState = usePortfolioStore((state) => state.setCursorState);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center gap-16">
      
      {/* Section Header */}
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 text-accentCyan font-mono text-xs tracking-widest uppercase">
          <span className="w-8 h-px bg-accentCyan" />
          <span>05. Get In Touch</span>
          <span className="w-8 h-px bg-accentCyan" />
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Let's Build Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentCyan via-accentEmerald to-accentViolet">Extraordinary</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Have an analytics project, internship opportunity, or data consulting inquiry? Reach out directly!
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Info & Socials */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6 shadow-xl">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-accentCyan" />
              <span>Contact Details</span>
            </h3>

            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-accentCyan/10 border border-accentCyan/30 flex items-center justify-center text-accentCyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[11px] font-mono text-gray-400">Direct Email</span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorState(true, 'Copy')}
                onMouseLeave={() => setCursorState(false)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-accentCyan hover:bg-white/10 transition-all shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-accentEmerald" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accentEmerald/10 border border-accentEmerald/30 flex items-center justify-center text-accentEmerald shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-gray-400">Location</span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState(true, 'LinkedIn')}
                onMouseLeave={() => setCursorState(false)}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accentCyan/40 flex items-center gap-3 group transition-all"
              >
                <Linkedin className="w-5 h-5 text-accentCyan group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState(true, 'GitHub')}
                onMouseLeave={() => setCursorState(false)}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accentViolet/40 flex items-center gap-3 group transition-all"
              >
                <Github className="w-5 h-5 text-accentViolet group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-gray-200 group-hover:text-white">GitHub</span>
              </a>
            </div>

          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accentEmerald" />
              <span>Send a Message</span>
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-accentEmerald/10 border border-accentEmerald/30 text-center flex flex-col items-center gap-3 my-8"
              >
                <div className="w-12 h-12 rounded-full bg-accentEmerald/20 flex items-center justify-center text-accentEmerald">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-white text-lg">Message Sent Successfully!</h4>
                <p className="text-xs text-gray-300">
                  Thank you for reaching out, Prathamesh will respond to your email shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-gray-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accentCyan transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-gray-300">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accentCyan transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Data Analytics Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accentCyan transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accentCyan transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => setCursorState(true, 'Send')}
                  onMouseLeave={() => setCursorState(false)}
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentCyan via-accentEmerald to-accentViolet text-white font-semibold text-sm hover:opacity-95 transition-opacity disabled:opacity-50 shadow-lg shadow-accentCyan/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
