import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Send, Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export default function ComingSoon({ title = "Page Under Development" }) {
  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 pt-28 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 relative overflow-hidden text-slate-800">
      {/* Decorative Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Light Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#030b7d08_1px,transparent_1px),linear-gradient(to_bottom,#030b7d08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 bg-white/90 backdrop-blur-md p-8 sm:p-14 rounded-3xl border border-slate-200/80 shadow-xl shadow-blue-900/5">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#030B7D] font-heading text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#1A2FD4]" />
          <span>Section Under Enhancement</span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#030B7D] tracking-tight mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-8 font-normal leading-relaxed">
          We are updating our digital platform with interactive product catalogs, technical documentation, and scientific specifications.
        </p>

        {/* Icon Feature */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-tr from-[#030B7D] to-[#1A2FD4] text-white flex items-center justify-center shadow-lg shadow-blue-900/20 border border-blue-200">
          <Clock className="w-9 h-9 text-white animate-pulse" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#030B7D] text-white font-heading font-bold text-sm hover:bg-[#1A2FD4] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <a
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-100 text-[#030B7D] font-heading font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200/80"
          >
            <Send className="w-4 h-4 text-[#030B7D]" />
            <span>Submit Direct Inquiry</span>
          </a>
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#030B7D]" />
            ISO Certified Quality
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#1A2FD4]" />
            65+ Years Physics Heritage
          </span>
        </div>
      </div>
    </div>
  );
}
