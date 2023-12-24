import { faker } from "@faker-js/faker";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient()

async function createProducts(quantity: number) {
    for (let i = 0; i < quantity; i++) {
        const productName = faker.commerce.productName()

        const product = await prisma.product.create({
            data: {
                name: productName,
                slug: faker.helpers.slugify(productName).toLowerCase(),
                description: faker.commerce.productDescription(),
                price: +faker.commerce.price({min: 1, max: 999, dec: 0}),
                image: faker.image.urlLoremFlickr({category: 'technics'}),
                stock: faker.number.int({min: 1, max: 100}),
                category: {
                    create: {
                        name: faker.commerce.department()
                    }
                }
            }
        })
    }
}

async function main () {
    await createProducts(10)
}

main()
    .catch(e => console.log(e))
    .finally(async () => {
        prisma.$disconnect
    })