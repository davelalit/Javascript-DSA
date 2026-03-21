package com.amigoscode.unittesting;

import java.util.function.Predicate;

public class PasswordValidator implements Predicate<String> {

    private static final int MIN_PASSWORD_CHAR_LENGTH = 8;
    private static final String DIGIT_REGEX = ".*\\d.*";
    private static final String SPECIAL_CHAR_REGEX = ".*[!@#$%^&*()_+=<>?/\\[\\]{}|].*";

    @Override
    public boolean test(String password) {
        if(password == null || password.trim().isBlank()) {
            return false;
        }

        password = password.trim();

        if(password.length() < MIN_PASSWORD_CHAR_LENGTH) {
            return false;
        }

        if(!password.matches(DIGIT_REGEX)) {
            return false;
        }

        if (!password.matches(SPECIAL_CHAR_REGEX)) {
            return false;
        }

        return true;
    }
}
