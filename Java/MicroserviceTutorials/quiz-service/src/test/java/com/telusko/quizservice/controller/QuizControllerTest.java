package com.telusko.quizservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.telusko.quizservice.model.QuestionWrapper;
import com.telusko.quizservice.model.QuizDto;
import com.telusko.quizservice.model.Response;
import com.telusko.quizservice.service.QuizService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class QuizControllerTest {

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuizController quizController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(quizController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testCreateQuiz_Success() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Java");
        quizDto.setNumQuestions(5);
        quizDto.setTitle("Java Quiz");

        lenient().when(quizService.createQuiz("Java", 5, "Java Quiz"))
                .thenReturn(new ResponseEntity<>("Success", HttpStatus.CREATED));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Success"));
    }

    @Test
    void testCreateQuiz_WithDifferentCategory() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Python");
        quizDto.setNumQuestions(3);
        quizDto.setTitle("Python Quiz");

        lenient().when(quizService.createQuiz("Python", 3, "Python Quiz"))
                .thenReturn(new ResponseEntity<>("Success", HttpStatus.CREATED));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateQuiz_WithZeroQuestions() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Java");
        quizDto.setNumQuestions(0);
        quizDto.setTitle("Empty Quiz");

        lenient().when(quizService.createQuiz(anyString(), anyInt(), anyString()))
                .thenReturn(new ResponseEntity<>("Success", HttpStatus.CREATED));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateQuiz_WithNullTitle() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Java");
        quizDto.setNumQuestions(5);
        quizDto.setTitle(null);

        lenient().when(quizService.createQuiz(anyString(), anyInt(), isNull()))
                .thenReturn(new ResponseEntity<>("Success", HttpStatus.CREATED));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateQuiz_WithLargeNumQuestions() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Java");
        quizDto.setNumQuestions(1000);
        quizDto.setTitle("Large Quiz");

        lenient().when(quizService.createQuiz(anyString(), anyInt(), anyString()))
                .thenReturn(new ResponseEntity<>("Success", HttpStatus.CREATED));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateQuiz_InternalServerError() throws Exception {
        QuizDto quizDto = new QuizDto();
        quizDto.setCategoryName("Java");
        quizDto.setNumQuestions(5);
        quizDto.setTitle("Java Quiz");

        lenient().when(quizService.createQuiz(anyString(), anyInt(), anyString()))
                .thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/quiz/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(quizDto)))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testGetQuizQuestions_Success() throws Exception {
        List<QuestionWrapper> questions = new ArrayList<>();
        QuestionWrapper q1 = new QuestionWrapper(1, "What is Java?", "Language", "Coffee", "Island", "Desert");
        QuestionWrapper q2 = new QuestionWrapper(2, "What is Spring?", "Framework", "Season", "Water", "Plant");
        questions.add(q1);
        questions.add(q2);

        lenient().when(quizService.getQuizQuestions(1))
                .thenReturn(new ResponseEntity<>(questions, HttpStatus.OK));

        mockMvc.perform(post("/quiz/get/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetQuizQuestions_WithSingleQuestion() throws Exception {
        List<QuestionWrapper> questions = new ArrayList<>();
        QuestionWrapper q1 = new QuestionWrapper(1, "Test question?", "Answer", "Opt1", "Opt2", "Opt3");
        questions.add(q1);

        lenient().when(quizService.getQuizQuestions(2))
                .thenReturn(new ResponseEntity<>(questions, HttpStatus.OK));

        mockMvc.perform(post("/quiz/get/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testGetQuizQuestions_EmptyList() throws Exception {
        List<QuestionWrapper> questions = new ArrayList<>();

        lenient().when(quizService.getQuizQuestions(3))
                .thenReturn(new ResponseEntity<>(questions, HttpStatus.OK));

        mockMvc.perform(post("/quiz/get/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void testGetQuizQuestions_MultipleQuestions() throws Exception {
        List<QuestionWrapper> questions = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            QuestionWrapper q = new QuestionWrapper(i, "Question " + i, "Answer", "Opt1", "Opt2", "Opt3");
            questions.add(q);
        }

        lenient().when(quizService.getQuizQuestions(5))
                .thenReturn(new ResponseEntity<>(questions, HttpStatus.OK));

        mockMvc.perform(post("/quiz/get/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(10));
    }

    @Test
    void testGetQuizQuestions_QuizNotFound() throws Exception {
        lenient().when(quizService.getQuizQuestions(999))
                .thenReturn(new ResponseEntity<>(HttpStatus.NOT_FOUND));

        mockMvc.perform(post("/quiz/get/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetQuizQuestions_InternalServerError() throws Exception {
        lenient().when(quizService.getQuizQuestions(anyInt()))
                .thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/quiz/get/1"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testSubmitQuiz_Success() throws Exception {
        List<Response> responses = new ArrayList<>();
        Response r1 = new Response();
        r1.setId(1);
        r1.setResponse("Option A");
        Response r2 = new Response();
        r2.setId(2);
        r2.setResponse("Option B");
        responses.add(r1);
        responses.add(r2);

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(2, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(content().string("2"));
    }

    @Test
    void testSubmitQuiz_ZeroScore() throws Exception {
        List<Response> responses = new ArrayList<>();
        Response r1 = new Response();
        r1.setId(1);
        r1.setResponse("Wrong Answer");
        responses.add(r1);

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(0, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(content().string("0"));
    }

    @Test
    void testSubmitQuiz_PerfectScore() throws Exception {
        List<Response> responses = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Response r = new Response();
            r.setId(i);
            r.setResponse("Correct");
            responses.add(r);
        }

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(5, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(content().string("5"));
    }

    @Test
    void testSubmitQuiz_PartialScore() throws Exception {
        List<Response> responses = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            Response r = new Response();
            r.setId(i);
            r.setResponse("Answer" + i);
            responses.add(r);
        }

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(7, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(content().string("7"));
    }

    @Test
    void testSubmitQuiz_EmptyResponses() throws Exception {
        List<Response> responses = new ArrayList<>();

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(0, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk());
    }

    @Test
    void testSubmitQuiz_MultipleAnswers() throws Exception {
        List<Response> responses = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Response r = new Response();
            r.setId(i);
            r.setResponse("Answer" + i);
            responses.add(r);
        }

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(15, HttpStatus.OK));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(content().string("15"));
    }

    @Test
    void testSubmitQuiz_BadRequest() throws Exception {
        List<Response> responses = new ArrayList<>();

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(HttpStatus.BAD_REQUEST));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testSubmitQuiz_InternalServerError() throws Exception {
        List<Response> responses = new ArrayList<>();
        Response r = new Response();
        r.setId(1);
        r.setResponse("Answer");
        responses.add(r);

        lenient().when(quizService.calculateResult(anyInt(), anyList()))
                .thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/quiz/submit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testHello() throws Exception {
        mockMvc.perform(get("/quiz/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World!"));
    }

}