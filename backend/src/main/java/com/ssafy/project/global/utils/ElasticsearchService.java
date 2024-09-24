package com.ssafy.project.global.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.ssafy.project.domain.medicine.dto.MedicinePreviewDTO;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ElasticsearchService {

    private final RestHighLevelClient client;

    @Autowired
    public ElasticsearchService(RestHighLevelClient client) {
        this.client = client;
    }

    public List<MedicinePreviewDTO> searchMedicinePreview() {
        List<MedicinePreviewDTO> resultList = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);  // 알 수 없는 필드 무시
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);  // 필드명 매칭 설정


        try {
            // medicine_index 인덱스에서 모든 데이터를 조회
            SearchRequest searchRequest = new SearchRequest("medicine_index");
            SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
            searchSourceBuilder.query(QueryBuilders.matchAllQuery());
            searchRequest.source(searchSourceBuilder);

            // Elasticsearch에서 검색 결과 가져오기
            SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
            for (SearchHit hit : searchResponse.getHits().getHits()) {
                // 검색된 데이터를 MedicinePreviewDTO로 변환
                MedicinePreviewDTO medicinePreviewDTO = objectMapper.readValue(hit.getSourceAsString(), MedicinePreviewDTO.class);
                resultList.add(medicinePreviewDTO);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultList;
    }
}
