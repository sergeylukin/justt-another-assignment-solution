import { Gender, PrismaClient } from '@prisma/client';
const data = require('./seed.json');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`,
    },
  },
});

async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  const seeds = data.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      const user = ({
        customer_id,
        first_name,
        last_name,
        email,
        gender,
        country,
        city,
        street,
        phone,
      }) => ({
        externalId: customer_id,
        firstName: first_name,
        lastName: last_name,
        email,
        gender: gender === 'male' ? Gender.MALE : Gender.FEMALE,
        country,
        city,
        street,
        phone,
      });
      const transaction = ({
        total_price,
        currency,
        cerdit_card_type,
        cerdit_card_number,
      }) => ({
        price: Number(total_price),
        currency,
        creditCardType: cerdit_card_type,
        creditCardNumber: Number(cerdit_card_number.slice(-4)),
      });

      if (previousValue.hasOwnProperty('customer_id')) {
        const transactions = {};
        transactions[previousValue.customer_id] = [];
        transactions[previousValue.customer_id].push(
          transaction(previousValue)
        );
        transactions[currentValue.customer_id] = [];
        transactions[currentValue.customer_id].push(transaction(currentValue));
        return [[user(previousValue), user(currentValue)], transactions];
      } else {
        previousValue[0].push(user(currentValue));
        if (!previousValue[1].hasOwnProperty(currentValue.customer_id)) {
          previousValue[1][currentValue.customer_id] = [];
        }
        previousValue[1][currentValue.customer_id].push(
          transaction(currentValue)
        );
        // previousValue[1].push(transaction(currentValue));
        return previousValue;
      }
    }
  );
  for (let customer of seeds[0]) {
    const customerExists = await prisma.customer.count({
      where: {
        externalId: customer.externalId,
      },
    });
    if (!customerExists) {
      console.log(`inserting customer with customerId ${customer.externalId}`);
      await prisma.customer.create({ data: customer });
    }
  }
  /// --------- Transactions ---------------
  for (let externalId in seeds[1]) {
    let customer = await prisma.customer.findUnique({
      where: { externalId },
      include: {
        transactions: true,
      },
    });
    let missingTransactions = seeds[1][externalId].filter(
      (seedItem) =>
        !customer.transactions.find(
          (dbItem) =>
            dbItem.price === Number(seedItem.price) &&
            dbItem.currency === seedItem.currency
        )
    );
    if (missingTransactions.length) {
      console.log(`inserting transaction for customerId ${externalId}`);
      await prisma.customer.update({
        where: {
          externalId,
        },
        data: {
          transactions: {
            createMany: {
              data: missingTransactions,
            },
          },
        },
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
