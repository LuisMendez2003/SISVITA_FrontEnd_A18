export interface RealizacionTest{
    id_test: number, 
    id_estudiante: string,
    fecha: Date,
    puntaje?: number,
    nivel?: string,
    observaciones?: string,
}