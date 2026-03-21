package com.amigoscode.unittesting;

import org.junit.jupiter.api.*;

import static org.assertj.core.api.Assertions.assertThat;

class CalculatorTest {

    private Calculator underTest;

    @BeforeEach
    void setUp() {
        underTest = new Calculator();
    }

    @AfterEach
    void tearDown() {

    }

    @AfterAll
    static void afterAll() {

    }

    @BeforeAll
    static void beforeAll() {

    }

    @Test
    void canAdd2Numbers() {
        // 1 - given
        var number1 = 3;
        var number2 = 3;
        // 2 - when
        var actual = underTest.add(number1, number2);
        // 3 - then
        var expected = 6;
        assertThat(actual).isEqualTo(expected);
    }

}