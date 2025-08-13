import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import sampleData from '@/db/sample-data';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

PurchaseReceipt.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'john@mail.com',
    },
    paymentMethod: 'Stripe',
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main street',
      city: 'BNG',
      postalCode: '123444',
      country: 'IND',
    },
    createdAt: new Date(),
    totalPrice: '100',
    taxPrice: '10',
    shippingPrice: '10',
    itemsPrice: '80',
    orderItems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: '123',
      productId: '123',
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: '123',
      status: 'succeeded',
      pricePaid: '100',
      email_address: 'john@mail.com',
    },
  },
} satisfies OrderInformationProps;

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

type OrderInformationProps = {
  order: Order;
};

function PurchaseReceipt({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Order ID
                  </Text>
                  <Text className="mt-0 mr-4">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Date
                  </Text>
                  <Text className="mt-0 mr-4">
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                    Price Paid
                  </Text>
                  <Text className="mt-0 mr-4">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
              {order.orderItems.map((item) => (
                <Row key={item.productId}>
                  <Column className="w-20">
                    <Img
                      width="80"
                      alt={item.name}
                      className="rounded"
                      src={
                        item.image.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className="align-top">
                    {item.name} x {item.qty}
                  </Column>
                  <Column className="align-top" align="right">
                    {formatCurrency(item.price)}
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.totalPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}</Column>
                  <Column className="align-top" align="right" width={70}>
                    <Text className="m-0">{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
export default PurchaseReceipt;
