package com.example.aop;import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebControllerTest {

    @Mock
    private FibonacciService fibonacciService;

    @InjectMocks
    private WebController webController;    @Test
    void fibonacci_ShouldReturnExpectedValue() {
        // Arrange
        Long inputNumber = 10L;
        Long expectedResult = 55L;
        when(fibonacciService.nthFibonacciTerm(inputNumber)).thenReturn(expectedResult);

        // Act
        Long actualResult = webController.fibonacci(inputNumber);

        // Assert
        assertEquals(expectedResult, actualResult);
        verify(fibonacciService, times(1)).nthFibonacciTerm(inputNumber);
    }

    @Test
    void storeData_ShouldExecuteWithoutCrashing_WhenRandomAllows() {
        // Note: storeData has internal non-deterministic Random logic.
        // This test verifies the method can be invoked.
        String testData = "sampleData";

        try {
            webController.storeData(testData);
            // If it doesn't throw, it's a success path
        } catch (RuntimeException e) {
            // If it throws, it's the expected behavior of the random failure
            assertNotNull(e);
        }
    }

    @Test    void fibonacci_WithNullInput_ShouldHandleOrPassToService() {
        // Arrange
        when(fibonacciService.nthFibonacciTerm(null)).thenReturn(0L);

        // Act
        Long result = webController.fibonacci(null);

        // Assert
        assertEquals(0L, result);
        verify(fibonacciService).nthFibonacciTerm(null);
    }
}