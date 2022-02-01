export const sumar_horas = ({ fecha, horas }: { fecha: Date, horas: number }) => {
    var numberOfMlSeconds = fecha.getTime();
    var addMlSeconds = (horas * 60) * 60000;
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

    return newDateObj;
}