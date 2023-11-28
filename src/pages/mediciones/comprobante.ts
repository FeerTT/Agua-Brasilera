import jsPDF from "jspdf";
import "jspdf-autotable"


interface selectedMediciones {
    consumoDelMes: number;
    consumoDelMesAnterior: number;
    createdAt: string;
    id: number;
    mesActual: string;
    tarifaExcedente: number;
    totalAPagar: number;
    usuario: User; 
    usuarioId: number;
    valorFijo: number;
    
}
interface User {
    active: boolean;
    apellido: string;
    createdAt: string;
    id: number;
    nombre: string;
}


const GenerarComprobante = (selectedDate:any, selectedMediciones:any) => {
    const doc = new jsPDF();
    console.log(selectedDate, selectedMediciones, "CL SELECTEDDATE, SELECTED MEDICIONES")
    const comprobanteWidth = 90; // Ancho del comprobante
    const comprobanteHeight = 130; // Alto del comprobante
    const margin = 10; // Margen de la página
    const spacing = 10; // Espacio entre comprobantes
    const fontSize = 10;
    const comprobantesPorPagina = 4;
    const [anio, mes] = selectedDate.split('-');
const fechaRevertida = `${mes}-${anio}`;
const espacioVertical = comprobanteHeight + spacing;
if (selectedMediciones.length > 0) {
    for (let i = 0; i < selectedMediciones.length; i++) {
    const medicion = selectedMediciones[i];

    const comprobanteEnPagina = i % comprobantesPorPagina;
    const paginaActual = Math.floor(i / comprobantesPorPagina);
    
    let x = (comprobanteEnPagina % 2) * (comprobanteWidth + spacing) + margin;
    let y = (Math.floor(comprobanteEnPagina / 2) * espacioVertical) + margin;

    doc.setFontSize(fontSize);
        
        const text = "Total a pagar:";
        const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
        
        
        doc.rect(x, y, comprobanteWidth, comprobanteHeight);
        
        // Título y número de comprobante
        doc.setFontSize(16);
        doc.text(`Consorcio km 21       N° ${medicion.id}`, x + 5, y + 7);
        y += 2;
        doc.setFontSize(fontSize);
        // Subtítulo
        doc.setFontSize(12)
        doc.text(`Único recibo por suministro de agua potable`, x + 5, y + 13);
        y += 5;
        doc.text(`Fecha: ${fechaRevertida}`, x + 30, y + 17);
        y += 4;
        // COMIENZAN DATOS DE MEDICION
        doc.setFontSize(fontSize);
        doc.text(`Usuario: ${medicion.usuario.apellido}, ${medicion.usuario.nombre}`, x + 5, y + 23);
        y +=4;
        doc.text(`Estado del medidor:`, x + 5, y + 29);
        doc.text(`Anterior: ${medicion.consumoDelMesAnterior}`, x + 10, y + 33);
        doc.text(`Actual: ${medicion.consumoDelMes}`, x + 10, y + 37);
        y += 5;
        // Consumo en M3
        const consumoMes = medicion.consumoDelMes;
        const consumoMesAnterior = medicion.consumoDelMesAnterior;
        
        const basico = 10;
        
        const diferencia = consumoMes - consumoMesAnterior;
        
        let excedente = diferencia > basico ? diferencia - basico : 0;
        
        const fecha = new Date(medicion.mesActual);
        fecha.setMonth(fecha.getMonth() + 1);

        const mesNumero = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();

        const fechaFormateada = `${mesNumero.toString().padStart(2, '0')}-${anio}`;

        doc.text(`Consumo en M3:`, x + 5, y + 42);
        doc.text(`Leído en la fecha:  ${fechaFormateada}`, x + 10, y + 47);
        doc.text(`Básico: ${basico}`, x + 10, y + 52);
        doc.text(`Excedente: ${excedente}`, x + 10, y + 57);
        y += 5;
        doc.text(`Tarifas en pesos:`, x + 5, y + 62);
        doc.text(`Básico: $${medicion.valorFijo}`, x + 10, y + 67);
        doc.text(`Excedente: $${medicion.tarifaExcedente}`, x + 10, y + 72);
        // doc.text(`Total: ____`, x + 10, y + 77);

        doc.setFontSize(12);
        const totalText = "Total a pagar:";
        let totalValue = `$${medicion.totalAPagar}`; // Cambia esto por tu valor real

        
        const totalTextWidth = doc.getStringUnitWidth(totalText) * fontSize / doc.internal.scaleFactor;
        const totalTextX = x + (comprobanteWidth - totalTextWidth) / 2 - 18; // Restar 5 unidades más
        const totalTextY = y + 85; // La posición vertical sigue siendo la misma
        
        const totalValueWidth = doc.getStringUnitWidth(totalValue) * fontSize / doc.internal.scaleFactor;
        const totalValueX = totalTextX + totalTextWidth + 1 + 5; // Restar 5 unidades más
        const totalValueY = totalTextY; // La misma línea vertical que el texto
        // Dibuja "Total a pagar" y su valor
        
        doc.text(totalText, totalTextX, totalTextY);
        doc.text(totalValue, totalValueX, totalValueY);
        doc.setFontSize(fontSize);
        // Texto "Son:" y el espacio para el sello
        const sonText = "Son: $";
        const sonTextWidth = doc.getStringUnitWidth(sonText) * fontSize / doc.internal.scaleFactor;
        const sonTextX = x + 5; // Ajustar posición a la izquierda
        const sonTextY = totalTextY + 10; // Espacio debajo de "Total a pagar"

        const linesForValue = "___________"; // Líneas para ingresar el valor
        const linesForValueX = sonTextX + sonTextWidth + 1; // Posición a la derecha, ajusta según el diseño
        const linesForValueY = sonTextY + 1; // Alineado con el texto "Son:"

        // Dibuja "Son:" más a la izquierda
        // doc.setFontSize(fontSize);
        doc.text(sonText, sonTextX, sonTextY);

        // Dibuja las líneas para ingresar el valor a la derecha, fuera del área del sello
        doc.text(linesForValue, linesForValueX, linesForValueY);

        // Dibuja el espacio para el sello a la derecha
        const selloWidth = 30;
        const selloHeight = 40;
        const selloX = x + comprobanteWidth - selloWidth -2; // Alineado a la derecha
        const selloY = sonTextY - 34; // Alineado con el texto "Son:"
        const textoFirmaY = selloY + selloHeight - 2
        doc.rect(selloX, selloY, selloWidth, selloHeight);
        const textoFirma = "Firma";
        const textoFirmaWidth = doc.getStringUnitWidth(textoFirma) * 6; // Tamaño de fuente 6
        
        // Calcular la posición X para centrar el texto
        const textoFirmaX = selloX + (selloWidth - textoFirmaWidth) / 2 +3;
        doc.text(textoFirma, textoFirmaX, textoFirmaY);
        
        // doc.setFontSize(8);
        // const contenidoColor = "Original: Blanco / Duplicado: Color";
        // const contenidoColorWidth = doc.getStringUnitWidth(contenidoColor) * fontSize / doc.internal.scaleFactor;
        // const contenidoColorHeight = fontSize; // Altura estimada del texto
        // const contenidoColorX = x + (comprobanteWidth - contenidoColorWidth) / 2 -15;
        // const contenidoColorY = y + comprobanteHeight - contenidoColorHeight -3; // 2 es la distancia desde el borde

        // doc.text(contenidoColor, contenidoColorX, contenidoColorY);

        if (comprobanteEnPagina === comprobantesPorPagina - 1 || i === selectedMediciones.length - 1) {
            if (i !== selectedMediciones.length - 1) {
                doc.addPage();
            }
        }
    }

    doc.save('Comprobantes.pdf');
}
}
export default GenerarComprobante;
