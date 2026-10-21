import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { PALESTRAS_WHATSAPP_URL } from "../lib/site";

import setembro1Video from "../assets/setembro-1.mp4";
import setembro2Video from "../assets/setembro-2.mp4";
import setembro3Video from "../assets/setembro-3.mp4";
import setembro4Video from "../assets/setembro-4.mp4";
import clinica1Video from "../assets/clinica-1.mp4";
import trustVideo from "../assets/trust.mp4";

export type PalestraVideo = {
  src: string;
  link: string;
  title: string;
  description?: string;
  tag?: string;
  poster?: string;
};

export const PALESTRAS_VIDEOS: PalestraVideo[] = [
  {
    src: setembro1Video,
    link: "https://www.instagram.com/p/DOOm_irEWcX/",
    title: "Setembro Amarelo: O essencial além da correria",
    description: "Reflexão sobre valorizar os pequenos momentos do dia a dia e o que realmente importa.",
    tag: "Setembro Amarelo",
  },
  {
    src: setembro2Video,
    link: "https://www.instagram.com/p/DOgHetxkQpo/",
    title: "Viver o presente sem adiar o autocuidado",
    description: "Quantas vezes você esperou o momento perfeito? Valorizar a vida é começar no agora.",
    tag: "Setembro Amarelo",
  },
  {
    src: setembro3Video,
    link: "https://www.instagram.com/p/DOyRUa5kc1s/",
    title: "Saúde mental e corpo: uma conexão constante",
    description: "Sintomas físicos e emocionais conversam o tempo todo. Cuidar da mente é cuidar do corpo.",
    tag: "Saúde Integrada",
  },
  {
    src: setembro4Video,
    link: "https://www.instagram.com/p/DPEtugwkRNc/",
    title: "Conexões e redes de apoio que fortalecem",
    description: "A importância dos vínculos e da escuta: um gesto simples pode transformar o dia de alguém.",
    tag: "Setembro Amarelo",
  },
  {
    src: clinica1Video,
    link: "https://www.instagram.com/p/DUIwuzNkXBN/",
    title: "Janeiro Branco: Acolhimento e saúde emocional",
    description: "Palestra com a psicóloga Nathalia Dias sobre a importância de falar e priorizar o bem-estar.",
    tag: "Janeiro Branco",
  },
  {
    src: trustVideo,
    link: "https://www.instagram.com/p/DOEUhtSjosR/",
    title: "Palestra no ICTDF: A saúde mental de quem cuida",
    description: "Encontro com profissionais de saúde hospitalar sobre o autocuidado na rotina de quem cuida.",
    tag: "Palestra ICTDF",
  },
];

export function Palestras() {
  const videos = PALESTRAS_VIDEOS;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const isDraggingRef = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Sincroniza o slide selecionado com a reprodução sequencial
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelected(idx);

    refs.current.forEach((el, i) => {
      if (!el) return;
      if (i === idx) {
        if (el.ended) {
          el.currentTime = 0;
        }
        const playPromise = el.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      } else {
        el.pause();
      }
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Observer de visibilidade: pausa quando fora de tela, retoma quando em tela
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting) {
          const current = refs.current[selected];
          if (current && current.paused) {
            current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          }
        } else {
          refs.current.forEach((v) => v?.pause());
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selected]);

  // Transição automática: quando um vídeo finaliza, avança para o próximo.
  // Ao finalizar o último (index 5), retorna ao primeiro (index 0) em loop contínuo.
  const handleVideoEnded = (idx: number) => {
    if (!emblaApi) return;
    const nextIdx = (idx + 1) % videos.length;
    emblaApi.scrollTo(nextIdx);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    refs.current.forEach((el) => {
      if (el) el.muted = nextMuted;
    });
  };

  const togglePlay = (idx: number) => {
    if (idx !== selected && emblaApi) {
      emblaApi.scrollTo(idx);
      return;
    }
    const current = refs.current[idx];
    if (!current) return;
    if (current.paused) {
      current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      current.pause();
      setIsPlaying(false);
    }
  };

  // Previne clique no link caso o usuário esteja arrastando o carrossel
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx > 6 || dy > 6) {
      isDraggingRef.current = true;
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="palestras" ref={containerRef} className="scroll-mt-24 bg-card">
      <div className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Palestras & Conteúdos</p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-petrol md:text-4xl">
            Vídeos e palestras que transformam conhecimento em experiência
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/85 md:text-lg">
            Além dos atendimentos clínicos, realizo palestras, oficinas e produzo conteúdos
            relevantes sobre saúde mental, relações interpessoais e autocuidado.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
            Clique nos vídeos para assistir diretamente às publicações no Instagram.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={PALESTRAS_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Quero saber mais sobre palestras
            </a>
          </div>
        </div>

        <div className="relative mt-12 md:mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex touch-pan-y">
              {videos.map((v, i) => (
                <div
                  key={v.link + i}
                  className="min-w-0 shrink-0 grow-0 pl-4 basis-[82%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%] xl:basis-[28%]"
                >
                  <article
                    className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-background border transition-all duration-300 ${
                      i === selected
                        ? "border-petrol/30 ring-2 ring-terracotta/40 shadow-lg shadow-petrol/10 opacity-100"
                        : "border-petrol/10 opacity-75 hover:opacity-100"
                    }`}
                  >
                    {/* Link para o Instagram ao clicar no vídeo */}
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Assistir no Instagram"
                      aria-label={`Assistir "${v.title}" no Instagram`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onClick={handleLinkClick}
                      className="relative block aspect-[9/16] w-full overflow-hidden bg-petrol cursor-pointer"
                    >
                      <video
                        ref={(el) => {
                          refs.current[i] = el;
                        }}
                        src={v.src}
                        poster={v.poster}
                        muted={isMuted}
                        playsInline
                        preload="metadata"
                        onEnded={() => handleVideoEnded(i)}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradiente suave para leitura das ações */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

                      {/* Botão de Som no topo esquerdo */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleMute();
                        }}
                        aria-label={isMuted ? "Ativar som" : "Desativar som"}
                        title={isMuted ? "Ativar som" : "Desativar som"}
                        className="absolute top-3 left-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 hover:scale-110 active:scale-95"
                      >
                        {isMuted ? (
                          <VolumeX className="size-4" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>

                      {/* Badge do Instagram no topo direito */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition group-hover:bg-[#E1306C] group-hover:text-white">
                        <Instagram className="size-3.5" />
                        <span>Instagram</span>
                        <ExternalLink className="size-3 opacity-80" />
                      </div>

                      {/* Botão Play / Pause na parte inferior esquerda */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          togglePlay(i);
                        }}
                        aria-label={
                          isPlaying && i === selected
                            ? "Pausar vídeo"
                            : "Reproduzir vídeo"
                        }
                        title={
                          isPlaying && i === selected
                            ? "Pausar vídeo"
                            : "Reproduzir vídeo"
                        }
                        className="absolute bottom-3 left-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 hover:scale-110 active:scale-95"
                      >
                        {isPlaying && i === selected ? (
                          <Pause className="size-4" />
                        ) : (
                          <Play className="size-4 ml-0.5" />
                        )}
                      </button>

                      {/* Indicador de clique na parte inferior direita */}
                      <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-petrol backdrop-blur-md shadow-sm transition group-hover:bg-terracotta group-hover:text-white">
                        <span>Ver post</span>
                        <ExternalLink className="size-3" />
                      </span>
                    </a>

                    {/* Informações do vídeo */}
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      {v.tag && (
                        <div className="mb-2">
                          <span className="inline-block rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-semibold text-terracotta">
                            {v.tag}
                          </span>
                        </div>
                      )}
                      <h3 className="font-display text-lg font-medium leading-snug text-petrol">
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-terracotta"
                        >
                          {v.title}
                        </a>
                      </h3>
                      {v.description && (
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80 flex-1">
                          {v.description}
                        </p>
                      )}
                      <div className="mt-4 pt-3 border-t border-petrol/10">
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta transition hover:text-terracotta/80"
                        >
                          <Instagram className="size-3.5" />
                          Assistir vídeo completo no Instagram
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Controles de Navegação do Carrossel */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Vídeo anterior"
              className="flex size-11 items-center justify-center rounded-full border border-petrol/30 text-petrol transition hover:bg-petrol hover:text-cream active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Ir para o vídeo ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === selected ? "w-6 bg-terracotta" : "w-2 bg-petrol/25 hover:bg-petrol/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Próximo vídeo"
              className="flex size-11 items-center justify-center rounded-full border border-petrol/30 text-petrol transition hover:bg-petrol hover:text-cream active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
