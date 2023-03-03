import { PrismaClient } from '@prisma/client';

export const { user, profile, category, sub_Category , product, cart_Product, order_Details, bundles, cart_Product_Variant } = new PrismaClient();

