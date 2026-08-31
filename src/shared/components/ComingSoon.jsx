import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Cpu, Settings, Hourglass } from 'lucide-react';

export default function ComingSoon({ title = "Section Under Development" }) {
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get('title') || searchParams.get('search');
  const displayTitle = titleParam ? `${titleParam}` : title;

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-sci-light py-20 px-6 relative overflow-hidden">
      
      {/* Background scientific grid illustration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B3B82_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-[560px] w-full bg-white border border-sci-light rounded-3xl p-8 sm:p-12 text-center shadow-xl relative z-10">
        
        {/* Animated Icon Frame */}
        <div className="w-16 h-16 rounded-2xl bg-sci-blue/5 flex items-center justify-center text-sci-blue mx-auto mb-8 relative group">
          <div className="absolute inset-0 rounded-2xl border border-sci-blue/20 group-hover:scale-110 transition-transform duration-300" />
          <Hourglass className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Title */}
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-sci-blue mb-3 inline-block">
          PHYSICS INSTRUMENTS CO.
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-sci-dark mb-4">
          {displayTitle}
        </h1>

        {/* Description */}
        <p className="text-sci-medium text-sm sm:text-base leading-relaxed mb-8">
          Our engineering and materials teams are currently expanding this section to provide you with detailed 
          technical catalogs, interactive diagrams, and institutional documentation resources.
        </p>

        {/* Bullet details */}
        <div className="flex justify-center gap-4 flex-wrap text-xs font-semibold text-black mb-10">
          <span className="flex items-center gap-1.5 bg-sci-light px-3 py-1.5 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-sci-blue" />
            Specs Integration
          </span>
          <span className="flex items-center gap-1.5 bg-sci-light px-3 py-1.5 rounded-full">
            <Settings className="w-3.5 h-3.5 text-sci-blue" />
            Telemetry Logs
          </span>
        </div>

        {/* Go Back CTA */}
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-white bg-sci-accent px-6 py-3.5 rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-glow hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
