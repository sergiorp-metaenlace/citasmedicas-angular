export class MedicoPacienteId {
  medicoId: number;
  pacienteId: number;

  constructor(_idMedico: number, _idPaciente: number) {
    this.medicoId = _idMedico;
    this.pacienteId = _idPaciente;
  }

}
