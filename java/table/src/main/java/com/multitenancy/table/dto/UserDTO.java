package com.multitenancy.table.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

public class UserDTO {

    @Getter
    @Setter
    public static class SignUpRequest {
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        private String username;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    @Getter
    @Setter
    public static class UpdateRequest {
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        private String username;

        @Email(message = "Invalid email format")
        private String email;

        private String password;
    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String username;
        private String email;
    }
}