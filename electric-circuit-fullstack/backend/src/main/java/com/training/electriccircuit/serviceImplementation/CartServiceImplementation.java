package com.training.electriccircuit.serviceImplementation;

import java.util.List;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import com.training.electriccircuit.entity.Cart;
import com.training.electriccircuit.entity.Product;
import com.training.electriccircuit.repository.CartRepository;
import com.training.electriccircuit.repository.ProductRepository;
import com.training.electriccircuit.service.CartService;

@Service
public class CartServiceImplementation implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartServiceImplementation(
            CartRepository cartRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @SuppressWarnings("null")
    @Override
    public Cart increaseQuantity(Long id) {

        Cart cart = cartRepository.findById(id).orElse(null);

        if (cart != null) {

            cart.setQuantity(cart.getQuantity() + 1);

            cart.setTotalAmount(
                    cart.getQuantity() * cart.getPrice());

            return cartRepository.save(cart);

        }

        return null;

    }

    @Override
    public Cart decreaseQuantity(Long id) {

        @SuppressWarnings("null")
		Cart cart = cartRepository.findById(id).orElse(null);

        if (cart != null) {

            if (cart.getQuantity() > 1) {

                cart.setQuantity(cart.getQuantity() - 1);

                cart.setTotalAmount(
                        cart.getQuantity() * cart.getPrice());

                return cartRepository.save(cart);

            }

        }

        return cart;

    }
	@SuppressWarnings("null")
	@Override
    public Cart saveCart(Cart cart) {

        // Get Product Details
        Product product = productRepository
                .findById(cart.getProductId())
                .orElse(null);

        if (product != null) {

            cart.setProductName(product.getName());
            cart.setPrice(product.getPrice());
            cart.setImage(product.getImage());  

        }
        

        Cart existingCart = cartRepository
                .findByUserIdAndProductId(
                        cart.getUserId(),
                        cart.getProductId());

        if (existingCart != null) {

            existingCart.setQuantity(
                    existingCart.getQuantity()
                            + cart.getQuantity());

            existingCart.setProductName(product.getName());
            existingCart.setPrice(product.getPrice());
            existingCart.setImage(product.getImage());

            existingCart.setTotalAmount(
                    existingCart.getQuantity()
                            * existingCart.getPrice());

            return cartRepository.save(existingCart);
        }

        cart.setTotalAmount(
                cart.getQuantity()
                        * cart.getPrice());

        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCartByUserId(Long userId) {

        return cartRepository.findByUserId(userId);

    }

    @SuppressWarnings("null")
	@Override
    public void deleteCart(@Nullable Long id) {

        cartRepository.deleteById(id);

    }

    @Override
    public Cart getCartItem(Long userId, Long productId) {

        return cartRepository.findByUserIdAndProductId(
                userId,
                productId);

    }

    @Override
    public long getCartCount(Long userId) {

        return cartRepository.countByUserId(userId);

    }

    @Override
    public void clearCart(Long userId) {

        cartRepository.deleteByUserId(userId);

    }

    @Override
    public Double getCartTotal(Long userId) {

        List<Cart> cartItems =
                cartRepository.findByUserId(userId);

        double total = 0;

        for (Cart cart : cartItems) {

            if (cart.getTotalAmount() != null) {

                total += cart.getTotalAmount();

            }

        }

        return total;

    }

}