package com.ssafy.project.domain.medicationApi.service;

import com.ssafy.project.domain.medicationApi.dto.MedicationApiRequestDto;
import com.ssafy.project.domain.medicationApi.dto.MedicationApiResponseAPI;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MedicationApiService {

    private final WebClient webClient;

    public MedicationApiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://datahub-dev.scraping.co.kr/scrap")
                .build();
    }

    public String sendMedicationApiRequest(MedicationApiRequestDto requestdto) {
        MedicationApiResponseAPI response = webClient.post()
                .uri("/common/nhis/TreatmentDosageInfoSimple")
                .bodyValue(requestdto)
                .retrieve() //응답가져옴
                .bodyToMono(MedicationApiResponseAPI.class) //변환
                .block(); //비동기 처리 대기

        if(!response.getResult().equals("SUCCESS")) {
            throw new IllegalStateException(response.getErrMsg());
        }

        return response.getData().getCallbackId();
    }
}
