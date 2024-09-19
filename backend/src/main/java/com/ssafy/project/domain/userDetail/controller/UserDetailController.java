package com.ssafy.project.domain.userDetail.controller;

import com.ssafy.project.domain.user.service.UserService;
import com.ssafy.project.domain.userDetail.dto.UserDetailRequest;
import com.ssafy.project.domain.userDetail.dto.UserDetailResponse;
import com.ssafy.project.domain.userDetail.service.UserDetailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.ref.PhantomReference;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user") //추후 수정
public class UserDetailController {
    private final UserService userService;
    private final UserDetailService userDetailService;

    //사용자 조회
    @GetMapping()
    public ResponseEntity<?> getUserDetail(@RequestHeader("Authorization") String token) {
        String accessToken = token.replace("Bearer ", "");
        // 조회
        UserDetailResponse userDetailResponse = userDetailService.getUser(accessToken);
        return ResponseEntity.ok(Map.of("user", userDetailResponse));
    }

    //정보 수정
    @PatchMapping("/modify")
    public ResponseEntity<?> modifyUserDetail(@RequestHeader("Authorization") String token, @RequestBody UserDetailRequest userDetailRequest) {
        return ResponseEntity.ok(Map.of("update", "Member update successfully"));
    }

    //회원 탈퇴
    @DeleteMapping("/withdraw")
    public ResponseEntity<?> deleteUserDetail(@RequestHeader("Authorization") String token, HttpServletResponse response) {
        String accessToken = token.replace("Bearer ", "");
        userDetailService.deleteUser(accessToken); //사용자 탈퇴는 UserService 에서

        // Refresh Token 쿠키 제거
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0); // 쿠키 제거
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Member deleted successfully"));
    }
}
