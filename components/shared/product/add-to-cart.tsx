'use client';

import { Button } from '@/components/ui/button';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Cart, CartItem } from '@/types';
import { Loader, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const addToCartHandler = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      // Handle error
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Handle success
      toast(res.message, {
        action: {
          label: 'Go To Cart',
          onClick: () => router.push('/cart'),
        },
      });
    });
  };

  const removeFromCartHandler = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (res.success) toast.success(res.message);
      if (!res.success) toast.error(res.message);
      return;
    });
  };

  // Check if item is in the cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  if (existItem) {
    return (
      <div>
        <Button type="button" variant="outline" onClick={removeFromCartHandler}>
          {isPending ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="px-2">{existItem.qty}</span>
        <Button type="button" variant="outline" onClick={addToCartHandler}>
          {isPending ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" onClick={addToCartHandler}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{' '}
      Add To Cart
    </Button>
  );
}
export default AddToCart;
