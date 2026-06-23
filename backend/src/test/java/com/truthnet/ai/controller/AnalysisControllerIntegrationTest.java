package com.truthnet.ai.controller;

import com.truthnet.ai.security.CustomUserDetailsService;
import com.truthnet.ai.security.JwtTokenProvider;
import com.truthnet.ai.service.AnalysisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnalysisController.class)
@ActiveProfiles("test")
public class AnalysisControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnalysisService analysisService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    public void testEmailAnalysisRequiresAuth() throws Exception {
        mockMvc.perform(post("/analysis/email")
                        .contentType("application/json")
                        .content("{\"content\": \"phishing text\"}"))
                .andExpect(status().isForbidden()); // JWT token is missing, so it should be blocked
    }
}
