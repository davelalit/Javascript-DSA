package com.amigoscode.unittesting;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;

public class PasswordValidatorTest {
    private final PasswordValidator underTest
            = new PasswordValidator();

    @Test
    void willFailIfPasswordIsNull() {
        // given
        String password = null;
        // when
        var actual = underTest.test(password);

        // then
        assertThat(actual).isFalse();
    }

    @Test
    void willFailIfPasswordIsEmpty() {
        // given
        String password = "";
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isFalse();
    }

    @Test
    void willFailIfPasswordHasOnlyEmptySpaces() {
        // given
        String password = "      ";
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isFalse();
    }

    @Test
    void willFailIfPasswordDoesNotMeetsMinimumLengthRequiredAfterTrimming() {
        // given
        String password = "      pass";
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isFalse();
    }

    @Test
    void willFailIfPasswordDoesNotContainsAtLeastOneDigit() {
        // given
        String password = "password";
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isFalse();
    }

    @Test
    void willFailIfPasswordDoesNotContainsAtLeastOneSpecialChar() {
        // given
        String password = "password1";
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isFalse();
    }

    @ParameterizedTest
    @CsvSource({
            "Password1!, true",
            "Password1@, true",
            "Password1#, true",
            "Password1$, true",
            "Password1%, true",
            "Password1^, true",
            "Password1&, true",
            "Password1*, true",
            "Password1(, true",
            "Password1), true",
            "Password1_, true",
            "Password1+, true",
            "Password1=, true",
            "Password1<, true",
            "Password1>, true",
            "Password1?, true",
            "Password1/, true",
            "Password1[, true",
            "Password1], true",
            "Password1{, true",
            "Password1}, true",
            "Password1|, true",
            "Password1€, false",
    })
    void canValidateEspecialCharacters(String password,
                                       boolean expected) {
        // when
        var actual = underTest.test(password);
        // then
        assertThat(actual).isEqualTo(expected);
    }
}
