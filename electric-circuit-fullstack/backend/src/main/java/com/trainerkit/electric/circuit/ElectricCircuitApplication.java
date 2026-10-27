package com.trainerkit.electric.circuit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {
	    "com.training.electriccircuit",
	    "com.trainerkit.electric.circuit"
	})
	@EnableJpaRepositories("com.training.electriccircuit.repository")
	@EntityScan("com.training.electriccircuit.entity")
public class ElectricCircuitApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElectricCircuitApplication.class, args);
    }
}