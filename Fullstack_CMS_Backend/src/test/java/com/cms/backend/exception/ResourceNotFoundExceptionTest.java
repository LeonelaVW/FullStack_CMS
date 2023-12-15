package com.cms.backend.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ResourceNotFoundExceptionTest {

    @Test
    public void testResourceNotFoundException() {
        String message = "Resource not found";
        HttpStatus status = HttpStatus.NOT_FOUND;

        ResourceNotFoundException exception = new ResourceNotFoundException(message, status);

        assertEquals(message, exception.getMessage());
        assertEquals(status, exception.getStatus());
    }
}
