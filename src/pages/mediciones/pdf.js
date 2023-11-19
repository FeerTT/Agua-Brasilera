import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (selectedDate, selectedMediciones) => {
    const truncateDate = (date) => {
        const fecha = new Date(date);
        return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      };
    const doc = new jsPDF("landscape");
    
    const columns = [
        "ID",
        "Apellido",
        "Nombre",
        "Fecha",
        "Consumo del Mes",
        "Consumo Mes Anterior",
        "Valor Fijo",
        "Tarifa Excedente",
        "Total Consumo",
        "Total a Pagar",
        
      ];
      if (!Array.isArray(selectedMediciones) || selectedMediciones.length === 0) {
        console.error('selectedMediciones is not a non-empty array');
        return; // Manejar el error o salir de la función según sea necesario
    }
  console.log(selectedMediciones, "CL DE SELECTED MEDICIONES")
      const rows = selectedMediciones.map((medicion) => [
        medicion.usuario.id,
        medicion.usuario.apellido,
        medicion.usuario.nombre,
        truncateDate(medicion.mesActual),
        medicion.consumoDelMes,
        medicion.consumoDelMesAnterior,
        "$"+medicion.valorFijo,
        "$"+medicion.tarifaExcedente,
        medicion.consumoDelMes - medicion.consumoDelMesAnterior,
        "$"+medicion.totalAPagar ,
        
      ]);
    
      doc.autoTable({
        head: [columns],
        body: rows,
        styles: {
          halign: 'center',
          valign: 'middle'  
      },
      columnStyles: {
        0: {halign:'center'},
        1: { halign: 'left' },
        2: { halign: 'left' },
      }
      });
    
      doc.save(`Mediciones_${selectedDate}.pdf`);
    };


  export default generatePDF;