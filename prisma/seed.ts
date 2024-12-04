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
    const gyerek = await prisma.gyerek.create({
      data: {
        nev: faker.name.firstName(),
        cim: faker.location.country() + faker.location.city() + faker.location.streetAddress(),
        viselkedes: faker.datatype.boolean(),
      },
    })
    if (gyerek.viselkedes) {
      await prisma.childrenToToys.create({
        data: {
          child_id: gyerek.id,
          toy_id: faker.number.int({ min: 1, max: 50 })
        }
      })
    }
  }
}

main()
.catch(e => {
throw e
})
