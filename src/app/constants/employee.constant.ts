//#region IMPORT

import { EmployeeModel } from "../models/employee.model";
import { ARRAY_GROUPS } from "./group.constant";

//#endregion


//#region ATTRIBUTES

export const ARRAY_EMPLOYEES: EmployeeModel[] = [];

//#endregion


//#region FUNCTION

export function initializeDummyData(): void
{
    
    if (ARRAY_EMPLOYEES.length === 0)
    {
        const ARRAY_FIRSTNAMES = ['Budi', 'Siti', 'Ahmad', 'Dewi', 'Rizky', 'Putri', 'Eko', 'Mega', 'Aditya', 'Fitri'];
        const ARRAY_LASTNAMES = ['Santoso', 'Rahmawati', 'Hidayat', 'Lestari', 'Pratama', 'Utami', 'Prasetyo', 'Wijaya', 'Nugroho', 'Handayani'];

        for (let i = 1; i <= 116; i++) {
            const employee = new EmployeeModel();
            const randomIndex = Math.floor(Math.random() * ARRAY_GROUPS.length);
            const randomIdxFirstName = Math.floor(Math.random() * ARRAY_FIRSTNAMES.length);
            const randomIdxLastName = Math.floor(Math.random() * ARRAY_LASTNAMES.length);

            employee.username = `user.${ARRAY_FIRSTNAMES[randomIdxFirstName].toLowerCase()}${i}`;
            employee.firstName = ARRAY_FIRSTNAMES[randomIdxFirstName];
            employee.lastName = `${ARRAY_LASTNAMES[randomIdxLastName]}${i}`;
            employee.email = `${ARRAY_FIRSTNAMES[randomIdxFirstName].toLowerCase() }${i}@emp.com`;
            employee.birthDate = generateRandomBirthDate();
            employee.basicSalary = 5700000;
            employee.status = "Active";
            employee.group = ARRAY_GROUPS[randomIndex];

            ARRAY_EMPLOYEES.push(employee);
        }
    }
}

export function generateRandomBirthDate(): Date
{
    const hariIni = new Date();
    const tahunSekarang = hariIni.getFullYear();

    // 1. Tentukan batas minimal dan maksimal tahun (20 - 40 tahun lalu)
    const tahunMinimal = tahunSekarang - 40;
    const tahunMaksimal = tahunSekarang - 20;

    // 2. Acak tahun di antara rentang tersebut
    const tahunAcak = tahunMinimal + Math.floor(Math.random() * (tahunMaksimal - tahunMinimal + 1));

    // 3. Acak bulan (0 = Januari, 11 = Desember)
    const bulanAcak = Math.floor(Math.random() * 12);

    // 4. Acak tanggal (1 sampai 28 agar aman dari masalah jumlah hari di bulan Februari)
    const tanggalAcak = 1 + Math.floor(Math.random() * 28);

    // 5. Kembalikan dalam bentuk objek Date baru
    return new Date(tahunAcak, bulanAcak, tanggalAcak);
}


//#endregion