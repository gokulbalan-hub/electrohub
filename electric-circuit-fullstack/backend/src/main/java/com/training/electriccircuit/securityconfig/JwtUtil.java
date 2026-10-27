package com.training.electriccircuit.securityconfig;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

    private static final String SECRET = requireSecret();

    private static String requireSecret() {
        String secret = System.getenv("JWT_SECRET");
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException(
                    "Set JWT_SECRET to a random value of at least 32 characters.");
        }
        return secret;
    }

    private static final Key KEY =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(java.nio.charset.StandardCharsets.UTF_8));

    public static String generateToken(
            String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000))
                .signWith(KEY)
                .compact();
    }

    public static String extractEmail(
            String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(
                                (javax.crypto.SecretKey) KEY)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }
}