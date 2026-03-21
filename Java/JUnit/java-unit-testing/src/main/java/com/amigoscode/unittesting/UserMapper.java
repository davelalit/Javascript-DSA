package com.amigoscode.unittesting;

public class UserMapper {

    public UserDto map(User user) {
        return new UserDto(
                user.id(),
                user.name()
        );
    }
}
