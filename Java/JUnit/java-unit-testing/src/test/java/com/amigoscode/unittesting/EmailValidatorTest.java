package com.amigoscode.unittesting;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @ParameterizedTest
    @CsvSource({
            "hello@amigoscode.com, true",
            "nelson+foo@amigoscode.com, true",
            "nelson, false",
            "helloamigoscode@com, false",
            "helloamigoscode.com, false",
            "'', false",
    })
    void canValidateEmail(String email, boolean expected) {
        // when
        var actual = underTest.test(email);
        // then
        assertThat(actual).isEqualTo(expected);
    }

}