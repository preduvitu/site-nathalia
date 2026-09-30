// Dados de contato e identidade profissional.
// TODO antes da publicação: substituir o número do WhatsApp e o número do CRP.

const WHATSAPP_NUMBER = "556193667382"; // DDI+DDD+número, apenas dígitos
const WHATSAPP_MESSAGE =
  "Olá, Nathalia. Encontrei seu site e gostaria de saber mais sobre o atendimento psicológico.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const CRP = "CRP 01/26752";

export const PROFESSIONAL_NAME = "Nathalia Pereira Dias";

export const PALESTRAS_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vi no site que você também realiza palestras e gostaria de saber mais sobre temas, formatos e disponibilidade.",
)}`;
