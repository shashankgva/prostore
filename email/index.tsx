import { APP_NAME, SENDER_EMAIL } from '@/lib/constants';
import { Order } from '@/types';
import { Resend } from 'resend';
import PurchaseReceipt from './purchase-receipt';

require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendPurchaseReceipt({ order }: { order: Order }) {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceipt order={order} />,
  });
}
