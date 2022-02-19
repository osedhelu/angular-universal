export class Employee {
    MyID: string
    apellidos: string
    celular: string
    country: country
    email: string
    nombre: string
    patrocinador: string;
    username: string
    _id: string
    userVentas: any
}

interface country {
    _id: string;
    phone_code: string;
    iso2: string;
    name: string;
}
export const employees: Employee[] = [{
    MyID: "init",
    apellidos: "maria",
    celular: "7239827937",
    country: { _id: '61e8bbc1f43aefde8e691398', phone_code: '1', iso2: 'CA', name: 'Canada' },
    email: "isabella@admin.com",
    nombre: "isabella",
    patrocinador: null,
    username: "Isabella",
    _id: "61eea9801d664f3f3988b8d4",
    userVentas: []
}];
