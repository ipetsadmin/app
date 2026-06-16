import type { AgendaItem, DailyTip } from "@/features/dashboard/types";

/** Consejo del día (dato dummy). */
export const dailyTip: DailyTip = {
  tag: "Cuidado",
  text: "La hidratación importa: cambiá el agua de tu mascota al menos una vez al día.",
};

/** Agenda dummy de eventos próximos por categoría. */
export const dummyAgenda: AgendaItem[] = [
  { id: "a1", category: "vaccine", title: "Séxtuple", petId: "3", date: "17 jun 2026", daysLeft: 2 },
  { id: "a2", category: "birthday", title: "¡Cumple de Mishi!", petId: "2", date: "26 jun 2026", daysLeft: 11 },
  { id: "a3", category: "medication", title: "Antipulgas mensual", petId: "1", date: "21 jun 2026", daysLeft: 6 },
];
