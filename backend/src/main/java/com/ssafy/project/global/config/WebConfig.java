package com.ssafy.project.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(
                        "https://j11b308.p.ssafy.io",
                        "http://j11b308.p.ssafy.io",
                        "https://localhost:3000",
                        "httos://localhost:5173",
                        "https://j11b308.p.ssafy.io:3000",
                        "https://j11b308.p.ssafy.io:5173"
//                        "http://localhost:3000",
//                        "http://localhost:5173"
                )
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
//        registry.addConverter(new OauthServerTypeConverter());
    }
}