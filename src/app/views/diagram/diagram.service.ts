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
}, {
    MyID: "initlv_{Y&G",
    apellidos: "marilin",
    celular: "3948793847",
    country: { _id: '61e8bbc1f43aefde8e69139c', phone_code: '357', iso2: 'CY', name: 'Cyprus' },
    email: "marilin@admin.com",
    nombre: "marilin",
    patrocinador: "61eea9801d664f3f3988b8d4",
    username: "Marilin",
    _id: "61eea9b71d664f3f3988b8ea",
}, {
    MyID: "initlv_{Y&G{~hSwsd",
    apellidos: "hoa",
    celular: "2348927394",
    country: { _id: '61e8bbc1f43aefde8e691383', phone_code: '32', iso2: 'BE', name: 'Belgium' },
    email: "hola@admin.com",
    nombre: "hola",
    patrocinador: "61eea9b71d664f3f3988b8ea",
    username: "hola",
    _id: "61eeaa6d1d664f3f3988b902",
}, {
    MyID: "initlv_{Y&G{~hSwsdzb5!izu",
    apellidos: "Arteaga",
    celular: "2379238749",
    country: { _id: '61e8bbc1f43aefde8e6913e8', phone_code: '1 284', iso2: 'VG', name: 'Virgin Islands' },
    email: "merion@admin.com",
    nombre: "marion",
    patrocinador: "61eeaa6d1d664f3f3988b902",
    username: "marion",
    _id: "61f02f76d22443bed092ed85",
}];
