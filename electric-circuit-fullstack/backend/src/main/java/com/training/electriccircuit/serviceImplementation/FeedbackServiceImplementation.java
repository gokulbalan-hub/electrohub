package com.training.electriccircuit.serviceImplementation;

import com.training.electriccircuit.entity.Feedback;
import com.training.electriccircuit.repository.FeedbackRepository;
import com.training.electriccircuit.service.FeedbackService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImplementation implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @SuppressWarnings("null")
	@Override
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @SuppressWarnings("null")
	@Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

}