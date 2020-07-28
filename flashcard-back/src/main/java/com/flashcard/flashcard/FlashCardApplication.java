package com.flashcard.flashcard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FlashCardApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlashCardApplication.class, args);
	}

	// TODO: see if this can be moved into separate package
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
