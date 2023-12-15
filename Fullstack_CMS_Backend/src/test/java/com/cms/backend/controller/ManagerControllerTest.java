package com.cms.backend.controller;

import com.cms.backend.model.Manager;
import com.cms.backend.repository.ManagerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ManagerControllerTest {

    public static String asJsonString(final Object obj) {
    try {
        return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}

    private MockMvc mockMvc;

    @Mock
    private ManagerRepository managerRepository;

    @InjectMocks
    private ManagerController managerController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(managerController).build();
    }

    @Test
    public void testGetManagers() throws Exception {
        when(managerRepository.findAll()).thenReturn(Arrays.asList(new Manager(), new Manager()));
        
        mockMvc.perform(MockMvcRequestBuilders.get("/managers"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2));

        verify(managerRepository, times(1)).findAll();
        verifyNoMoreInteractions(managerRepository);
    }

    @Test
    public void testCreateManager() throws Exception {
        Manager manager = new Manager();
        manager.setFirstName("John");

        when(managerRepository.save(any(Manager.class))).thenReturn(manager);

        mockMvc.perform(MockMvcRequestBuilders.post("/managers")
            .content(asJsonString(manager))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"));

        verify(managerRepository, times(1)).save(any(Manager.class));
        verifyNoMoreInteractions(managerRepository);
    }

    @Test
    public void testGetManagerById() throws Exception {
        Long id = 1L;
        Manager manager = new Manager();
        manager.setId(id);
        manager.setFirstName("John");

        when(managerRepository.findById(id)).thenReturn(Optional.of(manager));

        mockMvc.perform(MockMvcRequestBuilders.get("/managers/{id}", id))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(id))
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"));

        verify(managerRepository, times(1)).findById(id);
        verifyNoMoreInteractions(managerRepository);
    }

}
