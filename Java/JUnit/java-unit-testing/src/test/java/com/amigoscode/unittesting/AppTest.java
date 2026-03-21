package com.amigoscode.unittesting;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.condition.EnabledOnOs;
import org.junit.jupiter.api.condition.OS;

public class AppTest {

  @Test
  @Disabled
  @DisplayName("My First Test :)")
  void myFirstTest() {

  }

  @EnabledOnOs(OS.MAC)
  @RepeatedTest(10)
  @Tag("slow")
  void mySecondTest() {

  }
}
