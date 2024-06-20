import { Pregunta } from "./pregunta";

export interface Alternativa{
    id_alternativa: number,
    id_pregunta: number,
    pregunta: Pregunta,
    texto: string,
    puntaje: number;
}

export interface PreguntaAlternativa {
    alternativas: Alternativa[];
    pregunta: Pregunta;
  }