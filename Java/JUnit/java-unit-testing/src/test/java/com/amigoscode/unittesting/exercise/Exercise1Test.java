package com.amigoscode.unittesting.exercise;

import com.amigoscode.unittesting.User;
import com.amigoscode.unittesting.UserDto;
import com.amigoscode.unittesting.UserMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class Exercise1Test {

    private final Exercise1 underTest = new Exercise1();

    @ParameterizedTest
    @CsvSource({
            "90, A",
            "91, A",
            "100, A",
            "80, B",
            "81, B",
            "89, B",
            "70, C",
            "71, C",
            "79, C",
            "60, D",
            "61, D",
            "69, D",
            "50, E",
            "51, E",
            "59, E",
            "49, F",
            "0, F",
            "1, F"

    })
    void canGetTheCorrectGrade(int grade, String expectedGrade) {
        // when
        String actual = underTest.getGrade(grade);
        // then
        assertThat(actual).isEqualTo(expectedGrade);
    }


    @Test
    void canTestUserMapper() {
        // given
        var user = new User(1, "jamila", "password");

        // when
        var actual = new UserMapper().map(user);

        // then
        var expectedUser = new UserDto(
                1, "jamila"
        );
        assertThat(actual).isEqualTo(expectedUser);

    }

    @ParameterizedTest
    @CsvSource({
            "-100",
            "-1",
            "101",
            "150"
    })
    void willThrowWhenInvalidGrade(int grade) {
        assertThatThrownBy(() -> underTest.getGrade(grade))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Score must be between 0 and 100");

    }


    @Test
    void countVowels() {
        // given
        // when
        // then
    }

    @Test
    void isValidStudentId() {
        // given
        // when
        // then
    }

    @Test
    void canCalculateAverage() {
        // given
        var scores = List.of(1, 2, 3, 4, 5);
        // when
        double actual = underTest.calculateAverage(scores);
        // then
        int expected = 3;
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void canCalculateAverageWhenNull() {
        // given
        List<Integer> scores = null;
        // when
        double actual = underTest.calculateAverage(scores);
        // then
        var expected = 0.0;
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void canCalculateAverageWhenEmptyList() {
        // given
        List<Integer> scores = List.of();
        // when
        double actual = underTest.calculateAverage(scores);
        // then
        var expected = 0.0;
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void generateUsername() {
        // given
        // when
        // then
    }

    @Test
    void canGetTopStudents() {
        // given
        var students = List.of(
                new Student("Alex", 10),
                new Student("Jamila", 80),
                new Student("Ana", 7),
                new Student("George", 18),
                new Student("Sally", 54)
        );

        var threshold = 50;

        // when
        var actual = underTest.getTopStudents(students, threshold);

        // then
        var expected = List.of(
                new Student("Jamila", 80),
                new Student("Sally", 54)
        );
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void canGetTopStudentsWhenOneHasNegativeScore() {
        // given
        var students = List.of(
                new Student("Alex", 10),
                new Student("Jamila", 80),
                new Student("Ana", 7),
                new Student("George", 18),
                new Student("Sally", 54)
        );

        var threshold = 50;

        // when
        var actual = underTest.getTopStudents(students, threshold);

        // then
        var expected = List.of(
                new Student("Jamila", 80),
                new Student("Sally", 54)
        );
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void willReturnEmptyListWhenStudentsAreNull() {
        // given
        List<Student> students = null;

        var threshold = 50;

        // when
        var actual = underTest.getTopStudents(students, threshold);

        // then
        var expected = List.of();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void hasDuplicateNames() {
        // given
        // when
        // then
    }

    @Test
    void reverseCourses() {
        // given
        // when
        // then
    }

    @Test
    void hasPassed() {
        // given
        // when
        // then
    }

    @Test
    void assignBadge() {
        // given
        // when
        // then
    }
}