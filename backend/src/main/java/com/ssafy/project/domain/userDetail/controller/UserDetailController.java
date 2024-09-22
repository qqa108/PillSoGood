package com.ssafy.project.domain.userDetail.controller;

import com.ssafy.project.domain.userDetail.dto.UserDetailDto;
import com.ssafy.project.domain.userDetail.dto.UserDetailResponse;
import com.ssafy.project.domain.userDetail.service.UserDetailService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user") // 추후 수정
public class UserDetailController {

    private final UserDetailService userDetailService;

    // 사용자 조회(default = "나")
    @GetMapping("")
    public ResponseEntity<?> getUserDetail(HttpServletRequest request, @RequestParam(value = "family", required = false) String family) {
        int userId = (int) request.getAttribute("userId");

        UserDetailResponse userDetail = userDetailService.getUser(userId, family);
        return ResponseEntity.ok(userDetail);
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
    public ResponseEntity<?> deleteUserDetail(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        userDetailService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    //가족 정보 조회
    @GetMapping("/family")
    public ResponseEntity<?> getUserFamily(HttpServletRequest request) {
        int userId = (Integer) request.getAttribute("userId");
        List<UserDetailResponse> familyDetails = userDetailService.getUserFamily(userId); // 서비스에서 UserDetailResponse 리스트 반환
        return ResponseEntity.ok(familyDetails);
    }

    //가족 정보 삭제
    @DeleteMapping("/family/delete")
    public ResponseEntity<?> deleteUserFamily(HttpServletRequest request, @RequestParam("family") String family) {
        int userId = (Integer) request.getAttribute("userId");

        userDetailService.deleteFamily(userId, family);
        return ResponseEntity.ok("가족 정보가 삭제되었습니다.");
    }

}
