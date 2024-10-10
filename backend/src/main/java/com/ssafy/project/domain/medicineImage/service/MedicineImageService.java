package com.ssafy.project.domain.medicineImage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.reactive.function.client.WebClientException;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MedicineImageService {

    private final WebClient.Builder webClientBuilder;

    // 이미지를 특정 URL로 전송하는 로직
    public String uploadImageToUrl(MultipartFile file) {
        WebClient webClient = webClientBuilder.baseUrl("http://222.107.238.124:5000").build();  // 필요한 baseUrl 설정

        try {
            // 이미지 전송
            Mono<String> responseMono = webClient.post()
                    .uri("/predict/")  // baseUrl 뒤에 붙는 경로
                    .body(BodyInserters.fromMultipartData("file", file.getResource()))  // key를 'file'로 설정하고 파일을 Multipart로 전송
                    .retrieve()
                    .bodyToMono(String.class);

            // 비동기 결과를 동기 방식으로 기다림
            String response = responseMono.block();
            System.out.println("Response from API: " + response);
            return response;

        } catch (WebClientResponseException e) {
            // 서버에서 오류 응답을 받은 경우 처리
            System.err.println("WebClientResponseException: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return null;
        } catch (WebClientException e) {
            // 다른 WebClient 관련 예외 처리
            System.err.println("WebClientException: " + e.getMessage());
            return null;
        }
    }
}
