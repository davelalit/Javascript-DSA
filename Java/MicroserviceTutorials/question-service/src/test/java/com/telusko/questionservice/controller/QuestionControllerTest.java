package com.telusko.questionservice.controller;

import com.telusko.questionservice.model.Question;
import com.telusko.questionservice.model.QuestionWrapper;
import com.telusko.questionservice.model.Response;
import com.telusko.questionservice.service.QuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class QuestionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private QuestionService questionService;

    @Mock
    private Environment environment;

    @InjectMocks
    private QuestionController questionController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(questionController).build();
        objectMapper = new ObjectMapper();
        // Setup environment mock with lenient() to avoid unnecessary stubbing exception
        lenient().when(environment.getProperty("local.server.port")).thenReturn("8080");
    }

    // Test getAllQuestions
    @Test
    void testGetAllQuestions_Success() throws Exception {
        // Arrange
        Question question1 = new Question();
        question1.setId(1);
        question1.setQuestionTitle("What is Java?");
        question1.setOption1("Programming Language");
        question1.setOption2("Framework");
        question1.setOption3("Database");
        question1.setOption4("Server");
        question1.setRightAnswer("Programming Language");

        Question question2 = new Question();
        question2.setId(2);
        question2.setQuestionTitle("What is Spring Boot?");
        question2.setOption1("Java Framework");
        question2.setOption2("Python Library");
        question2.setOption3("Web Browser");
        question2.setOption4("Operating System");
        question2.setRightAnswer("Java Framework");

        List<Question> questions = Arrays.asList(question1, question2);
        ResponseEntity<List<Question>> expectedResponse = ResponseEntity.ok(questions);

        when(questionService.getAllQuestions()).thenReturn(expectedResponse);

        // Act & Assert
        mockMvc.perform(get("/question/allQuestions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].questionTitle").value("What is Java?"))
                .andExpect(jsonPath("$[1].id").value(2));

        verify(questionService, times(1)).getAllQuestions();
    }

    @Test
    void testGetAllQuestions_EmptyList() throws Exception {
        // Arrange
        when(questionService.getAllQuestions()).thenReturn(ResponseEntity.ok(Arrays.asList()));

        // Act & Assert
        mockMvc.perform(get("/question/allQuestions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(questionService, times(1)).getAllQuestions();
    }

    // Test getQuestionsByCategory
    @Test
    void testGetQuestionsByCategory_Success() throws Exception {
        // Arrange
        String category = "Java";
        Question question = new Question();
        question.setId(1);
        question.setQuestionTitle("What is Java?");
        question.setCategory(category);

        List<Question> questions = Arrays.asList(question);
        when(questionService.getQuestionsByCategory(category))
                .thenReturn(ResponseEntity.ok(questions));

        // Act & Assert
        mockMvc.perform(get("/question/category/{category}", category))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].category").value(category));

        verify(questionService, times(1)).getQuestionsByCategory(category);
    }

    @Test
    void testGetQuestionsByCategory_NotFound() throws Exception {
        // Arrange
        String category = "NonExistent";
        when(questionService.getQuestionsByCategory(category))
                .thenReturn(ResponseEntity.ok(Arrays.asList()));

        // Act & Assert
        mockMvc.perform(get("/question/category/{category}", category))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(questionService, times(1)).getQuestionsByCategory(category);
    }

    // Test addQuestion
    @Test
    void testAddQuestion_Success() throws Exception {
        // Arrange
        Question question = new Question();
        question.setQuestionTitle("New Question");
        question.setOption1("Option1");
        question.setOption2("Option2");
        question.setOption3("Option3");
        question.setOption4("Option4");
        question.setRightAnswer("Option1");
        question.setCategory("Java");

        when(questionService.addQuestion(any(Question.class)))
                .thenReturn(ResponseEntity.status(HttpStatus.CREATED).body("success"));

        // Act & Assert
        mockMvc.perform(post("/question/add")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(question)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").value("success"));

        verify(questionService, times(1)).addQuestion(any(Question.class));
    }

    @Test
    void testAddQuestion_NullQuestion() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/question/add")
                .contentType("application/json")
                .content("null"))
                .andExpect(status().isBadRequest());
    }

    // Test getQuestionsForQuiz
    @Test
    void testGetQuestionsForQuiz_Success() throws Exception {
        // Arrange
        String categoryName = "Java";
        Integer numQuestions = 5;
        List<Integer> questionIds = Arrays.asList(1, 2, 3, 4, 5);

        when(questionService.getQuestionsForQuiz(categoryName, numQuestions))
                .thenReturn(ResponseEntity.ok(questionIds));

        // Act & Assert
        mockMvc.perform(get("/question/generate")
                .param("categoryName", categoryName)
                .param("numQuestions", numQuestions.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(5))
                .andExpect(jsonPath("$[0]").value(1));

        verify(questionService, times(1)).getQuestionsForQuiz(categoryName, numQuestions);
    }

    @Test
    void testGetQuestionsForQuiz_MissingParameter() throws Exception {
        // Act & Assert - Missing numQuestions parameter
        mockMvc.perform(get("/question/generate")
                .param("categoryName", "Java"))
                .andExpect(status().isBadRequest());
    }

    // Test getQuestionsFromId
    @Test
    void testGetQuestionsFromId_Success() throws Exception {
        // Arrange
        List<Integer> questionIds = Arrays.asList(1, 2);

        QuestionWrapper wrapper1 = new QuestionWrapper();
        wrapper1.setId(1);
        wrapper1.setQuestionTitle("Question 1");
        wrapper1.setOption1("Opt1");
        wrapper1.setOption2("Opt2");
        wrapper1.setOption3("Opt3");
        wrapper1.setOption4("Opt4");

        QuestionWrapper wrapper2 = new QuestionWrapper();
        wrapper2.setId(2);
        wrapper2.setQuestionTitle("Question 2");
        wrapper2.setOption1("Opt1");
        wrapper2.setOption2("Opt2");
        wrapper2.setOption3("Opt3");
        wrapper2.setOption4("Opt4");

        List<QuestionWrapper> wrappers = Arrays.asList(wrapper1, wrapper2);

        when(questionService.getQuestionsFromId(questionIds))
                .thenReturn(ResponseEntity.ok(wrappers));

        // Act & Assert
        mockMvc.perform(post("/question/getQuestions")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(questionIds)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));

        verify(questionService, times(1)).getQuestionsFromId(questionIds);
    }

    @Test
    void testGetQuestionsFromId_EmptyList() throws Exception {
        // Arrange
        List<Integer> questionIds = Arrays.asList();

        when(questionService.getQuestionsFromId(questionIds))
                .thenReturn(ResponseEntity.ok(Arrays.asList()));

        // Act & Assert
        mockMvc.perform(post("/question/getQuestions")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(questionIds)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(questionService, times(1)).getQuestionsFromId(questionIds);
    }

    // Test getScore
    @Test
    void testGetScore_Success() throws Exception {
        // Arrange
        Response response1 = new Response();
        response1.setId(1);
        response1.setResponse("Programming Language");

        Response response2 = new Response();
        response2.setId(2);
        response2.setResponse("Java Framework");

        List<Response> responses = Arrays.asList(response1, response2);

        when(questionService.getScore(any(List.class)))
                .thenReturn(ResponseEntity.ok(2));

        // Act & Assert
        mockMvc.perform(post("/question/getScore")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(2));

        verify(questionService, times(1)).getScore(any(List.class));
    }

    @Test
    void testGetScore_PartialCorrect() throws Exception {
        // Arrange
        Response response1 = new Response();
        response1.setId(1);
        response1.setResponse("Programming Language");

        Response response2 = new Response();
        response2.setId(2);
        response2.setResponse("Wrong Answer");

        List<Response> responses = Arrays.asList(response1, response2);

        when(questionService.getScore(any(List.class)))
                .thenReturn(ResponseEntity.ok(1));

        // Act & Assert
        mockMvc.perform(post("/question/getScore")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(1));

        verify(questionService, times(1)).getScore(any(List.class));
    }

    @Test
    void testGetScore_AllWrong() throws Exception {
        // Arrange
        Response response1 = new Response();
        response1.setId(1);
        response1.setResponse("Wrong");

        Response response2 = new Response();
        response2.setId(2);
        response2.setResponse("Wrong");

        List<Response> responses = Arrays.asList(response1, response2);

        when(questionService.getScore(any(List.class)))
                .thenReturn(ResponseEntity.ok(0));

        // Act & Assert
        mockMvc.perform(post("/question/getScore")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(responses)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(0));

        verify(questionService, times(1)).getScore(any(List.class));
    }
}
