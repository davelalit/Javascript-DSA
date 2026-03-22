package com.example.aop;

import org.springframework.stereotype.Service;

@Service
public class FibonacciService {

  private final HiByeService hiByeService;

    public FibonacciService(HiByeService hiByeService) {
        this.hiByeService = hiByeService;
        hiByeService.sayHi("Lalit");
        hiByeService.sayBye();
        hiByeService.returnSomething();
    }

    /**
   * A fibonacci implementation, which is slow (on purpose).
   * See https://www.baeldung.com/java-fibonacci
   */
  public Long nthFibonacciTerm(Long n) {
    if (n == 1 || n == 0) {

      return n;
    }
    return nthFibonacciTerm(n-1) + nthFibonacciTerm(n-2);
  }

}
