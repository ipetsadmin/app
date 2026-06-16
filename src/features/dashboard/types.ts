export type AgendaCategory = "vaccine" | "birthday" | "medication";

export type AgendaItem = {
  id: string;
  category: AgendaCategory;
  /** Título del evento (dato, no se traduce). Ej. "Séxtuple". */
  title: string;
  /** Id de la mascota asociada (para avatar/nombre). */
  petId: string;
  /** Fecha legible (dato). Ej. "17 jun 2026". */
  date: string;
  /** Días restantes hasta el evento. */
  daysLeft: number;
};

export type DailyTip = {
  /** Etiqueta de categoría (dato). Ej. "Cuidado". */
  tag: string;
  /** Texto del consejo (dato). */
  text: string;
};
