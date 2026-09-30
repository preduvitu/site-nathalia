import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PALESTRAS_WHATSAPP_URL } from "../lib/site";

export type PalestraVideo = {
  src: string;
  poster?: string;
  title: string;
  description?: string;
};

// Para adicionar novas palestras, basta incluir um item nesta lista.
export const PALESTRAS_VIDEOS: PalestraVideo[] = [
  {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    title: "Saúde emocional no ambiente de trabalho",
    description: "Registro de palestra (vídeo ilustrativo — substituir).",
  },
  {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    title: "Relações, vínculos e autoconhecimento",
    description: "Registro de palestra (vídeo ilustrativo — substituir).",
  },
];

export function Palestras() {
  const videos = PALESTRAS_VIDEOS;
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelected(idx);
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    refs.current.forEach((v, i) => {
      if (v && i !== idx && !v.paused) v.pause();
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

  const multiple = videos.length > 1;

  return (
    <section id="palestras" className="scroll-mt-24 bg-card">
      <div className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Palestras</p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-petrol md:text-4xl">
            Palestras que transformam conhecimento em experiência
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/85 md:text-lg">
            Além dos serviços apresentados, também realizo palestras, levando conhecimento,
            experiências e conteúdos relevantes de forma prática, acessível e envolvente.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
            As palestras fazem parte do meu escopo de trabalho e podem ser realizadas para
            empresas, eventos, instituições e outros públicos interessados.
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
                  key={v.src + i}
                  className={`min-w-0 shrink-0 grow-0 pl-4 ${
                    multiple ? "basis-[88%] md:basis-[78%]" : "basis-full"
                  }`}
                >
                  <article
                    className={`overflow-hidden rounded-2xl bg-background shadow-sm shadow-petrol/10 transition-opacity duration-300 ${
                      i === selected ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <div className="relative aspect-video bg-petrol">
                      <video
                        ref={(el) => {
                          refs.current[i] = el;
                        }}
                        src={v.src}
                        poster={v.poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="size-full object-contain"
                        onPlay={() => emblaApi?.scrollTo(i)}
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="font-display text-xl font-medium text-petrol">{v.title}</h3>
                      {v.description && (
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                          {v.description}
                        </p>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {multiple && (
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Vídeo anterior"
                className="flex size-11 items-center justify-center rounded-full border border-petrol/30 text-petrol transition hover:bg-petrol hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-petrol"
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
                    className={`h-2 rounded-full transition-all ${
                      i === selected ? "w-6 bg-terracotta" : "w-2 bg-petrol/25"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Próximo vídeo"
                className="flex size-11 items-center justify-center rounded-full border border-petrol/30 text-petrol transition hover:bg-petrol hover:text-cream disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-petrol"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
