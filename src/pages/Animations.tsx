import { useEffect, useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';

type AnimationId =
  | 'fade'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'blur-in'
  | 'scale-in'
  | 'clip-in'
  | 'flip-in'
  | 'rotate-in'
  | 'slide-up-fade'
  | 'zoom-blur'
  | 'skew-in'
  | 'bounce-in'
  | 'reveal-mask'
  | 'glide-in'
  | 'tilt-in';

interface AnimationDef {
  id: AnimationId;
  label: string;
  description: string;
  hidden: { opacity: number; transform: string; filter: string; clipPath: string };
  duration: string;
  easing: string;
}

const VISIBLE = {
  opacity: 1,
  transform: 'none',
  filter: 'blur(0px)',
  clipPath: 'inset(0 0 0 0)',
};

const ANIMATIONS: AnimationDef[] = [
  {
    id: 'fade',
    label: 'Fade',
    description: 'Enkel övertoning på plats (ingen rörelse, helt lugnt)',
    hidden: { opacity: 0, transform: 'none', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'fade-up',
    label: 'Fade Up',
    description: 'Glider in mjukt och kort nedifrån (20px)',
    hidden: { opacity: 0, transform: 'translate3d(0, 20px, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'fade-left',
    label: 'Fade Left',
    description: 'Kommer in mjukt och kort från vänster (20px)',
    hidden: { opacity: 0, transform: 'translate3d(-20px, 0, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'fade-right',
    label: 'Fade Right',
    description: 'Kommer in mjukt och kort från höger (20px)',
    hidden: { opacity: 0, transform: 'translate3d(20px, 0, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'blur-in',
    label: 'Blur In',
    description: 'Skarpar till lugnt från lätt suddigt (ingen skala)',
    hidden: { opacity: 0, transform: 'none', filter: 'blur(6px)', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'scale-in',
    label: 'Scale In',
    description: 'Växer mycket subtilt fram från mitten',
    hidden: { opacity: 0, transform: 'scale3d(0.97, 0.97, 1)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'clip-in',
    label: 'Clip Down',
    description: 'Avtäcks mjukt uppifrån och ned',
    hidden: { opacity: 1, transform: 'none', filter: 'none', clipPath: 'inset(0 0 100% 0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'flip-in',
    label: 'Flip In',
    description: 'Vänds in i 3D med mycket dämpad rörelse',
    hidden: { opacity: 0, transform: 'perspective(800px) rotateX(12deg) translate3d(0, 6px, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'rotate-in',
    label: 'Rotate In',
    description: 'Roteras mycket lugnt in på plats',
    hidden: { opacity: 0, transform: 'rotate(-2deg) scale3d(0.98, 0.98, 1)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'slide-up-fade',
    label: 'Slide & Fade',
    description: 'Långsam, dämpad glidning (30px)',
    hidden: { opacity: 0, transform: 'translate3d(0, 30px, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'zoom-blur',
    label: 'Zoom Blur',
    description: 'Fokuserar in lugnt från bakgrunden (subtil skala)',
    hidden: { opacity: 0, transform: 'scale3d(1.04, 1.04, 1)', filter: 'blur(8px)', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'skew-in',
    label: 'Skew In',
    description: 'Lutar mycket lätt in från sidan',
    hidden: { opacity: 0, transform: 'skewY(1deg) translate3d(0, 10px, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'bounce-in',
    label: 'Bounce In',
    description: 'Enkel mjuk infasning på plats',
    hidden: { opacity: 0, transform: 'scale3d(0.92, 0.92, 1)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'reveal-mask',
    label: 'Reveal Mask',
    description: 'Avtäcks mjukt från vänster',
    hidden: { opacity: 1, transform: 'none', filter: 'none', clipPath: 'inset(0 100% 0 0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'glide-in',
    label: 'Glide In',
    description: 'Mycket mjuk och stabil glidning (10px)',
    hidden: { opacity: 0, transform: 'translate3d(0, 10px, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  {
    id: 'tilt-in',
    label: 'Tilt In',
    description: 'Lutar dämpat in i 3D-perspektiv',
    hidden: { opacity: 0, transform: 'perspective(1000px) rotateY(-6deg) translate3d(-8px, 0, 0)', filter: 'none', clipPath: 'inset(0)' },
    duration: '0.8s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
];

interface CardProps {
  def: AnimationDef;
  globalTick: number;
}

function PreviewCard({ def, globalTick }: CardProps) {
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);

  function play() {
    setPlaying(false);
    setTick((t) => t + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlaying(true));
    });
  }

  useEffect(() => {
    if (globalTick === 0) return;
    play();
  }, [globalTick]);

  const style = playing ? VISIBLE : def.hidden;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
        <div
          key={tick}
          style={{
            opacity: style.opacity,
            transform: style.transform,
            filter: style.filter,
            clipPath: style.clipPath,
            transition: `opacity ${def.duration} ${def.easing}, transform ${def.duration} ${def.easing}, filter ${def.duration} ${def.easing}, clip-path ${def.duration} ${def.easing}`,
            willChange: 'opacity, transform, filter, clip-path',
          }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-xl px-8 py-6 text-center"
        >
          <div className="text-2xl font-bold tracking-tight">MGA Markarbeten AB</div>
          <div className="text-sm opacity-90 mt-1">Animation preview</div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900">{def.label}</h3>
          <code className="text-xs text-slate-400 font-mono">{def.id}</code>
        </div>
        <p className="text-sm text-slate-600 mb-4 flex-1">{def.description}</p>
        <button
          onClick={play}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
        >
          {tick === 0 ? <Play size={14} /> : <RefreshCw size={14} />}
          {tick === 0 ? 'Spela upp' : 'Spela igen'}
        </button>
      </div>
    </div>
  );
}

export default function Animations() {
  const [globalTick, setGlobalTick] = useState(0);
  function playAll() {
    setGlobalTick((t) => t + 1);
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Animations Playground
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Klicka på "Spela upp" på varje kort för att se animationen. Alla körs isolerat
            så du kan jämföra dem sida vid sida.
          </p>
          <button
            onClick={playAll}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-orange-500/20"
          >
            <Play size={16} />
            Spela upp alla
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ANIMATIONS.map((def) => (
            <div key={def.id}>
              <PreviewCard def={def} globalTick={globalTick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
