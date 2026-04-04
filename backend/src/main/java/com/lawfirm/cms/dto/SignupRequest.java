package com.lawfirm.cms.dto;

import com.lawfirm.cms.entity.Role;
import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String name;
    private Role role;
}
