export function safeParse(data) {
  try {
    if (!data) return {};
    if (typeof data === "object") return data;
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function normalizeFormData(raw) {
  const data = safeParse(raw);

  return {
    nombre: data.nombre || "",
    apellido: data.apellido || "",
    email: data.email || "",
    telefono: data.telefono || "",
    acercaDe: data.acercaDe || data.perfil || "",

    habilidades: Array.isArray(data.habilidades) ? data.habilidades : [],
    experiencia: Array.isArray(data.experiencia) ? data.experiencia : [],
    educacion: Array.isArray(data.educacion) ? data.educacion : [],
    idiomas: Array.isArray(data.idiomas) ? data.idiomas : [],

    profileImage: data.profileImage || "",
    showImage: data.showImage !== false,
    fontFamily: data.fontFamily || "Arial",
    fontSize: data.fontSize || 14,

    ...data,
  };
}
