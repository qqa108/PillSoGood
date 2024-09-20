package com.ssafy.project.domain.userDetail.controller;

import com.ssafy.project.domain.userDetail.dto.UserDetailDto;
import com.ssafy.project.domain.userDetail.service.UserDetailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user") // 추후 수정
public class UserDetailController {

    private final UserDetailService userDetailService;

    // 사용자 조회
    @GetMapping("")
    public ResponseEntity<?> getUserDetail(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return ResponseEntity.ok(userDetailService.getUser(userId));
    }

    // 사용자 정보 등록
    @PostMapping("/register")
    public ResponseEntity<?> registerUserDetail(HttpServletRequest request, @RequestBody UserDetailDto userDetailDto) {
        int userId = (Integer) request.getAttribute("userId");
        userDetailService.registerUserDetail(userId, userDetailDto); // userId를 Service에 전달
        return ResponseEntity.ok("User registered successfully.");
    }

    // 정보 수정
    @PatchMapping("/modify")
    public ResponseEntity<?> modifyUserDetail(HttpServletRequest request, @RequestBody UserDetailDto userDetailDto) {
        int userId = (Integer) request.getAttribute("userId");
        userDetailService.modifyUserDetail(userId, userDetailDto);
        return ResponseEntity.ok("User details modified successfully.");
    }

    // 회원 탈퇴
    @DeleteMapping("/withdraw")
    public ResponseEntity<?> deleteUserDetail(HttpServletRequest request, HttpServletResponse response) {
        int userId = (Integer) request.getAttribute("userId");
        userDetailService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
