package com.flashcard.flashcard;

import com.flashcard.flashcard.repository.CardRepository;
import com.flashcard.flashcard.repository.DeckRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
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
				registry.addMapping("/api/**").allowedOrigins("http://localhost:3000")
						.allowedMethods(HttpMethod.GET.toString(), HttpMethod.POST.toString(), HttpMethod.PUT.toString());
			}
		};
	}

	@Bean
	public CommandLineRunner loadData(CardRepository cardRepository, DeckRepository deckRepository) {
		return (args) -> {
			if (!cardRepository.findAll().iterator().hasNext())
				InitTestData.saveTestData(cardRepository, deckRepository);
		};
	}
}
