package com.example.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Aspect
@Component
public class Aspects implements Ordered {

  @Before("@annotation(com.example.aop.LogMethodName)")
  public void logMethodName(JoinPoint joinPoint) {
    String method = joinPoint.getSignature().getName();
    String params = Arrays.toString(joinPoint.getArgs());
    System.out.println("Method [" + method + "] gets called with parameters " + params);
  }

  @Around("@annotation(com.example.aop.MonitorTime)")
  public Object monitorTime(ProceedingJoinPoint joinPoint) throws Throwable {
    long startTime = System.currentTimeMillis();
    Object proceed = joinPoint.proceed();
    long duration = System.currentTimeMillis() - startTime;
    System.out.println("Execution took [" + duration + "ms]");
    return proceed;
  }

  @Around("@annotation(com.example.aop.RetryOperation)")
  public Object doIdempotentOperation(ProceedingJoinPoint joinPoint) throws Throwable {
    int numAttempts = 0;
    RuntimeException exception;
    do {
      try {
        return joinPoint.proceed();
      } catch(RuntimeException e) {
        numAttempts++;
        exception = e;
      }
    } while(numAttempts <= 100);
    throw exception;
  }

  @Before("execution(* HiByeService.*(..))")
  public void before(JoinPoint joinPoint) {
    System.out.print("Before ");
    System.out.print(joinPoint.getSignature().getName());
    System.out.println(Arrays.toString(joinPoint.getArgs()));
  }

  @AfterReturning(pointcut = "execution(* HiByeService.*(..))"
          , returning = "result")
  public void after(JoinPoint joinPoint, Object result) {
    System.out.print("After ");
    System.out.print(joinPoint.getSignature().getName());
    System.out.println(" result is " + result);
  }

  @Around(value = "execution(* HiByeService.*(..))")
  public void around(ProceedingJoinPoint joinPoint)
          throws Throwable {
    // Advice - The code which you want to execute is called advice
    // Pointcut - help you to identify what kind of methods you would want to intercept using expression for example execution(* HiByeService.*(..))")
    // Aspect - Advice + Pointcut
    // JoinPoint - a specific execution point of the aspect
    // Weaving - is the process of making sure that these methods are getting called at the right instances.
    // Weaver - is the AOP framework. Spring AOP can do basic weaving and with aspect you can do advanced weaving.
    // with Spring AOP, we can only intercept method calls. A weaver is a framework like Spring AOP or AspectJ.

    // Different Advice Types -
    /*
    - Before advice
    - After returning advice
    - After throwing advice
    - After (finally) advice - Always executed
    - Around advice - Most powerful - Performance Logging
     */

    /*
    * ## AspectJ vs Spring AOP
      AspectJ is a full fledged AOP framework
      - Advise objects not managed by the Spring container
      - Advise join points other than simple method executions
        - (for example, field get or set join points)
     */

    long startTime = new Date().getTime();
    Object result = joinPoint.proceed();
    long endTime = new Date().getTime();
    System.out.print("Execution Time - "
            + (endTime - startTime));
  }

  @Override
  public int getOrder() {
    return 0;
  }
}
