import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionWithCustomer } from '@justt/api-interfaces';
import {
  Gender,
  Customer as CustomerModel,
  Transaction as TransactionModel,
  Prisma,
} from '@prisma/client';

import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly dataService: PrismaService) {}

  @Get('transaction/:id')
  async getTransactionById(@Param('id') id: string): Promise<TransactionModel> {
    return this.dataService.transaction.findUnique({
      where: { id: Number(id) },
    });
  }

  @Delete('transaction/:id')
  async deleteTransaction(@Param('id') id: string): Promise<TransactionModel> {
    return this.dataService.transaction.delete({ where: { id: Number(id) } });
  }

  @Get('feed')
  async getFilteredTransactions(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ): Promise<TransactionWithCustomer[]> {
    // @ts-ignore
    const or = searchString
      ? {
          OR: [
            {
              creditCardType: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              currency: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              customer: {
                firstName: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
            {
              customer: {
                lastName: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
            {
              customer: {
                country: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
            {
              customer: {
                city: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
            {
              customer: {
                street: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
          ],
        }
      : {};

    // @ts-ignore
    return this.dataService.transaction.findMany({
      include: { customer: true },
      // @ts-ignore
      where: or,
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        createdAt: orderBy,
      },
    });
  }

  @Get('customers')
  async getAllCustomers(): Promise<CustomerModel[]> {
    return this.dataService.customer.findMany();
  }

  @Get('customer/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerModel> {
    return this.dataService.customer.findFirst({
      where: { OR: [{ id: parseInt(id, 10) }, { externalId: id }] },
    });
  }

  @Get('transactions')
  async getAllTransactions(): Promise<TransactionModel[]> {
    return this.dataService.transaction.findMany();
  }

  @Get('customer/:id/transactions')
  async getTransactionsByCustomer(
    @Param('id') id: string
  ): Promise<TransactionModel[]> {
    return this.dataService.customer
      .findUnique({
        where: { id: Number(id) },
      })
      .transactions();
  }

  @Post('transaction')
  async createDraft(
    @Body()
    transactionData: {
      price: number;
      currency?: string;
      creditCardType: string;
      creditCardNumber: number;
      customerId: number;
    }
  ): Promise<TransactionModel> {
    const { price, currency, creditCardType, creditCardNumber, customerId } =
      transactionData;
    return this.dataService.transaction.create({
      data: {
        price,
        currency,
        creditCardType,
        creditCardNumber,
        customer: {
          connect: { id: customerId },
        },
      },
    });
  }

  @Post('signup')
  async signupCustomer(
    @Body()
    customerData: {
      externalId: string;
      email: string;
      firstName?: string;
      lastName?: string;
      gender?: Gender;
      country?: string;
      city?: string;
      street?: string;
      phone?: string;
      transactions?: Prisma.TransactionCreateInput[];
    }
  ): Promise<CustomerModel> {
    const transactionData = customerData.transactions?.map((transaction) => {
      return {
        price: transaction?.price,
        currency: transaction?.currency,
        creditCardType: transaction?.creditCardType,
        creditCardNumber: transaction?.creditCardNumber,
      };
    });
    return this.dataService.customer.create({
      data: {
        externalId: customerData.externalId,
        email: customerData.email,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        gender: customerData.gender,
        country: customerData.country,
        city: customerData.city,
        street: customerData.street,
        phone: customerData.phone,
        transactions: {
          create: transactionData,
        },
      },
    });
  }
}
