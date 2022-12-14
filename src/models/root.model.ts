import { PrismaClient } from '@prisma/client';

export const { user, profile, category, sub_Category , set_Category, product, cart_Product, order_Details } = new PrismaClient();

