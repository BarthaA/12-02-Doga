import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()
async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.jatek.create({
      data: {
        nev: faker.commerce.productName(),
        anyag: faker.commerce.productMaterial(),
        suly: faker.number.int({ min: 1, max: 10 }),
        gyerek: {},
      }
    })
  }
  for (let i = 0; i < 10; i++) {
    await prisma.gyerek.create({
      data: {
        nev: faker.name.firstName(),
        cim: faker.address.country() + faker.address.city() + faker.address.streetAddress(),
        viselkedes: faker.datatype.boolean(),
      },
    })
  }
}

main()
.catch(e => {
throw e
})
