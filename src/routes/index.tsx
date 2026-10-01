import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  Video,
  Clock,
  CalendarDays,
  Handshake,
  GraduationCap,
} from "lucide-react";

import heroPhoto from "../assets/nathalia-hero.jpeg";
import trabalhoPhoto from "../assets/nathalia-trabalho.jpeg";
import sobrePhoto from "../assets/nathalia-sobre.jpeg";
import { WHATSAPP_URL, CRP } from "../lib/site";
import { Palestras } from "../components/Palestras";

const WHATSAPP_DEV_URL = "https://wa.me/5561991054666";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Psicoterapia", href: "#psicoterapia" },
  { label: "Sobre mim", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

const MOTIVOS = [
  "Tenha dificuldade de colocar limites",
  "Evite conflitos ou conversas difíceis",
  "Se preocupe demais com o que os outros pensam ou esperam de você",
  "Tenha dificuldade de comunicar o que sente, precisa ou o que te incomoda",
  "Tenha medo de decepcionar ou desagradar",
  "Se questione muito sobre suas escolhas e relacionamentos",
  "Tenha dificuldade de equilibrar suas necessidades com as das outras pessoas",
  "Esteja vivendo conflitos em relacionamentos amorosos, familiares, amizades ou trabalho",
  "Esteja passando por um término, afastamento ou mudança importante",
];

const FAQ = [
  {
    q: "Preciso saber exatamente o que quero trabalhar na terapia?",
    a: [
      "Não. É comum chegar sabendo que alguma coisa não está bem, mas sem conseguir explicar exatamente o que está acontecendo.",
      "Compreender melhor o que você está vivendo também pode fazer parte do processo.",
    ],
  },
  {
    q: "Como funciona a primeira sessão?",
    a: [
      "É nosso primeiro contato clínico. Vou querer entender o que fez você procurar terapia, o que está acontecendo atualmente e conhecer alguns aspectos importantes da sua história.",
      "Você também poderá conhecer melhor meu jeito de trabalhar, tirar suas dúvidas e perceber como se sente nesse primeiro contato.",
    ],
  },
  {
    q: "Qual é a sua abordagem?",
    a: [
      "Minha prática clínica tem como referência a Terapia Cognitivo-Comportamental (TCC). A TCC considera a relação entre pensamentos, emoções e comportamentos e busca compreender como esses aspectos aparecem nas situações que você vive.",
      "Isso não significa que a terapia siga uma fórmula ou que todas as pessoas recebam as mesmas técnicas. O processo é construído considerando a sua história, suas dificuldades e o que faz sentido para aquilo que estamos trabalhando.",
    ],
  },
  {
    q: "Preciso estar passando por uma crise para procurar terapia?",
    a: [
      "Não. Uma crise pode levar alguém a procurar ajuda, mas não é o único motivo.",
      "A terapia também pode fazer sentido quando você percebe comportamentos ou situações que se repetem, está vivendo dificuldades nas suas relações, quer compreender determinadas escolhas ou percebe questões sobre si que gostaria de olhar com mais cuidado.",
    ],
  },
  {
    q: "A terapia é sempre semanal?",
    a: [
      "Geralmente, os encontros são semanais, principalmente no início.",
      "A frequência pode ser avaliada considerando cada processo.",
    ],
  },
  {
    q: "Como funciona o atendimento online?",
    a: [
      "As sessões acontecem por videochamada, em horário previamente combinado.",
      "Para o atendimento, é importante que você esteja em um ambiente privado, com conexão adequada e onde consiga conversar com tranquilidade.",
    ],
  },
  {
    q: "Quais questões você atende?",
    a: [
      "Atendo diferentes demandas na psicoterapia individual e tenho interesse especial por questões relacionadas às relações humanas. Isso pode envolver relacionamentos amorosos, família, amizades, conflitos, comunicação, limites, expectativas, términos, afastamentos, escolhas e padrões que se repetem nas relações.",
      "Se estiver em dúvida se o que você está vivendo faz parte do meu campo de atuação, pode me perguntar no primeiro contato.",
    ],
  },
];

function WhatsAppIcon() {
  return <MessageCircle className="size-5" aria-hidden="true" />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nathalia Pereira Dias — Psicóloga | Atendimento Online" },
      {
        name: "description",
        content:
          "Psicoterapia online para compreender melhor o que acontece com você e nas suas relações. Atendimento individual por videochamada com a psicóloga Nathalia Pereira Dias.",
      },
      { property: "og:title", content: "Nathalia Pereira Dias — Psicóloga | Atendimento Online" },
      {
        property: "og:description",
        content:
          "Psicoterapia online para compreender melhor o que acontece com você e nas suas relações.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-petrol text-cream shadow-lg shadow-petrol/10">
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <a href="#inicio" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold tracking-tight">
            Nathalia Pereira Dias
          </span>
          <span className="text-xs text-cream/70">Psicóloga · Atendimento online</span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream/85 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !min-h-11 px-5 py-2.5 text-sm"
          >
            <WhatsAppIcon />
            Falar comigo
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-cream lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Navegação móvel"
          className="border-t border-cream/15 bg-petrol lg:hidden"
        >
          <div className="section-shell flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-cream/90 transition-colors hover:bg-cream/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon />
              Falar comigo pelo WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24">
      <div className="section-shell grid items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Psicoterapia individual online</p>
          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight text-petrol md:text-5xl">
            Psicoterapia online para compreender melhor o que acontece com você e nas
            suas relações.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
            Nem sempre é fácil entender por que algumas situações mexem tanto com a
            gente, por que certos comportamentos se repetem ou por que é tão difícil
            agir diferente, mesmo quando sabemos que algo não está fazendo bem.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85 md:text-lg">
            Na terapia, podemos olhar para essas questões com mais cuidado e entender
            o que está por trás da forma como você sente, pensa, age e se relaciona.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon />
              Falar comigo pelo WhatsApp
            </a>
          </div>
          <p className="mt-8 text-sm font-medium text-slate-blue">
            Nathalia Pereira Dias · Psicóloga · {CRP} · Atendimento psicológico online
          </p>
        </div>

        <figure className="relative mx-auto w-full max-w-md md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-petrol/10"
          />
          <img
            src={heroPhoto}
            alt="Nathalia Pereira Dias, psicóloga, sorrindo em retrato profissional"
            width={1024}
            height={1280}
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-xl shadow-petrol/20"
          />
        </figure>
      </div>
    </section>
  );
}

function Motivos() {
  return (
    <section id="psicoterapia" className="scroll-mt-24 bg-card">
      <div className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">O que pode te levar à terapia</p>
          <p className="mt-5 text-base leading-relaxed text-foreground/85 md:text-lg">
            Você não precisa saber exatamente o que está acontecendo para procurar
            terapia. Às vezes, existe uma situação específica que está difícil. Em
            outras, o incômodo aparece aos poucos: na forma como você se relaciona,
            nas escolhas que faz, no que aceita, no que evita ou na maneira como lida
            com o que sente.
          </p>
          <p className="mt-4 text-base font-semibold text-petrol md:text-lg">
            Talvez você:
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOTIVOS.map((motivo) => (
            <li
              key={motivo}
              className="flex flex-col items-center gap-3 rounded-2xl bg-background p-5 text-center text-sm leading-relaxed text-foreground/90"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-terracotta"
              />
              {motivo}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
            Você não precisa chegar à terapia com tudo isso organizado.{" "}
            <strong className="font-semibold text-petrol">
              Entender o que está acontecendo também pode fazer parte da terapia.
            </strong>
          </p>
          <div className="mt-7 flex justify-center">
            <a href="#como-funciona" className="btn-secondary">
              Quero saber sobre o atendimento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComoTrabalho() {
  return (
    <section aria-labelledby="como-trabalho-title" className="bg-petrol text-cream">
      <div className="section-shell grid items-center gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:py-24">
        <figure className="order-2 mx-auto w-full max-w-md md:order-1 md:max-w-none">
          <img
            src={trabalhoPhoto}
            alt="Nathalia Pereira Dias em seu espaço de trabalho, em postura atenta"
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-xl shadow-petrol-deep/50"
          />
        </figure>

        <div className="order-1 max-w-xl md:order-2">
          <p className="eyebrow mb-4 !text-cream/70">Como eu trabalho</p>
          <h2
            id="como-trabalho-title"
            className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl"
          >
            Terapia não é alguém te dizendo o que fazer.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-cream/85 md:text-lg">
            <p>
              É comum chegar à terapia querendo uma resposta para uma situação
              difícil. Mas meu papel como psicóloga não é decidir por você ou dar
              respostas prontas.
            </p>
            <p>
              Na terapia, vamos entender melhor o que você pensa, sente e faz diante
              das situações que vive — inclusive aquilo que se repete mesmo quando
              você gostaria de agir diferente.
            </p>
            <p>
              Também vamos olhar para o contexto em que essas dificuldades aparecem e
              para a sua história, buscando compreender o que pode estar por trás da
              forma como você tem lidado com determinadas situações.
            </p>
            <p className="font-semibold text-cream">
              A partir disso, construímos outras formas de lidar com o que hoje tem
              sido difícil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-24">
      <div className="section-shell grid items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-24">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Sobre mim</p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-petrol md:text-4xl">
            Prazer, sou Nathalia.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">
            <p>
              Sou Nathalia Pereira Dias, psicóloga, e realizo atendimentos
              individuais online.
            </p>
            <p>
              Tenho interesse especial pelas relações humanas e pelas questões que
              aparecem na forma como nos relacionamos com outras pessoas e também com
              nós mesmos. Relacionamentos amorosos, família, amizades, conflitos,
              limites, comunicação, expectativas, escolhas, afastamentos e términos
              são alguns dos temas que fazem parte desse campo e do meu interesse
              clínico.
            </p>
            <p>
              Na clínica, valorizo um espaço em que você possa falar sobre o que está
              acontecendo sem precisar chegar com tudo organizado ou saber explicar
              exatamente o que sente.
            </p>
            <p>
              Meu trabalho é construído a partir daquilo que você traz e do que vamos
              compreendendo juntas ao longo do processo.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-petrol/15 bg-card p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-petrol text-cream">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1 text-sm leading-relaxed text-foreground/85 md:text-base">
                <p>
                  Graduada em Psicologia pela{" "}
                  <strong className="font-semibold text-petrol">
                    Universidade de Brasília (UnB)
                  </strong>
                </p>
                <p>{CRP}</p>
              </div>
            </div>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-md md:max-w-none">
          <img
            src={sobrePhoto}
            alt="Nathalia Pereira Dias, psicóloga, em retrato profissional sorrindo"
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-xl shadow-petrol/15"
          />
        </figure>
      </div>
    </section>
  );
}

const COMO_FUNCIONA = [
  {
    icon: Video,
    title: "Sessões",
    text: "Os atendimentos são individuais e realizados por videochamada.",
  },
  {
    icon: Clock,
    title: "Duração",
    text: "Cada sessão dura aproximadamente 50 minutos.",
  },
  {
    icon: CalendarDays,
    title: "Frequência",
    text: "Normalmente, os encontros acontecem semanalmente. A frequência pode ser avaliada de acordo com cada processo.",
  },
  {
    icon: Handshake,
    title: "Primeiro contato",
    text: "Se você estiver pensando em começar terapia comigo, pode entrar em contato pelo WhatsApp. Por lá, explico sobre valores, horários disponíveis e funcionamento do atendimento e respondo às dúvidas iniciais. Se fizer sentido para você e tivermos disponibilidade de horário compatível, agendamos nossa primeira sessão.",
  },
];

function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-cream-deep/60">
      <div className="section-shell py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Como funciona</p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-petrol md:text-4xl">
            Atendimento psicológico individual e online
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {COMO_FUNCIONA.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl bg-card p-6 shadow-sm shadow-petrol/5 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-blue/15 text-petrol">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-medium text-petrol">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85 md:text-base">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon />
            Falar comigo pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Duvidas() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className="scroll-mt-24">
      <div className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Dúvidas frequentes</p>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-petrol md:text-4xl">
            Perguntas comuns sobre a terapia
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-petrol/10 border-y border-petrol/10">
          {FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full flex-col items-center justify-center gap-3 py-5 text-center"
                >
                  <span className="font-display text-lg font-medium text-petrol md:text-xl">
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 shrink-0 text-terracotta transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 text-sm leading-relaxed text-foreground/85 md:text-base">
                      {item.a.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Encerramento() {
  return (
    <section id="contato" className="scroll-mt-24 bg-petrol text-cream">
      <div className="section-shell py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            Está pensando em começar terapia?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-cream/85 md:text-lg">
            <p>
              Você pode falar comigo pelo WhatsApp para saber sobre valores, horários
              disponíveis e tirar suas dúvidas sobre o atendimento.
            </p>
            <p>Não precisa chegar com tudo decidido ou saber exatamente o que dizer.</p>
            <p>
              O primeiro contato serve para você ter as informações necessárias e
              avaliar se faz sentido iniciar esse processo comigo.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-9"
          >
            <WhatsAppIcon />
            Falar comigo pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-petrol-deep text-cream/80">
      <div className="section-shell flex flex-col items-center gap-3 py-10 text-center text-sm">
        <p className="font-display text-base font-medium text-cream">
          Nathalia Pereira Dias
        </p>
        <p>
          Psicóloga · {CRP} · Atendimento psicológico online
        </p>
        <p className="max-w-xl text-xs leading-relaxed text-cream/60">
          Este site tem caráter informativo e não substitui consulta psicológica. Em
          caso de emergência, procure o serviço de saúde mais próximo ou ligue 188
          (CVV — Centro de Valorização da Vida).
        </p>
        <p className="text-xs text-cream/50">
          Desenvolvido por{" "}
          <a
            href={WHATSAPP_DEV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cream/70 underline-offset-2 transition-colors hover:text-cream hover:underline"
          >
            Pedro Vítor Nascimento
          </a>
        </p>
        <p className="text-xs text-cream/50">
          © {new Date().getFullYear()} Nathalia Pereira Dias. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar comigo pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-xl shadow-petrol/30 transition-transform duration-200 hover:scale-105 hover:bg-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-deep md:bottom-7 md:right-7"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Motivos />
        <ComoTrabalho />
        <Sobre />
        <ComoFunciona />
        <Palestras />
        <Duvidas />
        <Encerramento />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
